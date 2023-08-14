import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IWishList } from "../pages/WishList";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const CompletedListItem = ({ item }: { item: IWishList }) => {
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
        <div className="flex items-center">
          <FontAwesomeIcon
            className="text-green-500"
            icon={faCheckDouble}
          ></FontAwesomeIcon>
          <span className="ml-2">{item?.tag}</span>
        </div>
      </td>
    </tr>
  );
};

export default CompletedListItem;
