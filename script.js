//Плавное появление заголовков


const leadOverlay = document.querySelector('.lead__overlay');

function showLeadElements(element, delay) {
  setTimeout(() => {
    element.classList.add('animated')
  }, delay);
}

function runLeadAnimation() {
  let delay = 1000;
  Array.from(leadOverlay.children).forEach(element => {
    showLeadElements(element, delay);
    delay += 500;
  })
}


//Попробую написать универсальную функцию для карусели
//в нашем случае фото после раздела about и отзывов

//первым делом создаём массив объектов-картинок

const carouselPictures = [
  {link: 'images/mountains-test1.jpg'},
  {link: 'images/mountains-test2.jpg'},
  {link: 'images/mountains-test3.jpg'},
  {link: 'images/mountains-test4.jpg'},
  {link: 'images/mountains-test5.jpg'}
]

//находим элемент верхней и нижней картинки

const carouselPictureTop = document.querySelector('.image-carousel__cover-image');
const carouselPictureBottom = document.querySelector('.image-carousel__image');

//находим элемент правой и левой кнопки

const carouselArrowRight = document.querySelector('.image-carousel__arrow_type_right');
const carouselArrowLeft = document.querySelector('.image-carousel__arrow_type_left');

//клонируем содержимое темплейта кружочка

const carouselBulletTemplate = document.querySelector('.carousel-bullet-template').content;

//контейнер кружочков

const carouselBulletWrapper = document.querySelector('.image-carousel__bullet-wrapper');

//создаём общий счётчик, который показывает, на какой мы картинке

let counter = 0;

//функции листания картинок можно люто зарефакторить. надо обязательно потом это сделать

//делаем функцию листания по стрелочкам, пока без кружочков
//вправо

function renderCarouselImage() {
  if (carouselPictureBottom.classList.contains('transparent')) {
    console.log('trueway');
    carouselPictureBottom.src = carouselPictures[counter].link;
    carouselPictureTop.classList.add('transparent');
    carouselPictureBottom.classList.remove('transparent');
  }
  else {
    console.log('falseway');
    carouselPictureTop.src = carouselPictures[counter].link;
    carouselPictureBottom.classList.add('transparent');
    carouselPictureTop.classList.remove('transparent');
  }
}

function turnCarouselRight() {
  counter++;
  checkCounter();
  renderCarouselImage();
};


//делаем функцию листания по стрелочкам, пока без кружочков
//влево

function turnCarouselLeft() {
  counter = counter - 1;
  checkCounter();
  renderCarouselImage();
};


//функция чекания каунтера

function checkCounter() {
  if (counter >= carouselPictures.length) {
    counter = 0;
  }
  if (counter < 0) {
    counter = carouselPictures.length - 1;
  }
}

//функция передачи id кружочка в каунтер и делания кружочка чёрным, а неактивного кружочка нечёрным

function changeCounterByBullet(evt) {
  carouselBulletWrapper.querySelector('.image-carousel__bullet_active').classList.remove('image-carousel__bullet_active');
  evt.target.classList.add('image-carousel__bullet_active');
  counter = Number(evt.target.id);
}

//функция генерации картинки по кружочку

function renderImageByBullet(evt) {
  console.log(evt.target);
  if (evt.target.classList.contains('bullet-element'))
  return;
  changeCounterByBullet(evt);
  renderCarouselImage();
}

//функция делания кружочков

//осталось разобраться с изменением активного кружочка по стрелке

function renderCarouselBullets() {
  carouselBulletWrapper.addEventListener('click', evt => {
    renderImageByBullet(evt);
  });

  for(let i = 0; i < carouselPictures.length; i++) {
    const bulletElement = carouselBulletTemplate.querySelector('.bullet-element').cloneNode(true);
    bulletElement.firstChild.setAttribute('id', `${i}`);
    if (bulletElement.firstChild.id === '0'){
      bulletElement.firstChild.classList.add('image-carousel__bullet_active');
    }
    carouselBulletWrapper.append(bulletElement);
  }
}

//вешаем слушатель на правую стрелку

carouselArrowRight.addEventListener('click', () => {
  turnCarouselRight();
  console.log(counter);
});

//вешаем слушатель на левую стрелку

carouselArrowLeft.addEventListener('click', () => {
  turnCarouselLeft();
  console.log(counter);
});

//подгружаем первую картинку

renderCarouselImage();
renderCarouselBullets();
runLeadAnimation();



