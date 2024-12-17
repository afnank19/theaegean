import { AegeanError } from "../middlewares/errorHandler.js";
import * as externalServiceAccess from "../services/externalService.js";

/**
 * This awaits external service access to fetch the world news
 * and returns it on success or passes an error to next
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getWorldNews = async (req, res, next) => {
  try {
    // Await external service layer response
    const response = await externalServiceAccess.fetchWorldNews();

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getPexelsImages = async (req, res, next) => {
  try {
    const query = req.query.query;

    if (query === undefined) {
      throw new AegeanError("Attempted to get images without search term", 400);
    }

    const response = await externalServiceAccess.searchImages(query);

    res.json(response);
  } catch (error) {
    next(error);
  }
};
