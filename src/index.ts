import './scss/styles.scss';
import { Api } from "./components/base/api";
import {API_URL} from "./utils/constants"

const data = new Api(API_URL);
console.log(data.get("/product/").then((data) => {console.log(data)}))