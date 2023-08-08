export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  imageURL?: string;
  publicationYear: number;
  owner: string | Record<string, unknown>;
  reviews?: [Record<string, unknown>];
};
