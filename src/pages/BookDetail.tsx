import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/api/apiSlice";
import { IBook } from "../types/globalTypes";

const BookDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);

  let book: IBook | undefined;
  if (!isLoading) {
    book = data.data;
    console.log(book);
  }
  return (
    <div className="flex justify-center my-5 md:my-10 lg:my-16">
      <div className="card card-side bg-base-100 shadow-xl border-2 w-1/2">
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
            <span className="badge badge-sm badge-warning">{book?.genre}</span>
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
              <button className="btn btn-info btn-sm mr-1">Edit</button>
              <button className="btn btn-error btn-sm ml-1">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
