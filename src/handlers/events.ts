import {EventsController} from "../lib/controllers/EventsController"
import {BuildHandler} from "../lib/utils/http/RequestHandler"

export const save = BuildHandler(EventsController, "index");
export const retriev = BuildHandler(EventsController, "show");
