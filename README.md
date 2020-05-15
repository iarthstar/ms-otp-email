# Micro Service : OTP Email

Generate and Verify OTPs using Email

# Links

* Production : https://ias-ms-otp.herokuapp.com

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
NOTE : Hosted using [Heroku](https://heroku.com), Continuous Deployment using it.

  * master -> https://ias-ms-otp.herokuapp.com