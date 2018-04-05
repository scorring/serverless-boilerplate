# Basic Architecture For Serverless

### QuickStart
This basic projets provides a skeleton allowing to quickstack a Serverless API hosted on AWS.\
It actually supports NodeJS and TypeScript

Tools used:
* [Serverless](https://serverless.com/)
* [Webpack](https://webpack.js.org/)
* [Babel](https://github.com/babel/babel)
* [Bluebird](http://bluebirdjs.com/)
* [AWS](https://aws.amazon.com/)

### Folders

```
├- config/
│  └── serverless.${env}.yml
├─ src/
│  ├── handlers/
│  └─ lib/
│     ├─ controllers/
│     ├─ models/
│     │  └── http/
│     └─ utils/
│        └── http/
├─ .babelrc
├─ Jenkinsfile
├─ package.json
├─ package-lock.json
├─ serverless.yml
├─ tsconfig.json
├─ webpack.config.js
└─ yarn.lock
``` 

##### Details
| Folder/File | Description |
| --- | --- |
| `config/` | Contains all env/stage specifics settings (like SubnetIDs, Domain name...) |
| `src/handlers/` | Functions that will be used by AWS Lambda |
| `src/lib/` | The complete code that will be called by Lambda |
| `.babelrc` | Configuration for Babel. We are targeting 6.10 since it's the latest supported version by Amazon AWS. |
| `Jenkinsfile` | Basic ci integration that will be packing the app then deploy it. |
| `package.json`<BR>`package-lock.json`<BR> `yarn.lock` | Package dependencies. |
| `serverless.yml` | Example configuration for ServerLess. |
| `tsconfig.json` | Configuration |


## How to add new endpoints


5 Simple things to do so:

1.  Add your path mappings into `serverless.yml`:
```yaml
  demoShow:
    handler: src/handlers/demo.show
    events:
      - http:
          path: demo/{id}
          method: get
          cors:
            origin: '*'
            headers:
              - Content-Type
              - X-Amz-Date
              - Authorization
              - X-Api-Key
              - X-Amz-Security-Token
              - X-Amz-User-Agent
            allowCredentials: false
          request:
            parameters:
              paths:
                id: true
```
2. Add your handler file (`src/handlers/demo.js`)
```js
import { DemoController } from "../lib/controllers/DemoController"
import { BuildHandler } from "../lib/utils/http/RequestHandler"

const show = BuildHandler(DemoController, "show");

export { show }
```
3. Add your Controller file (`src/lib/controllers/DemoController.js`)
```js
import * as BbPromise from 'bluebird'
import {BaseController} from "./BaseController";

class DemoController extends BaseController {
    constructor() {
        super()
    }

    show(request, response) {
        response.statusCode = 200;
        response.body = {
            message: "Hey !",
            from: '['+ request.event().pathParameters.id +'] New Demo lambda ;-)'
        };
        response.headers['X-Request-ID'] = 4242;
        return BbPromise.resolve()
    }
}

export {DemoController}
```
4. Deploy using serverless:
`sls deploy --env {your env}`
5. Enjoy !

## Jenkins Integration

To develop.
