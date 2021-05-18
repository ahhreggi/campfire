import "./Nav.scss";
import logout from "../images/icons/logout.png";
// import github from "../images/icons/github.png";
import github from "../images/icons/question-mark.png";
// import courses from "../images/icons/courses-solid.png";
import courses from "../images/icons/home.png";
import PropTypes from "prop-types";

import BackButton from "./BackButton";

const Nav = (props) => {

  Nav.propTypes = {
    onRedirect: PropTypes.func,
    active: PropTypes.string,
    courseData: PropTypes.object,
    userAvatar: PropTypes.number,
    userName: PropTypes.string,
    userRole: PropTypes.string
  };

  const toHome = ["Join", "Create", "Manage", "About", "Help", "Account"];

  let backToLabel;
  if (toHome.includes(props.active)) {
    backToLabel = "Home";
  } else {
    backToLabel = props.courseData ? props.courseData.course_code : "NO CODE";
  }

  let destination;
  if (backToLabel === "Home") {
    destination = "Home";
  } else {
    destination = "Dashboard";
  }

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Nav">

      {/* Campfire Title */}
      <section className="app-nav left">
        <span className="title glow" onClick={() => props.onRedirect("Home")}>
          Campfire
          <img className="glow" src="./images/campfire.png" alt="Campfire" />
        </span>
      </section>

      {/* View Title */}
      <section className="app-nav middle">

        {/* Back to Home/Dashboard */}
        {props.active !== "Home" && props.active !== "Dashboard" &&
          <BackButton
            label={backToLabel.toUpperCase()}
            destination={destination}
            onRedirect={props.onRedirect}
          />
        }

        {/* <div className="view-title">
          {props.active}
        </div> */}

        {props.active === "Home" &&
          <span className="view-title">Home</span>
        }

        {props.active === "Dashboard" &&
          <span className="view-title text-truncate">{props.courseData ? `${props.courseData.course_code}: ${props.courseData.name}` : ""}</span>
        }

      </section>

      {/* User Panel */}
      <section className="app-nav right">

        {/* Course Name
        <span className="course-name">{props.courseName}</span> */}

        {/* User Name */}
        <div className={`user-info ${props.userRole && props.userRole !== "student" ? "instructor" : ""}`}>
          <div className="user-link">
            <img src={`./images/avatars/${props.userAvatar}.png`} onClick={() => props.onRedirect("Settings")} alt="Avatar" />
            <span
              className="user-name text-truncate d-none d-xl-inline"
              onClick={() => props.onRedirect("Settings")}
            >
              {props.userName}
            </span>
          </div>
        </div>

        <div className="nav-buttons">

          {/* Home Link */}
          <div className={`courses-icon ${props.active === "Home" ? "selected" : ""}`}>
            <img src={courses} onClick={props.active !== "Home" ? () => props.onRedirect("Home") : null} />
          </div>

          {/* Help Link */}
          <div className={`courses-icon ${props.active === "Help" ? "selected" : ""}`}>
            <img src={github} onClick={() => props.onRedirect("Help")} />
          </div>

          {/* Logout Link */}
          <div className="logout-icon">
            <img src={logout} onClick={() => props.onRedirect("Logout")} />
          </div>




        </div>


        {/* Github Link */}
        {/* <div className="github-icon">
          <a
            href="https://github.com/ahhreggi/campfire"
            rel="noreferrer"
            target="_blank"
          >
            <img src={github} />
          </a>
        </div> */}


      </section>
    </div>
  );
};

export default Nav;
