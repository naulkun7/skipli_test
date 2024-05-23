type Props = {};
const NotFound = (props: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <h1 className="text-4xl font-bold">Oops! 404</h1>
      <h2 className="text-3xl text-gray-600">Page not found</h2>
    </div>
  );
};
export default NotFound;
