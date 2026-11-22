type ErrorProps = {
  message: string;
};

export default function Error({ message }: ErrorProps) {
  return (
    <p role="alert" className="text-red-500">{message}</p>
  )
}