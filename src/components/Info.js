import PropTypes from "prop-types";
import star from "../images/icons/star.png";
import "./Info.scss";
import moment from "moment";

const Info = (props) => {

  Info.propTypes = {
    active: PropTypes.string,
    courseData: PropTypes.object
  };

  const owner = props.courseData.users.filter(user => user.role === "owner")[0];
  const instructors = props.courseData.users
    .filter(user => user.role === "instructor");
  instructors.unshift(owner);
  const instructorElements = instructors.map((instructor, index) => {
    return (
      <div key={instructor.user_id}>
        <img src={`./images/avatars/${instructor.avatar_id}.png`} />
        {instructor.first_name} {instructor.last_name}
        {index === 0 &&
          <>
            <img src={star} className="star" />
            <span>HEAD INSTRUCTOR</span>
          </>
        }
      </div>
    );
  });

  return (
    <div className="Info">

      {/* Page Title */}
      <div className="page-title">
        {props.active === "Info" &&
          <>Course information</>
        }

      </div>

      <hr />

      <div className="course-card">


        {props.active === "Info" &&
          <div className="course-title">
            {props.courseData.course_code}: {props.courseData.name}
          </div>
        }

        <div className="course-date">
          {moment(props.courseData.created_at).format("MMMM YYYY")}
        </div>

        <div className="course-description">
          {props.courseData.description || "The course instructor has not provided a description for this course."}
        </div>

        {/* Page Text */}
        {props.active === "Info" &&
          <div className="instructors">
            <header>Instructors:</header>
            {instructorElements}
          </div>
        }

      </div>



      {/* <hr /> */}

    </div>
  );

};

export default Info;