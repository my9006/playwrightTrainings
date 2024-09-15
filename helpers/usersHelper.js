async function createUserHelper(request ,body) {
    return await request.post('https://demoqa.com/account/v1/user', {
        headers: {
            'content-type': 'application/json'
        },
        data: body
    });
}

export{createUserHelper}

async function generateTokenHelper(request, body) {
    return await request.post('https://demoqa.com/Account/v1/GenerateToken', {
        headers: {
            'content-type': 'application/json'
        },
        data: body
        
    });


}

export{generateTokenHelper}

