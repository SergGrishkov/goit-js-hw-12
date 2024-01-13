import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const inputEl = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loaderEl = document.querySelector('body>span');

const BASE_URL = 'https://pixabay.com/api/';

function loaderDisplayStatus(status = 'none') {
  loaderEl.style.display = status;
}

const params = {
  key: '41531560-af55148938f1784ffe04592f4',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const galleryImg = new SimpleLightbox('.gallery a', {
  nav: true,
  captionDelay: 250,
  captionsData: 'alt',
  close: true,
  enableKeyboard: true,
  docClose: true,
});

document.addEventListener('DOMContentLoaded', () => {
  loaderDisplayStatus();
});

function getPicture(searchParams) {
  return fetch(`${BASE_URL}?${new URLSearchParams(searchParams)}`)
    .then(response => {
      if (!response.ok) {
        loaderDisplayStatus();
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(({ hits }) => {
      if (hits.length > 0) {
        loaderDisplayStatus();
        gallery.innerHTML = renderImages(hits);
        galleryImg.refresh();
      } else {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        loaderDisplayStatus();
      }
    })
    .catch(e => {
      console.log(e);
    })
    .finally(() => {
      formEl.reset();
    });
}

formEl.addEventListener('submit', e => {
  e.preventDefault();
  gallery.innerHTML = '';
  loaderDisplayStatus('block');
  params.q = e.target.elements.search.value.trim();
  getPicture(params);
});

function renderImages(listImages) {
  return listImages.reduce(
    (acc, image) =>
      acc +
      `<li class="gallery-item">
    <a class="gallery-link" href="${image.largeImageURL}">
      <img
        class="gallery-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
      />
    </a>
    <div class="info-img">
    <p>Likes<span>${image.likes}</span></p>
    <p>Views<span>${image.views}</span></p>
    <p>Comments<span>${image.comments}</span></p>
    <p>Downloads<span>${image.downloads}</span></p>
    </div>
  </li>`,
    ''
  );
}
