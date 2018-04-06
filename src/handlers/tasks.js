import {TasksController} from "../lib/controllers/TaskController"
import {BuildHandler} from "../lib/utils/http/RequestHandler"

export const list = BuildHandler(TasksController, "index");
export const show = BuildHandler(TasksController, "show");
