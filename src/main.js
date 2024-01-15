import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loaderUpEl = document.querySelector('.loader-up');
const loaderDownEl = document.querySelector('.loader-down');
const btnLoadMoreEl = document.querySelector('.buttonLoadMore');

let query;
let page = 1;
let per_page = 40;
let top;
let countPage;

const BASE_URL = 'https://pixabay.com/api/';

const statusOfElement = {
  on: 'on',
  off: 'off',
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
  loaderDisplay(loaderUpEl, statusOfElement.off);
  loaderDisplay(loaderDownEl, statusOfElement.off);
});

function getPicture(query, page) {
  const params = {
    key: '41531560-af55148938f1784ffe04592f4',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  };

  return axios.get(BASE_URL, { params });
}

async function onSubmit(e) {
  e.preventDefault();
  query = e.target.elements.search.value.trim();
  page = 1;

  if (!query) {
    gallery.innerHTML = '';
    displayButtonLoadMore(statusOfElement.off);
    return iziToast.info({
      position: 'topRight',
      message: 'Input search text',
    });
  }

  try {
    loaderDisplay(loaderUpEl, statusOfElement.on);
    const {
      data: { hits, totalHits },
    } = await getPicture(query, page);
    countPage = Math.ceil(totalHits / per_page);
    if (hits.length > 0) {
      gallery.innerHTML = renderPictures(hits);
      galleryImg.refresh();
      const firstImageEl = document.querySelector('.gallery-item:first-child');
      top = firstImageEl.getBoundingClientRect().top;
    } else {
      gallery.innerHTML = '';
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      loaderDisplay(loaderUpEl, statusOfElement.off);
      displayButtonLoadMore(statusOfElement.off);
      return;
    }
    hasMorePictures(countPage);
  } catch (error) {
    console.log(error);
  } finally {
    loaderDisplay(loaderUpEl, statusOfElement.off);
    formEl.reset();
  }
}

async function loadMore(e) {
  e.preventDefault();
  page += 1;
  loaderDisplay(loaderDownEl, statusOfElement.on);

  try {
    const {
      data: { hits },
    } = await getPicture(query, page);
    gallery.insertAdjacentHTML('beforeend', renderPictures(hits));
    galleryImg.refresh();
    loaderDisplay(loaderDownEl, statusOfElement.off);
    window.scrollBy({
      top: top * 4,
      behavior: 'smooth',
    });

    hasMorePictures(countPage);
  } catch (error) {
    console.log(error);
  }
}

formEl.addEventListener('submit', onSubmit);

btnLoadMoreEl.addEventListener('click', loadMore);

function renderPictures(listImages) {
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

function displayButtonLoadMore(status) {
  if (status === statusOfElement.on) {
    btnLoadMoreEl.classList.remove('is-hidden');
  }
  if (status === statusOfElement.off) {
    btnLoadMoreEl.classList.add('is-hidden');
  }
}

function loaderDisplay(element, status) {
  if (status === statusOfElement.on) {
    element.style.display = 'block';
  }
  if (status === statusOfElement.off) {
    element.style.display = 'none';
  }
}

function hasMorePictures(countPage) {
  if (countPage === page) {
    displayButtonLoadMore(statusOfElement.off);
    iziToast.info({
      position: 'topRight',
      message: `We're sorry, but you've reached the end of search results.`,
    });
  } else {
    displayButtonLoadMore(statusOfElement.on);
  }
}
