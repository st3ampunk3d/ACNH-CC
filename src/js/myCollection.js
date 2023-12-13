import CreatureList from "./creatures/CreatureList.mjs";
import VillagerList from "./VillagerList.mjs";
import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

window.onload = renderList("fish");

document.querySelector(".fish").addEventListener("click", function () {
  renderList("fish");
});

document.querySelector(".bugs").addEventListener("click", function () {
  renderList("bugs");
});

document.querySelector(".sea").addEventListener("click", function () {
  renderList("sea");
});

document.querySelector(".villagers").addEventListener("click", function () {
  renderList("villagers");
});

async function renderList(category) {
  const dataSource = getLocalStorage("ac-collection")[category];

  const listElement = document.querySelector(".collectable-grid");
  var myList = [];

  switch (category) {
    case "fish":
      myList = await new CreatureList(category, dataSource, listElement, true);
      break;
    case "sea":
      myList = await new CreatureList(category, dataSource, listElement, true);
      break;
    case "bugs":
      myList = await new CreatureList(category, dataSource, listElement, true);
      break;
    case "villagers":
      myList = await new VillagerList(dataSource, listElement, true);
      break;
  }

  listElement.innerHTML = "";

  if (getLocalStorage(category) != null) {
    myList.init();
  }
}
