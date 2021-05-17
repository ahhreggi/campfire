import PropTypes from "prop-types";
import ManageListItem from "./ManageListItem";
import "./ManageList.scss";

const ManageList = (props) => {

  ManageList.propTypes = {
    courses: PropTypes.array,
    onLeaveCourse: PropTypes.func,
    onViewCourse: PropTypes.func,
    onRedirect: PropTypes.func
  };

  const courses = props.courses.map(course => {
    return (
      <ManageListItem
        key={course.id}
        id={course.id}
        name={course.name}
        courseCode={course.course_code}
        createdAt={course.created_at}
        ownerName={course.owner_name}
        role={course.role}
        joinDate={course.join_date}
        onLeaveCourse={props.onLeaveCourse}
        onViewCourse={props.onViewCourse}
        onRedirect={props.onRedirect}
      />
    );
  });

  return (
    <div className="ManageList">
      {courses}
    </div>
  );
};

export default ManageList;
