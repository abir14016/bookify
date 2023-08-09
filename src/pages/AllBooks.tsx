import { useState } from "react";
import BookCard from "../components/BookCard";
import BookSkeleton from "../components/BookSkeleton";
import { useGetAllBooksQuery } from "../redux/api/apiSlice";
import { IBook } from "../types/globalTypes";

const AllBooks = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(""); // State for selected genre
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  let books: IBook[] = [];
  if (!isLoading) {
    books = data.data;
  }

  // Retrieve unique genres from the book data
  const allGenres = [...new Set(books.map((book) => book.genre))];

  // Handler for input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Handler for genre selection
  const handleGenreSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  // Filtering books based on the search text
  // Filtering books based on the search text
  const searchFilteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchText.toLowerCase())
  );

  // Filtering books based on the selected genre
  const genreFilteredBooks = books.filter(
    (book) =>
      selectedGenre === "" ||
      book.genre.toLowerCase() === selectedGenre.toLowerCase()
  );

  // Combining the results of search and genre filtering
  const combinedFilteredBooks = searchText
    ? searchFilteredBooks
    : genreFilteredBooks;
  return (
    <div>
      <div className="px-2 md:px-8 lg:px-10 xl:px-12">
        <div className="flex justify-between items-center mb-0 md:my-5 lg:my-10 xl:my-12">
          <div className="flex justify-start items-center text-4xl font-Poppins font-bold mr-5">
            <h2 className="mr-3">All Books</h2>
            <hr className="hidden md:block lg:block xl:block  w-48 h-1 bg-gradient-to-r from-primary to-secondary rounded border-0" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-start">
            <div>
              <label className="label">
                <span className="label-text-alt">Filter by genre</span>
              </label>
              <select
                value={selectedGenre}
                onChange={handleGenreSelect}
                className="select select-bordered select-primary select-sm"
                onFocus={() => setShowPlaceholder(false)}
                onBlur={() => setShowPlaceholder(!selectedGenre)}
              >
                {showPlaceholder && <option value="">Select a genre</option>}
                <option value="">All</option>
                {allGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <input
              value={searchText}
              onChange={handleInputChange}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary input-sm w-full max-w-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 my-2 md:my-10 lg:my-12 xl:my-16">
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <BookSkeleton key={index} />
              ))
            : combinedFilteredBooks.map((book) => (
                <BookCard book={book} key={book._id} />
              ))}
        </div>
        <div className="flex justify-end"></div>
      </div>
    </div>
  );
};

export default AllBooks;
