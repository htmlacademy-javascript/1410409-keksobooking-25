import {createAds, MAX_AD_COUNT, TYPES_MAP} from './data.js';


const mapCanvas = document.querySelector('.map__canvas');

const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAds = createAds(MAX_AD_COUNT);
const similarAdsFragment = document.createDocumentFragment();

similarAds.forEach(({author, offer, location}) => {
  const adElement = similarAdTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = offer.title;
  adElement.querySelector('.popup__text--address').textContent = offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = TYPES_MAP.get(offer.type);

  adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresContainer = adElement.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');
  const modifiers = offer.features.map((features) => `popup__feature--${features}`);

  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1]; // 1 - это индекс нужного класса в атрибуте class

    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });

  adElement.querySelector('.popup__description').textContent = offer.description;

  const photosList = adElement.querySelector('.popup__photos');
  const photo = photosList.querySelector('.popup__photo').cloneNode();
  offer.photos.forEach((photoEl) => {
    photo.src = photoEl;
    photosList.append(photo);
  });

  adElement.querySelector('.popup__avatar').src = author.avatar;

  similarAdsFragment.append(adElement);
});

mapCanvas.append(similarAdsFragment[0]);

// <article className="popup">
//   <img src="img/avatars/user01.png" className="popup__avatar" width="70" height="70" alt="Аватар пользователя">
//     <h3 className="popup__title">Уютное гнездышко для молодоженов</h3>
//     <p className="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
//     <p className="popup__text popup__text--price">5200 <span>₽/ночь</span></p>
//     <h4 className="popup__type">Квартира</h4>
//     <p className="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
//     <p className="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
//     <ul className="popup__features">
//       <li className="popup__feature popup__feature--wifi"></li>
//       <li className="popup__feature popup__feature--dishwasher"></li>
//       <li className="popup__feature popup__feature--parking"></li>
//       <li className="popup__feature popup__feature--washer"></li>
//       <li className="popup__feature popup__feature--elevator"></li>
//       <li className="popup__feature popup__feature--conditioner"></li>
//     </ul>
//     <p className="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и
//       бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
//     <div className="popup__photos">
//       <img src="" className="popup__photo" width="45" height="40" alt="Фотография жилья">
//     </div>
// </article>
