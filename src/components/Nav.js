import "./Nav.scss";
import PropTypes from "prop-types";

const Nav = (props) => {

  Nav.propTypes = {
    onClick: PropTypes.func,
    active: PropTypes.string,
    viewTitle: PropTypes.string,
    courseName: PropTypes.string,
    userAvatar: PropTypes.number,
    userName: PropTypes.string
  };

  return (
    <div className="Nav">

      {/* Campfire Title */}
      <section className="left" onClick={() => props.onClick("Dashboard")}>
        <span className="title glow">
          Campfire
          <img className="glow" src="./images/campfire.png" alt="Campfire" />
        </span>
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
          <img src={`./images/avatars/${props.userAvatar}.png`} alt="Avatar" />
          <span className="user-name">{props.userName}</span>
        </div>

      </section>
    </div>
  );
};

export default Nav;
