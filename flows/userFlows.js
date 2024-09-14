import {expect} from '@playwright/test';
import {createUserHelper} from '../helpers/usersHelper';
import {bodyBuilder} from "../tests/body/createUserBody";

export default async function (request) {
    const requestBody = bodyBuilder();
    const response = await createUserHelper(request, requestBody);
    const responseBody = await response.json();
    expect(response.status(), `Failed to createUser ${JSON.stringify(requestBody)}`).toBe(201);
    return responseBody;
}