import {BaseController} from "./BaseController";

export class TasksController extends BaseController {
    constructor() {
        super()
    }

    index(request, response) {
        return new Promise((resolve, reject) => {
            response
                .setStatus(200)
                .setHeaders({'X-Request-ID': 4242})
                .setBody({
                    message: "Hey !",
                    from: 'Fourth lambda ;-)'
                });
            resolve(response);
        })
    }

    show(request, response) {
        return new Promise((resolve, reject) => {
            response
                .setStatus(200)
                .setHeaders({'X-Request-ID': 4242})
                .setBody({
                    message: "Hey !",
                    from: 'Fifth lambda ;-)'
                });
            resolve(response);
        });
    }
}