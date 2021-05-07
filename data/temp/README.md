# Temporary Data

This directory contains mock JSON data that would typically be sent through HTTP requests by the client to the server API. These are to eventually be replaced by actual data from a database.

```
// Sample import
const data = require("../data/temp/data.json")
```

## User Courses
- `index.join` - req.body for the "/join" POST route
- `index.create` - req.body for the "/create" POST route

## Users
- `users.register` - req.body for the "/register" POST route
- `users.login` - req.body for the "/login" POST route

## Courses
- `courses.user` - return value of the "/courses" GET route
- `courses.show` - return value of the "/courses/:courseID" GET route

## Bookmarks
- `bookmarks.add` - req.body for the "/bookmarks" POST route
- `bookmarks.delete` - req.body for the "/bookmarks" DELETE route

## Posts
- `posts.add` - req.body for the "/posts" POST route
- `posts.edit` - req.body for the "/posts" PATCH route
- `posts.delete` - req.body for the "/posts" DELETE route

## Comments
- `comments.add` - req.body for the "/comments" POST route
- `comments.edit` - req.body for the "/comments" PATCH route
- `comments.delete` - req.body for the "/comments" DELETE route