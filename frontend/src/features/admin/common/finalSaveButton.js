const FinalSaveButton = ({onClick ,disabled}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        maxWidth: 480,
        margin: "0 auto",
        padding: 14,
        border: "1px solid #eee",
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 1px 4px rgba(16,24,40,0.04)",
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
      }}
    >
      <h1 style={{ margin: 0 }}>Final Save</h1>

      <button
        onClick={onClick}
        disabled={disabled}
      >
        Final Save
      </button>
    </div>
  )
}

export default FinalSaveButton
