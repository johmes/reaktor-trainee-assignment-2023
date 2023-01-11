# reaktor-trainee-assignment-2023
Pre-assignment 
>Build and deploy a web application which lists all the pilots who recently violated the NDZ perimeter.
>
>What it looks like is up to you, but this list should
>
>Persist the pilot information for 10 minutes since their drone was last seen by the equipment
>Display the closest confirmed distance to the nest
>Contain the pilot name, email address and phone number
>Immediately show the information from the last 10 minutes to anyone opening the application
>Not require the user to manually refresh the view to see up-to-date information

I made this app using NodeJs (Express), MongoDB as database and React for client side.
It runs on Windows and should run on Linux and Mac OS without a too, but I haven't tested though.

You can find the app hosted in https://reaktor-trainee-assignment.herokuapp.com/

## Get started
Download these packages with `yarn` in root and the postinstall script 
will install all the necessary packages for /frontend and /backend

## Packages to install
Frontend
- axios
- react >= 18
- react-dom >= 18
- react-scripts
- socket.io-client
- web-vitals

Backend
- axios
- errorhandler
- express
- body-parser
- cors
- dotenv
- express-async-handler
- fast-xml-parser
- http
- mongoose
- socket.io
- underscore


## Run locally
To install required dependencies and start server run 
`yarn add & yarn server`
then open localhost:3000 on browser

## Description
When client connects to socket backend will query data from database and emit it to all connected clients every two seconds. To keep costs low I've put an if statement to timeout updating database if no user has connected in past one hour. Comment it out and the server will function as it's always running.
Before violations are sent to batabase the raw data of pilots and drones are get requested from API also every two seconds.
Then violation schema is created and checks with bacic geometry if drone has been too close to the nest. All violations are then pushed to a list as a promise and then asynchronous added to database.
Client side listens for data and shows updates in real time in the list. There is no need for refreshing the page.
## What to improve
* Now the app shows also progression of the distance and stops to the nearest reading by checking from db if the same pilot has flown near it and if the new reading is smaller than the former one. By having another collection for only keeping count of every drones distances we could show just the nearest result at the list.
* Loading the list takes 1-2 seconds so it is not the fastest but it still loads it relatively fast.
* I'll add more error handling especially for database connection.

