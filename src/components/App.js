import "./App.scss";
import Nav from "./Nav";
import PostList from "./PostList";
import Main from "./Main";

const App = () => {
  return (
    <main className="App">
      <Nav />
      <PostList />
      <Main />
    </main>
  );
};

export default App;
