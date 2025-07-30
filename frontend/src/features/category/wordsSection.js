import { useParams } from "react-router-dom"
import { useGetWordsByCategoryQuery } from "../word/wordApi"
import WordCard from "../word/wordCard"

const WordsSection = () => {
    const { categoryName } = useParams()
    const { data: words, isLoading, error } = useGetWordsByCategoryQuery(categoryName)
    
    if (isLoading)
        return <p>Loading words........</p>

    if (error)
        return <p>Error loading  words!!</p>

    if (words.length === 0)
        return <p>no words found</p>
    return (
        <div>
            {
                words.map((wordObj) => {
                    return (
                         <div>
                           <WordCard word={wordObj.word} translation={wordObj.translation}/>
                         </div>
                    )
                })
            }
        </div>
    )
}
export default WordsSection