import { $, browser } from 'protractor';


export class StreetComponentPo {
    private readonly rightToddler = $('#right-scroll');
    private readonly leftToddler = $('#left-scroll');
    private readonly rightToddlerLabel = $('.right-scroll-label');
    private readonly leftToddlerLabel = $('.left-scroll-label');


     async moveToddler(direction: Toggle, xPosition: number): Promise<number> {
        let elem = this.leftToddler;
        let elemLabel = this.leftToddlerLabel;

        if (direction) {
            elem = this.rightToddler;
            elemLabel = this.rightToddlerLabel;
        }

        await browser
                .actions()
                .mouseMove(elem)
                .perform();

        await browser
                .actions()
                .mouseDown()
                .perform();

        await browser
                .actions()
                .mouseMove({x: xPosition, y: 0})
                .perform();

        const toddlerValue: number = await elemLabel.getText().then( value => Number(value.replace('$', '')));

        await browser
                .actions()
                .mouseUp()
                .perform();

        return toddlerValue;
    }
}

export const enum Toggle {
    LEFT = 0,
    RIGHT = 1,
}
