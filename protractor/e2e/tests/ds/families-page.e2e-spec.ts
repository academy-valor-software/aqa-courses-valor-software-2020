import { MatrixPo } from '../../pages/ds/matrix.po';
import { FamilyPreviewPO } from '../../pages/ds/preview-family.po';
import { FamilyHomePO } from '../../pages/ds/home-family.po';

describe('get families count', () => {

    const matrixPo = new MatrixPo();
    const previewFamily = new FamilyPreviewPO();
    const homeFamily = new FamilyHomePO();

    it('should display the same information about the definite family on different pages', async () => {
        await matrixPo.clickOnRndFamily();
        const infoFromViewFamily = await previewFamily.getFamilyInformation();
        await previewFamily.clickVisitHome();
        const infoFromFamilyHome = await homeFamily.getFamilyInformation();
        await homeFamily.scrollDown(200);
        const infoInStickyHeaderOfFamilyHome = await homeFamily.getFamilyInformationAfterScroll();

        expect(infoFromViewFamily).toEqual(infoFromFamilyHome);
        expect(infoFromViewFamily).toEqual(infoInStickyHeaderOfFamilyHome);
    });
});
