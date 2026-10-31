interface Props {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  title = "Something went wrong",
  message,
  onRetry,
}: Props) => {
  return (
    <div
      role="alert"
      className="rounded-card bg-error-50 p-section text-center"
    >
      <p className={`text-error-700`}>{title}</p>
      {message && <p className={`text-grey-500 mt-2`}>{message}</p>}
      {onRetry && (
        <button color="grey" onClick={onRetry} className="mt-4">
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
