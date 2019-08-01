# <p align="center" style="color: green" size="40"> TripsEase Backend </p>

**What problem does this app solve?**
Service workers often face challenges to collect tips from customers. And keeping track and sharing tips amongst colleagues can be overwhelming.
	
**How does your app solve the problem?**

This backend API aim to support a web app that allow customers willing to give tips to a given service worker to pay tips directly via a service workers portal. Once the service workers is identified on the portal, a payment can be processed, and funds transferred to service worker account.

Service workers can at any point of time, sign-up to the portal, create a profile with the financial details to receive the fund, and check the dashboard to track their performance over time.


**What is the mission statement**
Help service workers to focuse on providing the greatest service possible without worrying about tips collections 

**What features are required for your minimum viable product**
	* Service workers can sign-up on the platform, then create a profile with his service and financial information to receive the funds tips to them
	* Service workers can transfert funds to each other as required
	* Service worker can withdraw the tips received to their personal account
	* Customer can easily find a service worker by using the search engine
	* Customers can submit a payment to tip-off the selected service workers
	* Customer can leave a note as well as service rating optionally

**What features may you wish to put in a future release?**
	* Service workers can close their account/profile at any point of time
	* Service worker can check their personal dashboard to track payments and performance
	* Automatic notification to service workers (SMS) upon receiving tips from customers
	* Customer save payment card for future usage.

**What 3rd party frameworks/libraries are you considering using?**
	* ExpressJS, Knex, Jest, SQLite, Stripe API

**Who is the target audience?**
	* Service workers at restaurents
	* Restaurants customers  

# The API

This is the back-end for the TipsEase, which is part of Lambda School Build Week Project.

<p align="center">
  <img src="schema_small.png" width="700" alt="TipsEase data model">
</p>

# Instructions

All API requests are made to: **_ https://kitchen-soup-backend.herokuapp.com _**

## REGISTER (POST) Worker

a **POST** request to _/api/workers_ will create a new worker and return an object array of object.

**The following data are the data type and table constraints** 
```
	workers.increments(); // incremental unique ID
	workers.string('name', 128).notNullable();
	workers.string('first_name', 128).notNullable();
	workers.string('job_title', 255).notNullable();
	workers.string('mobile', 128).unique();
	workers.string('email', 128).notNullable().unique();
	workers.string('photo', 128);
	workers.date('start_date', 128);
	workers.string('tagline', 128).notNullable();
	workers.date('password', 128).notNullable();
```

**The object template to be sent in the request body is the following :**

```
{
	"name": "Beny",
	"first_name": "Harper",
	"job_title": "Cleaner",
	"mobile": "+33724670891",
	"email": "beny@email.com",
	"photo": "https://source.unsplash.com/1600x900/?portrait",
	"start_date": "08/2019",
	"tagline": "Ben rocks",
	"password": "hfj3907GS^o3"
}
```

**The response output**


```
[
    {
        "id": 8,
        "name": "Beny",
        "first_name": "Harper",
        "job_title": "Cleaner",
        "mobile": "+33724670891",
        "email": "beny@email.com",
        "photo": "https://source.unsplash.com/1600x900/?portrait",
        "start_date": "08/2019",
        "tagline": "Ben rocks",
        "password": "$2b$12$DtCJ2Nrf9.QRzIVB9127l.PoUKE.MY6hSIkexE3yruJHYaBUFZf.a"
    }
]
```

**In case of error, a proper code error will be sent back along with the error message**

```

{
	SQLITE_CONSTRAINT: UNIQUE constraint failed: workers.email"
}

```

## LOGIN (POST) Worker

a **POST** request to _/api/workers/login_ will authenticate the worker. A password and a username (email) must be attached to the body request

**The object template to be sent in the request body is the following :**

```
{
	"username": "tata@email.com",
	"password": "123"
}
```

**The response output**

The password is compared with the database record (encrypted). On successful authentication, a token is sent back in the response

```
{
    "message": "Welcome Tata Zaz!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJ1c2VybmFtZSI6InRhdGFAZW1haWwuY29tIiwiaWF0IjoxNTY0NjU0MTU5LCJleHAiOjE1NjQ3NDA1NTl9.6MAvkY3YHDexy2KsuNLXYYfR1snM_dcSIZ7Sm9WyKDo"
}

```

**In case of error,**

```
{
    "message": "Invalid Credentials"
}

```

## All workers from the DB (GET) 

a **GET** request to _/api/workers_ will send back the full list of the workers registered on the platform

**The object template to be sent in the request body is the following :**

There is no specific data to be attached with this request

**The response output**

An array of worker objects will be sent

```
[
    {
        "id": 1,
        "name": "Andri",
        "first_name": "Andjy",
        "job_title": "Cook",
        "mobile": "+33617570858",
        "email": "andjy@email.com",
        "photo": "https://source.unsplash.com/1600x900/?portrait",
        "start_date": "06/2019",
        "tagline": "Awsome tagline here",
        "balance": "50"
    },
    {
        "id": 2,
        "name": "Ben",
        "first_name": "Harpper",
        "job_title": "Waiter",
        "mobile": "+33617570859",
        "email": "ben@email.com",
        "photo": "https://source.unsplash.com/1600x900/?portrait",
        "start_date": "06/2016",
        "tagline": "Live before you die",
        "balance": null
    },
    {
        "id": 3,
        "name": "Anni",
        "first_name": "Hatta",
        "job_title": "Cleaner",
        "mobile": "+33617570860",
        "email": "anni@email.com",
        "photo": "https://source.unsplash.com/1600x900/?portrait",
        "start_date": "06/2012",
        "tagline": "Anni rocks",
        "balance": null
    },
    {
        "id": 5,
        "name": "Titi",
        "first_name": "Zazi",
        "job_title": "Cleaner",
        "mobile": "+33627570891",
        "email": "titi@email.com",
        "photo": "https://source.unsplash.com/1600x900/?portrait",
        "start_date": "08/2019",
        "tagline": "Titi rocks",
        "balance": "100"
    },
    {
        "id": 6,
        "name": "Tata",
        "first_name": "Zaz",
        "job_title": "Cleaner",
        "mobile": "+33727570891",
        "email": "tata@email.com",
        "photo": "https://source.unsplash.com/1600x900/?portrait",
        "start_date": "08/2019",
        "tagline": "Tata rocks",
        "balance": "0"
    },
	...
]
```

