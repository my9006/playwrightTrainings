import {test, expect} from '@playwright/test';
import {createUserFlow} from '../flows/userFlows';
import { bodyBuilder} from './body/loginBody';
import { generateTokenHelper } from '../helpers/usersHelper';

test("Generate Token", async ({request}) => {

    const createdUser = await createUserFlow(request);
    console.log(createdUser);

    const loginBody = bodyBuilder(createdUser.username);
    const response = await generateTokenHelper(request, loginBody);
    console.log(loginBody);
    expect(response.status()).toBe(200);

    const responseBody =  await response.json();
    expect(responseBody).toHaveProperty("token");
    expect(responseBody).toHaveProperty("expires");
    expect(responseBody.status).toBe("Success");
    expect(responseBody.result).toContain("successfully");
})

