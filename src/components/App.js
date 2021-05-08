import "./App.scss";
import Nav from "./Nav";
import PostList from "./PostList";
import Main from "./Main";

const App = (props) => {

  // Temporary data
  const posts = [
    {
      "id": 1,
      "title": "How do I italicize text in HTML?",
      "body": "I'm trying to italicize text but can't figure out how. Any ideas? I'm trying to italicize text but can't figure out how. Any ideas?",
      "bookmarked": true,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": null,
      "author_name": "FirstName LastName",
      "tags": [
        {
          "id": 5,
          "name": "stretch"
        }
      ],
      "pinned": false,
      "views": 9,
      "comments": [
        {
          "id": 1,
          "anonymous": false,
          "author_name": "Willy Wonka",
          "author_avatar_url": "avatar.png",
          "author_permissions": 0,
          "body": "Try <i>text</i>.",
          "score": 7,
          "created_at": "1620365282",
          "last_modified": "1620365282",
          "endorsed": true,
          "replies": [
            {
              "id": 2,
              "anonymous": false,
              "author_name": "Jane Doe",
              "author_avatar_url": "avatar.png",
              "body": "good answer!",
              "created_at": "1620365282",
              "last_modified": "1620365282"
            }
          ]
        },
        {
          "id": 3,
          "anonymous": false,
          "author_name": "Milly Monka",
          "author_avatar_url": "avatar.png",
          "author_permissions": 1,
          "body": "Use <b>text</b>.",
          "score": 1,
          "created_at": "1620365282",
          "last_modified": "1620365282",
          "endorsed": false,
          "replies": [
            {
              "id": 4,
              "anonymous": true,
              "author_name": "John Doe",
              "author_avatar_url": "anonymous.png",
              "body": "this doesn't work!",
              "created_at": "1620365282",
              "last_modified": "1620365282"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "title": "How do I italicize text in Angular?",
      "body": "I'm trying to italicize text but can't figure out how. Any ideas? I'm trying to italicize text but can't figure out how. Any ideas?",
      "bookmarked": true,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": null,
      "author_name": "FirstName LastName",
      "tags": [
        {
          "id": 1,
          "name": "general"
        },
        {
          "id": 8,
          "name": "html"
        }
      ],
      "pinned": true,
      "views": 9,
      "comments": [
        {
          "id": 1,
          "anonymous": false,
          "author_name": "Willy Wonka",
          "author_avatar_url": "avatar.png",
          "author_permissions": 0,
          "body": "Try <i>text</i>.",
          "score": 7,
          "created_at": "1620365282",
          "last_modified": "1620365282",
          "endorsed": true,
          "replies": [
            {
              "id": 2,
              "anonymous": false,
              "author_name": "Jane Doe",
              "author_avatar_url": "avatar.png",
              "body": "good answer!",
              "created_at": "1620365282",
              "last_modified": "1620365282"
            }
          ]
        },
        {
          "id": 3,
          "anonymous": false,
          "author_name": "Milly Monka",
          "author_avatar_url": "avatar.png",
          "author_permissions": 1,
          "body": "Use <b>text</b>.",
          "score": 1,
          "created_at": "1620365282",
          "last_modified": "1620365282",
          "endorsed": false,
          "replies": [
            {
              "id": 4,
              "anonymous": true,
              "author_name": "John Doe",
              "author_avatar_url": "anonymous.png",
              "body": "this doesn't work!",
              "created_at": "1620365282",
              "last_modified": "1620365282"
            }
          ]
        }
      ]
    }
  ];

  const tags = [
    {
      "id": 1,
      "name": "general"
    },
    {
      "id": 2,
      "name": "other"
    },
    {
      "id": 3,
      "name": "project"
    },
    {
      "id": 4,
      "name": "core"
    },
    {
      "id": 5,
      "name": "stretch"
    },
    {
      "id": 6,
      "name": "react"
    },
    {
      "id": 7,
      "name": "ruby"
    },
    {
      "id": 8,
      "name": "html"
    }
  ];
  return (
    <main className="App">
      <Nav />
      <section>
        <div className="left">
          <PostList tags={tags} posts={posts} />
        </div>
        <div className="right">
          <Main />
        </div>
      </section>
    </main>
  );
};

export default App;
