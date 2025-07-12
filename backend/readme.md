# Auth Routes

## Register a New User

POST /auth/register

Registers a new user and returns a token.

Sample Request Body:

    {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePassword123"
    }

## Login

POST /auth/login

Logs in an existing user and returns a JWT token.

Sample Request Body:

        {
        "email": "john@example.com",
        "password": "securePassword123"
        }

# User Routes

## Get Current User Profile

GET /users/me
Requires: Bearer Token in header

Headers:
Authorization: Bearer <jwt_token>

## Get User by ID

GET /users/:userId

Returns the public profile of a user.
Example:
GET /users/64f293b10f6d2d6c7fa0a7a1

## Update Logged-in User Profile

PATCH /users/me
Requires: Bearer Token

Sample Body:

        {
        "username": "johnny_updated",
        "email": "johnny@example.com"
        }

## Update User Proficiencies

PATCH /users/me/proficiencies
Requires: Bearer Token
(Useful to associate user skills with tags)

Sample Body:

        {
        "proficiencies": [
        {
        "tag": "64f29aa8fc13ae2a7e000003",
        "level": "expert"
        },
        {
        "tag": "64f29aa8fc13ae2a7e000004",
        "level": "intermediate"
        }
        ]
        }


# Notification API Documentation

## Create Notification
POST /

Creates a new notification (used internally when someone comments, answers, etc.).

 Request Body

    {
    "recipient": "64f291c09fcd3b2a4c9ab123",
    "type": "answer",
    "message": "Alice answered your question on Node.js",
    "link": "/questions/64f5c2e98a3d12e1cd99ab88#answer64f5c331"
    }

## Get Logged-in User's Notifications
GET /

Fetches all notifications for the authenticated user, sorted by createdAt descending.

Response

    {
    "notifications": [
        {
        "_id": "64f8d6a4fc13ae456789abcd",
        "recipient": "64f291c09fcd3b2a4c9ab123",
        "type": "answer",
        "message": "Alice answered your question on Node.js",
        "link": "/questions/64f5c2e98a3d12e1cd99ab88#answer64f5c331",
        "isRead": false,
        "createdAt": "2025-07-12T12:30:00.000Z"
        }
    ]
    }


## Mark Notification as Read
PATCH /:notificationId/read

Marks a specific notification as read.

 Example URL

     PATCH /64f8d6a4fc13ae456789abcd/read

##  Delete Notification
DELETE /:notificationId

Deletes a specific notification.

 Example URL

    DELETE /64f8d6a4fc13ae456789abcd


