'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      // console.log(pos.coords);
      // Object destructuring
      const { latitude } = pos.coords;
      const { longitude } = pos.coords;
      console.log(latitude, longitude);
      const coordinates = [latitude, longitude];

      const map = L.map('map').setView(coordinates, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (e) {
        // console.log(e);
        // const { latlng } = e.latlng;
        // console.log(e.latlng);
        // console.log(lat, lng);
        const { lat, lng } = e.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('Workout!')
          .openPopup();
      });
    },
    function () {
      alert(`Couldn't get your location.`);
    }
  );
}
