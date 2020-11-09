const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const submitBtn = document.querySelector(".submit");
let search = document.querySelector(".search-input");

let initialLoad = 0;
let totalLoad = 0;
let photoArr = [];
let ready = false;
const count = 20;
let query = "";

const apiKey = "S0mkkheay0twKtgoj_RVMFToAsxaj0U86qKCMXhOZc4";

function imgLoad() {
  initialLoad++;
  if (initialLoad === totalLoad) {
    ready = true;
    loader.hidden = true;
  }
}

search.addEventListener("input", (e) => {
  loader.hidden = false;
  gallery.innerHTML = "";
  query = e.target.value;
});

const gettingImages = async (url) => {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
};

const displayImgs = (photoArr) => {
  totalLoad = photoArr.length;
  photoArr.forEach((photo) => {
    const imgDiv = document.createElement("div");
    imgDiv.innerHTML = `<img src=${photo.urls.regular} alt=${photo.alt_description} />
    <p> ${photo.user.first_name} ${photo.user.last_name}</p>`;
    imgLoad();
    gallery.appendChild(imgDiv);
  });
};

const getImgs = async () => {
  initialLoad = 0;
  const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  const photoArr = await gettingImages(url);
  displayImgs(photoArr);
};

const searchImgs = async (e) => {
  loader.hidden = true;
  e.preventDefault();
  const url = `https://api.unsplash.com//search/photos/?client_id=${apiKey}&query=${query}&per_page=15&page=1`;
  const photoObj = await gettingImages(url);
  const photoArr = photoObj.results;
  displayImgs(photoArr);

  search.value = "";
};

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getImgs();
  }
});

submitBtn.addEventListener("click", searchImgs);

getImgs();
