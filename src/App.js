import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import Repo from "./Repo";

function App() {
  const [error, setError] = useState(false)
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [fill, setFill] = useState(null);

  const sendfill = (fill) => {
    setFill(fill)
  }

  useEffect(() => {
    (async () => {
      let userData;
      try {
        const response = await fetch(`https://api.github.com/repos/hacktoberfest-codex/${fill}/contributors`);
        if (!response.ok) {
          return setError(true)
        }
        userData = await response.json();
      } catch (error) {
        console.log(error);
        userData = [];
      }
      setAllUsers(userData);
      setUsers(userData);
    })();
  }, [fill]);

  const filterCards = event => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user => (`${user.login}`.toLowerCase().includes(value)));
    setUsers(filteredUsers);
  }

  if (!error || users.length !=0) {
    console.log("Inside if");
    return (
      <div className="App">
        <a href="https://hacktoberfest.com/"><img src="https://hacktoberfest.com/_next/static/media/logo-hacktoberfest--logomark.b91c17d2.svg" alt="hacktoberfest logo" id="hacktober"></img></a>
        <Repo sendData={sendfill} />
        <h1>Repo Name: {fill}</h1>
        <h1>Contributors Cards</h1>
        <input className="search-box" onInput={filterCards} placeholder="Search..." />
        <div className="cards-container">
          {users.map((user, index) => (
            <Card key={index} userData={user} />
          ))}
        </div>
        <img src="https://github.githubassets.com/images/spinners/octocat-spinner-64.gif" alt="github spinner"></img>
        <footer>
          Made with ♥ <a href="https://codex-iter.in/">&nbsp; Codex</a>
        </footer>
      </div>
    );
  }

  else {
    console.log("Inside else");
    return (
      <div className="App">
        <a href="https://hacktoberfest.com/"><img src="https://hacktoberfest.com/_next/static/media/logo-hacktoberfest--logomark.b91c17d2.svg" alt="hacktoberfest logo" id="hacktober"></img></a>
        <Repo sendData={sendfill} />
        <h3>Invalid / No Repository Selected</h3>
        <footer>
          Made with ♥ <a href="https://codex-iter.in/">&nbsp; Codex</a>
        </footer>
      </div>
    );
  }
}

export default App;