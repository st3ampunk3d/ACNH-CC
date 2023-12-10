import CreatureList from "./creatures/CreatureList.mjs";
import VillagerList from "./VillagerList.mjs";
import { loadHeaderFooter, getParams, getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = getLocalStorage("ac-collection")[category]

const listElement = document.querySelector(".collectable-grid");
var myList = []

switch(category) {
    case "fish":
        myList = new CreatureList(category, dataSource, listElement, true);
        break
    case "sea":
        myList = new CreatureList(category, dataSource, listElement, true);
        break
    case "bugs":
        myList = new CreatureList(category, dataSource, listElement, true);
        break
    case "villagers":
        myList = new VillagerList(dataSource, listElement, true);
        break
}

myList.init();
