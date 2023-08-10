type IOwner = {
  name: string;
  email: string;
  updatedAt: string;
  createdAt: string;
  _id: string;
};

export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  imageURL?: string;
  publicationYear: number;
  owner: IOwner;
  reviews?: [Record<string, unknown>];
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
