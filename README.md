# <p align="center" style="color: green" size="40"> TripsEase Backend </p>

# What problem does this app solve?
Service workers often face challenges to collect tips from customers. And keeping track and sharing tips amongst colleagues can be overwhelming.
	
# How does your app solve the problem?

This backend API aim to support a web app that allow customers willing to give tips to a given service worker to pay tips directly via a service workers portal. Once the service workers is identified on the portal, a payment can be processed, and funds transferred to service worker account.

Service workers can at any point of time, sign-up to the portal, create a profile with the financial details to receive the fund, and check the dashboard to track their performance over time.


# What is the mission statement?
Help service workers to focuse on providing the greatest service possible without worrying about tips collections 

# What features are required for your minimum viable product?
	* Service workers can sign-up on the platform, then create a profile with his service and financial information to receive the funds tips to them
	* Service workers can transfert funds to each other as required
	* Service worker can withdraw the tips received to their personal account
	* Customer can easily find a service worker by using the search engine
	* Customers can submit a payment to tip-off the selected service workers
	* Customer can leave a note as well as service rating optionally

# What features may you wish to put in a future release?
	* Service workers can close their account/profile at any point of time
	* Service worker can check their personal dashboard to track payments and performance
	* Automatic notification to service workers (SMS) upon receiving tips from customers
	* Customer save payment card for future usage.

# What 3rd party frameworks/libraries are you considering using?
	* ExpressJS, Knex, Jest, SQLite, Stripe API

# Who is the target audience?
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