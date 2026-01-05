import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="mt-40 flex items-center justify-center font-bold">
      <Spinner/>
    </div>
  );
}

export default Loading;