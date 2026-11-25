class HttpError extends Error {
  constructor(message, statusCode = 500) {
    if (typeof message === "number") {
      super(statusCode || "Error");
      this.statusCode = message;
      this.statuscode = message;
    } else {
      super(message || "internal server error");
      this.statusCode = statusCode || 500;
      this.statuscode = statusCode || 500;
    }
  }
}

export default HttpError;
