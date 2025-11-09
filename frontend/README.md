# Frontend (React + Vite)

Minimal React app to test the login/register flow against the backend running on http://localhost:8080

Run locally:

```powershell
cd frontend
npm install
npm run dev
```

Notes:
- The app stores the returned JWT in localStorage under `token`.
- If you run the frontend from a different origin, enable CORS on the backend (allow origin http://localhost:5173 or the port Vite uses).
