export const imgUrlValidator = (imgUrl) => {
  const testUrl = new URL(imgUrl);

  if (testUrl.origin !== "https://images.pexels.com") {
    return false;
  }

  if (testUrl.protocol !== "https:") {
    return false;
  }

  return true;
};
