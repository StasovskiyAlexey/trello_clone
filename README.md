## 🚀 Trello Clone

### Интерактивный дашборд на стеке FastAPI + React (FSD), упакованный в Docker

## 🖼️ Интерфейс приложения (Screenshots)

<p align="center">
  Ниже представлены ключевые экраны приложения. Вы можете развернуть каждый блок, чтобы увидеть интерфейс системы.
</p>

---

### 🔐 1. Аутентификация и Вход
<details>
<summary><b>Посмотреть экран авторизации (Нажмите, чтобы развернуть)</b></summary>
<br />
<p align="center">
  <img src="https://www.dropbox.com/scl/fi/get0f9xmwj0p7hfvev5g8/auth.png?rlkey=cf92u65b7pdmyisnwazx35e7n&st=chez7dqe&raw=1" width="100%" alt="Страница авторизации" />
</p>
<p align="center"><i>Минималистичная форма входа и регистрации пользователя с валидацией полей.</i></p>
</details>

---

### 📋 2. Главная панель (Рабочие пространства)
<details>
<summary><b>Посмотреть список досок (Нажмите, чтобы развернуть)</b></summary>
<br />
<p align="center">
  <img src="https://www.dropbox.com/scl/fi/8793zo93aj8bxxk1282z2/boards.png?rlkey=nqtop7n0z3q0nxl0eza34218v&st=1afnlr2l&raw=1" width="100%" alt="Список досок" />
</p>
<p align="center"><i>Центральный дашборд со списком всех персональных и командных канбан-досок пользователя.</i></p>
</details>

---

### ⚡ 3. Канбан-Доска (Управление задачами)
<details>
<summary><b>Посмотреть интерфейс доски (Нажмите, чтобы развернуть)</b></summary>
<br />
<p align="center">
  <img src="https://www.dropbox.com/scl/fi/40sibsir7dcnjr8m8g1y0/board.png?rlkey=di9aefqt4ok0w0uvph0695w3k&st=q3u9qq12&raw=1" width="100%" alt="Канбан доска" />
</p>
<p align="center"><i>Рабочее пространство с колонками, карточками задач, тегами и возможностью интерактивного перемещения.</i></p>
</details>

---

### ⚙️ 4. Настройки аккаунта
<details>
<summary><b>Посмотреть страницу настроек (Нажмите, чтобы развернуть)</b></summary>
<br />
<p align="center">
  <img src="https://www.dropbox.com/scl/fi/8dazwr9sup9hy5wi9r2cx/settings.png?rlkey=b6t0ztn1zq1ggdtvdgp2nd9iz&st=578ka3nr&raw=1" width="100%" alt="Настройки профиля" />
</p>
<p align="center"><i>Панель управления профилем: изменение публичных данных, аватара, смена пароля и деструктивные действия.</i></p>
</details>

---

### ⭐ Активация приложения(Linux)

// Создаем переменные окружения в проекте<br>
`POSTGRES_PASSWORD=postgres`<br>
`POSTGRES_DB=fastapi_db`<br>
`DATABASE_URL=postgresql+asyncpg://postgres:postgres@db:5432/fastapi_db`<br>
`SECRET_KEY=secret_key`<br>
`DEBUG=True`<br>
`VITE_APP_URL='/api'`

// Заходим в корень проекта<br>
`cd fastapi_dashboard`

**Back-End**:

// Путь к бекенду<br>
`cd backend`

// Вход в виртуальное окружение<br>
`python3 -m venv venv`

// Активация виртуального приложения<br>
`source venv/bin/activate`

// Установка зависимостей<br>
`pip install -r requirements.txt`

**Front-End**:

// Путь к фронтенду<br>
`cd frontend`

// Установка зависимостей<br>
`npm install или npm i`

// Выходим в корень проект<br>
`cd ..`

// Билдим приложение<br>
`make build`


// Применяем миграции<br>
`docker exec -it fastapi_app alembic upgrade head`

###### ❗ Контейнер должен быть запущен в другом терминале или без вывода логов в фоне

// Создаем контейнер при запуске<br>
`make up`

// Проверка запущеного nginx сервер<br>
`localhost(Фронтенд)`<br>
`localhost/api/docs(Бекенд)`

###### ❗ Если есть ошибка 404 (Not found)
`sudo systemctl stop nginx` - Основка системного контейнера

---

### 🗄 Функционал проекта:

Полноценная Kanban-доска<br>
Я разработал функциональный аналог **Trello**, который позволяет эффективно управлять задачами с помощью визуального интерфейса:

* **Drag-and-Drop:** интуитивное перемещение карточек между колонками для быстрого изменения статусов задач.
* **Гибкая архитектура:** Создание собственных досок, колонок и управление приоритетами карточек.
* **User Management:** Полноценная авторизация, редактирование профиля, изменение аватаров и паролей.
* **High Performance:** Оптимизированная работа с серверным состоянием через TanStack Query для мгновенного обновления интерфейса без лишних перегрузок страницы.

---

### 📄 Стек приложения

| Модуль | Технологии |
| :--- | :--- |
| **Back-End** | FastAPI, SQLAlchemy 2.0 (Async), Alembic, Pydantic v2, Uvicorn |
| **Front-End** | React 19, TypeScript, Tanstack Router, Zustand, React-Hook-Form |
| **UI/UX** | Tailwind CSS 4, shadcn/ui, Lucide Icons |
| **Security** | JWT (OAuth2), Passlib (bcrypt), HTTP-only Cookies |
| **DevOps** | Docker, Docker Compose, Nginx (Reverse Proxy) |

