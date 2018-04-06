import {BaseController} from "./BaseController";
import {HttpRequest} from "../models/http/HttpRequest";
import {HttpResponse} from "../models/http/HttpResponse";
import {User} from "../utils/auth/User";

export class JwtController extends BaseController {
    constructor() {
        super()
    }

    check(request: HttpRequest, response: HttpResponse) {
        return new Promise((resolve, reject) => {
            const policy = {
                principalId: 1,
                policyDocument: {
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Action: 'execute-api:Invoke',
                            Effect: 'Allow',
                            Resource: request.event().methodArn,
                        },
                    ],
                },
                context: undefined,
            };
            User.build(request.event().authorizationToken).then((user: User) => {
                policy.principalId = user.id;
                policy.policyDocument.Statement[0].Effect = 'Allow';
                policy.context = user;
                resolve(policy);
            }).catch(() => {
                policy.policyDocument.Statement[0].Effect = 'Deny';
                resolve(policy);
            });
        });
    }
}