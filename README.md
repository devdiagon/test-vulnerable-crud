# Vulnerable CRUD App

CRUD con vulnerabilidades intencionales para análisis automático con CodeQL y Semgrep.

Para inicializarlo localmente ubicarse en la raiz

**Para el backend:**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Para el frontend:**

```bash
cd frontend
npm install
npm start
```

Las rutas de acceso son: *localhost:8000* para el backend y *localhost:3000* para el frontend.