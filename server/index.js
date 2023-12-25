const http = require('http');
const {WebSocketServer} = require('ws');

const url = require('url');
const uuidv4 = require("uuid").v4;

const server = http.createServer();
const wsServer = new WebSocketServer({server});
const PORT = 8000;

const connections = {}; 
    // this will be a dictionary of all the connections to the server
    // this is important for broadcasts/fanouts, which will send messages to all users
const users = {};
    // connections contain the connection objects which contain a *lot* of information
    // we want to keep track of the users and associate our own information with them
    // if we call JSON.stringify(connections), we'll see that it's a lot of information that we don't need

const broadcast = () => {
    // not accepting any arguments because in our program, we're calling it every time a message is received
    
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid];
        const message = JSON.stringify(users);
        connection.send(message);
            // we're sending the message to all the connections regarding the location of everyone
    })
        // this is a for loop that loops through all the keys in the connections dictionary
        // i.e. we go through all the connected users
    
}

const handleMessage = (bytes, uuid) => {
    // message = {"x": 100, "y": 200}
        // this is the message format we'll be using
    const message = JSON.parse(bytes.toString());
        // we receive bytes, so we need to convert them to strings
    const user = users[uuid];
        // we're getting the user from the users dictionary
    user.state = message;
        // we're just updating the state of the user
    
    broadcast();

    console.log(`${user.username} updated their state: ${JSON.stringify(user.state)}`);
    
    console.log(message);
}

const handleClose = (uuid) => {
    console.log(`User disconnected: ${uuid}`);
    delete connections[uuid];
    delete users[uuid];
    broadcast();
}

wsServer.on('connection', (connection, req) => {
    // ws://localhost:8000?username=Alex

    const { username } = url.parse(req.url, true).query;
        // does the same as `url.parse(request.url, true).query.username;`
            // `true`: gives access to query object
            // `username`: key of query object (which is like a dictionary)
    const uuid = uuidv4();
        // generates a random id for each user; this is best practice for identifying users
    console.log(`User connected: ${username}`);
    console.log(`User ID: ${uuid}`);
        // we can test that this works using Postman
    
    connections[uuid] = connection;

    users[uuid] = {
        username: username,
        state: { },
            // `state` is a very important concept in real-time applications
            // it's the current state of the user; any data that could change
    }

    connection.on('message', (message) => handleMessage(message, uuid));
        // this is the function that will handle all messages
        // we pass in the message and the uuid so we can identify the user receiving the message
    
    connection.on('close', () => handleClose(uuid));
        // this is the function that will be called when a user disconnects
});


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
