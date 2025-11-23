import { Button } from "@mui/material";

const AddFormWrapper = ({ title, onSubmit, onCancel, isLoading = false, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <form
        onSubmit={onSubmit}
        className="
          flex flex-col gap-4
          w-full max-w-md
          p-8 md:p-4
          rounded-xl
          bg-gradient-to-br from-yellow-100 to-lime-200
          shadow-lg
          font-sans
          max-md:p-6
        "
      >
        <h2 className="text-2xl font-bold text-center mb-2 max-md:text-xl">{title}</h2>

        {children}

        <div className="flex gap-2 mt-2 flex-row max-md:flex-col">
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isLoading}
            className="w-full"
          >
            Add
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="error"
            disabled={isLoading}
            onClick={onCancel}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddFormWrapper