/// <reference types="cypress" />

import { MatrixPage } from '../support/pages/matrix.po';
import { FamilyPreview } from '../support/pages/family-preview.po';
import { FamilyHome } from '../support/pages/family-home.po';

describe('families parameters persistent for all pages', function () {

beforeEach(function () {
    matrix.open();
});

    const matrix = new MatrixPage();
    const preview = new FamilyPreview();
    const home = new FamilyHome();

    it('family should have same income, country and name in matrix, preview and homepage', function () {
        matrix.clickOnRandomFamily();
        preview.getFamilyInfo();
        preview.getFamilyInfo().then(viewInfo => {
            preview.clickVisitHome();

        home.getFamilyInfo().then(familyInfo => {
                cy.wrap(viewInfo).should('deep.equal', familyInfo);
            });

        home.getInfoInSticky(200).then(familyStickyHeaderInfo => {
                cy.wrap(viewInfo).should('deep.equal', familyStickyHeaderInfo);
            });

        });
    });
});
