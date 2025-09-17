# 🏠 Laravel Home Handler

This project aims to provide some help for handling home-related tasks using high-level technologies stack.
It includes features like task management, reminders, and notes.

---

## 🛠️ Tech Stack

- **Backend:** [Laravel 12](https://laravel.com)
- **Frontend:** [Inertia.js](https://inertiajs.com) + [React](https://react.dev) (TypeScript)
- **Styling:** [TailwindCSS](https://tailwindcss.com)
- **Testing:** [Pest PHP](https://pestphp.com)
- **Containerization:** [Laravel Sail](https://laravel.com/docs/master/sail) (Docker)

---

## ⚡ Getting Started

### Prerequisites

- [Docker & Docker Compose](https://docs.docker.com/get-docker/) installed
- [Node.js](https://nodejs.org/) v18+ and npm (or yarn/pnpm)

### 👨‍💻 Installation

```bash
# Clone repository
git clone https://github.com/luca-fabbietti/laravel-home-handler.git
cd laravel-home-handler

# Copy environment file
cp .env.example .env

# Start Sail
./vendor/bin/sail up -d

# Install dependencies
./vendor/bin/sail composer install
./vendor/bin/sail npm install

# Generate application key
./vendor/bin/sail artisan key:generate

# Run migrations
./vendor/bin/sail artisan migrate
```

### 🏃‍♂️ Running the Application

```bash
# Start development environment
./vendor/bin/sail up -d

# Run frontend dev server (with hot reload)
./vendor/bin/sail npm run dev

# Seed database (optional)
./vendor/bin/sail artisan db:seed
```

Open your browser and navigate to `http://localhost`.

### 🧪 Testing

```bash
# Run tests
./vendor/bin/sail artisan test
```

### 🧹 Linting & Formatting

```bash
# Lint PHP code
./vendor/bin/sail artisan pint

# Lint TypeScript/JavaScript code
./vendor/bin/sail npm run lint
```

### 🤖 CI/CD Pipelines

This project includes GitHub Actions workflows for:

- Runs Pest tests on push to master and pull requests
- Runs linters and formatters on push to master and pull requests
- Deployment to production on tags created

### 🚀 Deployment

```bash
# Create a new tag for deployment
git tag v1.0.0
# Push the tag to trigger deployment
git push origin v1.0.0
```

### 📁 Project Structure

```bash
├── app/                # Laravel backend (models, controllers, etc.)
├── bootstrap/          # Laravel bootstrap files
├── config/             # Laravel configuration files
├── database/           # Migrations, factories, seeders
├── docker/             # Docker configuration files
├── infra/              # Infrastructure related files
├── public/             # Public assets
├── resources/
│   ├── js/             # React (TypeScript) components
│   ├── css/            # TailwindCSS styles
│   └── views/          # Inertia.js entrypoints
├── storage/            # Storage for logs, cache, etc.
├── routes/             # Laravel routes
├── tests/              # Pest tests
└── docker-compose.yml  # Docker Sail config
```

### 📄 Licensing

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### 🆘 Contact & Support

For any questions or support, please open an issue on GitHub
