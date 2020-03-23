/// <reference types="cypress" />

import {MatrixPo} from '../support/pages/matrix.po';
import {FamilyPo} from '../support/pages/family.po';

context('Check selected family data', () => {
    const matrixPo = new MatrixPo();
    const familyPo = new FamilyPo();

    it('should choose random family visit home and compare data', function () {
        matrixPo.open();
        matrixPo.getRandomFamilyData();
        matrixPo.visitFamilyHome();

        cy.url().should('contains', familyPo.url);

        familyPo.getFamilyData().then( familyData => {
            cy.compare(familyData, this.matrixData);
        });

        cy.scrollTo(0, 400);

        familyPo.getFamilyDataFromHeader().then(dataFromHeader => {
            cy.compare(dataFromHeader, this.familyData);
        });
    });
});

