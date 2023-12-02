import { renderListWithTemplates, capitalize } from "./utils.mjs";

function ItemCardTemplate(item) {
    return `
    <article class="card">
    <div class="card-content">
    <img
      src=${item.image_url}
      alt="${item.name}"
    />
    <h3>${capitalize(item.name)}</span></h3>
    <hr />
    <p>
      ${item.catchphrases[0]}
    </p>
    </div>
    </article>`;
}

export default class CreatureList {
    constructor(category, dataSource, gridElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.gridElement = gridElement;
    }
    async init() {
      const list = await this.dataSource.getData(this.category);
      console.log(list)
  
      //document
      //.getElementById("sort")
      //.addEventListener("change", this.sortOrder.bind(this));
  
      this.renderList(list);
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
      renderListWithTemplates(ItemCardTemplate, this.gridElement, list);

    }
  }