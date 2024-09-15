import {expect} from '@playwright/test';
import {createUserHelper} from '../helpers/usersHelper';
import {bodyBuilder as createUserBodyBuilder} from "../tests/body/createUserBody";
import { bodyBuilder as loginUserBodyodyBuilder } from '../tests/body/loginBody';
import { generateTokenHelper } from '../helpers/usersHelper';

export  async function createUserFlow(request) {

    const requestBody = createUserBodyBuilder();
    const response = await createUserHelper(request, requestBody);
    const responseBody = await response.json();
    expect(response.status(), `Failed to createUser ${JSON.stringify(requestBody)}`).toBe(201);

    return responseBody;
}

export async function loginFlow(request, userName) {
    const loginBody = loginUserBodyodyBuilder(userName);
    const response = await generateTokenHelper(request, loginBody);
    
    const responseBody =  await response.json();
    expect(responseBody.status).toBe("Success");
    return responseBody
}


export async function createAndLogin(request) {

    const createdUserBody = await createUserFlow(request);
    const loginUserBody = await loginFlow(request, createdUserBody.username);

    return {...createdUserBody, ...loginUserBody}
}