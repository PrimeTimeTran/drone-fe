import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import QuizPage from "./pages/QuizPage";
import QuizSummaryPage from "./pages/QuizSummaryPage";

import Protected from "./components/Protected";

import NavigationBar from "./components/NavigationBar";

function App() {
  const [user, setUser] = useState(null);

  async function checkUser() {
    const token = localStorage.getItem("usertoken");

    if (!token) return;

    try {
      const url = process.env.REACT_APP_SERVER_URL + "/users/me";
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const { data } = await resp.json();
      setUser(data);
    } catch (e) {
      console.log({ e });
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Router>
      <NavigationBar user={user} />
      <Switch>
        <Route
          exact
          path="/"
          user={user}
          render={() => <LoginPage checkUser={checkUser} />}
        />
        <Protected
          exact
          user={user}
          path="/summary"
          component={QuizSummaryPage}
        />
        <Protected exact user={user} path="/home" component={HomePage} />
        <Protected exact user={user} path="/history" component={HistoryPage} />
        <Protected exact user={user} path="/quiz" component={QuizPage} />
      </Switch>
    </Router>
  );
}

export default App;
