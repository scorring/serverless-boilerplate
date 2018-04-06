class HttpResponse {
    statusCode: number;
    body: any;
    headers: object;
    isBase64Encoded: boolean;

    constructor() {
        this.isBase64Encoded = false;
        this.statusCode = 409;
        this.body = {};
        this.headers = {};
    }
}

export {HttpResponse}