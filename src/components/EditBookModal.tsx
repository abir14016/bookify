import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/api/apiSlice";
import swal from "sweetalert";
import { useEffect } from "react";
import { genres } from "../constants/constants";
import { useParams } from "react-router-dom";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  imageURL?: string;
  publicationYear: number;
  owner: string;
  // reviews?: [IReviewResponse];
};

const EditBookModal = () => {
  const { id } = useParams();
  const { data: currentBookData } = useGetSingleBookQuery(id);
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { title, author, genre, imageURL, publicationYear, owner } =
    currentBookData.data;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IBook>();

  const [
    updateBook,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,
      data: updateDBook,
    },
  ] = useUpdateBookMutation();

  // submit button
  const onSubmit: SubmitHandler<IBook> = async (data: IBook) => {
    data.publicationYear = Number(data.publicationYear);
    const options = {
      id: id,
      updatedData: data,
    };
    updateBook(options);
  };

  useEffect(() => {
    if (updateError) {
      swal("Oops!", "Failed to add book!", "error");
    }
    if (updateSuccess && updateDBook) {
      swal("Congratulations!", "Book updated uccessfully!", "success");
    }
  }, [updateError, updateSuccess, updateDBook]);
  return (
    <dialog className="modal" id="edit_book_modal">
      <div className="modal-box w-11/12 max-w-5xl h-auto border-2">
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
        {/* modal body */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-around items-center">
              <div>
                {/* title field */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={title}
                    placeholder="Book title"
                    className="input input-bordered w-full max-w-xs"
                    {...register("title", {
                      required: {
                        value: true,
                        message: "Title is required",
                      },
                    })}
                  />
                  {errors.title?.type === "required" && (
                    <p className="text-sm text-warning" role="alert">
                      {errors?.title?.message}
                    </p>
                  )}
                </div>
                {/* title field */}

                {/* author field */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Author</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={author}
                    placeholder="Author Name"
                    className="input input-bordered w-full max-w-xs"
                    {...register("author", {
                      required: {
                        value: true,
                        message: "author name is required",
                      },
                    })}
                  />
                  {errors.author?.type === "required" && (
                    <p className="text-sm text-warning" role="alert">
                      {errors?.author?.message}
                    </p>
                  )}
                </div>
                {/* author field */}

                {/* genre field */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Genre</span>
                  </label>
                  <select
                    defaultValue={genre}
                    className="input input-bordered w-full max-w-xs cursor-pointer"
                    {...register("genre", {
                      required: {
                        value: true,
                        message: "Book genre is required",
                      },
                    })}
                  >
                    <option disabled value="">
                      Select Genre
                    </option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                  {errors.genre?.type === "required" && (
                    <p className="text-sm text-warning" role="alert">
                      {errors.genre?.message}
                    </p>
                  )}
                </div>

                {/* genre field */}
              </div>
              <div>
                {/* image field */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Image</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={imageURL}
                    placeholder="Book imageURL"
                    className="input input-bordered w-full max-w-xs"
                    {...register("imageURL", {
                      required: {
                        value: true,
                        message: "ImageURL is required",
                      },
                    })}
                  />
                  {errors.imageURL?.type === "required" && (
                    <p className="text-sm text-warning" role="alert">
                      {errors?.imageURL?.message}
                    </p>
                  )}
                </div>
                {/* image field */}

                {/* year field */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Publication Year</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={publicationYear}
                    placeholder="Publication Year"
                    className="input input-bordered w-full max-w-xs"
                    {...register("publicationYear", {
                      required: {
                        value: true,
                        message: "Publication year is required",
                      },
                    })}
                  />
                  {errors.publicationYear && (
                    <p className="text-sm text-warning" role="alert">
                      {errors.publicationYear.message}
                    </p>
                  )}
                </div>
                {/* year field */}

                {/* owner field */}
                <div className="form-control  w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Your id</span>
                  </label>
                  <input
                    type="text"
                    // readOnly
                    defaultValue={owner?._id}
                    className="input input-disabled text-blue-400 border-blue-400 input-bordered w-full max-w-xs"
                    {...register("owner", {
                      required: {
                        value: true,
                        message: "your id is required",
                      },
                    })}
                  />
                  {errors.owner?.type === "required" && (
                    <p className="text-sm text-warning" role="alert">
                      {errors?.owner?.message}
                    </p>
                  )}
                </div>
                {/* owner field */}
              </div>
            </div>

            {!updateLoading ? (
              <div className="flex justify-end">
                <input
                  className="btn btn-sm btn-primary btn-wide max-w-xs mt-10"
                  type="submit"
                  value="Edit Book"
                />
              </div>
            ) : (
              <div className="flex justify-end">
                <button className="btn btn-sm btn-primary btn-wide max-w-xs mt-10">
                  <span className="loading loading-spinner text-warning font-bold loading-sm"></span>
                </button>
              </div>
            )}
          </form>
        </div>
        {/* modal body */}
      </div>
    </dialog>
  );
};

export default EditBookModal;
