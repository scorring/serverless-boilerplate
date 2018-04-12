import {EventsController} from "../lib/controllers/EventsController"
import {BuildHandler} from "../lib/utils/http/RequestHandler"

export const list = BuildHandler(EventsController, "index");
export const relist = BuildHandler(EventsController, "relist");
export const show = BuildHandler(EventsController, "show");
