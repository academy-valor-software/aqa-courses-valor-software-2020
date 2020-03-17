/// <reference types="cypress" />

import { getRandom, getSubstringByRegex } from '../utils';
import { IPhotographer } from '../models/photographer.model';

export class PhotographersPo {
  readonly URL = '/photographers';

  private readonly elemPhotographerCards = '.photographer-card';
  private readonly textPhotographerName = 'h3';
  private readonly textPhotographerPhotoCount = '.photographer-material span:nth-of-type(1)';
  private readonly textPhotographerHouses = '.photographer-material span:nth-of-type(2)';
  private readonly textPhotographerAvatar = '.photographer-portrait';

  open() {
    cy.visit(this.URL);
  }

  clickAtPhotographerCardByName(name: string) {
    return cy.get(this.elemPhotographerCards).contains(name).click();
  }

  getRandomPhotographerCardData() {
    const photographer: IPhotographer = { name: '', photosCount: '', avatarSrc: '', houses: '' };
    this.getRandomPhotographerCardElem().within(() => {
      cy.get(this.textPhotographerName).then($el => photographer.name = $el.text())
        .get(this.textPhotographerPhotoCount).then($el => photographer.photosCount = $el.text().trim())
        .get(this.textPhotographerHouses).then($el => photographer.houses = $el.text().trim())
        .get(this.textPhotographerAvatar)
          .then($el => photographer.avatarSrc = getSubstringByRegex($el.attr('style') as string, '.*url\\(\\"(.*).jpg'));
    });

    return cy.wrap(photographer).as('photographer');
  }

  getRandomPhotographerCardElem() {
    return cy.get(this.elemPhotographerCards).then(cards => {
      return cards[getRandom(cards.length - 1)];
    });
  }
}
