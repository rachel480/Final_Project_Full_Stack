const ConfirmDeleteModal = ({ itemName, setShowConfirm, handleDelete }) => {
    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                zIndex: 10,
                width: "280px",
                textAlign: "center",
            }}
        >
            <p>
                Are you sure you want to delete{" "}
                <strong style={{ color: "#e53935" }}>{itemName}</strong>?
            </p>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
                <button
                    onClick={handleDelete}
                    style={{
                        backgroundColor: "#e53935",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Delete
                </button>

                <button
                    onClick={() => setShowConfirm(false)}
                    style={{
                        backgroundColor: "#9e9e9e",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Cancel
                </button>

            </div>
        </div>
    )
}

export default ConfirmDeleteModal