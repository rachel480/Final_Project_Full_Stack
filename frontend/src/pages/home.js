import { Button } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import RepeatIcon from '@mui/icons-material/Repeat';

const Home = () => {
  return (
    <div className="flex flex-col items-center text-center gap-20 mt-10 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 min-h-screen py-10">

      {/* ► כותרת + תיאור */}
      <section className="max-w-3xl px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-5 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradientBackground">
          לומדים אנגלית בדרך חדשה
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed opacity-0 animate-fadeUp animation-delay-200">
          אתר הלמידה שלנו מעניק לך חוויית לימוד אישית, פשוטה ויעילה.
          שיעורים קצרים, תרגול אינטראקטיבי ומבחנים שיקדמו אותך שלב אחר שלב —
          מתאים לכל גיל ולכל רמה.
        </p>
      </section>

      {/* ► מה אנחנו מציעים */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-4">
        {[
          {
            icon: <SchoolIcon className="text-purple-600 text-6xl" />,
            title: "שיעורים קצרים וממוקדים",
            text: "כל שיעור בנוי כך שתוכלי ללמוד וליישם מיד — בלי לבזבז זמן.",
            color: "from-purple-100 via-pink-100 to-red-100",
          },
          {
            icon: <RepeatIcon className="text-blue-600 text-6xl" />,
            title: "תרגול בזמן אמת",
            text: "חוויית לימוד אינטראקטיבית שתעזור לך לזכור ולדבר מהר יותר.",
            color: "from-indigo-100 via-blue-100 to-teal-100",
          },
          {
            icon: <QuizIcon className="text-green-600 text-6xl" />,
            title: "מבחנים ומעקב התקדמות",
            text: "מדדי הצלחה שיעזרו לך לראות את ההישגים שלך תוך כדי התקדמות.",
            color: "from-green-100 via-yellow-100 to-orange-100",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`relative p-8 rounded-2xl shadow-lg transform transition-all duration-700 opacity-0 translate-y-10 hover:scale-105 hover:shadow-xl bg-gradient-to-br ${card.color} animate-fadeUp overflow-hidden`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            {/* אפקט shine */}
            <span className="absolute inset-0 bg-white opacity-10 transform -translate-x-full rotate-12 pointer-events-none animate-shine"></span>

            <div className="flex flex-col items-center gap-4 relative z-10">
              {card.icon}
              <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-700 text-center">{card.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ► תגובות משתמשים */}
      <section className="max-w-4xl w-full px-4">
        <h2 className="text-3xl font-bold mb-8 text-purple-700">מה התלמידים שלנו אומרים</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { text: `"סוף סוף אנגלית שמדברים אליי! הלמידה זורמת ומהנה."`, name: "נועם ל.", color: "purple" },
            { text: `"עברתי מבחן שהיה קשה לי שנים — בזכות האתר שלכם!"`, name: "דניאל ש.", color: "blue" },
            { text: `"השילוב בין תרגול לשיעורים פשוט גאוני. מומלץ מאוד."`, name: "הילה מ.", color: "green" },
          ].map((t, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl shadow-lg transform transition-all duration-700 opacity-0 translate-y-10 hover:scale-105 hover:shadow-xl bg-white border-l-4 border-${t.color}-400 animate-fadeUp`}
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <p className="text-gray-700 italic mb-3">{t.text}</p>
              <h3 className={`font-semibold text-${t.color}-700`}>{t.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ► קריאה לפעולה */}
      <section className="mt-10 flex flex-col items-center gap-3 relative">
        <Button
          variant="contained"
          size="large"
          className="relative overflow-hidden text-white rounded-xl text-xl px-8 py-4 font-semibold shadow-lg transform transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #F97316)',
          }}
        >
          <span className="absolute inset-0 bg-white opacity-10 transform -translate-x-full rotate-12 pointer-events-none animate-shine"></span>
          התחילי ללמוד עכשיו
        </Button>
        <p className="text-gray-500 mt-2">כניסה או הרשמה — זה קל ומהיר</p>
      </section>

      {/* Tailwind custom animations */}
      <style jsx>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.8s forwards;
        }

        @keyframes gradientBackground {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientBackground {
          background-size: 200% 200%;
          animation: gradientBackground 5s ease infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) rotate(12deg); }
          50% { transform: translateX(100%) rotate(12deg); }
          100% { transform: translateX(100%) rotate(12deg); }
        }
        .animate-shine {
          animation: shine 2s linear infinite;
        }
      `}</style>

    </div>
  )
}

export default Home;
