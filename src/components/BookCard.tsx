import { Link } from "react-router-dom";
import { IBook } from "../../src/types/globalTypes";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const { title, author, genre, imageURL, publicationYear } = book;
  return (
    <Link
      to="/:id"
      className="card bg-base-100 shadow-xl flex flex-col border border-gray-200 cursor-pointer"
    >
      <figure>
        <img
          src={imageURL}
          alt="book"
          style={{ aspectRatio: "300 / 200" }}
          className=" w-[300px] h-[200px]"
        />
      </figure>
      <div className="card-body">
        <h2 className=" text-sm md:text-md lg:text-xl">
          {title} <span className="badge badge-xs badge-warning">{genre}</span>
        </h2>
        <p className="text-sm text-gray-400">by {author}</p>
        <p className="text-sm text-gray-400">year: {publicationYear}</p>
      </div>
    </Link>
  );
};

export default BookCard;
