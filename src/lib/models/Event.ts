"use strict";

export interface Event {
    userId: string;
    token: string;
    timestamp: number;
    ttl: number;
}
