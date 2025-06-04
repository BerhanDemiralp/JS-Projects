const apiKey = "d6a96-N2xWQZ9PuIvv6lqRtoRqGuODTbiEoylDJXzp0";

const searchButton = document.querySelector(".search-button");
const textInputEl = document.getElementById("text-input");
const boxGrid = document.querySelector(".box-grid");
const showMoreButton = document.querySelector(".show-more-button");

let inputData;
let page = 1;

searchButton.addEventListener("click", (event) => {
  searchImages();
});
showMoreButton.addEventListener("click", (event) => {
  showMore();
});
function createResultsHtml(results) {
  results.map((value) => {
    const boxContainer = document.createElement("div");
    boxContainer.classList.add("box");
    const imgContaniner = document.createElement("div");
    imgContaniner.classList.add("box-img");
    const img = document.createElement("img");
    img.src = value.urls.regular;
    img.alt = `${inputData} Image`;
    const desc = document.createElement("a");
    desc.text = value.alt_description;
    desc.classList.add("box-desc");
    desc.href = value.links.html;
    boxContainer.appendChild(imgContaniner);
    boxContainer.appendChild(desc);
    imgContaniner.appendChild(img);
    boxGrid.appendChild(boxContainer);
    showMoreButton.style.display = "block";
    page++;
  });
}
async function searchImages() {
  inputData = textInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page${page}&query=${inputData}&client_id=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  boxGrid.innerHTML = "";
  createResultsHtml(results);
}

async function showMore() {
  const url = `https://api.unsplash.com/search/photos?page${page}&query=${inputData}&client_id=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  createResultsHtml(results);
}
