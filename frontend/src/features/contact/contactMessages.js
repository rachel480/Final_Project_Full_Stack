import ErrorMessage from "../../components/errorMessage";
import InfoMessage from "../../components/infoMessage";
import LoadingSpinner from "../../components/loadingSpinner";
import { useDeleteMessageMutation, useGetAllMessagesQuery } from "./contactApi";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";

const ContactMessagesList = () => {
  const { data: messages, isLoading, isError } = useGetAllMessagesQuery();
  const [deleteMessage] = useDeleteMessageMutation();
  const [readMessages, setReadMessages] = useState([]);

  if (isLoading) return <LoadingSpinner text="טוען הודעות..." />;
  if (isError) return <ErrorMessage message="שגיאה בטעינת ההודעות" />;
  if (!messages || messages.length === 0) return <InfoMessage message="לא נמצאו הודעות להצגה!!!" />;

  const handleDelete = async (messageId) => {
    try {
      await deleteMessage({ id: messageId }).unwrap();
      toast.success(`Message was deleted successfully!`, { position: "top-right", autoClose: 3000 });
    } catch (err) {
      const errorMsg = err?.data?.message || "Server error occurred while deleting the message.";
      toast.error(errorMsg, { position: "top-right", autoClose: 4000 });
    }
  };

  const toggleRead = (messageId) => {
    setReadMessages((prev) =>
      prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId]
    );
  };

  return (
    <div className="flex justify-center p-6 mr-[60px]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl">
        {messages.map((message, index) => {
          const isRead = readMessages.includes(message._id);
          return (
            <Card
              key={message._id}
              className={`shadow-lg rounded-2xl border border-gray-200 transform transition-all duration-500 ease-out
                          ${isRead ? "opacity-60" : "opacity-100 hover:scale-105"}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent>
                <Typography variant="h6" className="font-bold text-gray-800 mb-2">
                  {message.name}
                </Typography>

                <Typography className="text-gray-600 text-sm">
                  <strong>אימייל:</strong>{" "}
                  <a href={`mailto:${message.email}`} className="hover:underline hover:text-cyan-500 transition-colors">
                    {message.email}
                  </a>
                </Typography>

                <Typography className="text-gray-600 text-sm mt-2">
                  <strong>תאריך:</strong> {new Date(message.createdAt).toLocaleString()}
                </Typography>

                <Typography className="text-gray-700 mt-4 whitespace-pre-wrap leading-relaxed">
                  {message.message}
                </Typography>
              </CardContent>

              <CardActions className="flex justify-between px-4 pb-4">
                <Button variant="contained" color="error" onClick={() => handleDelete(message._id)}>
                  מחק
                </Button>
                <Button
                  variant="outlined"
                  color={isRead ? "success" : "primary"}
                  onClick={() => toggleRead(message._id)}
                >
                  {isRead ? "נקראה" : "סמן כניקרא"}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ContactMessagesList