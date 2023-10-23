import axios from 'axios'

const API= axios.create({ baseURL: 'https://stack-over-flow-jlym.onrender.com'})

API.interceptors.request.use((req) =>{
    if(localStorage.getItem('Profile')){
        req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req; 
})
export const logIn = (authData) => API.post('/users/login',authData);
export const signUp = (authData) => API.post('/users/signup',authData);

export const postQuestion= (questionData) => API.post('/questions/Ask', questionData);
export const getAllQuestions= () => API.get('/questions/get');

export const postAnswer = (id,noOfAnswers, answerBody, userAnswered, userId ) => API.patch(`/answer/post/${id}`, {noOfAnswers, answerBody, userAnswered, userId})
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)
export const deleteAnswer = (id, answerId, noOfAnswer) => API.patch(`/answer/delete/${id}`,{ answerId, noOfAnswer})

export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`,{ value, userId})

export const fetchAllUsers = ()=> API.get('/users/getAllUsers')

export const updateProfile= (id, updatedata) => API.patch(`/users/update/${id}`, updatedata)