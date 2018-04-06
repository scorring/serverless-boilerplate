import {AirportsController} from "../lib/controllers/AirportsController"
import {BuildHandler} from "../lib/utils/http/RequestHandler"

export const list = BuildHandler(AirportsController, "list");
