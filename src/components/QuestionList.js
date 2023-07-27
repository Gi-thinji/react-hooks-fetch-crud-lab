import React, {useState,useEffect}from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const[questions,setQuestions]=useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(res=>res.json())
    .then(questions=>{
      setQuestions(questions)
      console.log(questions)})
  },[])

  const handleDelete=(id)=>{
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then((res)=> res.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    })
  }

  const handleChangedAnswer=(id,answer)=>{
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({answer})
    })
    .then((res)=> res.json())
    .then((updatedQuestion)=>{
      const updatedQuestions =questions.map((question)=>{
        if(question.id===updatedQuestion.id)return updatedQuestion
          return question
        })
        setQuestions(updatedQuestions)
      })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      
        {questions.map(question=>(
          <li key={question.id}>
            <QuestionItem question={question} onDelete={handleDelete} onChangedAnswer={handleChangedAnswer}/>
          </li>
        ))}
      </ul>
  
    </section>
  );
}

export default QuestionList;
