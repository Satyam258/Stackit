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
