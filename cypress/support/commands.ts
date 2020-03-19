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

            loginByApi(user: string, password: string): Chainable;
        }
    }
}

Cypress.Commands.add('sortChunkedArr', function (arr: number[][]): Chainable<number[][]> {
    return cy.wrap(arr.map(([...chunk]) => chunk.sort((a, b) => a - b)));
});

Cypress.Commands.add('loginByApi', (userEmail, userPass) => {

    return cy.request({
        method: 'GET',
        url: '/auth/device/'
    }).then(({body: {result}, status}) => {
        expect(status).to.eq(200);

        return cy.request({
            method: 'POST',
            url: '/ajax/auth/login.php',
            form: true,
            body: {
                device_token: result.token,
                user: userEmail,
                password: userPass
            }
        }).then(({body: {result: {token, user}}}) => {
            expect(token).to.be.a('string');
            cy.setCookie('GETAFREE_AUTH_HASH_V2', `${token}`);

            return cy.setCookie('GETAFREE_USER_ID', `${user}`);
        });
    });

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
