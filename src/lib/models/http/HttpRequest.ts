class HttpRequest {
    private _event : any;
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

    body() : any {
        let contentType = this._event.bodyContentType;
        if(contentType == undefined) {
            // default api gateway call 
            return JSON.parse(this._event.body);
        }
        if (( <String>contentType).toLowerCase() == "application/json") {
            return this._event.body;
        }
        return JSON.parse(this._event.body);
    }
}

export {HttpRequest}