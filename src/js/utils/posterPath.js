import options from '../setting';
const { IMG_URL } = options;
import notImg from '/images/notImg.png'


export const getPosterPath = imageName => {
    if (!imageName) {
        console.log('я не работаю');
        return imageName = `${notImg}`;
    }
    return `${IMG_URL}${imageName}`;
}
