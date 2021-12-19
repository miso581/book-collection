# Simple RESTful API server in Node.js for the book collection app

The API is hosted at: https://my-book-collection-api.herokuapp.com/

## Assignment

Create a simple RESTful API server in Node.js for the book collection app. Each book has a title, description, and 1-n authors. Created API endpoints should allow search in collection and book management.

## Chosen tools, framework, and database:

### Node.js

Requirement from the assignment.

### Express.js

Is a Node.js framework characterized by its simplicity, minimalism, flexibility, scalability, and performance. Most of the time it is a framework of choice for Node.js, to the point that often when people talk about Node.js they mean Node.js + Express.js.

I chose this framework because of its characteristics, ease of use, good maintenance, popularity, and previous experience. Also, it allows for designing and building web applications quickly and easily with the use of JavaScript. It also provides a middleware that is responsible for making decisions to give the correct responses to the requests.

### MongoDB

Choosing the right DB for a project is important since the decision needs to be made in the early stages of the development and the later switch to a different DB is costly, especially timewise.

In this assignment, both SQL and NoSQL DBs would do the job well, and it does not matter that much which one is chosen. My choice, however, was a NoSQL DB - MongoDB. The reason for choosing NoSQL DB is the faster development and easier prototyping. Also, I wanted to challenge myself, since I'm using SQL DBs almost daily and wanted to get back to NoSQL DB. However, if this API was to be further expanded and used in production, I would probably choose with SQL DB.

MongoDB was chosen as a NoSQL DB, mainly for its easy deployment on the cloud, data structure, and previous experience. Also, it fits well the already chosen Express.js and Node.js in the MEAN stack.

### Mongoose

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. The reason for choosing ODM is that it manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB so that I could think in terms of JavaScript objects rather than database semantics.

### dotennv

dotenv is a lightweight npm package that loads environment variables from a .env file into the process.env. It is convenient to use and allows storing configurations in the environment separate from code. It is useful when the codebase is shared, so e.g. credentials are kept secret.

### nodemon

Used as dev dependency to automatically restart the Node.js server when a file in the codebase is saved.

## REST API endpoints

The API is hosted at: https://my-book-collection-api.herokuapp.com/

### Book resource

| Operation | Route      | Comment                              |
| --------- | ---------- | ------------------------------------ |
| GET       | /books     | Get all books. Supports query params |
| GET       | /books/:id | Get a specific book                  |
| DELETE    | /books/:id | Delete a specific book               |
| POST      | /books     | Create a new book                    |
| PATCH     | /books/:id | Update a specific book               |

### Author resource

| Operation | Route        | Comment                                |
| --------- | ------------ | -------------------------------------- |
| GET       | /authors     | Get all authors. Supports query params |
| GET       | /authors/:id | Get a specific author                  |
| DELETE    | /authors/:id | Delete a specific author               |
| POST      | /authors     | Create a new author                    |
| PATCH     | /authors/:id | Update a specific author               |

## Mongoose models

### Book

| Field       | Data type                | Required |
| ----------- | ------------------------ | -------- |
| title       | String                   | true     |
| description | String                   | true     |
| author      | [ObjectId], ref - Author | true     |

### Author

| Field     | Data type | Required |
| --------- | --------- | -------- |
| firstName | String    | true     |
| lastName  | String    | true     |
