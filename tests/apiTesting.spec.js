import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {createUserFlow} from '../flows/userFlows.js';
import {createUserBody, requiredFields, bodyBuilder} from "./body/createUserBody.js";
import {createUserHelper} from '../helpers/usersHelper'

requiredFields.forEach((requiredField) => {
    test(`Check without ${requiredField}`, async ({request}) => {
        const createUserBody = bodyBuilder('aksudhiadguhciwquwubd');
        delete createUserBody[requiredField]

        const response = await createUserHelper(request, createUserBody);

        const responseBody = await response.json();
        expect(response.status()).toBe(400)
        expect(responseBody.message).toBe('UserName and Password required.');
    })
})


const endpoint = 'https://demoqa.com/account/v1/user';
let response;

test('Create user', async ({request}) => {
    const userName = faker.person.firstName('male');

    const response = await request.post(endpoint, {
        headers: {
            'content-type': 'application/json'
        },
        data: {
            userName,
            password: 'Qw!123456',
        }
    });
    const responseBody = await response.json();

    expect(response.status()).toBe(201);
    expect(responseBody.username).toBe(userName);
});

test.only('Try to create already created user', async ({request}) => {
    const alreadyUsedUser = await createUserFlow(request);
    const alreadyUsedUserName = alreadyUsedUser.username;
    const requestBody = bodyBuilder();
    requestBody.userName = alreadyUsedUserName;
    const response = await createUserHelper(request, requestBody);
    const responseBody = await response.json();
    expect(response.status()).toBe(406);
    expect(responseBody.message).toBe("User exists!");
})
