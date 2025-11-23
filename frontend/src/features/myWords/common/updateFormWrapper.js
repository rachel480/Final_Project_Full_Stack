import { Button } from "@mui/material";

const UpdateFormWrapper = ({ title, isLoading, onSubmit, setShowUpdateForm, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <form
        onSubmit={onSubmit}
        className="
          flex flex-col gap-4
          w-full max-w-[480px]
          p-4 md:p-4
          rounded-lg
          shadow-md
          bg-[linear-gradient(135deg,#fef3c7,#fde68a)]
          font-sans
          max-md:p-2
        "
      >
        <h2 className="text-2xl font-bold text-center mb-0 max-md:mb-2">{title}</h2>

        {children}

        <div className="flex gap-2 mt-2 flex-row max-md:flex-col">
          <Button
            type="submit"
            variant="contained"
            color="warning"
            disabled={isLoading}
            className="w-full"
          >
            Update
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="error"
            disabled={isLoading}
            onClick={() => setShowUpdateForm(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateFormWrapper