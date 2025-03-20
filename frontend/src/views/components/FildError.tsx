import { CrossCircledIcon } from "@radix-ui/react-icons";

interface FildErrorProps {
  message: string;
}

export function FildError({ message }: FildErrorProps) {
  return (
    <div className="flex gap-2 items-center mt-2 text-red-900">
      <CrossCircledIcon />
      <span className="text-xs">{message}</span>
    </div>
  );
}
