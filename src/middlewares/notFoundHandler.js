import createHttpError from "http-errors";

export const notFoundHandler = ( next) => {
  next(createHttpError(404, "Route not found"));
};
