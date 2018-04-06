import {BaseController} from "./BaseController";

export class TasksController extends BaseController {
    constructor() {
        super()
    }

    index(request, response) {
        return new Promise((resolve, reject) => {
            response.statusCode = 200;
            response.body = {
                message: "Hey !",
                from: 'Fourth lambda ;-)'
            };
            response.headers['X-Request-ID'] = 4242;
            resolve(response);
        })
    }

    show(request, response) {
        return new Promise((resolve, reject) => {
            response.statusCode = 200;
            response.body = {
                message: "Hey !",
                from: 'Fifth lambda ;-)'
            };
            response.headers['X-Request-ID'] = 4242;
            resolve(response);
        });
    }
}