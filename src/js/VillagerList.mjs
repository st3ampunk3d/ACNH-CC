import { renderListWithTemplates, capitalize, addSaved, paginate } from "./utils.mjs";

function ItemCardTemplate(item) {
    return `
    <article class="card">
    <div class="card-content">
    <img class="villager image"
      src=${item.image_url}
      alt="${item.name}"
    />
    <h3>${capitalize(item.name)}</span></h3>
    <hr />
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
  
      //document
      //.getElementById("sort")
      //.addEventListener("change", this.sortOrder.bind(this));
  
      await this.renderList(list);

      addSaved("ac-favorites", "fav", "villagers", list, this.reload)
      addSaved("ac-collection", "collected", "villagers", list, this.reload)
    }
  
    async sortOrder() {
      let list = await this.dataSource.getData(this.category);
  
      var e = document.getElementById("sort");
      var option = e.options[e.selectedIndex].text;
      list.sort((a,b) => {
        let fa = a.NameWithoutBrand.toLowerCase()
        let fb = b.NameWithoutBrand.toLowerCase()
      
        if (option == "Price") {
           return Number(a.FinalPrice) - Number(b.FinalPrice)
        }
        if (option == "Brand") {
          fa = a.Brand.Name.toLowerCase()
          fb = b.Brand.Name.toLowerCase()
        }
      
        return fa.localeCompare(fb)
      })
      document.querySelector(".collectable-grid").innerHTML = ""
      this.renderList(list)
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