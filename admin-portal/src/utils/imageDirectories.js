export const CHEF_URL = "http://localhost:5400/chefs";
export const INGREDIENTS_URL = "http://localhost:5400/ingredients";


export const configureImageURL = (avatar) => {
    let urlArr = avatar.split('/');
    return `/${urlArr[urlArr.length - 1]}`;
}