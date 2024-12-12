function ErrorBanner({ errorMessage }) {
  return (
    errorMessage && (
      <div className="bg-Secondary mt-5 p-1">
        <strong className="ml-1">Error:</strong> {errorMessage}
      </div>
    )
  );
}

export default ErrorBanner;
