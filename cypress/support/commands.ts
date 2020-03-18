import Chainable = Cypress.Chainable;

export {};

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Sort elements by asc order in every chunk of arr
             * @param arr {number[][]} - array for sorting
             *
             * @example
             * cy.sortChunkedArr(arr);
             */
            sortChunkedArr(arr: number[][]): Chainable<number[][]>;
        }
    }
}

Cypress.Commands.add('sortChunkedArr', function (arr: number[][]): Chainable<number[][]> {
    return cy.wrap(arr.map(([...chunk]) => chunk.sort((a, b) => a - b)));
});

for (const cmd of ['click', 'get', 'within', 'each']) {
    Cypress.Commands.overwrite(cmd, (originFn, ...args) => {
        const mergedVal = originFn(...args);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mergedVal);
            }, 300);
        });
    });
}
