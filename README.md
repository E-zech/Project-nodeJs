# Project Name: NodeJs + MongoDB

## Introduction

To begin, refer to the API Documentation URL (https://documenter.getpostman.com/view/28292545/2s9Yyqi2gL#a1f74c42-b8b7-4fdb-a62f-d434a166de38) 
for comprehensive information on user authentication and card management. This project focuses on users and cards, ensuring that only authorized users can utilize CRUD (Create, Read, Update, Delete) functionality within the application.

## User Authentication

The app utilizes JWT (JSON Web Tokens) for secure and efficient user authentication. Upon successful login, users receive a unique token that enables them to perform actions within the app. This token carries information about the user's authorization level (user, business, admin), facilitating personalized experiences and access to specific functionalities.

## Account Management

After successful login, users can modify and update their profile information, including name, email, phone, and profile picture. Users also have the authority to adjust their authorization level, transitioning from a standard user to a business user with card creation privileges. Additionally, users retain autonomy to delete their accounts, providing a user-centric approach to account management.

## Cards

### Cards Creation

Exclusive to registered business users, card creation requires a business authorization level. Each card serves as a comprehensive representation of a business, including vital information such as title, description, email, phone, image, and more.

### Card Management

Owners of cards have exclusive authority to edit and modify their respective cards. Each card is assigned a unique BizNumber, automatically generated within the app. This number remains constant, with only the admin having the privilege to alter it, ensuring a secure and immutable identifier for each business.

### Card Access

Any user, whether registered or not, can access all cards or retrieve a specific card using its unique identifier (ID). This inclusive approach allows users to explore diverse offerings showcased on the platform.

### User Interaction

Registered users can express appreciation for a card by liking or unliking it.

### Card Deletion

Only the admin or the owner of a card holds the authority to delete a card. This ensures that the removal of a business representation is managed by those directly involved in its creation and administration.

## Technologies and Libraries

The backend of this project is developed using the following technologies and libraries:

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express:** A minimal and flexible Node.js web application framework.
- **Mongoose:** An elegant MongoDB object modeling tool designed to work in an asynchronous environment.
- **bcrypt:** A library for hashing passwords.
- **chalk:** A library for styling terminal strings with ANSI escape codes.
- **cors:** A middleware for enabling Cross-Origin Resource Sharing in the Express.js framework.
- **dotenv:** A zero-dependency module that loads environment variables from a .env file.
- **joi:** A powerful schema description language and data validator for JavaScript objects.
- **jsonwebtoken:** A library to generate and verify JSON Web Tokens (JWT).
- **moment:** A library for parsing, validating, manipulating, and formatting dates.
- **morgan:** A HTTP request logger middleware for Node.js.
