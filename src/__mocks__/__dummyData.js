export const dummyUser =
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNTAyMTQ0fQ.h89X0-TNtL436Qe8Zaaa5lewJCNmfM5Enjc8LeiPFT0",
    "first_name": "Reggi",
    "last_name": "Sirilan",
    "email": "rs@rs.ca",
    "avatar_id": 2
  };

export const dummyCourseData =
  {
    "id": 1,
    "name": "JS for Beginners",
    "description": "Introduction to core JavaScript concepts",
    "archived": false,
    "analytics": {
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
      },
      {
        "id": 2,
        "name": "Closures"
      },
      {
        "id": 3,
        "name": "Promises"
      },
      {
        "id": 4,
        "name": "Classes"
      },
      {
        "id": 5,
        "name": "Async"
      }
    ],
    "posts": [
      {
        "id": 2,
        "title": "How do I create a class? 1 2 3 4 5 6 7 8 9 1 2 3 4",
        "body": "How do I write a new class in javascript, and declare methods, variables, etc?",
        "bookmarked": false,
        "created_at": "2021-05-10T15:40:05.671Z",
        "last_modified": "2021-05-10T15:40:05.671Z",
        "best_answer": null,
        "author_first_name": "Fiona",
        "author_last_name": "Ford",
        "author_avatar_id": 7,
        "pinned": false,
        "views": 0,
        "anonymous": false,
        "role": "student",
        "user_id": 6,
        "pinnable": true,
        "editable": true,
        "tags": [
          {
            "id": 4,
            "name": "Classes"
          }
        ],
        "comments": [
          {
            "id": 5,
            "post_id": 2,
            "anonymous": true,
            "author_first_name": "Carson",
            "author_last_name": "Cool",
            "author_avatar_id": 4,
            "body": "You create a class with the Class keyword followed by {}",
            "score": 0,
            "created_at": "2021-05-10T15:40:05.671Z",
            "last_modified": "2021-06-10T15:40:05.671Z",
            "liked": true,
            "endorsed": false,
            "role": "instructor",
            "user_id": 3,
            "editable": true,
            "endorsable": true,
            "endorsements": [],
            "replies": []
          }
        ]
      },
      {
        "id": 1,
        "title": "How do I use a promise?",
        "body": "I am using a new library that returns a Promise object instead of a callback... how do I act on it once its done?",
        "bookmarked": false,
        "created_at": "2021-05-10T15:40:05.671Z",
        "last_modified": "2021-05-10T15:40:05.671Z",
        "best_answer": 4,
        "author_first_name": "Edward",
        "author_last_name": "Ecksworth",
        "author_avatar_id": 6,
        "pinned": false,
        "views": 0,
        "anonymous": false,
        "role": "student",
        "user_id": 5,
        "pinnable": true,
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
            "author_avatar_id": 7,
            "body": "You can consume a promise by calling .then() on it! Be sure to use .catch() as well in case of errors.",
            "score": 999,
            "created_at": "2021-05-10T15:40:05.671Z",
            "last_modified": "2021-07-10T15:40:05.671Z",
            "liked": false,
            "endorsed": true,
            "role": "student",
            "user_id": 6,
            "editable": true,
            "endorsable": true,
            "endorsements": [
              {
                "id": 1,
                "user_id": 3,
                "endorser_name": "Carson Cool",
                "comment_id": 2
              }
            ],
            "replies": [
              {
                "id": 4,
                "parent_id": 2,
                "anonymous": false,
                "author_first_name": "Edward",
                "author_last_name": "Ecksworth",
                "author_avatar_id": 6,
                "body": "Thanks for this!!",
                "score": 0,
                "created_at": "2021-05-10T15:40:05.671Z",
                "last_modified": "2021-06-10T15:40:05.671Z",
                "liked": false,
                "endorsed": true,
                "role": "student",
                "user_id": 5,
                "editable": true,
                "endorsable": true,
                "endorsements": []
              },
              {
                "id": 5,
                "parent_id": 2,
                "anonymous": false,
                "author_first_name": "Edward",
                "author_last_name": "Ecksworth",
                "author_avatar_id": 7,
                "body": "123123123",
                "score": 5,
                "created_at": "2021-05-10T15:40:05.671Z",
                "last_modified": "2021-05-10T15:40:05.671Z",
                "liked": true,
                "endorsed": true,
                "role": "student",
                "user_id": 5,
                "editable": true,
                "endorsable": true,
                "endorsements": []
              }
            ]
          },
          {
            "id": 6,
            "post_id": 1,
            "anonymous": false,
            "author_first_name": "Aaron",
            "author_last_name": "Aldridge",
            "author_avatar_id": 2,
            "body": "Be sure to check out Promise.resolve and Promise.reject as well for more info.",
            "score": 0,
            "created_at": "2021-05-10T15:40:05.671Z",
            "last_modified": "2021-05-10T15:40:05.671Z",
            "liked": false,
            "endorsed": false,
            "role": "admin",
            "user_id": 1,
            "editable": true,
            "endorsable": true,
            "endorsements": [],
            "replies": []
          },
          {
            "id": 1,
            "post_id": 1,
            "anonymous": true,
            "author_first_name": "Edward",
            "author_last_name": "Ecksworth",
            "author_avatar_id": 6,
            "body": "I had the same question!",
            "score": 0,
            "created_at": "2021-05-10T15:40:05.671Z",
            "last_modified": "2021-05-10T15:40:05.671Z",
            "liked": true,
            "endorsed": false,
            "role": "student",
            "user_id": 5,
            "editable": true,
            "endorsable": true,
            "endorsements": [],
            "replies": []
          }
        ]
      }
    ]
  };