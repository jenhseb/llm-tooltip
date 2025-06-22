import { X } from "lucide-react";

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <X
      className="btn btn-circle btn-sm absolute top-1 right-1 h-4 w-4 border-2 border-neutral-400 bg-neutral-50 text-neutral-500 hover:text-neutral-700 focus:outline-none"
      onClick={onClick}
    />
  );
};

export default CloseButton;
