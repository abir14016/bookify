import { Link } from "react-router-dom";
import { IBook } from "../../src/types/globalTypes";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const { _id, title, author, genre, imageURL, publicationYear } = book;

  // Fallback placeholder image URL
  const placeholderImageURL =
    "https://songsofpraise.in/wp-content/uploads/2020/09/no-thumbnail.jpg";

  // Function to handle image loading errors
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = placeholderImageURL; // Set placeholder image URL
  };
  return (
    <Link
      to={`/books/${_id}`}
      className="card bg-base-100 shadow-xl flex flex-col border border-gray-200 cursor-pointer"
    >
      <figure>
        <img
          src={imageURL}
          alt="book"
          style={{ aspectRatio: "300 / 200" }}
          className=" w-[300px] h-[200px]"
          onError={handleImageError}
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
