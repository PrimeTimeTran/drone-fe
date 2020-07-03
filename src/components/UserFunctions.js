import axios from 'axios'

export const register = newUser => {
    return axios
    .post(process.env.REACT_APP_SERVER + '/users/register', {
        first_name: newUser.first_name,
        last_name:newUser.last_name,
        email: newUser.email,
        password:newUser.password, 
    })
    .then(res => {
        console.log('Registered!')
    })
}

export const login = user => {
    return axios
    .post(process.env.REACT_APP_SERVER +'/users/login',{
        email: user.email,
        password: user.password
    }) 
    .then(res=> {
        console.log(res)
        localStorage.setItem('usertoken', res.data.data)
        return res.data.data
    })
    .catch(err => {
        console.log(err)
    })
}