import {BaseController} from "./BaseController";
import {HttpRequest} from "../models/http/HttpRequest";
import {HttpResponse} from "../models/http/HttpResponse";
import * as AWS from "aws-sdk";

export class EventsController extends BaseController {
    constructor() {
        super()
    }

    index(request: HttpRequest, response: HttpResponse): Promise<any> {
        console.log(this);
        console.log(request.eventBody());
        return new Promise((resolve, reject) => {
            response.statusCode = 200;
            response.body = {
                message: "Hey !",
                from: 'Second lambda ;-)'
            };
            response.headers['X-Request-ID'] = 4242;
            resolve(response)
        })
    };

    relist(request: HttpRequest, response: HttpResponse): Promise<any> {
        return new Promise((resolve, reject) => {
            const lambda = new AWS.Lambda();
            lambda.invoke({FunctionName: process.env['LIST_ARN']}, (err, data) => {
                console.log(err);
                console.log(data);
                if (!err) {
                    response.statusCode = 200;
                    response.body = data;
                    response.headers['X-Request-ID'] = 4242;
                    resolve(response);
                } else {
                    response.statusCode = 400;
                    response.body = err;
                    response.headers['X-Request-ID'] = 4243;
                    resolve(err);
                }
            });
        });
    }

    show(request: HttpRequest, response: HttpResponse): Promise<any> {
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