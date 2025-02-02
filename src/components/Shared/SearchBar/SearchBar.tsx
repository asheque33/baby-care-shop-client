import { searchTerm, setSearchTerm } from "@/redux/features/searchSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const SearchBar = () => {
  const searchedTerm = useAppSelector(searchTerm);
  const dispatch = useAppDispatch();
  return (
    <div>
      <input
        className="border border-gray-300 rounded-md px-3 py-1"
        type="text"
        placeholder="Search Products..."
        value={searchedTerm}
        onChange={(event) => dispatch(setSearchTerm(event.target.value))}
        name="search"
        id="search"
      />
    </div>
  );
};

export default SearchBar;
