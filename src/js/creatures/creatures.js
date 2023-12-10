import ExternalServices from "../ExternalServices.mjs";
import CreatureList from "./CreatureList.mjs";
import CreatureDetails from "./CreatureDetails.mjs";
import { loadHeaderFooter, getParams } from "../utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const name = getParams("name")
console.log(name)

if (name == null) {
    const dataSource = new ExternalServices().getCreatures(category);

    const listElement = document.querySelector(".collectable-grid");
    const myList = new CreatureList(category, dataSource, listElement);
    
    myList.init();
} else {
    const dataSource = new ExternalServices().getCreature(category, name);
    const creature = new CreatureDetails(category, dataSource);
    
    creature.init();    
}

