"use strict";

import * as AWS from "aws-sdk";
import * as _ from "lodash";
import * as moment from "moment";
import {Event} from "../models/Event";

export class EventRepository {
    private docClient: AWS.DynamoDB.DocumentClient;

    constructor() {
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    public save(iEvent: any): Promise<boolean> {
        let event: Event = {
            userId: iEvent.userId,
            token: iEvent.token,
            timestamp: moment().unix(),
            ttl: moment().add(10, 'days').unix()
        }

        const eventParams = {
            Item: event,
            TableName: process.env.EVENTS_TABLE,
        };
        return new Promise<boolean>((resolve, reject) => {
            this.docClient.put(eventParams, (err, data) => {
                if (!err) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    public findEventByUserId(userId: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const params = {
                ExpressionAttributeValues: {
                    ":key": userId,
                },
                KeyConditionExpression: "userId = :key",
                TableName: process.env.EVENTS_TABLE,
            };
            this.docClient.query(params, (err, data) => {
                if (err) {
                    reject(err);
                }
                const items = _.orderBy(data, ["timestamp"], ["desc"]);
                if (items.length > 0) {
                    resolve(items[0]);
                } else {
                    reject({"message": "no-item-found"});
                }
            });
        });
    }
}
