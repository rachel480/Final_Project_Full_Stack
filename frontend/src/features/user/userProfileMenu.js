import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, logout } from "../auth/authSlice";
import { toast } from "react-toastify";

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userAccessToken");

    dispatch(logout());

    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      onClose: () => navigate("/login")
    })
  }

  const goToProfile = () => {
    setOpen(false);
    navigate("profile");
  };

  return (
    <div ref={menuRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        <img
          src={user?.avatarUrl || "/default-avatar.png"}
          alt="avatar"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid #ddd",
            objectFit: "cover",
          }}
        />
        <span>{user?.name || "משתמש"}</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: 8,
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
            minWidth: 160,
            zIndex: 100,
          }}
        >
          <button
            onClick={goToProfile}
            style={menuItemStyle}
          >
            פרופיל אישי
          </button>
          
          <button
            onClick={handleLogout}
            style={{ ...menuItemStyle, color: "red" }}
          >
           Log Out
          </button>
        </div>
      )}
    </div>
  );
};

const menuItemStyle = {
  display: "block",
  width: "100%",
  textAlign: "right",
  padding: "10px 14px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  textDecoration: "none",
  color: "black",
};

export default UserProfileMenu