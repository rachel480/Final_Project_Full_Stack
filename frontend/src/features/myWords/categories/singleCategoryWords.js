import { useState } from "react";
import CategoryWordDetailes from "./categoryWordDetailes";
import { useGetWordsOfCategoryQuery } from "./myCategoryApi";
import AddWordForm from "../words/addWordForm";
import SearchInput from "../../../components/searchInput";
import LoadingSpinner from "../../../components/loadingSpinner";
import ErrorMessage from "../../../components/errorMessage";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import InfoMessage from "../../../components/infoMessage";

const SingleCategoryWords = ({ showSingleCategory: category, setShowSingleCategory }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchText , setSearchText] = useState('');
  const { data: words = [], isLoading, error } = useGetWordsOfCategoryQuery(category._id);
  const filteredWords = words.filter(word => word.word.word.indexOf(searchText.toLowerCase()) > -1);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"} />;

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">

      <Typography 
        variant="h5" 
        className="font-bold text-center mb-6"
        sx={{ color: "#ff9800", textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
      >
        מילים בקטגוריה: {category.name}
      </Typography>

      <Box 
        className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-4 rounded-2xl shadow-lg"
        sx={{
          background: "linear-gradient(to right, #fff59d, #ffd54f)",
        }}
      >
        <Box className="flex gap-2">
          <Tooltip title="חזור אחורה" arrow>
            <IconButton 
              onClick={() => setShowSingleCategory(null)} 
              sx={{ bgcolor: "#ff7043", "&:hover": { bgcolor: "#ff5722" }, color: "white" }}
            >
              <Close />
            </IconButton>
          </Tooltip>

          <Tooltip title="הוסף מילה חדשה" arrow>
            <IconButton 
              onClick={() => setShowAddForm(true)} 
              sx={{ bgcolor: "#ffca28", "&:hover": { bgcolor: "#ffc107" }, color: "white" }}
            >
              <Add />
            </IconButton>
          </Tooltip>
        </Box>

        <Box className="flex-1">
          <SearchInput 
            searchText={searchText} 
            setSearchText={setSearchText} 
            placeholder="🔍 חפש מילה..." 
          />
        </Box>
      </Box>

      {filteredWords.length === 0 ? (
        <InfoMessage message="אין מילים להצגה"/>
      ) : (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map((word) => (
            <CategoryWordDetailes key={word._id} word={word} />
          ))}
        </Box>
      )}

      {showAddForm && <AddWordForm setShowAddForm={setShowAddForm} currentCategory={category.name} />}
    </div>
  );
};

export default SingleCategoryWords;
