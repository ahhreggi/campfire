# Routes

## **Frontend (React)**

## Index

```
Route: "/"
Description:
- landing page
- has a brief description of what the site is
- Get Started button
	- redirects to login (if not logged in)
	- redirects to a page w/ two panels: Join a course | Create a course
```

## Courses

```
Route: "/join"
Description:
- displays a form to join an existing course via access code
```

```
Route: "/create"
Description:
- displays a form to create a new course
```

```
Route: "/courses/:id"
Description:
- the main course page (dashboard/index)
- displays various panels
- for students & instructors:
	- displays the course home page
	- welcome back, new posts since last login, etc.
	- analytics (top contributions, trending discussions?)
- for instructors:
	- displays student & instructor access codes
	- displays getting started tips (form create a new tag)
```

## Posts

```
Route: "/courses/:id/posts/:postid"
Description:
- displays one specific post on the Main component
- displays all of a post's comments
```

## Users

```
Route: "/register"
Description:
- displays a form to register a new user account
- form fields: for first_name, last_name, email, password
```

```
Route: "/login"
Description:
- displays a form to login to an existing user account
- form fields: email, password
- stretch: remember the username
```

---

## **Backend (Server API)**

## User Courses

---

### Route: "/join"

- Method: POST
- Purpose: Enrols a user in a course
- Checks:
  - 1: user must be logged in (check cookie)
    - 401: unauthorized
  - 2: access code must exist && course is active (check database via query)
  - display an error
  - 3: user must not already be enrolled
  - if the user is enrolled, return a json payload that instructs the client to redirect
- req.body: access_code
- Successful response: insert user into user_courses, return a json payload that instructs the client to redirect to the course page

---

### Route: "/create"

- Method: POST
- Purpose: Creates a new course
- Checks:
  - 1: user must be logged in (check cookie)
    - 401: unauthorized
  - 2: form is complete
- req.body: name, description (optional)
- if successful:
  - insert course into courses
    - generate a student_access_code
    - generate an instructor_access_code
    - ensure that the access codes are unique before inserting
    - access codes should be 12 chars with a mix of numbers, lower/uppercase letters
    - access codes must be case sensitive
  - insert user into user_courses with permissions_id = 1 (instructor)
  - return a json payload that instructs the client to redirect to the course page > dashboard/admin panel

---

## Users

---

### Route: "/register"

- Method: POST
- Purpose: Creates a new user account
- Checks:
  - 1: user must not already be logged in (check cookie)
  - 2: check that the form is complete and valid (password = password confirmation)
  - 3: check that the email is not taken
- if successful:
  - insert new user into users table
  - redirect to user dashboard (/courses)

---

### Route: "/login"

- Method: POST
- Purpose: Logs in to an existing user account
- Checks:
  - 1: user must not already be logged in (check cookie)
  - 2: check that the form is complete
- if successful:
  - authenticate by attempting to fetch user data
  - if no user data is received due to incorrect password, show an error
  - if user data is received, redirect to user dashboard (/courses)

---

## Courses

### Route: "/courses"

- Method: GET
- Purpose: Fetches an array of courses for App component
- Description: get a list of course ids that the user is a member of (user_courses table) => via cookie
- helper function name: `getCoursesForUser(userId)`
- returns:

```js
[
  {
    id: 1,
    name: "JS for Beginners",
    created_at: "2021-05-08T14:49:03.213Z",
    archived: false,
    role: "owner",
  },
];
```

---

### Route: "/courses/:courseID" => App

- Method: GET
- Purpose: Fetches specific course data for App component
- Checks:
  - 1: user must be logged in (check cookie)
  - 2: user must be enrolled (query on user_courses)
    - if unauthorized, return 401
  - 3: if the user is an instructor, owner, or admin, append extra data that is visible to instructors only
    - secrets: { access codes }
    - anonymous author names/avatars
- get specific course data that is fetched at all times
  - all of a course's posts
  - all of a course's posts' comments & their replies
  - helper function name: `getCourseById(courseId, userId)`
- example return (for admin user, ie. anonymous users are still visible):

