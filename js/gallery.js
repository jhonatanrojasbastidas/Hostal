// Gallery page logic should be placed here.
/*charge the images with backgroundImage */
window.onload = function chargeImages() {
  const imagesGallery = [
    "./../assets/images/hdlp_1.JPG",
    "./../assets/images/hdlp_2.JPG",
    "./../assets/images/hdlp_3.JPG",
    "./../assets/images/hdlp_4.JPG",
    "./../assets/images/hdlp_5.JPG",
    "./../assets/images/hdlp_6.JPG",
    "./../assets/images/hdlp_7.JPG",
    "./../assets/images/hdlp_8.JPG"
  ];
  let fullGalleryItems = '';
  let imagesContainer = document.querySelector('#divImagesContainer');
  imagesGallery.forEach(image => {
    fullGalleryItems += `<div class="gallery-item">
    <div class="gallery-item__images" style="background-image: url(${image})"></div>
    <div class="gallery-item__overlay">
      <img
        src="./../assets/images/gallery/expand_icon.svg"
        class="overlay__image"
        alt=""
      />
    </div>
  </div> `;
  });

  imagesContainer.innerHTML = fullGalleryItems;
  addListernersToGalleryItems();
  closeModal();
};

function closeModal() {
  let closeModal = document.querySelector('.gallery-modal__close');
  let galleryModal = document.querySelector('#modal');

  closeModal.addEventListener('click', function () {
    galleryModal.classList.remove('gallery__modal--visible');
  })
}

function addListernersToGalleryItems() {
  let galleryModal = document.querySelector('#modal');
  let galleryItems = document.querySelectorAll('.gallery-item');
  let modalImage = document.querySelector('.gallery-modal__image');

  for (const galleryItem of galleryItems) {
    galleryItem.addEventListener('click', function () {
      galleryModal.classList.add('gallery__modal--visible');
      modalImage.style.backgroundImage = this.querySelector('.gallery-item__images').style.backgroundImage
    })
  }
}
