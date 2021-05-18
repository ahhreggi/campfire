import PropTypes from "prop-types";
import classNames from "classnames";
import Badge from "./Badge";
import archive from "../images/icons/archive.png";
import "./CourseListItem.scss";

const CourseListItem = (props) => {
  CourseListItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    code: PropTypes.string,
    createdAt: PropTypes.string,
    archived: PropTypes.bool,
    role: PropTypes.string,
    ownerName: PropTypes.string,
    analytics: PropTypes.object,
    onClick: PropTypes.func,
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // const truncateText = (text, length) => {
  //   if (text.length > length) {
  //     let result = "";
  //     const words = text.split(" ");
  //     for (const word of words) {
  //       if (result.length + word.length <= length) {
  //         result += " " + word;
  //       } else {
  //         break;
  //       }
  //     }
  //     result = result.trim();
  //     return result + (result !== text ? "..." : "");
  //   } else {
  //     return text;
  //   }
  // };

  // VARIABLES //////////////////////////////////////////////////////

  let isArchived = props.archived;
  // isArchived = true;
  let isUnresolved = props.analytics.num_unresolved_posts > 0;
  // isUnresolved = true;
  let isInstructor = props.role !== "student";
  // isInstructor = false;

  // Get class names
  const classes = classNames({
    CourseListItem: true,
    archived: isArchived,
    instructor: isInstructor,
  });

  return (
    <div
      className={classes}
      onClick={() => props.onClick(props.id)}
    >

      {/* Course Code */}
      <div className="code">
        <span>
          {props.code || "MY COURSE"}
        </span>
        {isArchived &&
          <img src={archive} />
        }
        {/* Unresolved Questions Badge */}
        {!isArchived && isUnresolved &&
          <Badge type="unresolved" />
        }
      </div>

      {/* Course Name */}
      <div className="name text-truncate">
        {props.name}
      </div>

      {/* Archived Label */}
      {isArchived &&
        <div className="archived-label">ARCHIVED</div>
      }

      {/* Owner Name */}
      <div className="owner-name">
        {props.ownerName || "Unknown Instructor"}
      </div>

    </div>

  // <div
  //   className="CourseListItem"
  //   onClick={() => selectCourse(props.id)}
  // >
  //   <div>id: {props.id}</div>
  //   <div>name: {props.name}</div>
  //   <div>createdAt: {props.createdAt}</div>
  //   <div>archived: {props.archived}</div>
  //   <div>role: {props.role}</div>
  // </div>
  );
};

export default CourseListItem;
