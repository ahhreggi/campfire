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

      <section className="left">
        <span className="title">Campfire</span>
        <img src="./images/campfire.png" alt="Campfire" />
      </section>

      <section className="middle">
        <span className="view-title text-truncate">{props.viewTitle}</span>
      </section>

      <section className="right">
        <span className="course-name">{props.courseName}</span>
        <div>
          {/* "./images/avatars/2.png" */}
          <img src={props.userAvatar} alt="Avatar" />
          <span className="user-name">{props.userName}</span>
        </div>
      </section>
    </div>
  );
};

export default Nav;
