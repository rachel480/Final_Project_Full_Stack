import { useParams } from "react-router-dom"
import { useGetCourseWordsQuery } from "./courseApi"
import speak from "../../utils/speech"
import WordSectionTable from "./wordSectionTable"
import { useState } from "react"
import SearchInput from "../../components/searchInput"
import downloadWordFile from '../../utils/exportToWord'
import SortSelect from "../../components/sortSelect"
import NavigateButton from "../../components/navigateButton"

const WordSection = () => {

    const { courseId } = useParams()
    const [searchText, setSearchText] = useState("")
    const [sortBy, setSortBy] = useState('sort by')
    
    const handleSpeak = (word) => {
        speak(word)
    }
    const { data: words = [], isLoading, error } = useGetCourseWordsQuery(courseId)
    console.log(words)
    const filteredWords = words.filter(word => word.word.indexOf(searchText.toLowerCase()) > -1 || word.translation.indexOf(searchText.toLowerCase()) > -1)
    
    const sortByWord = (a, b) => a.word.localeCompare(b.word);
    const sortByCategory = (a, b) => a.categoryName.localeCompare(b.categoryName)

    const sortedWords = [...filteredWords].sort(
        sortBy === "words" ? sortByWord :sortBy==='categories' ? sortByCategory:()=>0
    )
    
    if (isLoading)
        return <p>loading words...</p>

    if (error)
        return <p>error loading words...</p>

    return (
        <div>
            <button onClick={()=>downloadWordFile(sortedWords)}>words</button>
            <NavigateButton navigation={'/user/my-words/favorite'} buttonText={'to favorite words'}/>
            <SortSelect sortBy={sortBy} setSortBy={setSortBy} options={['words','categories']} />
            <SearchInput searchText={searchText} setSearchText={setSearchText}  placeholder={"Search word or translation..."}/>
            <WordSectionTable words={sortedWords} handleSpeak={handleSpeak} />
        </div>
    )

}

export default WordSection