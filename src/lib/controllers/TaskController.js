import * as BbPromise from 'bluebird';
import {BaseController} from "./BaseController";

class TasksController extends BaseController {
    constructor() {
        super()
    }

    index(request, response) {
        response.statusCode = 200;
        response.body = {
            message: "Hey !",
            from: 'Fourth lambda ;-)'
        };
        response.headers['X-Request-ID'] = 4242;
        return BbPromise.resolve()
    }

    show(request, response) {
        response.statusCode = 200;
        response.body = {
            message: "Hey !",
            from: '[' + request.event().pathParameters.id + '] Fifth lambda ;-)'
        };
        response.headers['X-Request-ID'] = 4242;
        return BbPromise.resolve()
    }
}

export {TasksController}