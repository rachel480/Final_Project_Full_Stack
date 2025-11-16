import { useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../../user/userApi";
import CardContainer from "../../../components/cardContainer";
import BackButton from "../../../components/backButton";
import SectionTitle from "../../../components/sectionTitle";
import PersonIcon from "@mui/icons-material/Person";
import { Card, CardContent, Typography, Box } from "@mui/material";

const SingleUserCard = () => {
  const { userId } = useParams();
  const { data: user, isLoading, error } = useGetSingleUserQuery(userId);

  if (isLoading)
    return <p className="text-gray-500 text-center mt-8">Loading user...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-8">
        {error?.data?.message || "Something went wrong"}
      </p>
    );
  if (!user)
    return <p className="text-gray-500 text-center mt-8">User not found</p>;

  const initial = user.userName?.charAt(0)?.toUpperCase() || "?";

  return (
    <CardContainer>
      <BackButton navigation={"/user/admin/users"} />
      <SectionTitle text="User" Icon={PersonIcon} />

      <Card className="mt-4 w-full max-w-md mx-auto shadow-md rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-lg transition-shadow duration-300">
        <CardContent>
          <Box className="flex flex-col items-center text-center space-y-4">
            
            {/* Initial avatar */}
            <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold">
              {initial}
            </div>

            {/* Username */}
            <Typography className="!text-[rgba(229,145,42,0.9)] font-semibold text-xl">
              {user.userName}
            </Typography>

            {/* User details */}
            <Box className="w-full text-left space-y-1 text-gray-700">
              <Typography>
                <strong className="!text-[rgba(229,145,42,0.9)]">ID:</strong> {user._id}
              </Typography>
              <Typography>
                <strong className="!text-[rgba(229,145,42,0.9)]">Full name:</strong> {user.fullName}
              </Typography>
              <Typography>
                <strong className="!text-[rgba(229,145,42,0.9)]">Email:</strong> {user.email}
              </Typography>
              <Typography>
                <strong className="!text-[rgba(229,145,42,0.9)]">Role:</strong> {user.roles}
              </Typography>
              <Typography>
                <strong className="!text-[rgba(229,145,42,0.9)]">Phone:</strong> {user.phone}
              </Typography>
              <Typography>
                <strong className="!text-[rgba(229,145,42,0.9)]">Active?:</strong> {user.active ? "true" : "false"}
              </Typography>
              <Typography>
                <strong className="!text-[rgba(229,145,42,0.9)]">Created at:</strong> {user.createdAt}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default SingleUserCard;
