import { useForm, SubmitHandler } from "react-hook-form";
import { useAddBookMutation } from "../redux/api/apiSlice";
import swal from "sweetalert";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { IDecoded } from "../types/globalTypes";
import { parseAccessToken } from "../utils/utils";
import { genres } from "../constants/constants";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  imageURL?: string;
  publicationYear: number;
  owner: string;
  // reviews?: [IReviewResponse];
};

const AddBook = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  let decoded: IDecoded | null = null;
  if (accessToken) {
    decoded = parseAccessToken(accessToken) as IDecoded;
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IBook>();

  const [addBook, { isLoading, isError, isSuccess, data }] =
    useAddBookMutation();
  // submit button
  const onSubmit: SubmitHandler<IBook> = async (data: IBook) => {
    data.publicationYear = Number(data.publicationYear);
    addBook(data);
  };

  useEffect(() => {
    if (isError) {
      swal("Oops!", "Failed to add book!", "error");
    }
    if (isSuccess && data) {
      swal("Congratulations!", "Book added uccessfully!", "success");
    }
  }, [isError, isSuccess, data]);
  return (
    <div className="md:flex justify-between items-center px-2 md:px-8 lg:px-64  h-screen">
      {/* <div> */}
      <div className="card w-full  bg-base-200 shadow-xl border-2">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold">Add Book</h2>
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
                    readOnly // Add the readOnly attribute
                    defaultValue={decoded?.userId}
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

            {!isLoading ? (
              <div className="flex justify-end">
                <input
                  className="btn btn-sm btn-primary btn-wide max-w-xs mt-10"
                  type="submit"
                  value="Add Book"
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
      </div>
      {/* </div> */}
    </div>
  );
};

export default AddBook;
