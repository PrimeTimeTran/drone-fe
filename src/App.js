import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import QuizInstructions from "./components/quiz/QuizInstructions";
import Play from "./components/quiz/Play";
import QuizSummary from "./components/quiz/QuizSummary";
import HomePage from "./pages/HomePage";
import Protected from "./components/Protected";

import NavigationBar from "./components/NavigationBar";

function App() {
  const [user, setUser] = useState(null);


  async function checkUser() {
    const token = localStorage.getItem("usertoken")

    if (!token) return

    try {
      const url = process.env.REACT_APP_SERVER_URL + "/users/me";
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await resp.json();
      setUser(data.data)
    } catch (e) {
      console.log({e})
    }
  };

  useEffect(() => {
    checkUser()
  }, []);


  return (
    <Router>
      <NavigationBar user={user} />
      <Protected
        exact
        user={user}
        component={QuizSummary}
        path="/play/summary"
      />
      <Protected path="/play/quiz" exact user={user} component={Play} />
      <Route
        exact
        path="/play/instructions"
        render={() => <QuizInstructions checkUser={checkUser} />}
      />
      <Protected path="/home" exact user={user} component={HomePage} />
      <Route
        exact
        path="/"
        render={() => <LoginPage user={user} checkUser={checkUser} />}
      />
    </Router>
  );
}

export default App;
