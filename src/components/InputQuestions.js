import React, { Component } from 'react'
import { postNewQuestion } from './InputQuestionsFunctions'
import { withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap'

class InputQuestions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            answer: ''
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    addQuestion(e) {
        e.preventDefault()
        const updatedQuestion = {
            question: this.state.question,
            optionA: this.state.optionA,
            optionB: this.state.optionB,
            optionC: this.state.optionC,
            optionD: this.state.optionD,
            answer: this.state.answer
        }

        postNewQuestion(updatedQuestion).then(res => {
            this.props.history.push('/profile')
        })
    }

    // deletedQuestion(e) {
    //     e.preventDefault()
    //     const removedQuestion = {
    //         question: this.state.question,
    //         optionA: this.state.optionA,
    //         optionB: this.state.optionB,
    //         optionC: this.state.optionC,
    //         optionD: this.state.optionD,
    //         answer: this.state.answer
    //     }

    //     deleteQuestion(removedQuestion).then(res => {
    //         this.props.history.push('/profile')
    //     })
    // }

    render() {
        return (

            <Form noValidate onSubmit={(e) => this.addQuestion(e)}>

                <Form.Group controlId="exampleForm.ControlSelect2">
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Enter Your Question Here </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        type="text"
                        className="form-control"
                        name="question"
                        placeholder="Question Here"
                        value={this.state.question}
                        onChange={this.onChange} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Option A</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        type="text"
                        className="form-control"
                        name="optionA"
                        placeholder="Enter First Option"
                        value={this.state.optionA}
                        onChange={this.onChange} />
                </Form.Group>


                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Option B</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        className="form-control"
                        name="optionB"
                        placeholder="Enter Second Option"
                        value={this.state.optionB}
                        onChange={this.onChange}
                    />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Option C</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        className="form-control"
                        name="optionC"
                        placeholder="Enter Third Option"
                        value={this.state.optionC}
                        onChange={this.onChange} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Option D</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        className="form-control"
                        name="optionD"
                        placeholder="Enter Fourth Option"
                        value={this.state.optionD}
                        onChange={this.onChange} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Enter Correct Answer Here (must be one of the options defined)</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        className="form-control"
                        name="answer"
                        placeholder="Enter Answer"
                        value={this.state.answer}
                        onChange={this.onChange} />
                </Form.Group>
                <button
                    type="submit"
                    className="btn btn-lg btn-block"
                    id="login-button">
                    Add Question
                </button>
            </Form>
        )
    }
}


export default withRouter(InputQuestions)