# SnoopaAssist
AI daily planner that generates personalized task and rest suggestions based on your daily mood, schedule and personal preferences.

Features
=====================
- daily planning for yesterday, today, and tomorrow
- task management
- productivity suggestions and rest reccomendations
- personalization

Stack
=====================
### Frontend
- React
- TypeScript
- shadcn/ui
- Tailwind CSS
- Vite
### Backend
- Django
- Django REST Framework
### AI
- Ollama
- LLaMA 3

Usage
=====================
Clone git repository
```
git clone https://github.com/Sunrise443/SnoopaAssist.git
cd snoopa-assist
```

Frontend setup
```
cd frontend
npm install
npm run dev
```
Frontend will be available at http://localhost:5173

Backend setup
```
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Backend will be available at http://localhost:8000

Ollama setup
```
ollama pull llama3
ollama serve
```
Ollama will be available at http://localhost:11434
