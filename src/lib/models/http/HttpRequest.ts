class HttpRequest {
    private _event : object;
    private _context: object;

    constructor(event: any, context: any) {
        this._event = event;
        this._context = context;
    }

    event(): any {
        return this._event;
    }

    context(): any {
        return this._context;
    }
}

export {HttpRequest}