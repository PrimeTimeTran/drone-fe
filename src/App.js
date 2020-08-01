import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import LoginPage from "./pages/LoginPage";
import HistoryPage from "./pages/HistoryPage";
import QuizSummaryPage from "./pages/QuizSummaryPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import Protected from "./components/Protected";
import NavigationBar from "./containers/NavigationBar";

function App() {
  const [user, setUser] = useState(null);

  async function checkUser() {
    const token = localStorage.getItem("userToken");

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
      window.fb.logEvent("page_view", {
        email: data.email,
      });
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
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route
          exact
          user={user}
          path="/"
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
