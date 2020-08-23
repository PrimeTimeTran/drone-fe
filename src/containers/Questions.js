import React, { useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";

import QuestionCard from "./QuestionCard";

import { getMyQuestions, deleteQuestion } from "../api";

export default function Questions(props) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const questions = await getMyQuestions();
      setQuestions(questions);
    }
    fetchQuestions();
  }, []);

  const removeItem = async (questionId) => {
    const resp = await deleteQuestion(questionId);
    if (resp.status === 201) {
      const newQuestions = questions.filter((q) => q._id !== questionId);
      setQuestions(newQuestions);
      window.fb.logEvent("question_remove");
    }
  };

  const updateItem = (question) => {
    const idx = questions.findIndex((q) => q._id === question._id);
    const newQuestions = [...questions];
    newQuestions[idx] = question;
    setQuestions(newQuestions);
  };

  const renderQuestions = () => {
    return questions.map((question) => {
      return (
        <QuestionCard
          {...question}
          user={props.user}
          updateItem={updateItem}
          removeItem={removeItem}
          showAnswers={showAnswers}
        />
      );
    });
  };

  return (
      <Container className="p-5">
        <button onClick={() => setShowAnswers(!showAnswers)} className="absolute-answer-toggle">
          Toggle Show Answer
        </button>
        <Row>{renderQuestions()}</Row>
      </Container>
  );
}
