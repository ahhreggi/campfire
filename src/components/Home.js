import "./Home.scss";
import PropTypes from "prop-types";
import Button from "./Button";

import DevData from "./DevData";

const Home = (props) => {
  Home.propTypes = {
    userData: PropTypes.object,
    userCourses: PropTypes.array,
    onClick: PropTypes.func,
    onRedirect: PropTypes.func
  };

  // Fetch data for a course by ID and go to its page
  const selectCourse = (courseID) => {
    props.onClick(courseID);
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

      {/* <DevData name="Home" props={props} /> */}

      <div>
        Welcome back, {props.userData.firstName + " " + props.userData.lastName}!
      </div>
      <div>
        Here are your courses:
      </div>
      <div>
        {userCourses}
      </div>

      {/* Create Button */}
      <div className="create-link">
        <Button
          text="Go to Create"
          onClick={() => props.onRedirect("Create")}
        />
      </div>

      {/* Join Button */}
      <div className="join-link">
        <Button
          text="Go to Join"
          onClick={() => props.onRedirect("Join")}
        />
      </div>

    </div>
  );
};

export default Home;
