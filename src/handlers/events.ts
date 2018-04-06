import {EventsController} from "../lib/controllers/EventsController"
import {BuildHandler} from "../lib/utils/http/RequestHandler"

export const list = BuildHandler(EventsController, "index");
export const show = BuildHandler(EventsController, "show");
