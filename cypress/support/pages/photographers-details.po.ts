/// <reference types="cypress" />

export class PhotographersDetailsPo {
    private readonly photographerName = '.header-title';
    private readonly photographerHouses = '#item-profile .home .total-count';
    private readonly photographerPhotos = '#item-profile .photo .total-count';
    private readonly photographerAvatar = '#item-profile [src*=".jpg"]';

    getPhotographerName() {
        return cy.get(this.photographerName);
    }

    getPhotographerHouses() {
        return cy.get(this.photographerHouses);
    }

    getPhotographerPhotos() {
        return cy.get(this.photographerPhotos);
    }

    getPhotographerAvatar() {
        return cy.get(this.photographerAvatar).invoke('attr', 'src');
    }
}
