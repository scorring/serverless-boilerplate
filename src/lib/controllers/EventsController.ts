import {BaseController} from "./BaseController";
import {HttpRequest} from "../models/http/HttpRequest";
import {HttpResponse} from "../models/http/HttpResponse";
import * as AWS from "aws-sdk";

export class EventsController extends BaseController {
    constructor() {
        super()
    }

    index(request: HttpRequest, response: HttpResponse): Promise<any> {
        return new Promise((resolve, reject) => {
            response
                .setStatus(200)
                .setHeaders({'X-Request-ID': 4242})
                .setBody({
                    message: "Hey !",
                    from: 'Second lambda ;-)'
                });
            resolve(response)
        })
    };

    relist(request: HttpRequest, response: HttpResponse): Promise<HttpResponse> {
        return new Promise((resolve, reject) => {
            const lambda = new AWS.Lambda();
            lambda.invoke({FunctionName: process.env['LIST_ARN']}, (err, data) => {
                if (!err) {
                    response
                        .setStatus(200)
                        .setHeaders({'X-Request-ID': 4242})
                        .setBody(data);
                    resolve(response);
                } else {
                    response
                        .setStatus(400)
                        .setHeaders({'X-Request-ID': 4243})
                        .setBody(err);
                    reject(response);
                }
            });
        });
    }

    show(request: HttpRequest, response: HttpResponse): Promise<HttpResponse> {
        return new Promise((resolve, reject) => {
            response
                .setStatus(200)
                .setBody({
                    message: "Hey !",
                    from: '[' + request.event().pathParameters.id + '] Third lambda ;-)'
                })
                .setHeaders({'X-Request-ID': 4242});
            resolve(response);
        })
    }
}