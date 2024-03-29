import ExternalServices from "./ExternalServices.mjs";
import VillagerList from "./VillagerList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices().getVillagers();

const listElement = document.querySelector(".collectable-grid");
const myList = new VillagerList(dataSource, listElement);

myList.init();
