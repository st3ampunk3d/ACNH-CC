import { addSaved, capitalize } from "../utils.mjs";

function htmlTemplate(item){
    const template = `
    <article class="card">
    <div class="card-content">
    <img class="image"
      src=${item.render_url}
      alt="${item.name}"
    />
    <h2>${capitalize(item.name)}</h2>
    <hr />
    <p>
      ${item.catchphrases[0]}
    </p>
    <ul>
        <li>${item.location}</li>
        <li>${item.sell_nook}</li>
        <li>${item.rarity}</li>
        <li>${item.north.availability_array[0].months}</li>
        <li>${item.north.availability_array[0].time}</li>
        <li>${item.shadow_size}</li>
    </ul>
    <div class="actions">
    <i id="${item.name}" class="fa-solid fa-heart fav"></i>
    <i id="${item.name}" class="fa-solid fa-circle-check collected"></i>
    </div>
    </div>
    </article>`;

    return template
}

export default class CreatureDetails{
    constructor(category, dataSource){
        this.category = category
        this.dataSource = dataSource
        this.creature = {}
    }

    async init() {
        this.creature = await this.dataSource;
        this.renderDetails(".main-content")

        addSaved("ac-favorites", "fav", this.category, [this.creature])
        addSaved("ac-collection", "collected", this.category, [this.creature])

        
    }

    renderDetails(element){
        const main = document.querySelector(element)
        main.innerHTML=""
        main.insertAdjacentHTML("afterbegin", htmlTemplate(this.creature))
    }
}