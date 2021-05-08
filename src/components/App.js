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
      "best_answer": 1,
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
    },
    {
      "id": 2,
      "title": "Where can I find the prep work?",
      "body": "I checked everywhere but can't find the link.",
      "bookmarked": false,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": null,
      "author_name": "Milly Monka",
      "tags": [
        {
          "id": 1,
          "name": "general"
        },
        {
          "id": 5,
          "name": "prep"
        }
      ],
      "pinned": false,
      "views": 1,
      "comments": [
      ]
    },
    {
      "id": 1,
      "title": "How do I italicize text in HTML?",
      "body": "I'm trying to italicize text but can't figure out how. Any ideas?",
      "bookmarked": true,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": 1,
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
      "id": 2,
      "title": "Where can I find the prep work?",
      "body": "I checked everywhere but can't find the link.",
      "bookmarked": false,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": null,
      "author_name": "Milly Monka",
      "tags": [
        {
          "id": 1,
          "name": "general"
        },
        {
          "id": 5,
          "name": "prep"
        }
      ],
      "pinned": true,
      "views": 1,
      "comments": [
      ]
    },
    {
      "id": 1,
      "title": "How do I italicize text in HTML?",
      "body": "I'm trying to italicize text but can't figure out how. Any ideas? I'm trying to italicize text but can't figure out how. Any ideas?",
      "bookmarked": true,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": 1,
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
    },
    {
      "id": 2,
      "title": "Where can I find the prep work?",
      "body": "I checked everywhere but can't find the link.",
      "bookmarked": false,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": null,
      "author_name": "Milly Monka",
      "tags": [
        {
          "id": 1,
          "name": "general"
        },
        {
          "id": 5,
          "name": "prep"
        }
      ],
      "pinned": false,
      "views": 1,
      "comments": [
      ]
    },
    {
      "id": 1,
      "title": "How do I italicize text in HTML?",
      "body": "I'm trying to italicize text but can't figure out how. Any ideas?",
      "bookmarked": true,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": 1,
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
      "id": 2,
      "title": "Where can I find the prep work?",
      "body": "I checked everywhere but can't find the link.",
      "bookmarked": false,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": null,
      "author_name": "Milly Monka",
      "tags": [
        {
          "id": 1,
          "name": "general"
        },
        {
          "id": 5,
          "name": "prep"
        }
      ],
      "pinned": true,
      "views": 1,
      "comments": [
      ]
    },
    {
      "id": 2,
      "title": "Where can I find the prep work?",
      "body": "I checked everywhere but can't find the link.",
      "bookmarked": false,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": null,
      "author_name": "Milly Monka",
      "tags": [
        {
          "id": 1,
          "name": "general"
        },
        {
          "id": 5,
          "name": "prep"
        }
      ],
      "pinned": false,
      "views": 1,
      "comments": [
      ]
    },
    {
      "id": 2,
      "title": "Where can I find the prep work?",
      "body": "I checked everywhere but can't find the link.",
      "bookmarked": false,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": null,
      "author_name": "Milly Monka",
      "tags": [
        {
          "id": 1,
          "name": "general"
        },
        {
          "id": 5,
          "name": "prep"
        }
      ],
      "pinned": false,
      "views": 1,
      "comments": [
      ]
    },
    {
      "id": 2,
      "title": "Where can I find the prep work?",
      "body": "I checked everywhere but can't find the link.",
      "bookmarked": false,
      "created_at": "1620365282",
      "last_modified": "1620365282",
      "best_answer": null,
      "author_name": "Milly Monka",
      "tags": [
        {
          "id": 1,
          "name": "general"
        },
        {
          "id": 5,
          "name": "prep"
        }
      ],
      "pinned": false,
      "views": 1,
      "comments": [
      ]
    }
  ];
  return (
    <main className="App">
      <Nav />
      <section>
        <PostList posts={posts} />
        <Main />
      </section>
    </main>
  );
};

export default App;
