def create_tables(conn):
    conn.executescript("""
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        full_name TEXT,
        military_rank TEXT,
        email TEXT,
        password_nohash TEXT,
        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
        category_id INTEGER PRIMARY KEY,
        category_name TEXT NOT NULL,
        description TEXT
    );

    CREATE TABLE IF NOT EXISTS items (
        item_id INTEGER PRIMARY KEY,
        item_name TEXT NOT NULL,
        description TEXT,
        category_id INTEGER,
        current_quantity INTEGER,
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(category_id) REFERENCES categories(category_id)
    );
    """)
    conn.commit()