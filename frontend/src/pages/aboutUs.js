import { useState, useEffect, useRef } from "react";
import { Button, IconButton } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import RepeatIcon from '@mui/icons-material/Repeat';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGetApprovedRecommendionsQuery } from "../features/recommention/recommendtionApi";
import { useNavigate } from "react-router-dom";
import { defaultRecommendtions } from "../features/recommention/defultRecommendtion";
import LoadingSpinner from "../components/loadingSpinner";
import ErrorMessage from "../components/errorMessage";

const AboutUs = () => {
  const { data: recommendions = [], isLoading, error } = useGetApprovedRecommendionsQuery();
  const finalList = recommendions.length > 0 ? recommendions : defaultRecommendtions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 1; 
  const total = finalList.length;
  const containerRef = useRef(null);

  const navigate = useNavigate();
  const handleClick = () => navigate("/login");

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % total);

  useEffect(() => {
    if (total <= visibleCount) return;
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % total), 4000);
    return () => clearInterval(interval);
  }, [total]);

  if (isLoading) return <LoadingSpinner text="טוען המלצות" />;
  if (error) return <ErrorMessage message="שגיאה בטעינת המלצות" />;

  return (
    <div className="flex flex-col items-center text-center gap-20 mt-10 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 min-h-screen py-10">
      <section className="max-w-3xl px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-5 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradientBackground">
          לומדים אנגלית בדרך חדשה
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed opacity-0 animate-fadeUp animation-delay-200">
          אתר הלמידה שלנו מעניק חוויית לימוד אישית, פשוטה ויעילה — שיעורים קצרים,
          תרגול אינטראקטיבי ומבחנים שמקדמים אותך שלב אחרי שלב.
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-4">
        {[
          {
            icon: <SchoolIcon className="text-purple-600 text-6xl" />,
            title: "שיעורים קצרים וממוקדים",
            text: "לומדים ומיישמים מיד — בלי לבזבז זמן.",
            color: "from-purple-100 via-pink-100 to-red-100",
          },
          {
            icon: <RepeatIcon className="text-blue-600 text-6xl" />,
            title: "תרגול בזמן אמת",
            text: "שיטה שמגרה את הזיכרון ועוזרת להתקדמות מהירה.",
            color: "from-indigo-100 via-blue-100 to-teal-100",
          },
          {
            icon: <QuizIcon className="text-green-600 text-6xl" />,
            title: "מבחנים ומעקב",
            text: "רואים התקדמות אמיתית אחרי כל שלב.",
            color: "from-green-100 via-yellow-100 to-orange-100",
          }
        ].map((card, i) => (
          <div
            key={i}
            className={`relative p-8 rounded-2xl shadow-lg transition-all duration-700 opacity-0 translate-y-10 bg-gradient-to-br ${card.color} animate-fadeUp hover:scale-105 overflow-hidden`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div className="flex flex-col items-center gap-4 relative z-10">
              {card.icon}
              <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-700 text-center">{card.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-5xl w-full px-4">
        <h2 className="text-3xl font-bold mb-4 text-purple-700">
          מה התלמידים שלנו אומרים
        </h2>

        <div className="relative flex items-center w-full max-w-4xl mx-auto gap-3">
          <IconButton
            onClick={handlePrev}
            className="absolute left-0 z-10 bg-white shadow-md hover:bg-gray-100 p-1 max-md:p-0.5"
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>

          <div className="overflow-x-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              ref={containerRef}
            >
              {finalList.map((t) => (
                <div key={t._id} className="flex-shrink-0 w-full max-w-sm p-2">
                  <div className="p-4 rounded-xl shadow-lg bg-white border-l-4 border-purple-400 h-full flex flex-col justify-between">
                    <p className="text-gray-700 italic mb-3 animate-fadeUpSlide overflow-y-auto leading-relaxed">
                      "{t.recommendtion}"
                    </p>
                    <h3 className="font-semibold text-purple-700">{t.userName}</h3>
                    <p className="text-yellow-500">⭐ {t.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <IconButton
            onClick={handleNext}
            className="absolute right-0 z-10 bg-white shadow-md hover:bg-gray-100 p-1 max-md:p-0.5"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </div>

        <div className="flex gap-2 mt-2 justify-center">
          {finalList.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === currentIndex ? "bg-purple-700" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-col items-center gap-3">
        <Button
          variant="contained"
          size="large"
          className="relative overflow-hidden text-white rounded-xl text-xl px-8 py-4 font-semibold shadow-lg transform transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #F97316)' }}
          onClick={handleClick}
        >
          התחילי ללמוד עכשיו
        </Button>
        <p className="text-gray-500 mt-2">כניסה או הרשמה — זה קל ומהיר</p>
      </section>

      <style jsx>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.8s forwards; }

        @keyframes fadeUpSlide {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUpSlide { animation: fadeUpSlide 0.5s ease forwards; }

        @keyframes gradientBackground {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientBackground {
          background-size: 200% 200%;
          animation: gradientBackground 5s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default AboutUs