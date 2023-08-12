import { Link } from "react-router-dom";
import { IBook } from "../../src/types/globalTypes";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  library.add(fas);
  const { _id, title, author, genre, imageURL, publicationYear } = book;
  // Fallback placeholder image URL
  const placeholderImageURL =
    "https://songsofpraise.in/wp-content/uploads/2020/09/no-thumbnail.jpg";

  // Function to handle image loading errors
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = placeholderImageURL; // Set placeholder image URL
  };
  return (
    <div className="card bg-gray-700 shadow-xl flex flex-col rounded-xl">
      <Link
        to={`/books/${_id}`}
        className="hover:opacity-50 transition duration-200"
      >
        <img
          src={imageURL}
          alt="book"
          style={{ aspectRatio: "300 / 200" }}
          className="w-[300px] h-[200px] rounded-xl"
          onError={handleImageError}
        />
      </Link>
      <div className="card-body p-4">
        <h2 className="text-sm md:text-md lg:text-xl">
          {title} <span className="badge badge-xs badge-warning">{genre}</span>
        </h2>
        <div>
          <p className="text-sm text-gray-400">by {author}</p>
          <p className="text-sm text-gray-400">year: {publicationYear}</p>
        </div>
        <div className="card-actions justify-end mt-3">
          <button className="btn btn-xs btn-outline btn-primary">
            Fashion
          </button>
          <button>
            <FontAwesomeIcon
              className="hover:text-red-500 text-lg"
              icon={faHeart}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
