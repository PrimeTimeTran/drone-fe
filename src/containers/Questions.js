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
    <Container className="px-sm-0 d-flex justify-content-center flex-column">
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
      <a
        target="_blank"
        className="align-self-center"
        href="https://click.dji.com/AGlsT4x0qbq2wNwvR9ggBg?pm=ad_image"
      >
        <img
          alt="ad"
          style={{ margin: 15 }}
          className="align-self-center"
          src="https://u.djicdn.com/uploads/ad_image_file/file/4200/970-250-a_%E5%8F%8C%E4%BA%BA.jpg"
        />
      </a>
      <Row>
        <Col className="px-sm-0">{renderQuestions()}</Col>
      </Row>
    </Container>
  );
}
