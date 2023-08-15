import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WishListItem from "../components/WishListItem";
import { useGetMyWishListBooksQuery } from "../redux/api/apiSlice";
import { useAppSelector } from "../redux/hooks";
import { IBook, ITag } from "../types/globalTypes";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
      <h3 className="text-warning text-xl mb-3">
        Wishlist{" "}
        <span>
          <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
        </span>{" "}
        <div className="badge badge-accent">
          <span>{data?.data?.length}</span>
        </div>{" "}
        <span>items</span>
      </h3>
      {data?.data?.length ? (
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
      ) : (
        <div className="flex justify-center items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-500 mb-3">
              No item found in your wishlist
            </h2>
            <div>
              <Link className="btn btn-primary btn-outline btn-md" to="/books">
                <span className="mr-2">Please Add</span>
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
