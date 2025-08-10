import { useParams } from "react-router-dom"
import { useGetCourseWordsQuery } from "./courseApi"
import speak from "../../utils/speech"
import WordSectionTable from "./wordSectionTable"
import { useState } from "react"
import SearchInput from "../../components/searchInput"
import WordSectionSort from "./wordSectionSort"
import downloadWordFile from '../../utils/exportToWord'

const WordSection = () => {

    const { courseId } = useParams()
    const [searchText, setSearchText] = useState("")
    const [sortBy, setSortBy] = useState('words')
    const handleSpeak = (word) => {
        speak(word)
    }

    const handleSearch = (word) => {
        setSearchText(word)
    }
    const handleSort = (sortBy) => {
        setSortBy(sortBy)
    }
    const { data: words = [], isLoading, error } = useGetCourseWordsQuery(courseId)
    console.log(words)
    const filteredWords = words.filter(word => word.word.indexOf(searchText.toLowerCase()) > -1 || word.translation.indexOf(searchText.toLowerCase()) > -1)
    
    const sortByWord = (a, b) => a.word.localeCompare(b.word);
    const sortByCategory = (a, b) => a.categoryName.localeCompare(b.categoryName)

    const sortedWords = [...filteredWords].sort(
        sortBy === "words" ? sortByWord : sortByCategory
    )
    if (isLoading)
        return <p>loading words...</p>

    if (error)
        return <p>error loading words...</p>

    return (
        <div>
            <button onClick={()=>downloadWordFile(sortedWords)}>words</button>
            <WordSectionSort value={sortBy} handleSort={handleSort} />
            <SearchInput value={searchText} handleSearch={handleSearch} />
            <WordSectionTable words={sortedWords} handleSpeak={handleSpeak} />
        </div>
    )

}

export default WordSection