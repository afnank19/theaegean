import { addTestData, experimentingDoing } from "../services/expService.js";

export const doExperiment = async (req, res) => {
  console.log("Experimenting");

  const result = await experimentingDoing();

  res.json({ message: result });
};

export const postExperiment = async (req, res) => {
  console.log("Posting");

  await addTestData(req.body.title);

  res.json({ msg: "posted TEST" });
};
