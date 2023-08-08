import { useGetBooksQuery } from "../redux/api/apiSlice";

const Home = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  console.log(isLoading);
  if (!isLoading) {
    console.log(data.data);
  }
  console.log(error);
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

export default Home;
