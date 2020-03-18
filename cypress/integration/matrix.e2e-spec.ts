import { MatrixPage } from '../support/pages/matrix.po';

describe('Matrix functionality', function () {

    const page = new MatrixPage();

    beforeEach(function () {
        page.openPage();
    });

    it('should show families in asc order per row', function () {
        const amountPerRow = 2;
        page.setMatrixScale(amountPerRow);
        page.getIncomeChunks(amountPerRow).then(incomesChunk => {
            cy.sortChunkedArr(incomesChunk).should('deep.equal', incomesChunk);
        });
    });
});
