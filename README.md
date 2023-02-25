# Storefront Backend Project

## Required Technologies
You will need docker to run the application easily, database is running on port 5432 and application on port 3000

### Installation instructions

### 1. Copy .env.example to .env and fill it as you want (but you can keep default values)

### 2. Build application
    docker-compose up -d

### 3. Install dependencies
    npm i

### 4. Create databases and tables (dev and test)
    npm run db-create && npm run db-create-test

### 5. Run fixtures (dev and test)
    npm run fixture && npm run fixture-test

### 5. Run tests and see if everything works
    npm test
    You can also run "npm run dev" to run the application

### 6. Import collection (OPTIONAL)
Look at "Store front collection.postman_collection.json"
