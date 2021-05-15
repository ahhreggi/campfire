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

  // Return true if active is a view that requires courseData
  const hasCourseData = (active) => {
    const valid = ["Dashboard", "Analytics", "Post", "New Post"];
    return valid.includes(active);
  };

  // Click the logo redirects to the Home if the current view doesn't have courseData in state
  // Otherwise, it redirects to Dashboard
  const handleLogoClick = () => {
    if (!hasCourseData(props.active)) {
      props.onClick("Home");
    } else {
      props.onClick("Dashboard");
    }
  };

  return (
    <div className="Nav">

      {/* Campfire Title */}
      <section className="app-nav left" onClick={() => handleLogoClick()}>
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

        {/* Course Name */}
        <span className="course-name">{props.courseName}</span>

        {/* User Name */}
        <div>
          <img src={`./images/avatars/${props.userAvatar}.png`} alt="Avatar" />
          <span className="user-name">{props.userName}</span>
        </div>

        <div>
          <a href="/">Logout</a>
        </div>

      </section>
    </div>
  );
};

export default Nav;
