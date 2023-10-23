import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import {useSelector} from 'react-redux'

const HomeMainbar = () => {

  const location = useLocation();
  const User= useSelector((state)=>(state.currentUserReducer));
  const navigate= useNavigate()

  
  const questionsList= useSelector(state => state.questionsReducer)

  // var questionsList = [
  //   {
  //     _id: 1,
  //     votes: 3,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a function?",
  //     questionBoady: "It meant to be",
  //     questionTags: ["java", "node js", "react js", "mongodb"],
  //     userPosted: "mano",
  //     askedOn: "jan 1",
  //     answer: [{
  //       answerBody:'Answer',
  //       userAnswered:'kumar',
  //       answeredOn: "jan 2",
  //       userId: 2
  //     }]
  //   },
  //   {
  //     _id: 2,
  //     votes: 0,
  //     noOfAnswers: 0,
  //     questionTitle: "What is a function?",
  //     questionBoady: "It meant to be",
  //     questionTags: ["javascript", "python"],
  //     userPosted: "mano",
  //     askedOn: "jan 1",
  //     answer: [{
  //       answerBody:'Answer',
  //       userAnswered:'kumar',
  //       answeredOn: "jan 2",
  //       userId: 2
  //     }]
  //   },
  //   {
  //     _id: 3,
  //     votes: 1,
  //     noOfAnswers: 0,
  //     questionTitle: "What is a function?",
  //     questionBoady: "It meant to be",
  //     questionTags: ["javascript", "python"],
  //     userPosted: "mano",
  //     askedOn: "jan 1",
  //     answer: [{
  //       answerBody:'Answer',
  //       userAnswered:'kumar',
  //       answeredOn: "jan 2",
  //       userId: 2
  //     }]
  //   },
  // ];


  const checkAuth= ()=>{
    if(User === null){
      alert("login or signup to ask a question")
      navigate('/Auth') 
    } else{
      navigate('/AskQuestion')
    }
  }

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button to="/AskQuestion" onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} Questions</p>
            <QuestionList questionList={questionsList.data} />  {/*QuestionList=component its not normal tag,questionList=props which is like attribute,{questionsList}=array of object  */}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar
