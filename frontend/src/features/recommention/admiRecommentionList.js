import ErrorMessage from "../../components/errorMessage";
import LoadingSpinner from "../../components/loadingSpinner";
import { useGetAllRecommendionsQuery, useApproveRecommendionMutation, useDeleteRecommendionMutation } from "./recommendtionApi";

const AdminRecommendionList = () => {

  const { data: recommendions = [], isLoading, error } = useGetAllRecommendionsQuery()
  const [approveRecommendion] = useApproveRecommendionMutation()
  const [deleteRecommendion] = useDeleteRecommendionMutation()
 
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"} />

  return (
    <div className="p-6 max-md:p-3">
      <h1 className="text-3xl font-bold mb-6 text-purple-700 max-md:text-2xl text-center">ניהול המלצות גולשים</h1>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="w-full text-right border-collapse bg-white">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3 max-md:p-2 max-md:text-sm">תוכן</th>
              <th className="p-3 max-md:p-2 max-md:text-sm">שם משתמש</th>
              <th className="p-3 max-md:p-2 max-md:text-sm">דירוג</th>
              <th className="p-3 max-md:p-2 max-md:text-sm">אישור</th>
              <th className="p-3 max-md:p-2 max-md:text-sm">מחיקה</th>
            </tr>
          </thead>
          <tbody>
            {recommendions.map((recommendion) => (
              <tr key={recommendion._id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3 max-md:p-2 max-md:text-sm">{recommendion.recommendtion}</td>
                <td className="p-3 max-md:p-2 max-md:text-sm">{recommendion.userName}</td>
                <td className="p-3 max-md:p-2 max-md:text-sm">⭐ {recommendion.rating}</td>

                <td className="p-3 max-md:p-2">
                  {recommendion.approved ? (
                    <span className="text-green-700 font-bold max-md:text-sm">מאושר</span>
                  ) : (
                    <button
                      onClick={() => approveRecommendion(recommendion._id)}
                      className="px-4 py-2 max-md:px-2 max-md:py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
                    >
                      אשר
                    </button>
                  )}
                </td>

                <td className="p-3 max-md:p-2">
                  <button
                    onClick={() => deleteRecommendion(recommendion._id)}
                    className="px-4 py-2 max-md:px-2 max-md:py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                  >
                    מחק
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminRecommendionList