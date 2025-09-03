import { useParams } from "react-router-dom"
import WordCard from "../words/wordCard"
import { useGetCategoryWordsQuery } from "../categoryApi"
import NavigateButton from "../../../components/navigateButton"

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
            <NavigateButton navigation={'/user/my-words/favorite'} buttonText={'to favorite words'}/>
            {
                words.map((wordObj) => {
                    return (
                         <div>
                           <WordCard word={wordObj}/>
                         </div>
                    )
                })
            }
        </div>
    )
}
export default WordsSection