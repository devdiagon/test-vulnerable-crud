from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection
from models import create_tables

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conn = get_connection()
create_tables(conn)

@app.get("/users")
def get_users():
    cur = conn.execute("SELECT * FROM users")
    return [dict(zip([c[0] for c in cur.description], row)) for row in cur.fetchall()]

@app.post("/users")
async def add_user(req: Request):
    data = await req.json()
    query = f"INSERT INTO users (full_name, military_rank, email, password_nohash) VALUES ('{data['full_name']}', '{data['military_rank']}', '{data['email']}', '{data['password']}')"
    conn.execute(query)
    conn.commit()
    return {"message": "User added"}

@app.get("/categories")
def get_categories():
    cur = conn.execute("SELECT * FROM categories")
    return [dict(zip([c[0] for c in cur.description], row)) for row in cur.fetchall()]

@app.post("/categories")
async def add_category(req: Request):
    data = await req.json()
    query = f"INSERT INTO categories (category_name, description) VALUES ('{data['category_name']}', '{data['description']}')"
    conn.execute(query)
    conn.commit()
    return {"message": "Category added"}

@app.get("/items")
def get_items():
    cur = conn.execute("SELECT * FROM items")
    return [dict(zip([c[0] for c in cur.description], row)) for row in cur.fetchall()]

@app.post("/items")
async def add_item(req: Request):
    data = await req.json()
    query = f"INSERT INTO items (item_name, description, category_id, current_quantity) VALUES ('{data['item_name']}', '{data['description']}', {data['category_id']}, {data['current_quantity']})"
    conn.execute(query)
    conn.commit()
    return {"message": "Item added"}