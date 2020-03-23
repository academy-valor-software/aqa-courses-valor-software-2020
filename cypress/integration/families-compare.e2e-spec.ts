/// <reference types="cypress" />

import { MatrixPage } from '../support/pages/matrix.po';
import { FamilyPreview } from '../support/pages/family-preview.po';
import { FamilyHome } from '../support/pages/family-home.po';

const matrix = new MatrixPage();
const preview = new FamilyPreview();
const home = new FamilyHome();

beforeEach(function () {
    matrix.open();
});

describe('families parameters persistent for all pages', function () {
    it('family should have same income, country and name in matrix, preview and homepage', function () {
        matrix.clickOnRandomFamily();
        preview.getFamilyInfo();
        preview.getFamilyInfo().then(viewInfo => {
            preview.clickVisitHome();

            home.getFamilyInfo().then(familyInfo => {
                cy.wrap(viewInfo.name).should('eq', familyInfo.name);
                cy.wrap(viewInfo.income).should('eq', familyInfo.income);
                cy.wrap(viewInfo.country).should('eq', familyInfo.country);
            });

            home.getInfoInSticky(200).then(familyStickyHeaderInfo => {
                cy.wrap(viewInfo.name).should('eq', familyStickyHeaderInfo.name);
                cy.wrap(viewInfo.income).should('eq', familyStickyHeaderInfo.income);
                cy.wrap(viewInfo.country).should('eq', familyStickyHeaderInfo.country);
            });
        });
    });
});
