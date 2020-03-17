/// <reference types="cypress" />

export class PhotographerDetailsPo {
  private readonly textPhotographerName = '.header-title';
  private readonly textHousesCount = '#item-profile .home .total-count';
  private readonly textPhotosCount = '#item-profile .photo .total-count';
  private readonly elemAvatar = '#item-profile [src*=".jpg"]';

  getPhotographerName() {
    return cy.get(this.textPhotographerName);
  }

  getPhotographerHouseCount() {
    return cy.get(this.textHousesCount);
  }

  getPhotosCount() {
    return cy.get(this.textPhotosCount);
  }

  getAvatarSrcValue() {
    return cy.get(this.elemAvatar).invoke('attr', 'src');
  }
}
