import { Checkbox, FormControlLabel, Typography, Paper } from "@mui/material";

const WordCheckboxList = ({ words, notUsedWords, lastCategory, register, setSumSelected }) => {
  return (
    <Paper elevation={1} className="mt-3 p-4 flex flex-col gap-2 rounded-xl bg-gray-50">
      {notUsedWords.length > 0 ? (
        words.map((word, i) => {
          if (word.categoryName && word.categoryName !== lastCategory?.name) return null

          const isChecked = lastCategory?.words?.includes(word.word)

          return (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  value={word.word}
                  defaultChecked={isChecked}
                  {...register("words")}
                  onChange={(e) => {
                    setSumSelected((prev) => e.target.checked ? prev + 1 : prev - 1)
                  }}
                  sx={{
                    color: "#fb923c",
                    "&.Mui-checked": { color: "#fb923c" },
                  }}
                />
              }
              label={<Typography className="text-gray-700 text-sm">{word.word}</Typography>}
              className="!m-0 hover:bg-gray-100 rounded-md px-2 py-1 transition"
            />
          )
        })
      ) : (
        <Typography className="text-sm text-gray-500">No words available yet.</Typography>
      )}
    </Paper>
  )
}

export default WordCheckboxList