```js
{
  "id": 1,
  "name": "JS for Beginners",
  "description": "Introduction to core JavaScript concepts",
  "archived": false,
  "analytics": {
      // TODO: avg_response_time
      "user_count": "4",
      "total_posts": "2",
      "total_comments": "5",
      "num_unresolved_questions": "1",
      "num_resolved_questions": "1"
  },
  "secrets": {
      "student_access_code": "111111",
      "instructor_access_code": "222222"
  },
  "tags": [
      {
          "id": 1,
          "name": "Callbacks"
      }
  ],
  "posts": [
      {
          "id": 1,
          "title": "How do I use a promise?",
          "body": "I am using a new library that returns a Promise object instead of a callback... how do I act on it once its done?",
          "bookmarked": false,
          "created_at": "2021-05-08T14:49:03.213Z",
          "last_modified": "2021-05-08T14:49:03.213Z",
          "best_answer": 2,
          "author_first_name": "Edward",
          "author_last_name": "Ecksworth",
          "author_avatar_url": null,
          "pinned": false,
          "views": null,
          "anonymous": false,
          "role": "student",
          "user_id": 5,
          "editable": true,
          "tags": [
              {
                  "id": 3,
                  "name": "Promises"
              }
          ],
          "comments": [
              {
                  "id": 2,
                  "post_id": 1,
                  "anonymous": false,
                  "author_first_name": "Fiona",
                  "author_last_name": "Ford",
                  "author_avatar_url": null,
                  "body": "You can consume a promise by calling .then() on it! Be sure to use .catch() as well in case of errors.",
                  "score": "3",
                  "created_at": "2021-05-08T14:49:03.213Z",
                  "last_modified": "2021-05-08T14:49:03.213Z",
                  "endorsed": true,
                  "role": "student",
                  "user_id": 6,
                  "editable": true,
                  "replies": [
                      {
                          "id": 4,
                          "parent_id": 2,
                          "anonymous": false,
                          "author_first_name": "Edward",
                          "author_last_name": "Ecksworth",
                          "body": "Thanks for this!!",
                          "created_at": "2021-05-08T14:49:03.213Z",
                          "last_modified": "2021-05-08T14:49:03.213Z",
                          "role": "student",
                          "user_id": 5,
                          "editable": true
                      }
                  ]
              },
              {
                  "id": 6,
                  "post_id": 1,
                  "anonymous": false,
                  "author_first_name": "Aaron",
                  "author_last_name": "Aldridge",
                  "author_avatar_url": null,
                  "body": "Be sure to check out Promise.resolve and Promise.reject as well for more info.",
                  "score": "0",
                  "created_at": "2021-05-08T14:49:03.213Z",
                  "last_modified": "2021-05-08T14:49:03.213Z",
                  "endorsed": false,
                  "role": "admin",
                  "user_id": 1,
                  "editable": true,
                  "replies": []
              },
              {
                  "id": 1,
                  "post_id": 1,
                  "anonymous": true,
                  "author_first_name": "Edward",
                  "author_last_name": "Ecksworth",
                  "author_avatar_url": null,
                  "body": "I had the same question!",
                  "score": "0",
                  "created_at": "2021-05-08T14:49:03.213Z",
                  "last_modified": "2021-05-08T14:49:03.213Z",
                  "endorsed": false,
                  "role": "student",
                  "user_id": 5,
                  "editable": true,
                  "replies": []
              }
          ]
      }
  ]
}
```

---

## Bookmarks

---

### Route: "/bookmarks"

- Method: POST
- Purpose: Add a post to a user's bookmarks
- helper function name: `addBookmark(user_id, post_id)`

---

### Route: "/bookmarks/:postID"

- Method: DELETE
- Purpose: Remove a post from a user's bookmarks
- helper function name: `deleteBookmark(user_id, post_id)`

---

## Posts

---

### Route: "/posts"

- Method: POST
- Purpose: Add a post
- helper function name: `addPost(data)`
  - `data = { user_id, course_id, title, body, anonymous, tags }`

---

### Route: "/posts/:postID"

- Method: PATCH
- Purpose: Edit a post
- helper function name: `updatePost(data)`

  ```js
  data = {
    post_id,
    title,
    body,
    anonymous,
    tags,
    action: ["mod", "ans", "pin"],
    pinned: boolean,
    last_modified: string,
    best_answer: int,
  };
  ```

- last_modified - update this to "now" only if type = "mod"
- best_answer = update this to the given id only if type = "ans"
- pinned - update this to !pinned if action: "pin" and the user making the req is an instructor

---

### Route: "/posts/:postID"

- Method: DELETE
- Purpose: Delete a post
- check 1: check that the user owns the post OR is an instructor
- helper function name: `deletePost(postID)`

---

## Comments

---

### Route: "/comments"

- Method: POST
- Purpose: Add a comment to a post
- helper function name: `addComment(formData)`
- `formData = { user_id, post_id, body, parent_id, anonymous, ... }`

---

### Route: "/comments/:commentID"

- Method: PATCH
- Purpose: Edit a comment of a post
- helper function name: `updateComment(data)`
- `data = { user_id, post_id, body, parent_id, anonymous, last_modified ... }`
- last_modified should be set to "now" on the server-side during update

---

### Route: "/comments/:commentID"

- Method: DELETE
- Purpose: Delete a comment from a post
- check 1: check that the user owns the comment OR is an instructor
- helper function name: `deleteComment(commentID)`

---
