import CustomNavLink from "../../components/customNavlink";
import FloatingMenu from "../../components/floatingMenu";
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import LabelIcon from '@mui/icons-material/Label';

const MyWordsListNavigation = () => {
  return (
    <FloatingMenu>
      <CustomNavLink
        to="words"
        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
      >
        <SpellcheckIcon />
        מילים
      </CustomNavLink>

      <CustomNavLink
        to="categories"
        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
      >
        <LabelIcon/>
        קטגוריות
      </CustomNavLink>
    </FloatingMenu>
  )
}

export default MyWordsListNavigation