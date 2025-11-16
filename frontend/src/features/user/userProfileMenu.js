import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, logout } from "../auth/authSlice";
import { toast } from "react-toastify";
import { Logout, AccountCircle } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";

const UserProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userAccessToken");
    dispatch(logout());
    toast.success("התנתקת בהצלחה", {
      position: "top-right",
      autoClose: 3000,
      onClose: () => navigate("/login"),
    });
  };

  const goToProfile = () => {
    setOpen(false);
    navigate("profile");
  };

  return (
    <div ref={menuRef} className="relative inline-block text-right">
      <Tooltip title={user?.userName || "משתמש"} arrow>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer"
        >
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-9 h-9 rounded-full border border-gray-300 object-cover"
            />
          ) : (
            <AccountCircle
              className="w-9 h-9 text-white"
              fontSize="large"
            />
          )}
        </button>
      </Tooltip>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            onClick={goToProfile}
            className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
          >
            <AccountCircle fontSize="small" />
            <span>פרופיל אישי</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-lg"
          >
            <Logout fontSize="small" />
            <span>התנתקות</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfileMenu