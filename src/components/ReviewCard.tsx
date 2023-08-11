type IReview = {
  reviewerName: string;
  reviewerEmail: string;
  review: string;
};

const ReviewCard = ({ id, review }: { id: string; review: IReview }) => {
  console.log(id);
  return (
    <figure className="flex flex-col items-center justify-center p-8 text-center  border-b  rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r bg-gray-800 border-gray-700">
      <blockquote className="max-w-2xl mx-auto mb-4 lg:mb-8 text-gray-400">
        <p className="my-4">{review.review}</p>
      </blockquote>
      <figcaption className="flex items-center justify-center space-x-3">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
            <span className="text-3xl">
              {review.reviewerEmail[0].toLocaleUpperCase()}
            </span>
          </div>
        </div>
        <div className="space-y-0.5 font-medium text-white text-left">
          <div>{review.reviewerName}</div>
          <div className="text-sm text-gray-400">{review.reviewerEmail}</div>
        </div>
      </figcaption>
    </figure>
  );
};

export default ReviewCard;
