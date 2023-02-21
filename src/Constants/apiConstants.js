
export const POST = "POST";
export const GET = "GET";
export const PUT = "PUT";
export const DELETE = "DELETE";

const auth = "auth";
const app = "app";
const server = "server";

export const api = {
    // BASE_URL: 'http://localhost:5500',
    // BASE_URL: 'http://134.122.126.126/api',
    BASE_URL: 'http://167.172.234.244/',
    login: `${auth}/login`,
    signUp: `${auth}/register`,
    changeWalletAddress: `${auth}/changeWalletAddress`,
    getUser: `${auth}/getUser`,
    getAllUser: `${auth}/getAllUser`,
    getAllApp: `${app}/getAllApp`,
    getAppServer: `${app}/getAppServer`,

    getAllServer: `${server}/getAllServer`,
    deleteAppServer: `${server}/deleteAppServer`,
    manageServer: `${server}/manageServer`,
}

