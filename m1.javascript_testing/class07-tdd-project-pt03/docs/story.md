# Story: Renting a car



## Use Case 01

As a system user

In order to get an available car in a specific category

Given a car category containing 3 diferent cars

When i check if there's a car available

Then it should choose randomly a car from the category chosen



## Use Case 02

As a system user

In order to calculate the final renting price

Given a customer who wants to rent a car for 5 days

And the is 50 yeas old

When he chooses a car category that cost $36.76 per day

Then i must add Tax os his age which 30% to the car category price

THen the final formula will be ```(price per day * Tax * number of day)```

And the final result will be ```(37.6 * 1.3 * 5)=244,4```

And the final price will be printed in Brazilian Portuguese format as "R$244.40"


## Use Case 03

As a system user

In order to register a renting transaction

Given a registered customer who is 50 yeas old

And a car model that coast $31.6 per day

And a delivery date that is for 05 days behind

And give ab actual date 05/11/2020

When i rent a car i should see the customer data

And the car selected

And the final price which will be R$ 244,40

And DeuDate which will be printed in Brazilian Portuguese format "10 de Novembro de 2020"
