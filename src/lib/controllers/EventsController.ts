import {BaseController} from "./BaseController";
import {HttpRequest} from "../models/http/HttpRequest";
import {HttpResponse} from "../models/http/HttpResponse";
import {EventRepository} from "../repositories/EventRepository";

export class EventsController extends BaseController {
    private eventRepository: EventRepository;

    constructor() {
        super();
        this.eventRepository = new EventRepository();
    }

    index(request: HttpRequest, response: HttpResponse): Promise<any> {
        return new Promise((resolve, reject) => {
            this.eventRepository.save(request.event()).then((evt) => {
                response
                    .setStatus(201)
                    .setHeaders({'X-Request-ID': 4242})
                    .setBody(evt);
                resolve(response);
            }, () => {
                response
                    .setStatus(400)
                    .setHeaders({'X-Request-ID': 4242})
                resolve(response);
            });
        })
    };

    show(request: HttpRequest, response: HttpResponse): Promise<HttpResponse> {
        return new Promise((resolve, reject) => {
            this.eventRepository.findEventByUserId(request.event().pathParameters.id).then((evt) => {
                response
                    .setStatus(200)
                    .setHeaders({'X-Request-ID': 4242})
                    .setBody(evt);
                resolve(response);
            }, (errBody) => {
                response
                    .setStatus(400)
                    .setHeaders({'X-Request-ID': 4242})
                    .setBody(errBody);
                resolve(response);
            });
        })
    };
}