import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/api/apiSlice";
import { IBook, IDecoded } from "../types/globalTypes";
import BookDetailSkeleton from "../components/BookDetailSkeleton";
import EditBookModal from "../components/EditBookModal";
import { useAppSelector } from "../redux/hooks";
import { parseAccessToken } from "../utils/utils";
import swal from "sweetalert";

const BookDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);

  const { accessToken } = useAppSelector((state) => state.auth);
  let decoded: IDecoded | null = null;
  if (accessToken) {
    decoded = parseAccessToken(accessToken) as IDecoded;
  }

  let book: IBook | null = null;
  if (!isLoading) {
    book = data.data;
  }

  const isMatched: boolean = decoded?.userEmail === book?.owner?.email;
  const handleEditButton = () => {
    if (!isMatched) {
      swal("Oops!", "You are not authorized to edit the book!", "error");
    }
  };
  return (
    <div className="px-2 md:px-8 lg:px-10 xl:px-12">
      <div className="flex justify-between items-center mb-0 md:my-5 lg:my-10 xl:my-12">
        <div className="flex justify-start items-center text-4xl font-Poppins font-bold mr-5">
          <h2 className="mr-3">Book Detail</h2>
          <hr className="hidden md:block lg:block xl:block  w-48 h-1 bg-gradient-to-r from-primary to-secondary rounded border-0" />
        </div>
      </div>
      {!isLoading ? (
        <div className="flex justify-center my-5 md:my-10 lg:my-16 items-center">
          <div className="card card-side bg-base-100 shadow-xl border border-gray-200 w-1/2">
            <figure>
              <img
                style={{ aspectRatio: "300 / 350" }}
                className=" w-[300px] h-[350px]"
                src={book?.imageURL}
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {book?.title}{" "}
                <span className="badge badge-sm badge-warning">
                  {book?.genre}
                </span>
              </h2>
              <p>Author: {book?.author}</p>
              <p>Publication year: {book?.publicationYear}</p>
              <div className="card-actions justify-between items-center">
                <div>
                  <h2>This book is added by:</h2>
                  <div>
                    <h2 className="text-sm">{book?.owner?.name}</h2>
                    <h2 className="text-xs text-gray-500">
                      email: {book?.owner?.email}
                    </h2>
                  </div>
                </div>
                <div className="flex justify-center">
                  <a
                    onClick={handleEditButton}
                    href={isMatched ? "#edit_book_modal" : "#"}
                    className="btn btn-info btn-sm mr-1"
                  >
                    Edit
                  </a>
                  <button className="btn btn-error btn-sm ml-1">Delete</button>
                </div>
              </div>
            </div>
            <EditBookModal></EditBookModal>
          </div>
        </div>
      ) : (
        <div className="flex justify-center my-5 md:my-10 lg:my-16 items-center">
          <BookDetailSkeleton />;
        </div>
      )}
    </div>
  );
};

export default BookDetail;
