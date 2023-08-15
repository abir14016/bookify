import swal from "sweetalert";
import { IWishList } from "../pages/WishList";
import { useMarkASReadMutation } from "../redux/api/apiSlice";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const ReadingListItem = ({ item }: { item: IWishList }) => {
  const [markAsRead, { isLoading, isError, error }] = useMarkASReadMutation();

  useEffect(() => {
    if (isError && error) {
      swal("Oops!", "Failed to add to wishlist!", "error");
    }
  }, [isError, error]);
  //handler function for mark as read
  const handleMarkAsRead = () => {
    markAsRead(item);
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
        {item?.tag !== "completed" ? (
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
            {item?.tag}
          </div>
        ) : (
          <div className="flex items-center">
            <FontAwesomeIcon
              className="text-green-500"
              icon={faCheckDouble}
            ></FontAwesomeIcon>
            <span className="ml-2">{item?.tag}</span>
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        {!isLoading ? (
          <button
            onClick={handleMarkAsRead}
            disabled={item?.tag === "completed"}
            className="btn btn-primary lowercase font-semibold btn-xs"
          >
            mark as read
          </button>
        ) : (
          <button className="btn btn-primary btn-xs">
            <span className="loading loading-spinner"></span>
          </button>
        )}
      </td>
    </tr>
  );
};

export default ReadingListItem;
