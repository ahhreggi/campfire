import "./Nav.scss";
import PropTypes from "prop-types";

const Nav = (props) => {

  Nav.propTypes = {
    active: PropTypes.string,
    viewTitle: PropTypes.string,
    courseName: PropTypes.string,
    userAvatar: PropTypes.string,
    userName: PropTypes.string
  };

  return (
    <div className="Nav">

      {/* Campfire Title */}
      <section className="left">
        <span className="title">Campfire</span>
        <img src="./images/campfire.png" alt="Campfire" />
      </section>

      {/* View Title */}
      <section className="middle">
        <span className="view-title text-truncate">{props.viewTitle}</span>
      </section>

      {/* User Panel */}
      <section className="right">

        {/* Course Name */}
        <span className="course-name">{props.courseName}</span>

        {/* User Name */}
        <div>
          <img src={props.userAvatar} alt="Avatar" />
          <span className="user-name">{props.userName}</span>
        </div>

      </section>
    </div>
  );
};

export default Nav;
