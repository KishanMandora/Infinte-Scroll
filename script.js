const gallery = document.querySelector(".gallery");

const apiKey = "S0mkkheay0twKtgoj_RVMFToAsxaj0U86qKCMXhOZc4";
const listUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&per_page=5&page=1`;

const getImgs = async () => {
  const resp = await fetch(listUrl);
  const data = await resp.json();
  console.log(data);

  data.forEach((photo) => {
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);

    gallery.appendChild(img);
  });
};

getImgs();
