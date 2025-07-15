from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection
from models import create_tables
from fastapi import Depends

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    conn = get_connection()
    create_tables(conn)
    conn.close()

@app.get("/users")
def get_users():
    conn = get_connection()
    cur = conn.execute("SELECT * FROM users")
    results = [dict(zip([c[0] for c in cur.description], row)) for row in cur.fetchall()]
    conn.close()
    return results

@app.post("/users")
async def add_user(req: Request):
    conn = get_connection()
    data = await req.json()
    query = f"INSERT INTO users (full_name, military_rank, email, password_nohash) VALUES ('{data['full_name']}', '{data['military_rank']}', '{data['email']}', '{data['password']}')"
    conn.execute(query)
    conn.commit()
    return {"message": "User added"}

@app.put("/users/{user_id}")
async def update_user(user_id: int, req: Request):
    data = await req.json()
    conn = get_connection()
    query = f"""
        UPDATE users
        SET full_name = '{data['full_name']}',
            military_rank = '{data['military_rank']}',
            email = '{data['email']}',
            password_nohash = '{data['password']}'
        WHERE user_id = {user_id}
    """ 
    conn.execute(query)
    conn.commit()
    conn.close()
    return {"message": "User updated"}

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    conn = get_connection()
    query = f"DELETE FROM users WHERE user_id = {user_id}"
    conn.execute(query)
    conn.commit()
    conn.close()
    return {"message": "User deleted"}

@app.get("/categories")
def get_categories():
    conn = get_connection()
    cur = conn.execute("SELECT * FROM categories")
    results = [dict(zip([c[0] for c in cur.description], row)) for row in cur.fetchall()]
    conn.close()
    return results

@app.post("/categories")
async def add_category(req: Request):
    conn = get_connection()
    data = await req.json()
    query = f"INSERT INTO categories (category_name, description) VALUES ('{data['category_name']}', '{data['description']}')"
    conn.execute(query)
    conn.commit()
    return {"message": "Category added"}

@app.put("/categories/{category_id}")
async def update_category(category_id: int, req: Request):
    data = await req.json()
    conn = get_connection()
    query = f"""
        UPDATE categories
        SET category_name = '{data['category_name']}',
            description = '{data['description']}'
        WHERE category_id = {category_id}
    """
    conn.execute(query)
    conn.commit()
    conn.close()
    return {"message": "Category updated"}


@app.delete("/categories/{category_id}")
def delete_category(category_id: int):
    conn = get_connection()
    query = f"DELETE FROM categories WHERE category_id = {category_id}"
    conn.execute(query)
    conn.commit()
    conn.close()
    return {"message": "Category deleted"}


@app.get("/items")
def get_items():
    conn = get_connection()
    cur = conn.execute("SELECT * FROM items")
    results = [dict(zip([c[0] for c in cur.description], row)) for row in cur.fetchall()]
    conn.close()
    return results

@app.post("/items")
async def add_item(req: Request):
    conn = get_connection()
    data = await req.json()
    query = f"INSERT INTO items (item_name, description, category_id, current_quantity) VALUES ('{data['item_name']}', '{data['description']}', {data['category_id']}, {data['current_quantity']})"
    conn.execute(query)
    conn.commit()
    return {"message": "Item added"}

@app.put("/items/{item_id}")
async def update_item(item_id: int, req: Request):
    data = await req.json()
    conn = get_connection()
    query = f"""
        UPDATE items
        SET item_name = '{data['item_name']}',
            description = '{data['description']}',
            category_id = {data['category_id']},
            current_quantity = {data['current_quantity']}
        WHERE item_id = {item_id}
    """
    conn.execute(query)
    conn.commit()
    conn.close()
    return {"message": "Item updated"}


@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    conn = get_connection()
    query = f"DELETE FROM items WHERE item_id = {item_id}"
    conn.execute(query)
    conn.commit()
    conn.close()
    return {"message": "Item deleted"}
