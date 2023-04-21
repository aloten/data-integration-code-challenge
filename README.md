# Explanation
This is a mock Rx Management app in which the user can create pets, products, and prescriptions based off of already created pets and products. I didn't implement deleting or updating data.

It's built with a NodeJs Express server on the backend using TypeScript and KafkaJS, and vanilla JavaScript, HTML, and CSS on the frontend. The database is a collection of csv files, one for each model (Pet, Product, Prescription).
I chose these tools because I haven't developed with TypeScript before in my own configured project: I've just used it here and there and in Angular apps whose environments are preconfigured. I also chose not to use a frontend framework because it seemed overkill for an app this size and its always nice when you can keep things simple!

I have no previous experience with kafka or docker, so working with them was and is a challenge; there are still configuration / startup errors that ocasionally occur that I haven't been able to solve, but my app runs consistently if I follow the steps outline below. Seems valuable to learn and becoming increasingly popular so I appreciated the opportunity to start playing around with them.

## Design
'server.ts' is the entry file to the app and somewhat of a 'controller'.
The frontend is served on http://localhost:3001/index.html.
There are 3 kafka queues ('pet', 'product', 'prescription') which are all created by kafkajs when the app is run.
Express routes (all on same host=localhost and port=3001 '/pets', '/products', '/prescriptions') are exposed to the client: I'm using npm package 'cors' and itegrating it with the express server.

### Flow
1. On form submission on the frontend (e.g. create pet), the browser hits backend Express routes to POST data;
2. The route handler for POST requests tells a kafka producer object to publish to the respective queue, where a consumer is listening and saves the data to the database using the single instance of DbUtility file, which saves and retrieves data.
3. On the frontend, after the POST request is made, there is a 200ms timeout (to wait for the publication to and consumption of the kafka topic) before it initiates a GET request for relevant data to update the UI. For example, if you create a pet, after the POST request to '/pets', it requests GET '/pets' after 200ms to update the pet list and the create prescription form pet selection dropdown.

## Startup and configuration
1. run "npm install" in the project root dir to install all necessary packages in package.json
2. run "docker-compose up" and wait for the containers to be created successfully and for the console to stop outputting logs to ensure the containers are ready
3. in another terminal run "npm start" to run the app start process which compiles the TypeScript files and runs the resulting "dist/server.js" file
4. When you see the express server up in the console logs, open http://localhost:3001 to access the UI
5. If there are kafka issues, I found that exiting the docker/kafka terminal process, running "docker-compose down" and repeating steps 2-4 would fix the issue.

# Blue Rabbit Data Integration Code Challenge

Fork this repo and create an app using languages and frameworks of your choice that 
*literally* introduces you to us. Submit your response back to us here in the form of a pull 
request or submit it to us privately. Please don't spend more than a couple of hours on it. It's ok
if you don't finish, just tackle the requirements in order and take it as far as you can in the time frame.

Include A README with instructions on how to build/run the app. Use the README to let us know
why you chose the technologies you did. Notes on design patterns, challenges, or aspects
of your stack that you find interesting are also appreciated!

Provided is a `docker-compose-yml` file to help you start kafka. You are welcome to use other messaging services instead.

### Requirements
1. Create an API with an endpoint or operation that we can call and pass data to, save the request to a database. The shape of the data and the storage mechanism are up to you.
2. Create a sh script or add to README the commands to create topic/queue.
3. Publish API data to a topic/queue.
4. Add a consumer to your API to consume from the topic/queue and perform an operation of your choice with the message, .i.e. log to console, write to database, write to file.
5. Create a minimal frontend that calls your api.
