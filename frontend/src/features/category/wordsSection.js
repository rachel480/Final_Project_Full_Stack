import { useParams } from "react-router-dom"
import WordCard from "../word/wordCard"
import { useGetCategoryWordsQuery } from "./categoryApi"

const WordsSection = () => {
     const { categoryId} = useParams()
     const { data: words, isLoading, error } = useGetCategoryWordsQuery(categoryId)
    
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