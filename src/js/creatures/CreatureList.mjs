import { renderListWithTemplates, capitalize, addSaved, getParams } from "../utils.mjs";

function ItemCardTemplate(item) {
    return `
    
    <article class="card">
    <div class="card-content">
    <a href="./?category=${getParams("category")}&name=${item.name}">
    <img class="image"
      src=${item.image_url}
      alt="${item.name}"
    />
    </a>
    <h3>${capitalize(item.name)}</h3>
    <hr />
    <p>
      ${item.catchphrases[0]}
    </p>
    <div class="actions">
    <i id="${item.name}" class="fa-solid fa-heart fav"></i>
    <i id="${item.name}" class="fa-solid fa-circle-check collected"></i>
    </div>
    </div>
    </article>`;
}

export default class CreatureList {
    constructor(category, dataSource, gridElement, reload=false) {
      this.category = category;
      this.dataSource = dataSource;
      this.gridElement = gridElement;
      this.reload = reload
    }
    async init() {
      const list = await this.dataSource;
  
      //document
      //.getElementById("sort")
      //.addEventListener("change", this.sortOrder.bind(this));
  
      this.renderList(list);
      addSaved("ac-favorites", "fav", this.category, list, this.reload)
      addSaved("ac-collection", "collected", this.category, list, this.reload)
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
      document.querySelector(".product-list").innerHTML = ""
      this.renderList(list)
    }
  
    renderList(list) {
      if (list != null) {
        renderListWithTemplates(ItemCardTemplate, this.gridElement, list);
      }


    }
  }