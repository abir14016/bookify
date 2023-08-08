import BookCard from "../components/BookCard";
import BookSkeleton from "../components/BookSkeleton";
import { useGetBooksQuery } from "../redux/api/apiSlice";
import { IBook } from "../types/globalTypes";

const Home = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  let books: IBook[] = [];
  if (!isLoading) {
    books = data.data;
  }
  return (
    <div>
      <div className="px-2 md:px-8 lg:px-10 xl:px-12">
        <div className="flex justify-start items-center mb-0 md:my-5 lg:my-10 xl:my-12">
          <div className="text-4xl font-Poppins font-bold mr-5">
            <h2>Latest 10 books</h2>
          </div>
          <hr className="hidden md:block lg:block xl:block  w-48 h-1 bg-gradient-to-r from-primary to-secondary rounded border-0" />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 my-2 md:my-4 lg:my-6">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <BookSkeleton key={index} />
              ))
            : books.map((book) => <BookCard book={book} key={book._id} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
