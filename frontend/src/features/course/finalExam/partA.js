import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { shuffleArray } from "../../admin/challenge/services/challengeServices";

const PartA = ({ allWords, onEnd }) => {
  const NUM_QUESTIONS = 15
  const TIME_PER_QUESTION = 15

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIME_PER_QUESTION);
  const [answered, setAnswered] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [boardItems, setBoardItems] = useState([]);
  const [wrongItem, setWrongItem] = useState(null); // שומר תשובה לא נכונה

  const timerRef = useRef(null);


  useEffect(() => {
    if (!allWords || allWords.length === 0) return;

    const shuffled = shuffleArray(allWords);
    const selected = shuffled.slice(0, NUM_QUESTIONS).map(word => {
      let status = Math.floor(Math.random() * 3);

      let answerStatus;
      if (status === 0) answerStatus = 1;
      else if (status === 1) answerStatus = Math.random() < 0.5 ? 0 : 2;
      else answerStatus = 1;

      return {
        ...word,
        status,
        answerStatus
      };
    });

    setQuestions(selected);
  }, [allWords]);

  const currentQuestion = questions[currentIndex]
  useEffect(() => {
    if (!currentQuestion) return;

    const items = shuffleArray(allWords.map(word => {
      const status = Math.floor(Math.random() * 3);
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 80 + 10;
      return { ...word, status, x, y };
    }));

    setBoardItems(items);
  }, [currentQuestion, allWords]);

  // טיימר ושאילת שאלות
  useEffect(() => {
    if (!currentQuestion) return;

    setTimer(TIME_PER_QUESTION);
    setAnswered(false);
    setShowCorrect(false);
    setWrongItem(null);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTimer(t => t - 1), 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQuestion]);

  // סיום זמן
  useEffect(() => {
    if (timer === 0 && !answered) {
      setShowCorrect(true);

      setTimeout(() => nextQuestion(), 1500);
    }
  }, [timer, answered]);

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onEnd(score);
    }
  };

  const chooseAnswer = (item) => {
    if (answered || showCorrect) return;

    setAnswered(true);

    const isCorrect =
      (currentQuestion.answerStatus === 0 && item.word === currentQuestion.word) ||
      (currentQuestion.answerStatus === 1 && item.translation === currentQuestion.translation) ||
      (currentQuestion.answerStatus === 2 && item.img === currentQuestion.img);

    if (isCorrect) {
      setScore(prev => prev + 10);
    } else {
      setWrongItem(item);
    }

    setShowCorrect(true);

    setTimeout(() => nextQuestion(), isCorrect ? 800 : 1200);
  };

  const renderQuestionContent = () => {
    if (currentQuestion.status === 0) return currentQuestion.word;
    if (currentQuestion.status === 1) return currentQuestion.translation;
    if (currentQuestion.status === 2) {
      return currentQuestion.img?.data ? (
        <img
          src={`data:image/${currentQuestion.img.contentType};base64,${currentQuestion.img.data}`}
          alt={currentQuestion.word}
          className="w-24 h-24 object-contain"
        />
      ) : "אין תמונה";
    }
  };

  const renderBoardItemValue = (item) => {
    if (item.status === 0) return item.word;
    if (item.status === 1) return item.translation;
    if (item.status === 2) {
      return item.img?.data ? (
        <img
          src={`data:image/${item.img.contentType};base64,${item.img.data}`}
          alt={item.word}
          className="w-16 h-16 object-contain"
        />
      ) : "?";
    }
  };

  const isCorrectItem = (item) => {
    return (
      (currentQuestion.answerStatus === 0 && item.word === currentQuestion.word) ||
      (currentQuestion.answerStatus === 1 && item.translation === currentQuestion.translation) ||
      (currentQuestion.answerStatus === 2 && item.img === currentQuestion.img)
    );
  };

  // ⭐ פונקציה לערבוב לוח
  const reshuffleBoard = () => {
    setBoardItems(prev =>
      prev.map(item => ({
        ...item,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      }))
    );
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Typography variant="h5" className="font-bold">חלק א – מציאת זוגות</Typography>

      <Typography variant="body1">ניקוד: {score}</Typography>
      <Typography variant="body1">שאלה {currentIndex + 1} מתוך {questions.length}</Typography>

      <Typography variant="body1" className="text-red-600 font-bold">
        זמן נותר: {timer} שניות
      </Typography>

      <Typography variant="h6" className="mt-4 mb-2">
        מצא את הזוג של: {renderQuestionContent()}
      </Typography>

      <button
        onClick={reshuffleBoard}
        className="px-4 py-2 mb-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        ערבב כרטיסים 🔄
      </button>

      <div className="relative w-full h-[500px] border border-gray-300 rounded-lg overflow-hidden">
        {boardItems.map((item, i) => {
          const correct = isCorrectItem(item);
          const isWrong = wrongItem === item;

          return (
            <div
              key={i}
              onClick={() => chooseAnswer(item)}
              className={`absolute p-2 cursor-pointer rounded-md shadow-md bg-white flex justify-center items-center transition-all duration-300
                ${showCorrect && correct ? "bg-green-400 border-4 border-green-700 scale-125" : ""}
                ${showCorrect && isWrong ? "bg-red-300 border-4 border-red-700 scale-110" : ""}
              `}
              style={{
                top: `${item.y}%`,
                left: `${item.x}%`,
                transform: "translate(-50%, -50%)",
                zIndex: correct ? 50 : isWrong ? 45 : 10
              }}
            >
              {renderBoardItemValue(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartA;
