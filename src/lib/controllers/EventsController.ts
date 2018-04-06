import {BaseController} from "./BaseController";
import {HttpRequest} from "../models/http/HttpRequest";
import {HttpResponse} from "../models/http/HttpResponse";

export class EventsController extends BaseController {
    constructor() {
        super()
    }

    index(request: HttpRequest, response: HttpResponse): any {
        return new Promise((resolve, reject) => {
            response.statusCode = 200;
            response.body = {
                message: "Hey !",
                from: 'Second lambda ;-)'
            };
            response.headers['X-Request-ID'] = 4242;
            resolve(response)
        })
    }

    show(request: HttpRequest, response: HttpResponse): any {
        return new Promise((resolve, reject) => {
            response.statusCode = 200;
            response.body = {
                message: "Hey !",
                from: '[' + request.event().pathParameters.id + '] Third lambda ;-)'
            };
            response.headers['X-Request-ID'] = 4242;
            resolve(response);
        })
    }
}