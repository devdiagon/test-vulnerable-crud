from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from database import get_db
from models import create_table

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

conn = get_db()
create_table(conn)

@app.get("/items")
def read_items():
    cursor = conn.execute("SELECT * FROM items")
    return [dict(id=row[0], name=row[1], description=row[2]) for row in cursor.fetchall()]

@app.post("/items")
async def create_item(request: Request):
    data = await request.json()
    name = data["name"]
    description = data["description"]
    query = f"INSERT INTO items (name, description) VALUES ('{name}', '{description}')"
    conn.execute(query)
    conn.commit()
    return {"message": "Item inserted"}