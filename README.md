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

## Folder Structure

The backend codebase is organized using the following folder structure:

1. **configs**
   - `config.js`: Configuration file for general application settings.
   - `contentConfig.js`: Configuration for content handling.
   - `morganConfig.js`: Configuration for Morgan, the HTTP request logger middleware.

2. **handlers**
   1. **card**
      - `changeBizNumber.js`: Handler for changing the BizNumber of a card.
      - `createCard.js`: Handler for creating a new card.
      - `deleteCard.js`: Handler for deleting a card.
      - `editCard.js`: Handler for editing a card.
      - `getAllCards.js`: Handler for retrieving all cards.
      - `getCard.js`: Handler for retrieving a specific card.
      - `getMyCards.js`: Handler for retrieving cards associated with the logged-in user.
      - `likeCard.js`: Handler for liking/unliking a card.

   2. **user**
      - `changeBusiness.js`: Handler for changing a user's business status.
      - `deleteUser.js`: Handler for deleting a user.
      - `editUser.js`: Handler for editing a user's profile.
      - `getAllUsers.js`: Handler for retrieving all users.
      - `getUser.js`: Handler for retrieving a specific user.
      - `login.js`: Handler for user login.
      - `signup.js`: Handler for user signup.

3. **initial-data**
   - `initial-data.js`: Script for initializing the application with initial data.
   - `initial-dataJSON.js`: Script containing initial data in JSON format.

4. **logs**
   - Log files created when the status code is >= 400.

5. **middleware**
   - `guard.js`: Middleware for guarding routes based on user authentication.
   - `logMiddleware.js`: Middleware for logging requests.

6. **models**
   1. **shared**
      - `Address.js`: Shared model for representing addresses.
      - `Image.js`: Shared model for representing images.
      - `Name.js`: Shared model for representing names.

   2. **card**
      - `Card.js`: Model for representing card data.

   3. **user**
      - `User.js`: Model for representing user data.

7. **public**
   - `keyFrames.css`: CSS file for keyframe animations.
   - `page404.css`: CSS file for styling the 404 error page.
   - `page404.html`: HTML file for the 404 error page.

8. **routes**
   - `cardRoutes.js`: Route handler pointing to all files in `handlers/card` directory.
   - `userRoutes.js`: Route handler pointing to all files in `handlers/user` directory.

9. **validation**
   - `cardJoi.js`: Validation schema for card-related data using Joi.
   - `userJoi.js`: Validation schema for user-related data using Joi.

10. `.env`: Configuration file for environment variables.
11. `index.js`: The main entry point of the application.
