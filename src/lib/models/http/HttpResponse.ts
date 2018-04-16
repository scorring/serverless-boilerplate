class HttpResponse {
    statusCode: number = 409;
    body: any = {};
    headers: object = {};
    isBase64Encoded: boolean = false;

    constructor() {
        this.isBase64Encoded = false;
        this.statusCode = 409;
        this.body = {};
        this.headers = {};
    }

    setStatus(status: number): HttpResponse {
        this.statusCode = status;
        return this;
    }

    setBody(body: any): HttpResponse {
        this.body = body;
        return this;
    }

    appendBody(data: object): HttpResponse {
        this.body = Object.assign({}, this.body, data);
        return this;
    }

    setHeaders(headers: any): HttpResponse {
        this.headers = headers;
        return this;
    }

    appendHeaders(data: object): HttpResponse {
        this.body = Object.assign({}, this.headers, data);
        return this;
    }

    toAws(): object {
        return {
            statusCode: this.statusCode,
            headers: this.headers,
            body: JSON.stringify(this.body),
            isBase64Encoded: this.isBase64Encoded
        };
    }
}

export {HttpResponse}