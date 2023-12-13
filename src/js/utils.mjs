export function getLocalStorage(key) {
  var storedArray = JSON.parse(localStorage.getItem(key));
  if (storedArray == null) {
    storedArray = {};
  }
  return storedArray;
}
// save data to local storage
export function setLocalStorage(key, collection, data) {

  try {
    
    let storedArray = JSON.parse(localStorage.getItem(key));
    
    if (storedArray == null) {
      storedArray = {[collection] : []}
    }

    if (!storedArray[collection]) {
      storedArray[collection] = []
    }

    if (storedArray[collection] != null) {
      var result = storedArray[collection].find(item => item.name === data.name)

      if (!result) {
        storedArray[collection].push(data)
      } else {
        const index = storedArray[collection].findIndex((item) => item.name == data.name)
        storedArray[collection].splice(index, 1)
      }
  
      localStorage.setItem(key, JSON.stringify(storedArray));   
    }

  } catch (error) {
    console.error(error);
  }
}

export async function loadSaved(key, category, element) {
  const cards = document.querySelectorAll(`.${element}`)
  const list = getLocalStorage(key)[category]

  if (list != null) {
    cards.forEach((item) => {
      if (list.find(thing => thing.name == item.id)) {
        item.classList.add("saved")
      } else {
        item.classList.remove("saved")
      }
    })
  }
}

export async function addSaved(key, element, category, list, reload) {
  setTimeout(() => {
    window.onload = loadSaved(key, category, element)

    document.querySelector("#content-wrapper").addEventListener("click", function(e) {
      if (e.target && e.target.nodeName =="I") {
        var classes = e.target.className.split(" ")
        if (classes) {
          for (var x=0; x < classes.length; x++) {
            if(classes[x] == element) {
              const index = list.findIndex((item) => item.name == e.target.id)
              setLocalStorage(key, category, list[index])
              loadSaved(key, category, element, e.target.id)
              if (reload) {
                location.reload()

              } 
            }
          }
        }
      }
    })
  }, 200)
}

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

  export function paginate(element, perPage) {
      const content = document.querySelector(element); 
      const itemsPerPage = perPage;
      let currentPage = 0;
      const items = Array.from(content.getElementsByTagName('article')).slice(0);
    
    function showPage(page) {
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      items.forEach((item, index) => {
        item.classList.toggle('hidden', index < startIndex || index >= endIndex);
      });
      updateActiveButtonStates();
    }
    
    function createPageButtons() {
      const totalPages = Math.ceil(items.length / itemsPerPage);
      const paginationContainer = document.createElement('div');
      const paginationDiv = document.body.appendChild(paginationContainer);
      paginationContainer.classList.add('pagination');
    
      for (let i = 0; i < totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i + 1;
        pageButton.addEventListener('click', () => {
          currentPage = i;
          showPage(currentPage);
          updateActiveButtonStates();
        });
    
          content.appendChild(paginationContainer);
          paginationDiv.appendChild(pageButton);
        }
    }
    
    function updateActiveButtonStates() {
      const pageButtons = document.querySelectorAll('.pagination button');
      pageButtons.forEach((button, index) => {
        if (index === currentPage) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }
    
      createPageButtons(); // Call this function to create the page buttons initially
      showPage(currentPage);
    
  }