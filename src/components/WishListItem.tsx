import { useEffect } from "react";
import { IWishList } from "../pages/WishList";
import { useRemoveFromWishListMutation } from "../redux/api/apiSlice";
import swal from "sweetalert";
import { placeholderImageURL } from "../constants/constants";

const WishListItem = ({ item }: { item: IWishList }) => {
  const [removeFromWishList, { isLoading, isError, error }] =
    useRemoveFromWishListMutation();
  useEffect(() => {
    if (isError && error) {
      swal("Ops !", "Failed to remove", "error");
    }
  }, [isError, error]);
  //handler function for removing book from wishlist
  const handleRemoveFromWishList = () => {
    removeFromWishList(item);
  };

  // Function to handle image loading errors
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = placeholderImageURL; // Set placeholder image URL
  };
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="avatar">
          <div className="w-8 rounded">
            <img
              src={item?.book?.imageURL}
              alt="Tailwind-CSS-Avatar-component"
              onError={handleImageError}
            />
          </div>
        </div>
        <div className="pl-3">
          <div className="text-base font-semibold">{item?.book?.title}</div>
          <div className="font-normal text-gray-500">{item?.book?.author}</div>
        </div>
      </th>
      <td className="px-6 py-4">{item?.book?.owner?.name}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>{" "}
          {item?.tag}
        </div>
      </td>
      <td className="px-6 py-4">
        {!isLoading ? (
          <button
            onClick={handleRemoveFromWishList}
            className="btn btn-error lowercase font-semibold btn-xs"
          >
            Remove
          </button>
        ) : (
          <button className="btn btn-error btn-xs">
            <span className="loading text-accent loading-spinner loading-xs"></span>
          </button>
        )}
      </td>
    </tr>
  );
};

export default WishListItem;
