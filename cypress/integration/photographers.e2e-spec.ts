import {PhotographersPo} from '../support/pages/photographers.po';
import {PhotographersDetailsPo} from '../support/pages/photographers-details.po';

describe('photographer data', function() {
    const photographersPo = new PhotographersPo();
    const photographersDetailsPo = new PhotographersDetailsPo();

    beforeEach(function() {
        cy.fixture('someFile').then(data => data.name);
    });

    it('should compare photographer data on photographer page and photographer details page', function () {
        photographersPo.open();
        photographersPo.getRandomPhotographerData().then( data => {
            photographersPo.clickOnPhotographerCardByName(data.name);
            photographersDetailsPo.getPhotographerName().should('be.visible').and('contain', data.name);
            photographersDetailsPo.getPhotographerHouses().should('be.visible').and('contain', data.housesCounts);
            photographersDetailsPo.getPhotographerPhotos().should('be.visible').and('contain', data.photoCounts);
            photographersDetailsPo.getPhotographerAvatar().should('contain', data.avatar);
        });
    });
});
