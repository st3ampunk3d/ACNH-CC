import CreatureList from "./CreatureList.mjs";
import { loadHeaderFooter, getParams} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ExternalServices();

const listElement = document.querySelector(".product-list");
const myList = new CreatureList(category, dataSource, listElement);

myList.init();
