import { Link } from "react-router-dom";
import { IBook, IDecoded } from "../../src/types/globalTypes";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpenReader,
  faHeart,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../redux/hooks";
import { parseAccessToken } from "../utils/utils";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  let decoded: IDecoded | null = null;
  if (accessToken) {
    decoded = parseAccessToken(accessToken) as IDecoded;
  }

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
        {decoded?.userEmail && (
          <div className="card-actions items-center justify-end mt-3">
            <div
              className="tooltip cursor-pointer group mr-3"
              data-tip="Add to reading list"
            >
              <FontAwesomeIcon
                className="group-hover:text-green-600 text-lg"
                icon={faBookOpenReader}
              ></FontAwesomeIcon>
            </div>
            <div
              className="tooltip cursor-pointer group"
              data-tip="Add to wishlist"
            >
              <FontAwesomeIcon
                className="group-hover:text-red-600 text-lg"
                icon={faHeart}
              ></FontAwesomeIcon>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
