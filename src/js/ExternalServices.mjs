// const baseURL = import.meta.env.VITE_SERVER_URL;
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
    //this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  async getEvents(category, year, month) {
    var data = null
    const options = {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      }
    };

      data = await fetch(`${baseURL}nh/${category}?year=${year}&month=${month}`, options)
      .then((response) => response.json())
      .then((item) => {
      return item;
    });

  return convertToJson(data)
}

  async getData(category) {
    var data = null
    const options = {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      }
    };

      data = await fetch(`${baseURL}nh/${category}`, options)
      .then((response) => response.json())
      .then((item) => {
      return item;
    });

  return convertToJson(data)
}
}