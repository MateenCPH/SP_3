function ErrorBanner({ errorMessage }) {
  return (
    errorMessage && (
      <div>
        <strong>Error:</strong> {errorMessage}
      </div>
    )
  );
}

export default ErrorBanner;
