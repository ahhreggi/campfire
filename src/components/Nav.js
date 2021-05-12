import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import "./Nav.scss";

const Nav = (props) => {

  Nav.propTypes = {
    active: PropTypes.string,
    viewTitle: PropTypes.string,
    courseName: PropTypes.string,
    userAvatar: PropTypes.number,
    userName: PropTypes.string
  };

  return (
    <div className="Nav">

      {/* Campfire Title */}
      {/* <section className="app-nav left" onClick={() => props.onClick("Dashboard")}> */}
      <Link to="/dashboard">
        <section className="app-nav left">
          <span className="title glow">
            Campfire
            <img className="glow" src="./images/campfire.png" alt="Campfire" />
          </span>
        </section>
      </Link>

      {/* View Title */}
      <section className="app-nav middle">
        <span className="view-title text-truncate">{props.viewTitle}</span>
      </section>

      {/* User Panel */}
      <section className="app-nav right">

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
