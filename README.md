# React + TypeScript + Vite + Redux

# Book Catelog Project

## Live Server Link [backend]

[https://bookify-server-puxagxrg7-abir14016.vercel.app/](https://bookify-server-puxagxrg7-abir14016.vercel.app/)

## Live Website Link [frontend]

[https://booki-fy.netlify.app/](https://booki-fy.netlify.app/)

# Bookify API Documentation

The Bookify API provides endpoints for managing books, user accounts, wishlists, and reading lists.

## Base URL

`https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/`

## Authentication

All requests require authentication using a JWT token. Include the token in the `Authorization` header of the request:

```http
Authorization: Bearer <JWT_TOKEN>

# API Documentation

## Endpoints

### Books

- **Get All Books**
GET /books

Get a list of all books.

- **Get Book Details**
GET /books/:id

Get details of a specific book by its ID.

- **Get Latest Books**

Sure, here's the provided endpoint documentation formatted as code using Markdown:

markdown
Copy code
# API Documentation

## Endpoints

### Books

- **Get All Books**
GET /books

Get a list of all books.

- **Get Book Details**
GET /books/:id


Get details of a specific book by its ID.

- **Get Latest Books**
GET /books?limit=10

Get the latest 10 books.

### Users

- **Sign Up User**
POST /users/signup

Sign up a new user.

- **Sign In User**
POST /auth/signin

Sign in an existing user.

### Reviews

- **Add/Update Review**
PATCH /books/review/:id

Add or update a review for a specific book by its ID.

### Wishlist

- **Add to Wishlist**
POST /wishlist/add-to-wishlist

Add a book to the user's wishlist.

- **Add to Reading List**
POST /wishlist/add-to-reading-list

Add a book to the user's reading list.

- **Remove from Wishlist**
DELETE /wishlist/remove-from-wishlist

Remove a book from the user's wishlist.

- **Mark as Completed**
PATCH /wishlist/my-reading-list/mark-as-read

Mark a book as completed in the user's reading list.

- **Get Wishlist**
GET /wishlist/my-wishlist

Get the user's wishlist.

- **Get Reading List**
GET /wishlist/my-reading-list

Get the user's reading list.

- **Get Completed List**
GET /wishlist/my-completed-list

Get the user's completed reading list.





```
