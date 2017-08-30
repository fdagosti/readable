# readable
An app that allows the creation of posts and comments about them.

# Installation
The application is made of two parts: the backend and the frontend (in React)

## server installation
you can install the server by running the following commands:
```bash
cd backend
npm install 
node server
````
the server will be running

## react app installation
create a new terminal window in order not to kill the server.

The application has been created using create-react-app. So launching it is pretty straightforward:

```bash
cd frontend
npm install 
yarn start
````
then, go to http://localhost:3000 to interact with the app.

# miscellanous 
## server interaction

The app is proxying the request to the server automatically, that is why the network requests on the app are done without a host (it assumes the server will be hosted on the same host)

## user interface
I am using Material UI as the underlying UI framework so I can test it. Material UI is more done for mobile apps rather than website, hence the some strange layout (I miss the various bootstrap layouts...)

# Licensing
MIT licensing