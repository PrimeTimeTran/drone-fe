import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import { deleteQuestion } from "./InputQuestionsFunctions";

export default function (props) {
  const [questions, setQuestions] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    try {
      const res = await Axios.get(
        process.env.REACT_APP_SERVER_URL + "/questions/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );
      setQuestions(res.data);
    } catch (e) {
      console.log("error while geting questions", e);
    }
  }

  const deletedQuestion = (id) => {
    deleteQuestion(id).then((res) => {
      history.push("/home");
    });
  };

  const renderQuestions = () => {
    return questions.map((eachQuestion) => {
      return (
        <table className="table col-md-6 mx-auto">
          <button
            className="mdi mdi-delete mdi-24px lifeline-icon"
            onClick={() => {
              deletedQuestion(eachQuestion._id);
            }}
          />
          <tr>
            <td> {eachQuestion.question}</td>
            <td style={{ color: "blue" }}> {eachQuestion.answer}</td>
          </tr>
        </table>
      );
    });
  };
  return <div>{renderQuestions()}</div>;
}
