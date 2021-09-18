[![Node JS](https://img.shields.io/badge/Dependencies-Express%20JS-green)](https://nodejs.org/en/)
![GitHub repo size](https://img.shields.io/github/repo-size/defri-ansyah/Absensi-API)
![GitHub contributors](https://img.shields.io/github/contributors/defri-ansyah/Absensi-API)
![GitHub stars](https://img.shields.io/github/stars/defri-ansyah/Absensi-API)
![GitHub forks](https://img.shields.io/github/forks/defri-ansyah/Absensi-API)

<h1 align="center">Absensi</h1>

<p align="center">
  <a href="https://nodejs.org/" target="blank">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of Contents
* [Prerequiste](#Prerequiste)
* [Installation](#Installation)
* [Create Environment Variable](#create-environment-variable)
* [Start Development Server](#Start-Development-Server)
* [Postman Collection](#Postman-Collection)
* [API Endpoint](#API-Endpoint)
* [About Project](#About-Project)
* [Contributing](#Contributing)
* [Related Project](#Related-Project)
* [Contact](#Contact)


## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- Express.js - Download and Install [Express](https://expressjs.com/)
- Sequelize.js - Download and Install [Sequelize.js](https://sequelize.org/)
- PostgreSQL- Download and Install [PostgreSQL](https://www.postgresql.org/)


## Installation
### Clone
```
$ git clone https://github.com/defri-ansyah/Absensi-API.git
$ cd Absensi-API
$ npm install
```

## Create Environment Variable

```
PORT = YOUR_PORT
BASE_URL = YOUR_BASE_URL
DB_HOST = YOUR_HOST_DATABASE
DB_USERNAME = YOUR_USERNAME_DATABASE
DB_PASSWORD = YOUR_PASSWORD_DATABASE
SECRET_KEY = YOUR_SECRET_KEY_FOR_JWT
```

### Start Development Server
```
$ npm run dev
```
## Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/c7ca0abfc9af11c4efcb)

## API Endpoint
| No  | HTTP Method | URI                           | Operation                  |
| --- | ----------- | ----------------------------- | -------------------------- |
| 1   | POST        | /api/auth/login               | Login user & register user |
| 2   | PATCH       | /api/user/edit-profile        | Edit profile               |
| 3   | GET         | /api/user/homepage            | Get All list on home page  |
| 4   | GET         | /api/absensi/detail           | Get detail Absensi         |
| 5   | POST        | /api/absensi/                 | Create action for absensi  |
| 6   | GET         | /api/user/detail              | Get detail User            |


## About Project
This is a web application to make it easier for employees to take attendance and can see the details of all employees. Users can change their attendance status, view the dashboard of all employees, view employee details, and edit their profiles.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
1. Create your Feature Branch  ```git checkout -b [feature]```
2. Commit your Changes ```git commit -m 'Add some feature'```
3. Push to the Branch ```git push origin [feature]```
4. Open a Pull Request

## Related Project
* [`Frontend Absensi`](https://github.com/defri-ansyah/Absensi-frontend)

## Contact

- Email - defriansyah013@gmail.com
- LinkedIn - [Defri Ansyah](https://linkedin.com/in/defri-ansyah/)

---
Copyright © 2021 [Defri Ansyah](https://github.com/defri-ansyah)