const baseURL = "https://api.nookipedia.com/";
const apiKey = "792cc0a7-29b3-4e95-9511-4ea12a6b0fd8"

async function convertToJson(res) {
  const jsonResponse = async () => {
    const a = await res;
    return a
  };

    return jsonResponse();
}

export default class ExternalServices {
  constructor(category) {
  }

  async getData(url) {
    var data = null
    const options = {
        mehtod: "GET",
        headers: {
            "x-api-key": apiKey
        }
    }

    data = await fetch(`${url}`, options)
    .then((response) => response.json())
    .then((item) => {
        return item
    })

    return convertToJson(data)
}

  async getVillagers() {
      const url = `${baseURL}villagers`
      return this.getData(url)
  }

  async getEvents(year, month) {
      const url = `${baseURL}nh/events?year=${year}&month=${month}`
      return this.getData(url)
  }

  async getCreatures(category) {
      const url = `${baseURL}nh/${category}`
      return this.getData(url)
  }

  async getCreature(category, name) {
    const url = `${baseURL}nh/${category}/${name}`
    const data = await this.getData(url)
    return data
  }

  async getArt() {
      const url = `${baseURL}nh/art`
      return this.getData(url)
  }

  async getSingle(url) {
    const response = await fetch(url)
    const data = await convertToJson(response)
    return data.Result;
  }
}