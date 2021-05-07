import "./App.scss";
import Nav from "./Nav";
import PostList from "./PostList";
import Main from "./Main";

const App = () => {
  return (
    <main className="App">
      <Nav />
      <section>
        <PostList />
        <Main />
      </section>
    </main>
  );
};

export default App;
