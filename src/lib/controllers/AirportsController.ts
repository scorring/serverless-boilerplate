import {BaseController} from "./BaseController";
import * as mysql from 'mysql2/promise';

export class AirportsController extends BaseController {
    constructor() {
        super()
    }

    list(request, response) {
        return new Promise(function (resolve, reject) {
                response.statusCode = 200;
                response.headers['X-Authorized'] = 'yes';
                response.body.airports = [];

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
                    rows.forEach(function (item) {
                        console.log(item.id_airport);
                        response.body.airports.push(item.id_airport);
                    });
                    g_conn.end().then(() => response(response)).catch((error) => reject(error));
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            }
        );
    }
}
