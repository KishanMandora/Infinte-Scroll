const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
// const loader = document.querySelector(".loader");
let initialLoad = 0;
let totalLoad = 0;
let photoArr = [];
const apiKey = "S0mkkheay0twKtgoj_RVMFToAsxaj0U86qKCMXhOZc4";
const listUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&per_page=5&page=1`;

function imgLoad() {
  initialLoad++;
  if (initialLoad === totalLoad) {
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

getImgs();
