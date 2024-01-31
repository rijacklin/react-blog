import React from "react";
import Posts from "./components/Posts";

const App: React.FC = () => {
  return (
    <div className="App is-clipped py-4">
      <h1 className="title has-text-centered is-2 mx-2 my-4 py-4 has-text-white">
        Blog
      </h1>
      <Posts />
    </div>
  );
};

export default App;
