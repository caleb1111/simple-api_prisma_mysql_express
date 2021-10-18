# A Simple REST API

This is a simple REST API using [Prisma](https://www.prisma.io/), [MySQL](https://www.mysql.com/), and [Express.js](https://expressjs.com/)

>   Npm packages: (nodemon, prisma, @prisma/client, express)

This little project demonstrates the basic use of Prisma&MySQL.

## To start

-   Install the node_modules using the following command:

```bash
npm install
```

-   To run the app

```bash
npm run dev
```

>   The port is set to http://localhost:5000

### The database contains two tables: 

 - Users (<u>id</u>, username, age, email, address, post)
    	- id - Int <- primary key, unique, autoincrement
    	- username - String <- unique
    	- age - Int 
    	- emial - String <- unique
    	- address - String
 - Posts (<u>id</u>, title, post, created_at, updated_at, user_id)
    	- id - Int <- primary key, unique, autoincrement
    	- title - String
    	- post - String
    	- created_at - DateTime <- @default(now())
    	- updated_at - DateTime <- @updatedAt
    	- user_id - Int <- foreign key

>   **User_id** is a foreign key in the Posts table and a primary key in Users table. 
>
>   It connects the Users table and the Posts table.

### It has basic CRUD operations

-   Users:
    -   Create/Post a new user
    -   Read/Get all users from the User table
    -   Read/Get a specific user from the User table using user id
    -   Update/Put user's information given user id
    -   Delete a user from the table given user id
-   Posts:
    -   Create/Post a new post given user id
    -   Read/Get all the posts from the Posts table
    -   Read/Get posts of a specific user from the Posts table given user id
    -   Read/Get a specific post given the post id
    -   Update/Put a post given post id
    -   Delete a post given post id

## Available Methods

-   Users

    -   POST `/api/user`  - Create a new user

        -   Request Body: 

            ```json
            {
                "username": "John Doe",
                "email": "jdoe@test.com",
                "age": 53,
                "address": "a random place"
            }
            ```

        -   Response:

            -   Status code: 201
            -   Body: 

            ```js
            { msg: `New user ${username} created!` }
            ```

    -   GET `/api/user` - Get all users

        -   Request Body:  N/A
        -   Response:
            -   Status code: 200
            -   Body: all users from the Users table

    -   GET `/api/user/:id` - Get a specific user

        -   Request Body:  N/A
        -   Response:
            -   Status code: 200
            -   Body: the user with given id

    -   PUT `/api/user/:id` - Update a specific user's information

        -   Request Body:

            ```json
            {
                "username": "John Doee",
                "email": "jdoee@test.com",
                "age": 53,
                "address": "a random place"
            }
            ```

            >   Note: the username and the email must be unique

        -   Response:

            -   Status code: 206

            -   Body: 

                ```js
                {msg: `User ${username} updated!`}
                ```

    -   DELETE `/api/user/:id` - Delete a specific user

        -   Request Body:  N/A

        -   Response:

            -   Status code: 200

            -   Body: 

                ```js
                {msg: `User ${username} deleted!`}
                ```

-   Posts
    -   POST `/api/post/user/:id` - Create a post given user's id

        -   Request Body: 

            ```json
            {
                "title": "Post Title",
                "post": "Post content here"
            }
            ```

        -   Response:

            -   Status code: 201

            -   Body: 

                ```json
                {msg: `${username} posted a new post ${newPost.id}`}
                ```

    -   GET `/api/post` - Get all posts

        -   Request Body:  N/A
        -   Response:
            -   Status code: 200
            -   Body: all the posts from the Posts table

    -   GET `/api/post/user/:id` - Get all posts of a specific user

        -   Request Body:  N/A
        -   Response:
            -   Status code: 200
            -   Body: all the posts of the user with the given id

    -   GET `/api/post/:id` -  Get a sepcific post

        -   Request Body:  N/A
        -   Response:
            -   Status code: 200
            -   Body: the post json object {"title": "post title", "post": "post content"}

    -   PUT `/api/post/:id` -  Update a post

        -   Request Body: 

            ```json
            {
                "title": "Updated Post Title",
                "post": "Updated Post content here"
            }
            ```

        -   Response:

            -   Status code: 205
            -   Body: the updated post json object

    -   DELETE `/api/post/:id` - Delete a post

        -   Request Body:  N/A

        -   Response:

            -   Status code: 200

            -   Body: 

                ```json
                {msg: `Post ${deletedPost.id} deleted!`}
                ```

### A postman schema is provided which can be used to test the operations

-   Simply import the `UserPostPrisma.postman_collection.json` in the postman
-   Some basic postman tests are provided
    -   Test status code
    -   Test Response body

### A database file is also provided

-   Simply import the `/database/Dump20211018.sql` in MySQLWorkbench

### Some Prisma CLI

-   To update MySQL database when there is a change in `schema.prisma`, simply run the follow command:

```bash
npx prisma migrate dev --name init 
```

Read More [here](https://www.prisma.io/docs/concepts/components/prisma-migrate)

### To see the database - Open the Prisma Studio 

```bash
npx prisma studio       
```

### or open MySQLWorkbench