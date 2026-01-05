interface ErrorProps {
  message: string | undefined;
}

const Error = ({message}: ErrorProps) => {
  return (
    <div className="bg-red-200 text-red-700 text-sm text-center mt-2 p-2 rounded-md">
      {message}
    </div>
  );
}

export default Error;