import "./Nav.scss";
import logo from "../images/campfire.png";
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

      <section className="left">
        <span className="title">Campfire</span>
        <img src={logo} alt="Campfire" />
      </section>

      <section className="middle">
        <span className="view-title text-truncate">{props.viewTitle}</span>
      </section>

      <section className="right">
        <span className="course-name">{props.courseName}</span>
        <div>
          <img src={props.userAvatar || logo} alt="Avatar" />
          <span className="user-name">{props.userName}</span>
        </div>
      </section>
    </div>
  );
};

export default Nav;
