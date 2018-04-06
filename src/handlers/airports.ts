import {AirportsController} from "../lib/controllers/AirportsController"
import {BuildHandler} from "../lib/utils/http/RequestHandler"

const list = BuildHandler(AirportsController, "list");

export {list}