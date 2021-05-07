# Temporary Data

This directory contains mock JSON data that would typically be sent through HTTP requests by the client to the server API. These are to eventually be replaced by actual data from a database.

## User Courses
- `join.json` - req.body for the "/join" POST route
- `create.json` - req.body for the "/create" POST route

## Users
- `users_register.json` - req.body for the "/register" POST route
- `users_login.json` - req.body for the "/login" POST route

## Courses
- `courses_user.json` - return value of the "/courses" GET route
- `courses_show.json` - return value of the "/courses/:courseID" GET route

## Bookmarks
- `bookmarks_add.json` - req.body for the "/bookmarks" POST route
- `bookmarks_delete.json` - req.body for the "/bookmarks" DELETE route

## Posts
- `posts_add.json` - req.body for the "/posts" POST route
- `posts_edit.json` - req.body for the "/posts" PATCH route
- `posts_delete.json` - req.body for the "/posts" DELETE route

## Comments
- `comments_add.json` - req.body for the "/comments" POST route
- `comments_edit.json` - req.body for the "/comments" PATCH route
- `comments_delete.json` - req.body for the "/comments" DELETE route