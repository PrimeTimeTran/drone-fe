import axios from 'axios'

export const postNewQuestion = newQuestion => {
    const body = {
        question: newQuestion.question,
        optionA: newQuestion.optionA,
        optionB: newQuestion.optionB,
        optionC: newQuestion.optionC,
        optionD: newQuestion.optionD,
        answer: newQuestion.answer
    }
    const options = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("usertoken")}` }
    };
    return axios

        .post(
            process.env.REACT_APP_SERVER + '/questions',
            body,
            options
        ).then(res => {
            console.log('Registered!')
        })
}

export const deleteQuestion = id => {

    const options = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("usertoken")}` }
    };
    return axios

        .delete(
            process.env.REACT_APP_SERVER + '/questions/me/'+ id,
            options
        ).then(res => {
            console.log('Deleted')
        })
}



export const login = user => {
    return axios
        .post(process.env.REACT_APP_SERVER + '/users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            console.log(res)
            localStorage.setItem('usertoken', res.data.data)
            return res.data.data
        })
        .catch(err => {
            console.log(err)
        })
}