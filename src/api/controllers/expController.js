import { experimentingDoing } from "../services/expService.js";

export const doExperiment = async (req, res) => {
  console.log("Experimenting");

  const result = experimentingDoing();

  res.json({ message: result });
};
