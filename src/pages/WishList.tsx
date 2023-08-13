import WishListItem from "../components/WishListItem";
import { useGetMyWishListBooksQuery } from "../redux/api/apiSlice";
import { useAppSelector } from "../redux/hooks";
import { IBook, ITag } from "../types/globalTypes";

type IUser = {
  name: string;
  email: string;
};

export type IWishList = {
  _id: string;
  user: IUser;
  book: IBook;
  tag: ITag;
};

const WishList = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const { data } = useGetMyWishListBooksQuery(accessToken);
  return (
    <div>
      <h3 className="text-yellow-500">wishlist</h3>
      <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Book Name
              </th>
              <th scope="col" className="px-6 py-3">
                Added By
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: IWishList) => (
              <WishListItem item={item} key={item._id}></WishListItem>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishList;
