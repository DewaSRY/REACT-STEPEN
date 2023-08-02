import { faker } from "@faker-js/faker";
export const createRandomMovie = () => {
  return `${faker.word.adjective()} ${faker.word.noun()}`;
};
export const createRandomSong = () => {
  return faker.music.songName();
};
export const createRandomName = () => {
  return faker.person.firstName();
};
export const createRandomAlbums = () => {
  return faker.commerce.productName();
};
export const createRandomPhotos = () => {
  return faker.image.avatar();
};
