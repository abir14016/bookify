export type IOwner = {
  name: string;
  email: string;
  updatedAt: string;
  createdAt: string;
  _id: string;
};

export type IReview = {
  reviewerName: string;
  reviewerEmail: string;
  review: string;
};

export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  imageURL?: string;
  publicationYear: number;
  owner: IOwner;
  reviews?: [IReview] | undefined;
};

export type IDecoded = {
  userEmail: string;
  userName: string;
  userId: string;
};

export type IGenre =
  | "Self-Help"
  | "Detective"
  | "Programming"
  | "Thriller"
  | "Science Fiction"
  | "Novel";

export type ITag = "will read in future" | "currently reading" | "completed";
