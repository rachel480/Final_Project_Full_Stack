import { useState } from "react"

const WordCard=({word,translation})=>{

    const [showWord,setShowWord]=useState(true)
    {
        return showWord?
        // front card
        <div style={{width:"20vW",marginRight:"40vw",marginLeft:"40vw",height:"40vh", display:"flex",flexDirection:"column",backgroundColor:"red",borderColor:"black",borderStyle:"solid",marginBottom:"3%"}}>
            <div>{word}</div>
            <div style={{ display:"flex",flexDirection:"column"}}>
                <button >sound</button>
                <button onClick={()=>setShowWord(false)}>translation⬅️</button>
            </div>
        </div>
        :
        // back card
        <div style={{width:"20vW",marginRight:"40vw",marginLeft:"40vw",height:"40vh", display:"flex",flexDirection:"column",backgroundColor:"green",borderColor:"black",borderStyle:"solid",marginBottom:"3%"}}>
            <div>{translation}</div>
            <button onClick={()=>setShowWord(true)}>English➡️</button>
        </div>
    }
}

export default WordCard