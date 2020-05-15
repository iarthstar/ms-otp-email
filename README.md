# Micro Service : OTP Email

This microservice is meant to be used for generating an One Time Password (OTP) for a valid email, a mail is then sent to the said email using a email service provider (i.e. gmail), and later, also to verify the received OTP against the given email.

This microservice is build using template [Grandeur Backend](https://github.com/iarthstar/grandeur-backend). It uses Redis as a data store.

# Links

* Production : https://ias-ms-otp.herokuapp.com
* Staging : https://stage-ias-ms-otp.herokuapp.com


## APIs

#### Base URL

| KEY  |              VALUE               |
| ---- | -------------------------------- |
| HOST | Environment Link |
| API  | /otp_email_api                   |

#### Endpoints

|     NAME     | METHOD | ENDPOINT  |                       BODY                       |
| ------------ | ------ | --------- | ------------------------------------------------ |
| Generate OTP | POST   | /generate | { "email: "iarthstar@gmail.com" }                |
| Verify OTP   | POST   | /verify   | { "otp": 123456, "email": "iarthstar@gmail.com"} |


## Development Guide

#### NOTE : Please make sure you have yarn :: [Installing yarn](https://yarnpkg.com/en/docs/install)

* Initial setup

```bash
$ yarn install
```

* To watch for changes

```bash
$ nodemon
```

## Deployment Guide
NOTE : Hosted using [Heroku](https://heroku.com), Continuous Deployment using it for below branches.

  * development -> https://stage-ias-ms-otp.herokuapp.com
  * master -> https://ias-ms-otp.herokuapp.com