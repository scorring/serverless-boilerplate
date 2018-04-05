import { TasksController } from "../lib/controllers/TaskController"
import { BuildHandler } from "../lib/utils/http/RequestHandler"

const list = BuildHandler(TasksController, "index");
const show = BuildHandler(TasksController, "show");

export { list, show }