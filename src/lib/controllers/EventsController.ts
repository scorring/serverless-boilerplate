import * as BbPromise from 'bluebird'
import {BaseController} from "./BaseController";
import {HttpRequest} from "../models/http/HttpRequest";
import {HttpResponse} from "../models/http/HttpResponse";

class EventsController extends BaseController {
    constructor() {
        super()
    }

    index(request: HttpRequest, response: HttpResponse): BbPromise {
        response.statusCode = 200;
        response.body = {
            message: "Hey !",
            from: 'Second lambda ;-)'
        };
        response.headers['X-Request-ID'] = 4242;
        return BbPromise.resolve()
    }

    show(request: HttpRequest, response: HttpResponse): BbPromise {
        response.statusCode = 200;
        response.body = {
            message: "Hey !",
            from: '['+ request.event().pathParameters.id +'] Third lambda ;-)'
        };
        response.headers['X-Request-ID'] = 4242;
        return BbPromise.resolve()
    }
}

export {EventsController}