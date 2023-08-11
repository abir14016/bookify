import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/api/apiSlice";
import swal from "sweetalert";

const DeleteBookModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: book } = useGetSingleBookQuery(id);
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { title, author, genre } = book.data;

  const [deleteBook, { isLoading, isError, isSuccess }] =
    useDeleteBookMutation();

  const handleDelete = () => {
    deleteBook(id);
  };

  useEffect(() => {
    if (isError) {
      swal("Oops!", "Failed to delete book!", "error");
    }
    if (isSuccess) {
      swal("Congratulations!", "Book deleted uccessfully!", "success");
      navigate("/books");
    }
  }, [isError, isSuccess, navigate]);

  return (
    <div className="modal " id="delete_book_modal">
      <div className="modal-box bg-gray-700 ">
        {/* cros button */}
        <div className="modal-action">
          <a
            href="#"
            className="btn btn-circle btn-ghost absolute right-2 top-2 text-error"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </a>
        </div>
        {/* cros button */}

        {/* modal body */}
        <div className="relative rounded-lg">
          <div className="p-6 text-center">
            {/* icon */}
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {/* icon */}
            <h3 className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the book{" "}
              <span className="text-lg text-yellow-400">
                {title}
                <span className="badge badge-sm indicator-item">{genre}</span>
              </span>{" "}
              written by{" "}
              <span className="text-lg text-indigo-500">{author}</span> ?
            </h3>
            {!isLoading ? (
              <button
                onClick={handleDelete}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
            ) : (
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                <span className="loading loading-spinner text-warning font-bold loading-sm"></span>
              </button>
            )}

            <a
              href="#"
              data-modal-hide="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </a>
          </div>
        </div>
        {/* modal body */}
      </div>
    </div>
  );
};

export default DeleteBookModal;
