import "./Home.scss";
import PropTypes from "prop-types";

import DevData from "./DevData";

const Home = (props) => {
  Home.propTypes = {
    userData: PropTypes.object,
    userCourses: PropTypes.array,
    onClickCourse: PropTypes.func
  };

  // Fetch data for a course by ID and go to its page
  const selectCourse = (courseID) => {
    props.onClickCourse(courseID);
  };

  const userCourses = props.userCourses.map(course => {
    return (
      <div
        key={course.id}
        onClick={() => selectCourse(course.id)}
      >
        {course.id}---{course.name}---{course.role}
      </div>
    );
  });
  return (
    <div className="Home">
      <DevData name="Home" props={props} />


      <div>
        Welcome back, {props.userData.firstName + " " + props.userData.lastName}!
      </div>
      <div>
        Here are your courses:
      </div>
      <div>
        {userCourses}
      </div>
    </div>
  );
};

export default Home;
