export const getImgSrc = (url) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}