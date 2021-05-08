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

## **Backend (Server API)**

## User Courses

```
Route: "/join"
Method: POST
Purpose: Enrols a user in a course
Description:
- check 1: user must be logged in (check cookie)
	- 401: unauthorized
- check 2: access code must exist && course is active (check database via query)
	- display an error
- check 3: user must not already be enrolled
	- if the user is enrolled, return a json payload that instructs the client to redirect
- if successful: insert user into user_courses, return a json payload that instructs the client to redirect
- req.body: access_code
```

```
Route: "/create"
Method: POST
Purpose: Creates a new course
Description:
- check 1: user must be logged in (check cookie)
	- 401: unauthorized
- check 2: check that form is complete
- if successful:
	- insert course into courses
		- generate a student_access_code
		- generate an instructor_access_code
		- ensure that the access codes are unique before inserting
		- access codes should be 12 chars with a mix of numbers, lower/uppercase letters
		- access codes must be case sensitive
	- insert user into user_courses with permissions_id = 1 (instructor)
	- return a json payload that instructs the client to redirect to the course page > dashboard/admin panel
- req.body: name, description (optional)
```

## Users

```
Route: "/register"
Method: POST
Purpose: Creates a new user account
Description:
- check 1: user must not already be logged in (check cookie)
- check 2: check that the form is complete and valid (password = password confirmation)
- check 3: check that the email is not taken
- if successful:
	- insert new user into users table
	- redirect to user dashboard (/courses)
```

```
Route: "/login"
Method: POST
Purpose: Logs in to an existing user account
Description:
- check 1: user must not already be logged in (check cookie)
- check 2: check that the form is complete
- if successful:
	- authenticate by attempting to fetch user data
	- if no user data is received due to incorrect password, show an error
	- if user data is received, redirect to user dashboard (/courses)
```

## Courses

```
Route: "/courses"
Method: GET
Purpose: Fetches an array of courses for App component
Description:
- get a list of course ids that the user is a member of (user_courses table) => via cookie
	- helper function name: getCoursesByUserID(userID)
	[
		{
			id: 123,
			name: "Web Dev - Mar 1",
			created_at,
			active
		}
	]
```

```
Route: "/courses/:courseID" => App
Method: GET
Purpose: Fetches specific course data for App component
Description:
- check 1: user must be logged in (check cookie)
- check 2: user must be enrolled (query on user_courses)
	- if unauthorized, return 401
- get specific course data that is fetched at all times
	- all of a course's posts
	- all of a course's posts' comments & their replies
	- helper function name: getCourseDataByID(courseID)
	{
		id: 3012021,
		name,
		description,
		archived,
		analytics: {
			user_count,
			average_response_time, // TODO
			total_posts,
			total_contributions (count all comments),
			num_unresolved_questions,
			num_resolved_questions
		},
		secrets: { // this object is only provided if the req is made by an instructor
			student_access_code,
			instructor_access_code
		},
		tags: [
			{
				id,
				name
			}
		],
		posts: [
			{
				id
				title
				body
				bookmarked: boolean // based on current user_id from cookie
				created_at
				last_modified
				best_answer
				author_first_name: users.first_name or undefined (if posts.anonymous = true)
        author_last_name: users.last_name or undefined (if posts.anonymous = true)
        author_avatar_url: users.avatar_url or undefined (if posts.anonymous = true)
        role: // student/instructor/owner
        user_id:
        editable: // boolean: if current user has permission to edit/delete this
				tags: [
					{
						id,
						name
					}
				]
				pinned
				views
				comments: [
					{
						id
						anonymous
						author_first_name: users.first_name or undefined (if posts.anonymous = true)
            author_last_name: users.last_name or undefined (if posts.anonymous = true)
						author_avatar_url: users.avatar_url or undefined (if posts.anonymous = true)
						body
						score: count comment_likes for this comment_id
						created_at
						last_modified
						endorsed: boolean (true if there is an entry in the comment_endorsements table for this comment_id)
            role: // student/instructor/owner
            user_id:
            editable: // boolean: if current user has permission to edit/delete this
						replies: [
							{
								id
								anonymous
                author_first_name: users.first_name or undefined (if posts.anonymous = true)
                author_last_name: users.last_name or undefined (if posts.anonymous = true)
								author_avatar_url: users.avatar_url or undefined (if posts.anonymous = true)
								body
								created_at
								last_modified
                role: // student/instructor/owner
                user_id:
                editable: // boolean: if current user has permission to edit/delete this
							}
						]
					}
				]
			}
		]
  }
- check 3: if the user is an instructor, append extra data that is visible to instructors only
	- secrets: { access codes }
```

## Bookmarks

```
Route: "/bookmarks"
Method: POST
Purpose: Add a post to a user's bookmarks
Description:
  - helper function name: addBookmark(user_id, post_id)
Database:
  from cookies: user_id
  req.body: post_id
  auto: id, last_visited
```

```
Route: "/bookmarks/:postID"
Method: DELETE
Purpose: Remove a post from a user's bookmarks
Description:
  - helper function name: deleteBookmark(user_id, post_id)
Database:
  from cookies: user_id
```

## Posts

```
Route: "/posts"
Method: POST
Purpose: Add a post
Description:
  - helper function name: addPost(data)
  - data = { user_id, course_id, title, body, anonymous, tags }
Database:
  from cookies: user_id
  from req.body: course_id, title, body, anonymous, tags (array of tag IDs)
  server-side:
  auto: id, created_at, last_modified, active
```

```
Route: "/posts/:postID"
Method: PATCH
Purpose: Edit a post
Description:
  - helper function name: updatePost(data)
  - data = { post_id, title, body, anonymous, tags, action: ["mod", "ans", "pin"], pinned*: boolean, last_modified*: string, best_answer*: int }
  - last_modified - update this to "now" only if type = "mod"
  - best_answer = update this to the given id only if type = "ans"
	- pinned - update this to !pinned if action: "pin" and the user making the req is an instructor
```

```
Route: "/posts/:postID"
Method: DELETE
Purpose: Delete a post
Description:
  - check 1: check that the user owns the post OR is an instructor
  - helper function name: deletePost(postID)
```

## Comments

```
Route: "/comments"
Method: POST
Purpose: Add a comment to a post
Description:
  - helper function name: addComment(formData)
  - formData = { user_id, post_id, body, parent_id, anonymous, ... }
Database:
  from cookies: user_id
  from req.body: post_id, body, parent_id, anonymous
  server-side:
  auto: id, created_at, last_modified, active
```

```
Route: "/comments/:commentID"
Method: PATCH
Purpose: Edit a comment of a post
Description:
  - helper function name: updateComment(data)
  - data = { user_id, post_id, body, parent_id, anonymous, last_modified ... }
  - last_modified should be set to "now" on the server-side during update
```

```
Route: "/comments/:commentID"
Method: DELETE
Purpose: Delete a comment from a post
Description:
  - check 1: check that the user owns the comment OR is an instructor
  - helper function name: deleteComment(commentID)
```
