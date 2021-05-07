# Temporary Data

This directory contains mock JSON data that would typically be sent through HTTP requests by the client to the server API. These are to eventually be replaced by actual data from a database.

```
// Sample import
const data = require("../data/temp/data.json")

// Sample usage (user registration)
req.body = data.users.register; // temp data
const data = req.body;
addUser(data) // db helper function

// Sample usage (user course enrolment)
req.body = data.index.join; // temp data
const accessCode = req.body.access_code;
addUserCourse(userID, accessCode) // userID is from server cookies
```

## Client to server requests

### User Courses
- `data.index.join` - req.body for the "/join" POST route
- `data.index.create` - req.body for the "/create" POST route

### Users
- `data.users.register` - req.body for the "/register" POST route
- `data.users.login` - req.body for the "/login" POST route

### Bookmarks
- `data.bookmarks.add` - req.body for the "/bookmarks" POST route
- `data.bookmarks.delete` - req.body for the "/bookmarks" DELETE route

### Posts
- `data.posts.add` - req.body for the "/posts" POST route
- `data.posts.edit` - req.body for the "/posts" PATCH route

### Comments
- `data.comments.add` - req.body for the "/comments" POST route
- `data.comments.edit` - req.body for the "/comments" PATCH route

## Server to client responses

### Courses
- `data.courses.user` - return value of the "/courses" GET route
- `data.courses.show` - return value of the "/courses/:courseID" GET route