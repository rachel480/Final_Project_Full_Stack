import { useState } from "react";
import BaseList from "../common/BaseList";
import { useGetAllMyCategorisQuery } from "./myCategoryApi";
import AddCategoryForm from "./addCategoryForm";
import CategoryCard from "./categoryCard";
import SingleCategoryWords from "./singleCategoryWords";

const MyCategoryList = () => {
  const [searchText, setSearchText] = useState("");
  const [showSingleCategory, setShowSingleCategory] = useState(null);

  const { data: categories = [], isLoading, error } = useGetAllMyCategorisQuery();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderCategory = (category) => (
    <CategoryCard
      key={category._id}
      category={category}
      setShowSingleCategory={setShowSingleCategory}
    />
  );

  if (showSingleCategory) {
    return (
      <SingleCategoryWords
        showSingleCategory={showSingleCategory}
        setShowSingleCategory={setShowSingleCategory}
      />
    );
  }

  return (
    <BaseList
      title="ניהול קטגוריות אישיות"
      placeholder="🔎Search category..."
      data={filteredCategories}
      isLoading={isLoading}
      error={error}
      searchKey="name"
      renderItem={renderCategory}
      AddFormComponent={AddCategoryForm}
    />
  );
};

export default MyCategoryList;
