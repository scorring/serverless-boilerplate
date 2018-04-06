import * as mysql from 'mysql2/promise';
import {BaseController} from "./BaseController";
import {HttpRequest} from "../models/http/HttpRequest";
import {HttpResponse} from "../models/http/HttpResponse";

export class AirportsController extends BaseController {
    constructor() {
        super()
    }

    list(request: HttpRequest, response: HttpResponse) {
        return new Promise((resolve, reject) => {
                response.statusCode = 200;
                response.headers['X-Authorized'] = 'yes';
                response.body.airports = [];
                response.body.user = request.event().requestContext.authorizer.email;

                let g_conn = undefined;

                mysql.createConnection({
                    host: process.env['DB_HOSTNAME'],
                    port: process.env['DB_PORT'],
                    user: process.env['DB_USERNAME'],
                    password: process.env['DB_PASSWORD'],
                    database: process.env['DB_DATABASE']
                }).then((conn) => {
                    g_conn = conn;
                    return conn.query('SELECT id_airport FROM airports')
                }).then(([rows, fields]) => {
                    rows.forEach((item) => {
                        response.body.airports.push(item.id_airport);
                    });
                    g_conn.end()
                        .then(() => resolve(response))
                        .catch((error) => reject(error));

                }).catch((error) => {
                    reject(error);
                });
            }
        );
    }
}
