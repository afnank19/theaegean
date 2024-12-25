export const imgUrlValidator = (imgUrl) => {
  if (!imgUrl.contains("https://images.pexels.com/photos")) {
    return false;
  }
};
