import {get, post, put} from 'request-promise';
import {accountData} from '../data/account-data.mock';
import {browser} from 'protractor';

const {email, password} = accountData;

let isLogged = false;

export async function loginByApi() {
    if (isLogged) {
        return;
    }

    await get({
        uri: 'https://www.freelancer.com/auth/device/',
        json: true,
    }).then(async (body) => {
        await post({
            uri: 'https://www.freelancer.com/ajax/auth/login.php',
            json: true,
            form: {
                user: email,
                password: password,
                device_token: body.result.token
            }
        }).then(async (response) => {
            await browser.get('');

            await browser.manage().addCookie({name: 'GETAFREE_AUTH_HASH_V2', value: `${response.result.token}`});
            await browser.manage().addCookie({name: 'GETAFREE_USER_ID', value: `${response.result.user}`});

            isLogged = true;
        });
    });
}
