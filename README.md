
# 📚 Library Management API

A robust RESTful API for managing a complete library system, built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 🚀 Live Resources

* 📦 GitHub Repository: `https://github.com/sakibkst/b5a3-library-management-expressjs.git`
* 🌐 Deployed API: `https://b5a3-library-management.vercel.app/`

---

Sure! Here's a more detailed and elaborated version of your **📖 Project Overview** section to better highlight the features and structure of your Library Management API:

---

## 📖 Project Overview 

The **Library Management API** is a comprehensive RESTful service designed to handle all essential operations within a digital library system. It allows for seamless book catalog management, user-driven borrowing, and insightful data aggregation — all backed by robust business rules and data validation.

Here’s a deeper look at the core capabilities:

---

### 📘 Book Management (CRUD)

This system allows administrators or authorized users to perform **Create**, **Read**, **Update**, and **Delete** operations on the library's book records. Each book includes metadata such as:

* Title, Author, Genre
* ISBN number (unique identifier)
* Description of the book
* Number of total copies available
* Availability status (`true` or `false`)

These endpoints make it easy to maintain an up-to-date digital inventory of the library’s resources.

---

### 🔄 Borrowing with Business Rules & Validations

The API includes an intelligent borrowing system with built-in business logic to ensure data integrity and enforce library policies. When a user borrows a book:

* The API checks if the book exists.
* It verifies whether the requested quantity is available.
* It **automatically deducts** the borrowed quantity from the available stock.
* If all copies are borrowed, the system marks the book as **unavailable** using a **custom static method**.

These safeguards prevent invalid operations, like borrowing nonexistent books or exceeding the available stock.

---

### 📊 Borrow Summary Using MongoDB Aggregation

To gain insights into borrowing trends, the system offers a **borrow summary endpoint** powered by MongoDB’s **aggregation pipeline**. This allows the API to:

* Group borrow records by book
* Calculate the **total quantity borrowed** for each title
* Return structured and meaningful analytics (e.g., top borrowed books)

This feature is especially useful for generating reports, understanding library usage patterns, or planning for inventory updates.

---

### 🎯 Key Implementation Details

* **Mongoose Schema Validation**: Every data field is validated using Mongoose schemas to ensure correctness and prevent malformed inputs.
* **Middleware Integration**:

  * Pre-save middleware to log borrowing actions
  * Post-update middleware to monitor and update book availability
* **Consistent Error Handling**: All error responses follow a uniform structure, making it easy to debug and integrate with frontend clients.
* **TypeScript-Based Codebase**: Strong typing improves code reliability and developer productivity.
* **Modular Structure**: The code is organized into reusable, maintainable modules — ensuring scalability for future features like user authentication, reservations, or fine calculation.

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **TypeScript**
* **MongoDB** with **Mongoose**
* **Postman** (for API testing)

---

Here’s an expanded and more detailed version of your **📁 Core Features** section to better highlight the technical depth and practical value of each capability:

---

## 📁 Core Features 

The **Library Management API** is packed with well-thought-out features designed to ensure a seamless and reliable system for managing books and borrowing activity. Below is a breakdown of its core functionalities:

---

### ✅ Add, Update, Delete, and Retrieve Books

Perform full **CRUD operations** on book records. Each book includes:

* Title, author, genre, and description
* ISBN for unique identification
* Number of total copies
* Availability status (automatically managed)

This enables efficient and flexible library inventory management.

---

### ✅ Borrow Books with Quantity Validation & Availability Tracking

Users can borrow books only if enough copies are available:

* The system validates requested quantity.
* Automatically reduces available copies.
* If no copies remain, the book is marked as unavailable using a **custom static method**.

Ensures real-time stock management and prevents over-borrowing.

---

### ✅ Aggregated Borrow Data Using MongoDB Pipelines

Leverages **MongoDB Aggregation Framework** to:

* Group borrow records by book
* Calculate total quantities borrowed
* Provide quick insights into borrowing trends or popular books

Useful for reporting, analytics, and decision-making.

---

### ✅ Schema Validation Using Mongoose

Enforces strict data validation rules:

* Prevents invalid or missing data
* Custom error messages for each field
* Enhances database integrity and robustness

Ensures that all incoming data conforms to expected structure and logic.

---

### ✅ Custom Static Methods for Book Availability Control

Implements **static methods** on the Mongoose model to:

* Update `available` status based on remaining copies
* Centralize availability logic for better maintainability

This encapsulation reduces repetition and improves code clarity.

---

### ✅ Middleware (`post` hooks) to Update Availability

Uses **Mongoose middleware hooks** like `post('findOneAndUpdate')` to:

* Automatically recheck and update a book’s availability after updates
* Keep system state consistent without requiring manual logic in controllers

Adds reactivity to data changes and improves system automation.

---

### ✅ Filter, Sort, and Paginate Book Lists

Supports query parameters for:

* Filtering by genre or other fields
* Sorting results (e.g., by title, creation date)
* Paginating large result sets with `limit`

This allows frontend clients to build fast, responsive, and user-friendly interfaces.

---

### ✅ Centralized and Consistent Error Format

All error responses follow a standardized JSON structure:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```

Makes debugging easier and ensures predictable behavior for API consumers.

## 🔧 Installation & Setup

1. **Clone the repository:**

   ```bash
   gh repo clone sakibkst/b5a3-library-management-expressjs
   
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables (.env):**

   ```
   PORT=5000
   DATABASE_URL=mongodb+srv://mongodb:mongodb@cluster0.stxehrm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

---

## 🔁 API Endpoints

### 1. 📘 Create a Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "FICTION",
  "isbn": "97805533801636757",
  "description": "An overview of cosmology and black holes.",
  "copies": 50,
  "available": true
}
```

---

### 2. 📚 Get All Books

**GET** `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

Supports:

* Filter by genre
* Sorting (ascending/descending)
* Pagination (`limit`)

---

### 3. 📖 Get Book by ID

**GET** `/api/books/:bookId`

---

### 4. ✏️ Update a Book

**PUT** `/api/books/:bookId`

```json
{
  "copies": 50
}
```

---

### 5. 🗑️ Delete a Book

**DELETE** `/api/books/:bookId`

---

### 6. 📦 Borrow a Book

**POST** `/api/borrow`

**Business Logic:**

* Checks if the book exists and has enough available copies
* Deducts borrowed quantity
* Marks `available: false` if all copies are borrowed (via static method)

**Request Body:**

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

### 7. 📊 Borrow Summary Report

**GET** `/api/borrow`

**Response Example:**

```json
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]
```

---

## ❌ Error Handling

Consistent error response format across the API:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```

---

## 🧠 Bonus Functionalities

* 🔍 `pre('save')` middleware to log borrow transactions
* 🧮 Static method to auto-update book availability
* ✅ Strong validation on all fields
* 🔀 Clean, modular file structure for scalability
* 💻 Typed and organized codebase using TypeScript

---

## 🎥 Demo Video
https://drive.google.com/file/d/1zdrVoQaZN2twt5Loac2rVIHed0o5WYND/view?usp=sharing

---

## 👨‍💻 Author
sakib
sakibkst38@gmail.com
---
