import NavigateButton from "../../../../components/navigateButton"

const EndModal=({challengeResults,courseId,})=>{
  const challengeId= challengeResults.challenge._id||challengeResults.challenge
  return <div style={{ position: "fixed",top: 0, left: 0,width: "100%", height: "100%",backgroundColor: "rgba(0, 0, 0, 0.30)",display: "flex", justifyContent: "center", alignItems: "center"}}>
    <div style={{background: "white",padding: "20px",borderRadius: "8px",minWidth: "300px"}}>
        <p>you answered all the questions!!!!!!!!</p>
        <p>your grade is: {challengeResults.totalScore}</p>
        <div>
            <NavigateButton navigation={`/user/course/${courseId}/category`} buttonText={'back to course'}/>
            <NavigateButton navigation={`${challengeId}/results`} buttonText={'show resultes'}/>
        </div>
    </div>
  </div>
}

export default EndModal