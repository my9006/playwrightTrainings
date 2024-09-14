import {faker} from '@faker-js/faker';

const userName = 'userName';
const password = 'password';

const createUserBody = {
    [userName]: faker.person.firstName(),
    [password]: "Qw!123456",
}

function bodyBuilder() {
    return {
        [userName]: faker.person.firstName(),
        [password]: "Qw!123456",
    };
}

const requiredFields = [userName, password];

export {userName, password, createUserBody, requiredFields, bodyBuilder}