import options from '../setting';
const { IMG_URL } = options;

export const getPosterPath = imageName => `${IMG_URL}${imageName}`;
