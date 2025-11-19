import { useState } from "react";
import LoadingSpinner from "../../../components/loadingSpinner";
import ErrorMessage from "../../../components/errorMessage";
import AddButton from "../../../components/addButton";
import InfoMessage from "../../../components/infoMessage";
import SearchInput from "../../../components/searchInput";

const BaseList = ({title,placeholder,data = [],isLoading,error,searchKey, renderItem,AddFormComponent,}) => {
  const [searchText, setSearchText] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"} />;

  const filteredData = data.filter((item) => {
    const value = searchKey.split('.').reduce((acc, key) => acc?.[key], item);
    return value?.toLowerCase().includes(searchText.toLowerCase());
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-300 via-green-200 to-green-100 
                p-6 rounded-b-3xl shadow-2xl -mt-16
                flex flex-col items-center gap-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[rgba(229,145,42,0.9)] drop-shadow-sm">{title}</h2>
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <SearchInput
            searchText={searchText}
            setSearchText={setSearchText}
            placeholder={placeholder}
          />
          <AddButton onClick={() => setShowAddForm(true)} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.length === 0 ? (
          <InfoMessage message="אין פריטים להצגה" />
        ) : (
          filteredData.map(renderItem)
        )}
      </div>

      {showAddForm && AddFormComponent && <AddFormComponent setShowAddForm={setShowAddForm} />}
    </div>
  );
};

export default BaseList;