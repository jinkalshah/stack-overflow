import React, { useState, useRef, useEffect } from "react";
import "./AskQuestion.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { askQuestion } from "../../actions/question";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionObj, setQuestionObj] = useState({
    text: "",
    code: "",
    videoUrl:{}
  });
  const formData=new FormData
  const codeRef = useRef(null);
  // const [questionBody,setQuestionBody]= useState('')
  const [questionTags, setQuestionTags] = useState("");
  const [isUpdating, setisUpdating] = useState(false);
  const [showCode,setShowCode] = useState(false);
  const [myurl,setmyurl]=useState('')
  const updateItemHandler = (e) => {
    setisUpdating(true);
    codeRef.current.focus();
  };
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User === null) {
      navigate("/Auth");
    } else {
      dispatch(
        askQuestion(
          {
            questionTitle,
            questionBody: questionObj,
            questionTags,
            userPosted: User?.result?.name,
            userId: User?.result?._id,
          },
          navigate
        )
      );
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionObj((oldObj) => ({
        ...oldObj,
        text: oldObj.text + "\n",
      }));
      // setQuestionBody(questionBody+ "\n")
    }
  };

  useEffect(()=>{
    const videoInput=document.getElementById('addVideosInput');
    if(videoInput){
      videoInput.addEventListener('change',(e)=>{
        console.log(e.target.files)
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        console.log(url);
        formData.append("video",JSON.stringify(file))
        setQuestionObj((oldObj)=>({
          ...oldObj,
          videoUrl: formData
        }))
        setmyurl(url)
      })
    }
  },[])

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a plublic Question</h1>
        <h1>{questionObj.text}</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you're asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g.Is there any R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <div style={{ display: "flex"}}>
                <div 
                style={{ flexGrow: "0.5",border: '1px solid #000', width: '60vw', height: '200px' }}
                 contentEditable={true}
                 id="ask-ques-body"
                    onInput={(e) => {
                      setQuestionObj((oldObj) => ({
                        ...oldObj,
                        text: e.target.innerText,
                      }));
                    }}
                    onKeyPress={handleEnter}
                 >
                  {/* <textarea
                    name=""
                    id="ask-ques-body"
                    onChange={(e) => {
                      setQuestionObj((oldObj) => ({
                        ...oldObj,
                        questionBody: e.target.value,
                      }));
                    }}
                    cols="30"
                    rows="10"
                  ></textarea> */}
                </div>
                <div style={{width: '5vw',height:'200px',margin: '5px'}}>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                  <button onClick={(e)=>{e.preventDefault();setShowCode(!showCode)}} style={{height: '40px',margin: '4px'}}>&lt;/&gt;</button>
                  <button onClick={(e)=>{
                    e.preventDefault();
                    document.getElementById('addVideosInput').click()
                  }} style={{height: '40px',margin: '4px'}}>+</button>
                  <input type="file" class="d-none" id="addVideosInput" accept=" video/*" style={{visibility:"hidden"}} />
                  </div>
                </div>
                {
                  showCode
                  &&
                  <div style={{ flexGrow: "0.4" }}>
                  <div
                    ref={codeRef}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    className="codeClass"
                    onInput={(e) => {
                      setQuestionObj((oldObj) => ({
                        ...oldObj,
                        code: e.target.innerText,
                      }));
                    }}
                  ></div>
                </div>
                }
              </div>
            </label>
            {
              myurl &&
              <div style={{margin: "5px", color: "green"}}>Video has been uploaded Successfully!</div>
            }
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about </p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g.(xml typescript wordpress)"
              />
            </label>
          </div>
          <input
          disabled={!questionObj.text || questionTags.length === 0 || !questionTitle}
            type="submit"
            value="Review your question"
            className="review-btn"
            style={{pointerEvents: (!questionObj.text || questionTags.length === 0 || !questionTitle) ? 'none' : 'all'}}
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
