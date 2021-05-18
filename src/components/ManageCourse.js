import PropTypes from "prop-types";
import UserList from "./UserList";
import UserListItem from "./UserListItem";
import "./ManageCourse.scss";

const ManageCourse = (props) => {

  ManageCourse.propTypes = {
    courseData: PropTypes.object,
    onEditCourse: PropTypes.func,
    onRemoveUser: PropTypes.func,
    onRedirect: PropTypes.func
  };

  let owner;
  const instructors = [];
  const students = [];
  for (const user of props.courseData.users) {
    if (user.role === "student") {
      students.push(user);
    } else if (user.role === "instructor") {
      instructors.push(user);
    } else if (user.role === "owner") {
      owner = user;
    }
  }
  console.log(students);

  // Sort an array of users by last name, first name
  const sortUsers = (users) => {
    return users.sort((a, b) => {
      if (a.last_name < b.last_name) {
        return -1;
      } else if (a.last_name > b.last_name) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  // Sort users
  const sortedStudents = sortUsers(students);
  const sortedInstructors = sortUsers(instructors);

  sortedInstructors.unshift(owner);

  return (
    <div className="ManageCourse">

      <div className="page-title">
        Manage course users
      </div>

      <hr />

      <div className="count">
        There are currently <span className="instructor">{instructors.length}</span> instructor(s) and <span className="student">{students.length}</span> student(s) enrolled in <span className="course-name">{props.courseData.course_code}: {props.courseData.name}</span>.
      </div>

      <div className="label">Instructors</div>
      <div className="list">
        <div className="instructors">
          <UserList
            users={instructors}
            courseID={props.courseData.id}
            onRemoveUser={props.onRemoveUser}
            userRole={props.courseData.role}
          />
        </div>
      </div>
      <div className="label">Students</div>
      <div className="list">
        <div className="students">
          <UserList
            users={sortedStudents}
            courseID={props.courseData.id}
            onRemoveUser={props.onRemoveUser}
            userRole={props.courseData.role}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
