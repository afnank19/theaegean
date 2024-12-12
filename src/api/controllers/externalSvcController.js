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
