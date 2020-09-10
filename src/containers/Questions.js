import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

import QuestionCard from "./QuestionCard";

import { getMyQuestions, deleteQuestion } from "../api";

const shuffle = (data) => {
  return data
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

export default function Questions(props) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const questions = await getMyQuestions();
      setQuestions(questions);
    }
    fetchQuestions();
  }, [props.counter]);

  const removeItem = async (questionId) => {
    const resp = await deleteQuestion(questionId);
    if (resp.status === 201) {
      const newQuestions = questions.filter((q) => q._id !== questionId);
      setQuestions(newQuestions);
      // window.fb.logEvent("question_remove");
    }
  };

  const updateItem = (question) => {
    const idx = questions.findIndex((q) => q._id === question._id);
    const newQuestions = [...questions];
    newQuestions[idx] = question;
    setQuestions(newQuestions);
  };

  const onShuffleQuestions = () => {
    const shuffledQuestions = shuffle(questions);
    setQuestions(shuffledQuestions);
  };

  const renderQuestions = () => {
    if (questions && questions.length > 0) {
      return questions.map((question, idx) => {
        return (
          <QuestionCard
            idx={idx + 1}
            {...question}
            user={props.user}
            updateItem={updateItem}
            removeItem={removeItem}
            showAnswers={showAnswers}
          />
        );
      });
    }
  };

  return (
    <Container className="px-sm-0">
      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="absolute-answer-toggle"
      >
        Toggle Answers
      </button>
      <button
        onClick={onShuffleQuestions}
        className="absolute-question-shuffle"
      >
        Shuffle
      </button>
      <Row>
        <Col className="px-sm-0">{renderQuestions()}</Col>
      </Row>
    </Container>
  );
}
