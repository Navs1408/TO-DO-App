# Todo App

A full-stack To-Do application with user authentication, built with Django REST Framework and React.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Django + Django REST Framework |
| Database | PostgreSQL |
| Authentication | JWT (djangorestframework-simplejwt) |

---

## Features

- User registration and login with JWT authentication
- Create, read, update and delete to-do tasks
- Mark tasks as complete or incomplete
- Inline task editing
- Protected frontend routes — redirects to login if not authenticated

---

## Project Structure

```
todo_project/
├── todo_backend/          # Django project config
│   ├── settings.py
│   └── urls.py
├── todos/                 # Core Django app
│   ├── models.py          # Database models
│   ├── serializers.py     # DRF serializers
│   ├── views.py           # API views
│   └── urls.py            # API routes
└── react_frontend/        # React frontend
    └── src/
        ├── App.js
        ├── Login.js
        ├── Todos.js
        ├── api.js
        └── index.js
```

---

## Database Schema

### USER
| Column | Type | Notes |
|---|---|---|
| id | SERIAL | Primary key |
| user_name | VARCHAR(150) | Unique |
| password | VARCHAR(255) | |
| email | VARCHAR(255) | Unique |
| created_at | TIMESTAMP | Auto-set |

### TODO
| Column | Type | Notes |
|---|---|---|
| id | SERIAL | Primary key |
| user_id | INTEGER | Foreign key → USER |
| title | VARCHAR(255) | Required |
| description | TEXT | Optional |
| is_completed | BOOLEAN | Default: false |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register/` | Register a new user |
| POST | `/api/login/` | Login and receive JWT token |
| GET | `/api/users/` | Get all users |
| GET | `/api/todos/` | Get all todos |
| POST | `/api/todos/` | Create a new todo |
| GET | `/api/todos/:id/` | Get a single todo |
| PUT | `/api/todos/:id/` | Update a todo |
| DELETE | `/api/todos/:id/` | Delete a todo |

---

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js and npm
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### 2. Set up the backend

```bash
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework psycopg2-binary djangorestframework-simplejwt django-cors-headers
```

### 3. Configure the database

Create a PostgreSQL database:

```sql
CREATE DATABASE "ToDo_db";
```

Update `todo_backend/settings.py` with your database credentials:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'ToDo_db',
        'USER': 'your_postgres_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### 4. Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Start the backend server

```bash
python manage.py runserver
```

Backend runs at `http://127.0.0.1:8000`

### 6. Set up and start the frontend

```bash
cd react_frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`

---

## Usage

Since there is no register page on the frontend, create a user via the API:

```
POST http://127.0.0.1:8000/api/register/

{
  "user_name": "yourname",
  "email": "your@email.com",
  "password": "yourpassword"
}
```

Then log in at `http://localhost:3000` with those credentials.

---

## How Authentication Works

1. User logs in with username and password
2. Django validates credentials and returns a JWT access token
3. Token is stored in the browser's localStorage
4. All authenticated requests include the token
5. Logout clears the token from localStorage

---

## Running the App

You need two terminal windows running simultaneously:

**Terminal 1 — Backend**
```bash
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 — Frontend**
```bash
cd react_frontend
npm start
```
