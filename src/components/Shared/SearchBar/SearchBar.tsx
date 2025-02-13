import { searchTerm, setSearchTerm } from "@/redux/features/searchSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const SearchBar = () => {
  const searchedTerm = useAppSelector(searchTerm);
  const dispatch = useAppDispatch();
  return (
    <>
      <input
        className="border border-gray-300 border-b-2 border-b-[#1898ae] rounded-r-md p-1 lg:p-3 w-full lg:w-[70%]"
        type="text"
        placeholder="Search Products..."
        value={searchedTerm}
        onChange={(event) => dispatch(setSearchTerm(event.target.value))}
        name="search"
        id="search"
      />
    </>
  );
};

export default SearchBar;
