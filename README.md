# React Laravel Web App

## API Endpoints

| Method | Endpoint          | Description                                |
| ------ | ----------------- | ------------------------------------------ |
| GET    | `/api/users`      | Get all users                              |
| POST   | `/api/users`      | Add a new user                             |
| PUT    | `/api/users/{id}` | Update user name (without changing result) |
| DELETE | `/api/users/{id}` | Delete a user                              |

## Usage

1. Open the frontend at `http://localhost:5173`
2. Enter numbers and operation.
   ![image](https://github.com/user-attachments/assets/a7d1238d-2e2a-4fde-9214-38d365478b84)

3. Enter a full name and click **Add Name**.
   ![image](https://github.com/user-attachments/assets/198aa941-fb3b-4744-ad65-e46beec4887a)

4. Use **Edit** to update the name.
   ![image](https://github.com/user-attachments/assets/12c0747e-4ee9-4aeb-954f-0926206ad972)
5. Use **Delete** to remove a user from the list.
   ![image](https://github.com/user-attachments/assets/42537e0b-6f66-45bf-a4a7-0026e9a62c66)

## Tech Stack

### Frontend

- ReactJS
- TypeScript (TSX)
- Tailwind CSS
- Axios (for API requests)
- Laravel (PHP)
- MySQL (Database)
- Laravel Migrations & Seeders

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- **Node.js** (for frontend)
- **Composer & PHP** (for Laravel backend)
- **MySQL** (for database management)
- **XAMPP/MySQL Workbench** (Recommended for database setup)

### Clone the Repository

```sh
git clone https://github.com/ShiinaNeet/Code-Interview.git
cd Code-Interview
```

## Frontend Setup (React + Next.js)

```sh
cd frontend  # Navigate to frontend folder
npm install  # Install dependencies
npm run dev  # Start development server
```

Frontend will run at `http://localhost:3000`

## Backend Setup (Laravel API)

```sh
cd backend  # Navigate to backend folder
composer install  # Install dependencies
cp .env.example .env  # Create environment file
php artisan key:generate  # Generate Laravel app key
```

### Configure Database

Edit the `.env` file and update database credentials:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=root
DB_PASSWORD=
```

Then, run:

```sh
php artisan db:seed --class=UserSeeder  # Run migrations and seed database
php artisan serve  # Start Laravel backend
or composer run dev
```

Backend will run at `http://127.0.0.1:8000`

## License

This project is licensed under the [MIT License](LICENSE).
