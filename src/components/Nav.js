import "./Nav.scss";
import logout from "../images/icons/logout.png";
import github from "../images/icons/question-mark.png";
import courses from "../images/icons/courses-solid.png";
import PropTypes from "prop-types";

const Nav = (props) => {

  Nav.propTypes = {
    onRedirect: PropTypes.func,
    active: PropTypes.string,
    viewTitle: PropTypes.string,
    courseName: PropTypes.string,
    userAvatar: PropTypes.number,
    userName: PropTypes.string
  };

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Nav">

      {/* Campfire Title */}
      <section className="app-nav left" onClick={() => props.onRedirect("Home")}>
        <span className="title glow">
          Campfire
          <img className="glow" src="./images/campfire.png" alt="Campfire" />
        </span>
      </section>

      {/* View Title */}
      <section className="app-nav middle">
        <span className="view-title text-truncate">{props.viewTitle}</span>
      </section>

      {/* User Panel */}
      <section className="app-nav right">

        {/* Course Name
        <span className="course-name">{props.courseName}</span> */}

        {/* User Name */}
        <div className="user-info">
          <img src={`./images/avatars/${props.userAvatar}.png`} alt="Avatar" />
          <span
            className="user-name text-truncate"
            onClick={() => props.onRedirect("Home")}
          >
            {props.userName}
          </span>
        </div>

        <div className="courses-icon">
          <img src={courses} onClick={() => props.onRedirect("Home")} />
        </div>
        <div className="github-icon">
          <a
            href="https://github.com/ahhreggi/campfire"
            rel="noreferrer"
            target="_blank"
          >
            <img src={github} />
          </a>
        </div>
        <div className="logout-icon">
          <img src={logout} onClick={() => props.onRedirect("Logout")} />
        </div>

      </section>
    </div>
  );
};

export default Nav;
