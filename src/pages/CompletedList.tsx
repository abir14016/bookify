import CompletedListItem from "../components/CompletedListItem";
import { useGetMyCompletedListBooksQuery } from "../redux/api/apiSlice";
import { useAppSelector } from "../redux/hooks";
import { library } from "@fortawesome/fontawesome-svg-core";
import { IWishList } from "./WishList";
import { faArrowRight, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CompletedList = () => {
  library.add(fas);
  const { accessToken } = useAppSelector((state) => state.auth);
  const { data } = useGetMyCompletedListBooksQuery(accessToken);

  return (
    <div>
      <h3 className="text-green-500 text-xl mb-3">
        completed list{" "}
        <span>
          <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
        </span>{" "}
        <div className="badge badge-primary">
          <span>{data?.data?.length}</span>
        </div>{" "}
        <span>items</span>
      </h3>
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
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: IWishList) => (
              <CompletedListItem item={item} key={item._id} /> // Use CompletedListItem component
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedList;
