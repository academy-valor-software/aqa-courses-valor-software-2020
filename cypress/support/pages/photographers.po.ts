/// <reference types="cypress" />
import {getRandom, getSubstringByRegex} from '../utils';
import {IPhotographer} from '../models/photographer.models';
import Chainable = Cypress.Chainable;

export class PhotographersPo {
    private readonly url = '/photographers';
    private readonly photographerCards = '.photographer-card';
    private readonly photographerName = 'h3';
    private readonly photographerPhotoCount = '.photographer-material span:nth-of-type(1)';
    private readonly photographerHousesCount = '.photographer-material span:nth-of-type(2)';
    private readonly photographerAvatar = '.photographer-portrait';

    open() {
        cy.visit(this.url);
    }
    private getRandomPhotographerCard() {
        return cy
            .get(this.photographerCards)
            .then(cards => cards[getRandom(cards.length - 1)]);
    }
     getRandomPhotographerData(): Chainable<IPhotographer> {
        const randomPhotographerData: IPhotographer = {name: '', photoCounts: '', housesCounts: '', avatar: ''};
        this.getRandomPhotographerCard().within(() => {
            cy.get(this.photographerName).then(el => randomPhotographerData.name = el.text().trim())
              .get(this.photographerHousesCount).then(el => randomPhotographerData.housesCounts = el.text().trim())
              .get(this.photographerPhotoCount).then(el => randomPhotographerData.photoCounts = el.text().trim())
              .get(this.photographerAvatar)
                .then(el => randomPhotographerData.avatar = getSubstringByRegex(el.attr('style') as string, '.*url\\(\\"(.*).jpg'));
        });
        return cy.wrap(randomPhotographerData).as('photographerData');
    }
    clickOnPhotographerCardByName(name: string) {
        cy.contains(this.photographerCards, name).click();
    }
}
