This application allows a user to sign-up with their phone number, first and last name, and an email. The user is then able to check-in and gain 'loyalty points' which will be displayed on the screen. 
Signing up earns the user 50 points then each check-in thereafter adds another 20 points. The user is sent an email for every check-in with the amount of points earned.

The Node API framework includes logging, linting, and swagger docs wrapped in a Docker container.

The React UI was initialized using [create-react-app](https://www.npmjs.com/package/create-react-app) & [react-create-form](https://www.npmjs.com/package/react-create-form) then modified to fit my requirements.

This app uses a containerized MongoDB instance for storage.

#### Start App
* Configure smtp in `api/functions/config.js` by changing the following:
  *  `host`
  *  `auth.user`
  *  `auth.pass`
* Run `docker-compose up`

#### Swagger
* [localhost:8080/docs](http://localhost:8080/docs)

#### React UI
* [localhost:3000/#](http://localhost:3000/#)
