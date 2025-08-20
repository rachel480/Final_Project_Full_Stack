const QuestionMenu=({questions,setCurrentIndex})=>{
   return <nav>
     {questions.map((question,index)=>(
         <button onClick={()=>setCurrentIndex(index)} style={{borderColor:question.answer.userAnswer&&'green'}}>{index+1}</button>
     ))
     }
   </nav>
}
export default QuestionMenu