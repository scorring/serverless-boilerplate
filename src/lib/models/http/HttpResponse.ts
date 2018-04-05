class HttpResponse {
    statusCode: number;
    body: object;
    headers: object;

    constructor() {
        this.statusCode = 409;
        this.body = {};
        this.headers = {};
    }
}

export {HttpResponse}