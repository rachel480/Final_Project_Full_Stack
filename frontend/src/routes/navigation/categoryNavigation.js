import CustomNavLink from "../../components/customNavlink";
import FloatingMenu from "../../components/floatingMenu";
import ListIcon from "@mui/icons-material/List";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const CategoryNavigation = () => {
  return (
    <FloatingMenu>
      <CustomNavLink
        to="words"
        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
      >
        <ListIcon />
        רשימת מילים
      </CustomNavLink>

      <CustomNavLink
        to="challenge"
        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
      >
        <EmojiEventsIcon />
        אתגר של קטגוריה
      </CustomNavLink>
    </FloatingMenu>
  );
};

export default CategoryNavigation;
