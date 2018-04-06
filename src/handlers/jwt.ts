import {JwtController} from "../lib/controllers/JwtController";
import {HttpRequest} from "../lib/models/http/HttpRequest";
import * as util from "util";

// Not Using BuildHandler because output is really specific
export const check = (event, context, callback) => {
    const jwt = new JwtController();
    const request = new HttpRequest(event, context);

    jwt.check(request, undefined).then((policy) => {
        console.log("Policy:" + util.inspect(policy, {showHidden: false, depth: null}));
        callback(undefined, policy)
    })
};
