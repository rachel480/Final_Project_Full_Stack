import { useParams } from "react-router-dom"
import { useGetCourseWordsQuery } from "./courseApi"
import speak from "../../utils/speech"
import WordSectionTable from "./wordSectionTable"
import { useState } from "react"
import SearchInput from "../../components/searchInput"
import downloadWordFile from "../../utils/exportToWord"
import SortSelect from "../../components/sortSelect"
import { Box, Button, Paper } from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"
import CustomLink from "../../components/customLink"
import LoadingSpinner from "../../components/loadingSpinner"
import ErrorMessage from "../../components/errorMessage"


const WordSection = () => {
  const { courseId } = useParams()
  const [searchText, setSearchText] = useState("")
  const [sortBy, setSortBy] = useState("sort by")

  const handleSpeak = (word) => {
    speak(word)
  }

  const { data: words = [], isLoading, error } = useGetCourseWordsQuery(courseId)

  const filteredWords = words.filter(
    (word) =>
      word.word.toLowerCase().includes(searchText.toLowerCase()) ||
      word.translation.toLowerCase().includes(searchText.toLowerCase())
  )

  const sortByWord = (a, b) => a.word.localeCompare(b.word)
  const sortByCategory = (a, b) => a.categoryName.localeCompare(b.categoryName)

  const sortedWords = [...filteredWords].sort(
    sortBy === "words"
      ? sortByWord
      : sortBy === "categories"
      ? sortByCategory
      : () => 0
  )

  if (isLoading) return  <LoadingSpinner text="טוען מילים...."/>
  if (error) return  <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>

  return (
    <Box className="flex flex-col items-center gap-4 p-6">
      <Paper
        elevation={4}
        className="w-full max-w-5xl p-6 rounded-2xl bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-md"
      >
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-xl"
            onClick={() => downloadWordFile(sortedWords)}
          >
            להורדת המילים
          </Button>

          <CustomLink
            navigation={"/user/my-words/favorites"}
            children={"למילים מועדפות"}
          />

          <SortSelect
            sortBy={sortBy}
            setSortBy={setSortBy}
            options={["words", "categories"]}
          />

          <SearchInput
            searchText={searchText}
            setSearchText={setSearchText}
            placeholder={"Search word or translation..."}
          />
        </div>

        <WordSectionTable words={sortedWords} handleSpeak={handleSpeak} />
      </Paper>
    </Box>
  )
}

export default WordSection
