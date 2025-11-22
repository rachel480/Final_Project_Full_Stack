import { Box } from "@mui/material"

const ConfirmDeleteModal = ({ itemName, setShowConfirm, handleDelete }) => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0, left: 0,
                width: "100%", height: "100%",
                bgcolor: "rgba(0,0,0,0.2)",
                display: "flex", justifyContent: "center", alignItems: "center",
                zIndex: 1000
            }}
        >
            <div
                className="max-md:w-[220px] max-md:p-4 max-md:text-md"
                style={{
                    position: "fixed",
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

                <div
                    className="max-md:flex-col max-md:gap-3"
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "15px",
                    }}
                >
                    <button
                        onClick={handleDelete}
                        className="max-md:w-full"
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
                        className="max-md:w-full"
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

        </Box>
    )
}

export default ConfirmDeleteModal