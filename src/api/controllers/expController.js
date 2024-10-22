import { experimentingDoing } from "../services/expService.js";

export const doExperiment = async (req, res) => {
  console.log("Experimenting");

  const result = await experimentingDoing();

  res.json({ message: result });
};
