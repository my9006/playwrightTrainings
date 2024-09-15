import {test, expect} from '@playwright/test';
import { createAndLogin } from '../flows/userFlows';


test("Get user info", async ({request}) => {
    const userInfo = await createAndLogin(request);

    const response = await request.get(`https://demoqa.com/Account/v1/User/${userInfo.userID}`, {
        headers : {
            "accept": "application/json",
            "Authorization": `Bearer ${userInfo.token}`
        }
    })

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.username).toEqual(userInfo.username);
    expect(responseBody.userId).toEqual(userInfo.userID);
})