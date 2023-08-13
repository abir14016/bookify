import { IWishList } from "../pages/WishList";

const WishListItem = ({ item }: { item: IWishList }) => {
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
      <td className="px-6 py-4">React Developer</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
          {item?.tag}
        </div>
      </td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          make as read
        </a>
      </td>
    </tr>
  );
};

export default WishListItem;
