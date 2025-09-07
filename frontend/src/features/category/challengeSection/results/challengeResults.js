import { useParams } from "react-router-dom"
import { useGetChallengeResultsQuery } from "../../../challenge/challengeApi"
import QuestionPrompt from "./questionPrompt"
import OptionsReview from "./optionsReview"
import NavigateButton from "../../../../components/navigateButton"

const styles = {
  container: { padding: '16px' },
  card: { border: '1px solid #ddd', borderRadius: '8px', padding: '12px', margin: '12px auto', width: 'min(900px, 92vw)', background: 'white' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  title: { fontWeight: 600, fontSize: '16px' },
  score: { fontSize: '14px' },
  prompt: { margin: '8px 0' },
  promptImg: { width: "120px", height: "120px", objectFit: "contain", border: '1px solid #eee', borderRadius: '6px' },
  optionsRow: { display: "flex", gap: "10px", flexWrap: 'wrap' },
  optionBtn: { border: '2px solid transparent', borderRadius: '8px', padding: '8px', background: 'white', cursor: 'default' },
  optionImg: { width: "80px", height: "80px", objectFit: "contain", display: 'block' },
  legend: { display: 'flex', gap: '12px', fontSize: '12px', marginTop: '6px', color: '#555' },
  legendBadge: (bg) => ({ display: 'inline-block', padding: '2px 6px', borderRadius: '6px', background: bg, color: 'white' })
}

const ChallengeResults = () => {
  const { challengeId,courseId } = useParams()
  const { data, isLoading, error } = useGetChallengeResultsQuery(challengeId)

  if (isLoading) return <p>loading challenge...</p>
  if (error) return <p>error loading challenge...</p>

  const questions = data?.questions || []
  const totalScore = data?.totalScore || 0

  return (
    <div style={styles.container}>
      <h2 style={{ margin: '8px 0 16px' }}>challenge results</h2>

      {questions.map((question, i) => (
        <div key={question?._id || i} style={styles.card}>
          <div style={styles.headerRow}>
            <div style={styles.title}>שאלה {i + 1}</div>
            <div style={styles.score}>
              grade: {question?.userAnswer?.grade ?? 0}
            </div>
          </div>

          <QuestionPrompt question={question} status={question?.status ?? 0} styles={styles}/>
          <OptionsReview question={question} styles={styles}/>

          <div style={styles.legend}>
            <span><span style={styles.legendBadge('#24a148')}>correct</span> correct answer</span>
            <span><span style={styles.legendBadge('#da1e28')}>not correct</span> not correct answer</span>
          </div>
        </div>
      ))}

      <div style={{ ...styles.card, display: 'flex', justifyContent: 'space-between' }}>
        <strong>final grade:</strong>
        <span>{totalScore}</span>
      </div>
      <NavigateButton navigation={`/user/course/${courseId}/category`} buttonText={'back to course'}/>
    </div>
  )
}

export default ChallengeResults