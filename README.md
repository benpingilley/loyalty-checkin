The Node API framework includes logging, linting, and swagger docs wrapped in a Docker container.

The React UI was initialized using [create-react-app](https://www.npmjs.com/package/create-react-app) & [react-create-app](https://www.npmjs.com/package/react-create-form) then modified to fit requirements. The UI is missing several requirements and is buggy. The most evident bug is that when the form submits new data it completely reloads. I was unable to solve this issue. The UI does GET & POST to the API.

##### Start App
* Configure smtp in api/functions/config.js by changing the following:
  *  host
  *  auth.user
  *  auth.pass
* docker-compose up

##### Swagger
* [localhost:8080/docs](localhost:8080/docs)

##### React UI
* [localhost:3000/#](localhost:3000/#)