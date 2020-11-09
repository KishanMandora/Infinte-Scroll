const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
// const loader = document.querySelector(".loader");
let initialLoad = 0;
let totalLoad = 0;
let photoArr = [];
let ready = false;
const count = 5;
const apiKey = "S0mkkheay0twKtgoj_RVMFToAsxaj0U86qKCMXhOZc4";
const listUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imgLoad() {
  initialLoad++;
  if (initialLoad === totalLoad) {
    ready = true;
    loader.hidden = true;
  }
}

const getImgs = async () => {
  const resp = await fetch(listUrl);
  const photoArr = await resp.json();

  totalLoad = photoArr.length;
  photoArr.forEach((photo) => {
    const imgDiv = document.createElement("div");
    imgDiv.innerHTML = `<img src=${photo.urls.regular} alt=${photo.alt_description} />
    <p> ${photo.user.first_name} ${photo.user.last_name}</p>`;
    imgLoad();
    gallery.appendChild(imgDiv);
  });
};

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getImgs();
  }
});

getImgs();
