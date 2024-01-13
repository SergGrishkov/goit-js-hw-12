import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loaderEl = document.querySelector('body>span');
const btnLoadMoreEl = document.querySelector('.buttonLoadMore');
let query;
let page = 1;
let countOPictures;

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
  loaderDisplayStatus(statusOfElement.off);
});

function getPicture(query, page) {
  const params = {
    key: '41531560-af55148938f1784ffe04592f4',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  };

  return axios.get(BASE_URL, { params });
}

async function onSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  loaderDisplayStatus(statusOfElement.on);
  query = e.target.elements.search.value.trim();

  try {
    const {
      data: { hits, total, totalHits },
    } = await getPicture(query, page);
    // countOPictures = total;
    // let totalPages = Math.ceil((countOPictures - 40) / totalHits);
    // console.log(totalPages);
    // console.log(total, totalHits);
    if (hits.length > 0) {
      loaderDisplayStatus();
      gallery.innerHTML = renderPictures(hits);
      galleryImg.refresh();
      loaderDisplayStatus(statusOfElement.off);
    } else {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      loaderDisplayStatus(statusOfElement.off);
      displayButtonLoadMore(statusOfElement.off);
      return;
    }

    if (Math.ceil(total / totalHits) > page) {
      displayButtonLoadMore(statusOfElement.on);
    } else {
      displayButtonLoadMore(statusOfElement.off);
    }
  } catch (error) {
    console.log(error);
  } finally {
    formEl.reset();
  }
}

async function loadMore(e) {
  e.preventDefault();
  page += 1;
  loaderDisplayStatus(statusOfElement.on);

  try {
    const {
      data: { hits, total, totalHits },
    } = await getPicture(query, page);
    // countOPictures = total;
    // let totalPages = Math.ceil((countOPictures - 40) / totalHits);
    // console.log(totalPages);
    // console.log(total, totalHits);
    gallery.insertAdjacentHTML('beforeend', renderPictures(hits));
    galleryImg.refresh();
    loaderDisplayStatus(statusOfElement.off);
    hasMorePictures(totalPages);
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

function loaderDisplayStatus(status) {
  if (status === statusOfElement.on) {
    loaderEl.style.display = 'block';
  }
  if (status === statusOfElement.off) {
    loaderEl.style.display = 'none';
  }
}

function hasMorePictures(totalPages) {
  if (page === totalPages) {
    iziToast.info({
      position: 'topRight',
      message: `We're sorry, but you've reached the end of search results.`,
    });
  }
}
