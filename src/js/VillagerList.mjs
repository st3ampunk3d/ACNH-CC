import { renderListWithTemplates, capitalize, addSaved, paginate } from "./utils.mjs";

function ItemCardTemplate(item) {
    var saying = item.quote

    if (saying == "") {
      saying = item.phrase
    }

    return `
    <article class="card">
    <div class="card-content">
    <a href="#">
    <img class="image villager"
      src="${item.image_url}"
      alt="${item.name}"
    />
    </a>
    <h3>${capitalize(item.name)}</h3>
    <hr />
    <p>
      ${saying}
    </p>
    <div class="actions">
    <i id="${item.name}" class="fa-solid fa-heart fav"></i>
    <i id="${item.name}" class="fa-solid fa-circle-check collected"></i>
    </div>
    </div>
    </article>`;
}

export default class VillagerList {
    constructor(dataSource, gridElement, reload=false) {
      this.dataSource = dataSource;
      this.gridElement = gridElement;
      this.reload = reload;
    }
    async init() {
      const list = await this.dataSource;
      console.log(list);
  
      await this.renderList(list);

      addSaved("ac-favorites", "fav", "villagers", list, this.reload);
      addSaved("ac-collection", "collected", "villagers", list, this.reload);
    }
  
    renderList(list) {
      if (list != null) {
        renderListWithTemplates(ItemCardTemplate, this.gridElement, list);

        setTimeout(() => {
          paginate(".collectable-grid", 50);
        }, 200);
      }
      

    }
  }