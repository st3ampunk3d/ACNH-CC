import ExternalServices from "./ExternalServices.mjs";
import CreatureList from "./CreatureList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ExternalServices();

dataSource.getData(category);

const listElement = document.querySelector(".collectable-grid");
const myList = new CreatureList(category, dataSource, listElement);

myList.init();
