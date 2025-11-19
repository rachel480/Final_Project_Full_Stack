import ErrorMessage from "../../components/errorMessage";
import LoadingSpinner from "../../components/loadingSpinner";
import { useGetAllRecommendionsQuery, useApproveRecommendionMutation, useDeleteRecommendionMutation } from "./recommendtionApi";

const AdminRecommendionList = () => {

  const { data: recommendions = [], isLoading,error } = useGetAllRecommendionsQuery()
  const [approveRecommendion] = useApproveRecommendionMutation()
  const [deleteRecommendion] = useDeleteRecommendionMutation()
 
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">ניהול תגובות משתמשים</h1>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="w-full text-right border-collapse bg-white">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3">תוכן</th>
              <th className="p-3">שם משתמש</th>
              <th className="p-3">דירוג</th>
              <th className="p-3">אישור</th>
              <th className="p-3">מחיקה</th>
            </tr>
          </thead>
          <tbody>
            {recommendions.map((recommendion) => (
              <tr key={recommendion._id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{recommendion.recommendtion}</td>
                <td className="p-3">{recommendion.userName}</td>
                <td className="p-3">⭐ {recommendion.rating}</td>

                <td className="p-3">
                  {recommendion.approved ? (
                    <span className="text-green-700 font-bold">מאושר</span>
                  ) : (
                    <button
                      onClick={() => approveRecommendion(recommendion._id)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    >
                      אשר
                    </button>
                  )}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => deleteRecommendion(recommendion._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
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
