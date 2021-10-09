
let globalTiggleData = [];
tiggleContent = document.getElementById("tiggleContentRow");

const addCard = () => {
  const newTiggleDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imageURL").value,
    title: document.getElementById("tiggleTitle").value,
    type: document.getElementById("tiggleType").value,
    description: document.getElementById("tiggleDescription").value
  };

  tiggleContent.insertAdjacentHTML('beforeend', generateTiggleCard(newTiggleDetails));

  globalTiggleData.push(newTiggleDetails);
  saveToLocalStorage();

}

const generateTiggleCard = ({id, url, title, type, description}) => {
  return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-outline-danger" name="${id}" onclick="deleteTiggle(this)">
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <img src=${url} class="card-img-top" alt="image">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <span class="badge bg-dark">${type}</span>
      </div>

    </div>
  </div>`);
}
const saveToLocalStorage = () => {
  localStorage.setItem("tigglehotchocolate", JSON.stringify({tiggle: globalTiggleData}));
}
const reloadTiggleCard = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem("tigglehotchocolate"));
  console.log(localStorageCopy);
  if(localStorageCopy) {
    globalTiggleData = localStorageCopy["tiggle"];
  }
  console.log(globalTiggleData);
  globalTiggleData.map((cardData) => {
      tiggleContent.insertAdjacentHTML('beforeend', generateTiggleCard(cardData));
  })
}

const deleteTiggle = (e) => {
  const targetID = e.getAttribute("name");
  globalTiggleData = globalTiggleData.filter((cardData) => cardData.id!==targetID);
  saveToLocalStorage();
  window.location.reload();
}
