import "./Main.scss";
import Post from "./Post";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";


const Main = (props) => {

  // Only one main component would be active at a given time
  const active = "post";

  return (
    <div className="Main">
      This is main.
      {active === "post" &&
      <Post
        tags={[]}
      />}
      {active === "dashboard" && <Dashboard />}
      {active === "analytics" && <Analytics />}
    </div>
  );
};

export default Main;
