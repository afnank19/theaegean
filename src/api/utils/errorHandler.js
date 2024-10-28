// Boilier plate for now
export const errorHandler = (err, req, res, next) => {
  console.log("I got ran after the request");

  console.error(err.stack); // Log error details for debugging
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    status: err.status || 500,
  });
};

export class AegeanError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
