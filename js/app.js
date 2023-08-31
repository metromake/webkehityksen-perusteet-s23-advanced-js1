'use strict';

import RestaurantApiWrapper from './RestaurantApiWrapper.js';
import {restaurantRow, restaurantModal} from './components.js';

const main = async () => {
  const restaurantManager = new RestaurantApiWrapper();
  const restaurants = await restaurantManager.getRestaurants().catch(err => {
    const e = document.createElement('p');
    e.innerText = 'Error fetching restaurants';
    document.getElementsByTagName('body')[0].appendChild(e);
  });

  if (!restaurants) return;

  restaurants.sort((a, b) => {
    if (a.name < b.name) return -1;
  });

  const restaurantsElement = document.getElementsByTagName('table')[0];
  for (const restaurant of restaurants) {
    const row = restaurantRow(restaurant);
    row.addEventListener('click', async () => {
      for (const element of document.getElementsByClassName('highlight'))
        element.classList.remove('highlight');
      row.classList.add('highlight');
      const dialog = document.getElementsByTagName('dialog')[0];
      dialog.innerHTML = '';
      dialog.appendChild(await restaurantModal(restaurant));
      dialog.showModal();
    });
    restaurantsElement.appendChild(row);
  }
};

main();
