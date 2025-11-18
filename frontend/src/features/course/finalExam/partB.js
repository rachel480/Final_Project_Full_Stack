import { useState, useEffect, useRef } from "react";
import { Typography, Button } from "@mui/material";
import { shuffleArray } from "../../admin/challenge/services/challengeServices";

const TOTAL_PAIRS = 32   
const TIME_LIMIT =90

const PartB = ({ allWords, onEnd }) => {
  const [board, setBoard] = useState([])
  const [selected, setSelected] = useState([])
  const [score, setScore] = useState(0)
  const [started, setStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [showAnswers, setShowAnswers] = useState(false);

  const timerRef = useRef(null);

  
  const colors = [
    "bg-red-300", "bg-green-300", "bg-blue-300", "bg-yellow-300",
    "bg-purple-300", "bg-pink-300", "bg-orange-300", "bg-teal-300"
  ];

  const prepareBoard = () => {
    const shuffled = shuffleArray(allWords);
    const chosen = shuffled.slice(0, TOTAL_PAIRS);

    const cards = [];

    chosen.forEach((w, index) => {
      const color = colors[index % colors.length];

      cards.push({
        id: w._id + "_w",
        type: "word",
        content: w.word,
        matchId: w._id,
        found: false,
        color
      });

      cards.push({
        id: w._id + "_t",
        type: "translation",
        content: w.translation,
        matchId: w._id,
        found: false,
        color
      });
    });

    return shuffleArray(cards);
  };

  const startGame = () => {
    setBoard(prepareBoard());
    setStarted(true);
    setScore(0);
    setSelected([]);
    setTimeLeft(TIME_LIMIT);
    setShowAnswers(false);
  };

  // טיימר
  useEffect(() => {
    if (!started) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);

          // מציגים את כל הזוגות שנותרו
          setBoard(prev => prev.map(c => c.found ? c : { ...c, showAnswer: true }));
          setShowAnswers(true);

          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [started]);

  // סיום החלק לאחר הצגת כל הזוגות
  useEffect(() => {
    if (showAnswers) {
      const timeout = setTimeout(() => onEnd(score), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showAnswers, score, onEnd]);

  const handleClick = (card) => {
    if (selected.length === 2 || card.found || timeLeft === 0) return;

    const newSelection = [...selected, card];
    setSelected(newSelection);

    if (newSelection.length === 2) {
      const [first, second] = newSelection;
      const isMatch = first.matchId === second.matchId && first.type !== second.type;

      if (isMatch) {
        setScore(prev => prev + 10);
        setBoard(prev =>
          prev.map(c =>
            c.matchId === first.matchId ? { ...c, found: true } : c
          )
        );
      }

      setTimeout(() => setSelected([]), 600);
    }
  };

  // בדיקה אם כל הזוגות נמצאו
  useEffect(() => {
    if (started && board.length > 0 && board.every(c => c.found)) {
      clearInterval(timerRef.current);
      setShowAnswers(true);
    }
  }, [board, started]);

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <Typography variant="h4" className="font-bold mb-2">
          חלק ב: משחק זיכרון
        </Typography>
        <Typography variant="body1" className="mb-4 text-center">
          מצא את 32 הזוגות. יש לך דקה וחצי בלבד! כל זוג שווה 10 נקודות.
        </Typography>
        <Button variant="contained" color="primary" onClick={startGame}>
          התחל את החלק
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Typography variant="h5" className="font-bold">ניקוד: {score}</Typography>
      <Typography variant="h6" className="text-red-600 font-bold">
        זמן שנותר: {timeLeft} שניות
      </Typography>

      <div className="grid grid-cols-8 gap-2 p-4 w-full max-w-5xl">
        {board.map(card => {
          const flipped = card.found || selected.includes(card) || card.showAnswer;
          const bgColor = card.showAnswer
            ? card.color
            : flipped
              ? "bg-green-200"
              : "bg-white hover:bg-yellow-100";

          return (
            <div
              key={card.id}
              onClick={() => handleClick(card)}
              className={`p-3 rounded-md cursor-pointer text-center shadow-md border flex items-center justify-center text-sm font-bold h-20 ${bgColor}`}
            >
              {flipped ? card.content : "❓"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartB