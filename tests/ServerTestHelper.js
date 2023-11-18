/* istanbul ignore file */
const ServerTestHelper = {
    async getAccessTokenUserIdHelper({server, username = 'testusername'}) {
        const userPayload = {
            username: username,
            password: 'testsecret',
        };

        const responseUser = await server.inject({
            method: 'POST',
            url: '/users',
            payload: {
                ...userPayload,
                fullname: 'test fullname'
            },
        });

        const responseAuth = await server.inject({
            method: 'POST',
            url: '/authentications',
            payload: userPayload,
        });

        const {id: userId} = JSON.parse(responseUser.payload).data.addedUser;
        const {accessToken} = JSON.parse(responseAuth.payload).data;
        return {userId, accessToken};
    },
};

module.exports = ServerTestHelper;