import React, { useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";

import QuestionCard from "./QuestionCard";

import { getMyQuestions, deleteQuestion } from "../api";

const shuffle = (data) => {
  return data.map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);
}

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
      window.fb.logEvent("question_remove");
    }
  };

  const updateItem = (question) => {
    const idx = questions.findIndex((q) => q._id === question._id);
    const newQuestions = [...questions];
    newQuestions[idx] = question;
    setQuestions(newQuestions);
  };

  const onShuffleQuestions = () => {
    const shuffledQuestions = shuffle(questions)
    setQuestions(shuffledQuestions)
  }

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
        <button onClick={onShuffleQuestions} className="absolute-question-shuffle">
          Shuffle
        </button>
        <Row>{renderQuestions()}</Row>
      </Container>
  );
}
