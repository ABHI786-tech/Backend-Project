# Backend-Project

This is a backend project designed to manage users and employees. It provides secure APIs for authentication and employee management.
                 The goal of this project is to create a secure, scalable, and maintainable backend API for 
managing employees and users. It provides features such as user registration, login, password management, and employee CRUD operations. The backend is built using Node.js, Express, and MongoDB, making it highly efficient and flexible. It can be easily integrated with any frontend application.
<hr>

## CRUD functionality

This backend project provides full CRUD functionality for managing employees. Users can create new employee records by providing necessary details such as name, age, and gender. They can read all employee data or retrieve details of a specific employee. The API also allows users to update employee information whenever changes are needed, and to delete employee records when they are no longer required. This makes the system efficient, flexible, and easy to maintain, providing a complete solution for employee management.


## Authentication

#### 1. User Registration (Sign Up)

1. Users can register by providing their **firstname, email, and password**.
2. Passwords are securely hashed using bcrypt before storing in the database.


#### 2. User Login (Sign In)

1. Registered users can log in with their email and password.
2. The backend verifies credentials and can optionally provide a JWT token for session management.

#### 3. Password Management

**Forgot Password:** Users can request a password reset link via email.
**Reset Password:** Users can set a new password securely using the reset token.

#### 4. Secure Access

Only authenticated users can perform sensitive operations like **creating, updating, or deleting employee records**.