import { useState } from "react";
import BookCard from "../components/BookCard";
import BookSkeleton from "../components/BookSkeleton";
import { useGetAllBooksQuery } from "../redux/api/apiSlice";
import { IBook } from "../types/globalTypes";

const AllBooks = () => {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  let books: IBook[] = [];
  if (!isLoading) {
    books = data.data;
  }

  // Handler for input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Filtering books based on the search text
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div>
      <div className="px-2 md:px-8 lg:px-10 xl:px-12">
        <div className="flex justify-between items-center mb-0 md:my-5 lg:my-10 xl:my-12">
          <div className="flex justify-start items-center text-4xl font-Poppins font-bold mr-5">
            <h2 className="mr-3">All Books</h2>
            <hr className="hidden md:block lg:block xl:block  w-48 h-1 bg-gradient-to-r from-primary to-secondary rounded border-0" />
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
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 my-2 md:my-4 lg:my-6">
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <BookSkeleton key={index} />
              ))
            : filteredBooks.map((book) => (
                <BookCard book={book} key={book._id} />
              ))}
        </div>
        <div className="flex justify-end"></div>
      </div>
    </div>
  );
};

export default AllBooks;
