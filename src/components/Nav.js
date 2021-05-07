import "./Nav.scss";
import logo from "../campfire.png";

const Nav = () => {
  return (
    <div className="Nav">

      <section className="left">
        <span className="title">Campfire</span>
        <img src={logo} alt="Campfire" />
      </section>

      <section className="middle">
        <span className="view-title">View Title</span>
      </section>

      <section className="right">
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
