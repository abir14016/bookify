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
  useRemoveFromWishListMutation,
} from "../redux/api/apiSlice";
import swal from "sweetalert";
import { IWishList } from "../pages/WishList";
import { placeholderImageURL } from "../constants/constants";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const { data: myWishListBooks, isSuccess: myWishListBooksSuccess } =
    useGetMyWishListBooksQuery(accessToken, { skip: !accessToken });
  const { data: myReadingBooks, isSuccess: myReadingListBooksSuccess } =
    useGetMyReadingListBooksQuery(accessToken, { skip: !accessToken });

  const userWishlist = myWishListBooksSuccess ? myWishListBooks?.data : [];
  const userReadingList = myReadingListBooksSuccess ? myReadingBooks?.data : [];
  const BookExistInWishList = userWishlist?.find(
    (item: IWishList) => item?.book?._id === book?._id
  );
  // Check if the book is in the user's wishlist
  const isBookInWishlist = userWishlist?.some(
    (item: IWishList) => item?.book?._id === book?._id
  );
  const isBookInReadinglist = userReadingList?.some(
    (item: IWishList) => item?.book?._id === book?._id
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
      swal("Oops!", "Failed to add to wishlist!", "error");
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

  //remove from wishlist
  const [
    removeFromWishList,
    {
      isLoading: removeFromWishListLoading,
      error: removeFromWishListError,
      isError: removeFromWishListIsError,
    },
  ] = useRemoveFromWishListMutation();
  useEffect(() => {
    if (removeFromWishListError && removeFromWishListIsError) {
      swal("Oops!", "Failed to remove from wishlist!", "error");
    }
  }, [removeFromWishListIsError, removeFromWishListError]);
  const handleRemoveFromWishList = () => {
    const options = {
      _id: BookExistInWishList._id,
      user: BookExistInWishList.user,
      book: BookExistInWishList.book,
    };
    removeFromWishList(options);
  };
  //remove from wishlist

  // add to reading list
  const [addToReadingList, { isLoading: isAddToReadingListLoading }] =
    useAddToReadingListMutation();
  // const [isAddingToReadingList, setIsAddingToReadingList] = useState(false);

  const handleAddToReadingList = async () => {
    // setIsAddingToReadingList(true);
    try {
      await addToReadingList({
        user: decoded?.userId,
        book: book?._id,
        tag: "currently reading", // Update the tag
      });
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

  // Function to handle image loading errors
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = placeholderImageURL; // Set placeholder image URL
  };
  return (
    <div className="card bg-gray-700 shadow-xl flex flex-col rounded-xl">
      <Link
        to={`/books/${_id}`}
        className="hover:opacity-50 transition duration-200 tooltip tooltip-primary"
        data-tip="Click to view details"
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
            <div data-tip="Add to reading list" className="tooltip">
              {!isBookInReadinglist ? (
                <div>
                  {!isAddToReadingListLoading ? (
                    <FontAwesomeIcon
                      onClick={handleAddToReadingList}
                      className="hover:text-green-500  cursor-pointer mr-3"
                      icon={faBookOpenReader}
                    />
                  ) : (
                    <span className="loading loading-xs loading-spinner text-warning"></span>
                  )}
                </div>
              ) : (
                <div data-tip="Added to reading list" className="tooltip">
                  <span className="text-green-600 text-lg">✓</span>
                  <FontAwesomeIcon
                    area-disabled="true"
                    className="text-green-500 tooltip mr-3"
                    icon={faBookOpenReader}
                  />
                </div>
              )}
            </div>
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
                  <span className="loading loading-xs loading-spinner text-warning"></span>
                )}
              </div>
            ) : (
              <div
                onClick={handleRemoveFromWishList}
                className="tooltip cursor-pointer group"
                data-tip="Remove from wishlist"
              >
                {!removeFromWishListLoading ? (
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
