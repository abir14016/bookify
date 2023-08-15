import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  useGetSingleBookQuery,
  useReviewMutation,
} from "../redux/api/apiSlice";
import { IBook, IDecoded, IReview } from "../types/globalTypes";
import BookDetailSkeleton from "../components/BookDetailSkeleton";
import EditBookModal from "../components/EditBookModal";
import { useAppSelector } from "../redux/hooks";
import { parseAccessToken } from "../utils/utils";
import swal from "sweetalert";
import DeleteBookModal from "../components/DeleteBookModal";
import ReviewCard from "../components/ReviewCard";
import { SubmitHandler, useForm } from "react-hook-form";
import { placeholderImageURL } from "../constants/constants";

const BookDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const { accessToken } = useAppSelector((state) => state.auth);
  let decoded: IDecoded | null = null;
  if (accessToken) {
    decoded = parseAccessToken(accessToken) as IDecoded;
  }

  // react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IReview>();

  const [
    makeReview,
    { isSuccess: isReviewSuccess, isError, error, isLoading: isReviewLoading },
  ] = useReviewMutation();

  useEffect(() => {
    if (isError && error) {
      swal("Oops!", "Failed to add review!", "error");
    }
    if (isReviewSuccess) {
      swal("Yes!", "Review added successfully!", "success");
      reset();
    }
  }, [isError, error, isReviewSuccess, reset]);

  const onSubmit: SubmitHandler<IReview> = async (data: IReview) => {
    if (decoded) {
      data.reviewerName = decoded?.userName;
      data.reviewerEmail = decoded?.userEmail;
    }
    const options = {
      id: id,
      updatedData: data,
    };
    makeReview(options);
  };
  // react hook form

  if (!id) {
    return <div>Loading...</div>; // Or any other appropriate action
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
  const handleDeleteButton = () => {
    if (!isMatched) {
      swal("Oops!", "You are not authorized to delete the book!", "error");
    }
  };

  // Function to handle image loading errors
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = placeholderImageURL; // Set placeholder image URL
  };

  return (
    <div className="px-2 md:px-8 lg:px-10 xl:px-12 my-16">
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
                alt="book"
                onError={handleImageError}
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
                  <a
                    onClick={handleDeleteButton}
                    href={isMatched ? "#delete_book_modal" : "#"}
                    className="btn btn-error btn-sm ml-1"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
            <EditBookModal></EditBookModal>
            <DeleteBookModal></DeleteBookModal>
          </div>
        </div>
      ) : (
        <div className="flex justify-center my-5 md:my-10 lg:my-16 items-center">
          <BookDetailSkeleton />;
        </div>
      )}

      {/* review input */}
      <div>
        <label className="label">
          <span className="label-text">What do you think about this book?</span>
        </label>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/* review field */}
            <div className="form-control">
              <div className="join">
                <input
                  className="input input-bordered join-item w-full input-md"
                  type="text"
                  placeholder="Type your thoughts"
                  {...register("review", {
                    required: {
                      value: true,
                      message: "please write something",
                    },
                  })}
                />
                {!isReviewLoading ? (
                  <input
                    type="submit"
                    value="SUBMIT"
                    className="btn join-item rounded-r-full"
                  ></input>
                ) : (
                  <button className="btn rounded-r-full">
                    <span className="loading loading-spinner text-warning font-bold loading-md"></span>
                  </button>
                )}
              </div>
            </div>
            {/* review field */}
            {errors.review?.type === "required" && (
              <p className="text-sm text-warning" role="alert">
                {errors?.review?.message}
              </p>
            )}
          </div>
        </form>
      </div>
      {/* review input */}

      {/* reviews section */}
      <div className="px-16">
        <div className="flex justify-between items-center mb-0 md:my-5 lg:my-10 xl:my-12">
          <div className="flex justify-start items-center text-4xl font-Poppins font-bold mr-5">
            <h2 className="mr-3">
              Reviews{" "}
              <span className="badge badge-warning">
                {book?.reviews?.length}
              </span>
            </h2>
            <hr className="hidden md:block lg:block xl:block mt-3 w-48 h-1 bg-gradient-to-r from-primary to-secondary rounded border-0" />
          </div>
        </div>
        {book?.reviews?.length ? (
          <div className="grid mb-8  rounded-lg shadow-sm  md:mb-12 md:grid-cols-2">
            {book?.reviews?.map((review, index) => (
              <ReviewCard key={index} review={review}></ReviewCard>
            ))}
          </div>
        ) : (
          <div>
            <h1 className="text-center text-3xl text-gray-500 font-bold">
              No review found !
            </h1>
            <h3 className="text-center text-gray-400">
              please give your feedback
            </h3>
          </div>
        )}
      </div>
      {/* reviews section */}
    </div>
  );
};

export default BookDetail;
