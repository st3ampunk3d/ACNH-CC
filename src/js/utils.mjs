export async function renderListWithTemplates(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings =  await list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings?.join(""));
}

export function renderWithTemplate(
    template,
    parentElement,
    data,
    callback,
  ) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
      callback(data)
    }
  }

  
  async function loadTemplate(path) {
    const res = await fetch(path)
    const template = await res.text()
    return template
  }

  
  export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("../partials/header.html")
    const headerElement = document.getElementById("main-header")
    const footerTemplate = await loadTemplate("../partials/footer.html")
    const footerElement = document.getElementById("main-footer")
    
    renderWithTemplate(headerTemplate, headerElement)
    renderWithTemplate(footerTemplate, footerElement)

    setInterval(time, 1000)
  }

  function time() {
    var date = new Date()
    var minute = date.getMinutes()
    var hour = date.getHours()

    const day = date.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})

    const dateTime = document.getElementById("date-time")
    const time = ("0"+hour).substr(-2) + ":" +("0"+minute).substr(-2)
    dateTime.innerHTML = `<h2 class="date">${day}</h2></br><h3 class="time">${time}</h3>`
  }

  export function getParams(param){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get(param);
    return product;
  }

  export function capitalize(text) {
    const firstLetterCaps = text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    const capitalized = firstLetterCaps.replace(/(^\w{1})|(-+\w{1})/g, letter => letter.toUpperCase());
    return capitalized
  }