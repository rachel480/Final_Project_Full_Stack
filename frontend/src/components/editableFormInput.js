import { useState } from "react";

const EditableFormInput = ({ label, htmlFor, register, error, placeholder, type = "text" }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div style={{ marginBottom: "12px" }}>
      <label htmlFor={htmlFor} style={{ display: "block", fontWeight: "bold" }}>
        {label}
      </label>
      <input
        id={htmlFor}
        {...register}
        placeholder={placeholder}
        type={type}
        readOnly={!isEditing}                 
        onDoubleClick={() => setIsEditing(true)} 
        onBlur={() => setIsEditing(false)}    
        style={{
          width: "100%",
          padding: "8px",
          border: isEditing ? "1px solid #1976d2" : "1px solid #ccc",
          borderRadius: "6px",
          marginTop: "4px",
          backgroundColor: isEditing ? "#fff" : "#f5f5f5",
          cursor: isEditing ? "text" : "pointer",
        }}
      />
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
};

export default EditableFormInput