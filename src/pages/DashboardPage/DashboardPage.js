import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tabs, Tab, Row, Col, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHistory,
  faQuestionCircle,
  
} from "@fortawesome/free-solid-svg-icons";

import { FaGem, FaHeart } from "react-icons/fa"

import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import QuizHistoryPage from "../HistoryPage";

import QuizInstructions from "./containers/QuizInstructions";
import CreateQuestion from "../../containers/CreateQuestion";
import QuestionsContainer from "../../containers/Questions";

class DashboardPage extends Component {
  state = {
    counter: 0,
    key: "first",
  };
  componentDidMount() {
    // if (!this.props.user) return this.props.history.push("/");
  }

  onChangeKey = (key) => {
    this.setState({ key });
  };

  onCreateQuestion = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
          <SubMenu title="Components" icon={<FaHeart />}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    );
  }
}

export default withRouter(DashboardPage);
