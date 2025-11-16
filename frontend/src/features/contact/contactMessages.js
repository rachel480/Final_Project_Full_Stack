import ErrorMessage from "../../components/errorMessage";
import InfoMessage from "../../components/infoMessage";
import LoadingSpinner from "../../components/loadingSpinner";
import { useDeleteMessageMutation, useGetAllMessagesQuery } from "./contactApi";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

const ContactMessagesList=() =>{
  const { data: messages, isLoading, isError } = useGetAllMessagesQuery()
  const [deleteMessage] = useDeleteMessageMutation()

  if (isLoading) return <LoadingSpinner text="טוען הודעות..." />
  if (isError) return <ErrorMessage message="שגיאה בטעינת ההודעות" />
  if (!messages || messages.length === 0) return <InfoMessage message="לא נמצאו הודעות להצגה!!!" />

  const handleDelete = async (messageId) => {
    try {
      await deleteMessage({ id: messageId }).unwrap()
      toast.success(`message was deleted successfully!`, {
        position: "top-right",
        autoClose: 3000,
      })
    } catch (err) {
      const errorMsg =
        err?.data?.message || "Server error occurred while deleting the message."
      toast.error(errorMsg, { position: "top-right", autoClose: 4000 })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 mr-[10rem]">
      {messages.map((message) => (
        <Card
          key={message._id}
          className="shadow-lg rounded-2xl border border-gray-200 bg-white"
        >
          <CardContent>
            <Typography variant="h6" className="font-bold text-gray-800 mb-2">
              {message.name}
            </Typography>

            <Typography className="text-gray-600 text-sm">
              <strong>אימייל:</strong> {message.email}
            </Typography>

            <Typography className="text-gray-600 text-sm mt-2">
              <strong>תאריך:</strong> {new Date(message.createdAt).toLocaleString()}
            </Typography>

            <Typography className="text-gray-700 mt-4 whitespace-pre-wrap leading-relaxed">
              {message.message}
            </Typography>
          </CardContent>

          <CardActions className="flex justify-end px-4 pb-4">
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(message._id)}
            >
              מחק
            </Button>
          </CardActions>
        </Card>

      ))}

    </div>
  );
}
export default ContactMessagesList