## ACCOUNT (GET) associated to a given worker

a **GET** request to _/api/workers/:id/accounts_ will will extract the worker ID and calls will be made to the DB to structure the data.

Please note that this end-point is **Procted** by an authentication process setup in the middleware. Therefore the worker must be logged in first and the obtained token attached with this request in the header. **An additional level of security** is set to make sure that the token provided in this request belong to to the current worker

**The object template to be sent in the request body is the following :**

```
**Key**
Authorization
**Value**
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6InRpdGlAZW1haWwuY29tIiwiaWF0IjoxNTY0NjUwMTg5LCJleHAiOjE1NjQ3MzY1ODl9.dKPRCHiwGArqawhKFGDVztKj4THvEZoOZSz3tlsEGk4
```

**The response output**

The response will have the general worker info along with his account details. A payments histoty is also sent with the response, so worker can track back their tips history

```
[
    {
        "name": "Titi",
        "first_name": "Zazi",
        "mobile": "+33627570891",
        "email": "titi@email.com",
        "balance": "100",
        "id": 2,
        "tips_history": [
            {
                "amount": 40,
                "created_at": "2019-07-31 14:00:18",
                "name": "Phil",
                "first_name": "Collins"
            },
            {
                "amount": 60,
                "created_at": "2019-07-31 14:00:39",
                "name": "Peter",
                "first_name": "Brad"
            },
            {
                "amount": 60,
                "created_at": "2019-07-31 14:46:14",
                "name": "Peter",
                "first_name": "Brad"
            },
            {
                "amount": 1300,
                "created_at": "2019-07-31 14:46:33",
                "name": "Phil",
                "first_name": "Collins"
            }
        ]
    }
]
```

**In case of error,**

Unrecognised token
```
{
    "error": "We failed to identify you"
}
```

Stolen token (from another worker)
```
{
    "error": "You must logged in with the correct credential"
}
```

No token provided
```
{
    "error": "This access is protected, you must login before"
}
```

## LOGOUT (POST) for worker

A **POST** request to _/api/workers/:id/logout_  will remove all access to protected routes for the worker. The worker can logout only if he his already logged in. Therefore an authorization in the header is alsoe required

**The object template to be sent in the request body is the following :**

```
**Key**
Authorization
**Value**
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6InRpdGlAZW1haWwuY29tIiwiaWF0IjoxNTY0NjUwMTg5LCJleHAiOjE1NjQ3MzY1ODl9.dKPRCHiwGArqawhKFGDVztKj4THvEZoOZSz3tlsEGk4
```

**The response output**

The response will have the general worker info along with his account details. A payments histoty is also sent with the response, so worker can track back their tips history

```
{
	message: "See you next time Tata Zaz"
}
```

**In case of error,**

Unrecognised token
```
{
    "error": "We failed to identify you"
}
```

Stolen token (from another worker)
```
{
    "error": "You must logged in with the correct credential"
}
```

No token provided
```
{
    "error": "This access is protected, you must login before"
}
```

## CREATE AN ACCOUNT (POST) for worker

A **POST** request to _/api/workers/:id/accounts_  will create an account for the worker with the ID passed in the paramter. The worker must be logged in first as this is a protected route

**The object template to be sent in the request body is the following :**

```
{
	"iban": "FR771000160444411234765890190"
}
```

**The response output**

The response will have the general worker info along with his newly created account details.

```
[
    {
        "name": "Tata",
        "first_name": "Zaz",
        "mobile": "+33727570891",
        "email": "tata@email.com",
        "iban": "FR771000160444411234765890190",
        "balance": "0",
        "id": 6
    }
]
```

**In case of error,**

Unrecognised token
```
{
    "error": "We failed to identify you"
}
```

Stolen token (from another worker)
```
{
    "error": "You must logged in with the correct credential"
}
```

No token provided
```
{
    "error": "This access is protected, you must login before"
}
```

DB Constaints triggered
```
{
    SQLITE_CONSTRAINT: UNIQUE constraint failed: accounts.iban"
}
```

## DELETE WORKER (DELETE) 

A **DELETE** request to _/api/workers/:id/delete_  will remove the worker with the ID passed in the parameters from the database. This route is protected by the authentication middleware. 

**An additional security** is set to prevent worker to delete their profile while their account balance not zeroed (>0).

**The object template to be sent in the request body is the following :**

```
**Key**
Authorization
**Value**
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6InRpdGlAZW1haWwuY29tIiwiaWF0IjoxNTY0NjUwMTg5LCJleHAiOjE1NjQ3MzY1ODl9.dKPRCHiwGArqawhKFGDVztKj4THvEZoOZSz3tlsEGk4
```

**The response output**

The response will have the general worker info along with his newly created account details.

```
	{ 
		message: 'Your profile has been deleted' 
	}
```

**In case of error,**

Worker try to delete his profile while their are sill money on his account balance
```
{
    "error": "You still have money on your account, please withdraw the balance before proceeding"
}
```