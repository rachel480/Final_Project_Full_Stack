import { useGetAllMyWordsQuery } from "./myWordApi";
import MyWordCard from "./myWordCard";
import AddWordForm from "./addWordForm";
import BaseList from "../common/BaseList";

const MyWordList = () => {
  const { data: words = [], isLoading, error } = useGetAllMyWordsQuery();

  return (
    <BaseList
      title="ניהול מילים אישיות"
      placeholder="🔎Search word..."
      data={words}
      isLoading={isLoading}
      error={error}
      searchKey="word.word"
      renderItem={(word) => <MyWordCard key={word._id} myWord={word} />}
      AddFormComponent={AddWordForm}
    />
  );
};

export default MyWordList;