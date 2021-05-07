<div align="center">
<h1>⚠️ WORK IN PROGRESS ⚠️</h1>
</div>


<!-- TITLE -->
<div align="center">
<img src="public/images/campfire.png" width="100" />
<h1>Campfire</h1>
<p>A full-stack, Q&A discussion board for online courses
</p>

<p>Built with <a href="https://reactjs.org/">ReactJS</a>, <a href="https://nodejs.org/en/">Node.js</a>, <a href="https://expressjs.com/">Express</a>, <a href="https://www.postgresql.org/">PostgreSQL</a>, <a href="https://tailwindcss.com/">Tailwind CSS</a>, <a href="https://sass-lang.com/">Sass</a>, and hosted with <a href="https://www.heroku.com/">Heroku</a> & <a href="https://www.netlify.com/">Netlify</a></p>

<b><a href="" target="_blank">
   » View Live Demo «
</a></b>
</div>

<!-- INTRODUCTION -->

## 📚 Introduction

<b>[Campfire](https://ahhreggi-scheduler.netlify.app/)</b> is a full-stack, single-page React application that allows users to enrol and participate in course Q&A discussion boards.

With many classes now taking place remotely, Campfire allows users to easily discuss course-related questions with fellow students and instructors in an organized manner.

### 🤝 **Collaborators**:
- Maria Regina Sirilan ([**@ahhreggi**](https://github.com/ahhreggi))
- Mitchell Pizzacalla ([**@mpizzaca**](https://github.com/mpizzaca))
- Martin Halas ([**@mar10outof10**](https://github.com/mar10outof10))

This app was created as part of our final project for Lighthouse Labs' Web Development bootcamp. The goal was to create a full-stack application from start to finish in just two weeks.

## ⚛️ Tech Usages

- <b>Frontend</b>: <a href="https://reactjs.org/">ReactJS</a>, <a href="https://tailwindcss.com/">Tailwind CSS</a>, <a href="https://sass-lang.com/">Sass</a>
- <b>Backend</b>: <a href="https://nodejs.org/en/">Node.js</a>, <a href="https://expressjs.com/">Express</a>, <a href="https://www.postgresql.org/">PostgreSQL</a>
- <b>Tools & Testing</b>: <a href="https://storybook.js.org/">Storybook<a/>, <a href="https://jestjs.io/">Jest</a>, <a href="https://www.cypress.io/">Cypress</a>
- <b>Deployment</b>: <a href="https://www.heroku.com/">Heroku</a> (database API), <a href="https://circleci.com/">CircleCI</a> (continuous integration), <a href="https://www.netlify.com/">Netlify</a> (production client)

<!-- FEATURES -->
## ⭐ Features
- **Users**:
  - can login or register an account
  - can join or create courses
  - can create posts and comments (optionally as Anonymous)
  - can upvote comments
  - can post replies to comments
  - can edit or delete posts, comments, and replies
  - can bookmark posts
  - can view personal and course analytics
  - can filter posts by title or category
  - can select a best answer to have their post marked as answered
- **Instructors**:
  - can edit course information and user enrolment
  - can edit or delete any post, comment, or reply
  - can endorse comments
  - can archive or delete a course (course creator only)
  - can view anonymous identities if necessary  (course creator only)
- **Stretch**:
  - Users can toggle email notifications for course activity
  - Users can view similar posts to a question
  - Users can view the number of users online
  - Users can view updates in real-time via websockets


## 🛠 Installation

The project is live
<b><a href="" target="_blank">here</a></b>, but if you would prefer a local installation:

1. Clone or download this repository
   ```
   git clone https://github.com/ahhreggi/campfire
   ```
2. Set up and run the campfire API server
   - See [README](https://github.com/ahhreggi/campfire-api)

5. Navigate to the project directory and install dependencies
   ```
   cd campfire
   npm install
   ```
6. Run the webpack development server
   ```
   npm start
   ```
7. Visit <a href="http://localhost:8000/">http://localhost:8000/</a> on your browser

## ✔️ Tools & Testing (Storybook, Jest, Cypress)

1. Run the Storybook visual testbed
   ```
   npm run storybook
   ```
2. Run the Jest test framework
   ```
   npm test
   ```
3. Run the Cypress test runner
   ```
   npm run cypress
   ```

## 📷 Screenshots
<img src="public/images/screenshots/home.png" alt="Home" />
<img src="public/images/screenshots/login.png" alt="Login" />
<img src="public/images/screenshots/dashboard.png" alt="Dashboard" />
<img src="public/images/screenshots/post.png" alt="post" />