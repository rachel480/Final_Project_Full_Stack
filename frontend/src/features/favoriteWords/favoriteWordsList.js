import { useState } from "react";
import { useDeleteFavoriteWordMutation, useGetAllFavoriteWordsQuery, useUpdateFavoriteWordRaitingMutation } from "./favoriteWordApi";
import FavoriteWordCard from "./favoriteWordCard";
import Pagination from "../../components/pagination";
import LoadingSpinner from "../../components/loadingSpinner";
import ErrorMessage from "../../components/errorMessage";
import PageTitle from "../../components/pageTitle";
import InfoMessage from "../../components/infoMessage";

const FavoriteWordsList = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(null);

  const limit = 10;

  const [deleteFavoriteWord] = useDeleteFavoriteWordMutation();
  const [updateFavoriteWordRaiting] = useUpdateFavoriteWordRaitingMutation();
  const { data, isLoading, error } = useGetAllFavoriteWordsQuery({ page, limit });

  const favWords = data?.words || [];
  const totalPages = data?.totalPages;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"} />;

  return (
    <div className="px-4 pt-8 min-h-screen">

      <div className="max-w-6xl mx-auto text-center mb-8">
        <PageTitle text="המילים המועדפות שלי" size="h4"/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favWords.length === 0 ? (
          <InfoMessage message="לא נמצאו מילים מועדפות"/>
        ) : (
          favWords.map(favWord => (
            <FavoriteWordCard
              key={favWord._id}
              favWord={favWord}
              showModal={showModal}
              setShowModal={setShowModal}
              deleteFavoriteWord={deleteFavoriteWord}
              updateFavoriteWordRaiting={updateFavoriteWordRaiting}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}

export default FavoriteWordsList