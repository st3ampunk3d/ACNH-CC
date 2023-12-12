import ExternalServices from "../ExternalServices.mjs";
import CreatureList from "./CreatureList.mjs";
import CreatureDetails from "./CreatureDetails.mjs";
import { loadHeaderFooter, getParams, capitalize } from "../utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const name = getParams("name");

if (name == null) {
  const dataSource = new ExternalServices().getCreatures(category);

  const listElement = document.querySelector(".collectable-grid");
  const myList = new CreatureList(category, dataSource, listElement);

  myList.init();

  var icon = "";
  switch (category) {
    case "fish":
      icon = `<img src="../images/link-icons/icon_fish.png" />`;
      break;
    case "sea":
      icon = `<img src="../images/link-icons/icon_sea.png" />`;
      break;
    case "bugs":
      icon = `<img src="../images/link-icons/icon_bug.png" />`;
      break;
  }

  document.querySelector("#category").innerHTML = `Collectables - ${capitalize(
    category
  )}`;
  document.querySelector("#info").innerHTML = icon;
} else {
  const dataSource = new ExternalServices().getCreature(category, name);
  const creature = new CreatureDetails(category, dataSource);

  creature.init();
}
