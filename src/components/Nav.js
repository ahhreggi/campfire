import "./Nav.scss";
import logo from "../images/campfire.png";

const Nav = () => {
  return (
    <div className="Nav">

      <section className="left">
        <span className="title">Campfire</span>
        <img src={logo} alt="Campfire" />
      </section>

      <section className="middle d-none d-sm-flex">
        <span className="view-title col-12 text-truncate">View Title View Title View Title View Title View Title View Title </span>
      </section>

      <section className="right d-none d-xl-flex">
        <span className="course-name">LHL: Web - Mar 1</span>
        <div>
          <img src={logo} alt="Avatar" />
          <span className="user-name">Anonymous</span>
        </div>
      </section>
    </div>
  );
};

export default Nav;
