/// <reference types="cypress" />

import { PhotographersPo } from '../support/pages/photographers.po';
import { PhotographerDetailsPo } from '../support/pages/photographer-details.po';
import { isTextVisibleAndHaveText } from '../support/helper';

describe('search functionality', function() {

  const photographerDetailsPo = new PhotographerDetailsPo();
  const photographersPo = new PhotographersPo();

  it('should compare photographer portrait info with photographer details page', function() {
    photographersPo.open();
    photographersPo.getRandomPhotographerCardData().then( photographerData => {
      photographersPo.clickAtPhotographerCardByName(photographerData.name);

      isTextVisibleAndHaveText(photographerDetailsPo.getPhotographerName(), photographerData.name);
      isTextVisibleAndHaveText(photographerDetailsPo.getPhotographerHouseCount(), photographerData.houses);
      isTextVisibleAndHaveText(photographerDetailsPo.getPhotosCount(), photographerData.photosCount);
      photographerDetailsPo.getAvatarSrcValue().should('contain', photographerData.avatarSrc);
    });
  });
});
