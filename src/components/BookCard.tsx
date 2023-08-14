import { Link } from "react-router-dom";
import { useEffect } from "react";
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
import {
  useAddToReadingListMutation,
  useAddToWishListMutation,
  useGetMyReadingListBooksQuery,
  useGetMyWishListBooksQuery,
} from "../redux/api/apiSlice";
import swal from "sweetalert";
import { IWishList } from "../pages/WishList";

interface IProps {
  book: IBook;
}

// export type ITag = "will read in future" | "currently reading" | "completed";

const BookCard = ({ book }: IProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const { data: myWishListBooks } = useGetMyWishListBooksQuery(accessToken);
  const { data: myReadingBooks } = useGetMyReadingListBooksQuery(accessToken);

  const userWishlist = myWishListBooks?.data;
  const userReadingList = myReadingBooks?.data;
  // Check if the book is in the user's wishlist
  const isBookInWishlist = userWishlist?.some(
    (item: IWishList) => item.book._id === book._id
  );
  const isBookInReadinglist = userReadingList?.some(
    (item: IWishList) => item.book._id === book._id
  );
  let decoded: IDecoded | null = null;
  if (accessToken) {
    decoded = parseAccessToken(accessToken) as IDecoded;
  }

  // add to wish list
  const [addToWishList, { isError, isLoading, error }] =
    useAddToWishListMutation();
  useEffect(() => {
    if (isError && error) {
      swal("Oops!", "Failed to add book to wishlist!", "error");
    }
  }, [isError, error]);
  const handleAddToWishList = async () => {
    try {
      await addToWishList({
        user: decoded?.userId,
        book: book?._id,
        tag: "will read in future",
      });
    } catch (error) {
      // swal("Oops!", "Failed to add to wishlist!", "error")
    }
  };
  // add to wish list

  // add to reading list
  const [addToReadingList] = useAddToReadingListMutation();
  // const [isAddingToReadingList, setIsAddingToReadingList] = useState(false);

  const handleAddToReadingList = async () => {
    // setIsAddingToReadingList(true);
    try {
      await addToReadingList({
        user: decoded?.userId,
        book: book?._id,
        tag: "currently reading", // Update the tag
      });
      swal("Success", "Book added to reading list", "success");
    } catch (error) {
      swal("Oops!", "Failed to add book to reading list!", "error");
    } finally {
      // setIsAddingToReadingList(false);
    }
  };
  // add to reading list

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
            {!isBookInReadinglist ? (
              <div
                onClick={handleAddToReadingList}
                className="tooltip cursor-pointer group mr-3"
                data-tip="Add to reading list"
              >
                <FontAwesomeIcon
                  className="group-hover:text-green-600 text-lg"
                  icon={faBookOpenReader}
                ></FontAwesomeIcon>
              </div>
            ) : (
              <div
                // onClick={handleAddToReadingList}
                className="tooltip cursor-pointer group mr-3"
                data-tip="Remove from reading list"
              >
                <FontAwesomeIcon
                  className="group-hover:text-white text-lg text-green-600"
                  icon={faBookOpenReader}
                ></FontAwesomeIcon>
              </div>
            )}
            {!isBookInWishlist ? (
              <div
                onClick={handleAddToWishList}
                className="tooltip cursor-pointer group"
                data-tip="Add to wishlist"
              >
                {!isLoading ? (
                  <FontAwesomeIcon
                    className="group-hover:text-red-600 text-lg"
                    icon={faHeart}
                  ></FontAwesomeIcon>
                ) : (
                  <span className="loading loading-sm loading-spinner text-warning"></span>
                )}
              </div>
            ) : (
              <div
                // onClick={handleAddToWishList}
                className="tooltip cursor-pointer group"
                data-tip="Remove from wishlist"
              >
                {!isLoading ? (
                  <FontAwesomeIcon
                    className="group-hover:text-white text-lg text-red-600"
                    icon={faHeart}
                  ></FontAwesomeIcon>
                ) : (
                  <span className="loading loading-sm loading-spinner text-warning"></span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
