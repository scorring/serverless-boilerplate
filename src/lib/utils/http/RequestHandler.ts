import {BaseController} from "../../controllers/BaseController";
import {HttpRequest} from "../../models/http/HttpRequest";
import {HttpResponse} from "../../models/http/HttpResponse";

function BuildHandler(fnCtor: new (...args: any[]) => BaseController, method: string) {
    return (event, context, cb) => {
        let ctrl = new fnCtor;
        let request = new HttpRequest(event, context);
        let response = new HttpResponse();

        eval("ctrl."+method+"(request, response)")
            .then(function (resp) {
                console.log("Success");
                if (typeof response.body != "string") {
                    response.body = JSON.stringify(response.body);
                }
                cb(undefined, response)
            }).catch(function (error) {
            cb(error, undefined)
        });
    }
}

export {BuildHandler}