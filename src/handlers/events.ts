import { EventsController } from "../lib/controllers/EventsController"
import { BuildHandler } from "../lib/utils/http/RequestHandler"

const list = BuildHandler(EventsController, "index");
const show = BuildHandler(EventsController, "show");

export { list, show }