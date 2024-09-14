async function createUserHelper(request ,body) {
    return await request.post('https://demoqa.com/account/v1/user', {
        headers: {
            'content-type': 'application/json'
        },
        data: body
    });
}

export{createUserHelper}