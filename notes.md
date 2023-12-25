# Introduction

With HTTP, we send data between a front-end client (a request) and a back-end server (a response). This is the request-response model and it works well when we want to fetch data based on a specific client event. (Think of a user clicking a button to fetch data from a server.)

*But this request-response model falls apart when the client doesn't know when it will need data from the server.* For example, a chat application needs to receive data from the server whenever another user sends a message. The client doesn't know when this will happen, so it can't send a request to the server.

We can think of HTTP as one-direction communication, but we sometimes need two-direction communication. This is where WebSockets come in.

WebSockets are a two-direction communication protocol. They allow a client to send data to a server and a server to send data to a client. This is perfect for a chat application where we need to send data back and forth between users.

---

There are three main ideas of WebSockets:

1. WebSockets establish a long-lasting connection between a client and a server.

We do not have to open and close the connection for each request and response. This makes WebSockets more efficient than HTTP for high-frequency data exchange.

2. WebSockets are bi-directional and fully duplex.

Either side can send data to the other side whenever it wants. It can be binary data, text data, or JSON data. Duplex means that data can flow in both directions at the same time.

3. WebSockets are a separate protocol from HTTP but they work well together.

It is encouraged to use both in the same application; both are different tools for different jobs.

# Creating the Server

#### Step 1

First, we create a new directory for our project and initialize a new Node.js project.
```bash
mkdir server
cd server
npm init -y
```

#### Step 2

Next, we install the ws package. This is a Node.js package that allows us to create a WebSocket server. `uuid` is a helper package that we will use to generate unique IDs for each WebSocket connection.
```bash
npm i --save ws uuid
```

#### Step 3

Now, we create a new file called `index.js`. This will be the script and entry point for our server.
```bash
touch index.js
```

#### Step 4

The first step in creating a WebSocket server is to create an HTTP server. (This is because WebSockets perform a handshake over HTTP.)

```js
/* index.js */
const http = require('http');
const server = http.createServer();
```

#### Step 5

Next, we create a WebSocket server.
```js
/* index.js */
// const http = require('http');
const {WebSocketServer} = require('ws');
// const server = http.createServer();
const wsServer = new WebSocketServer({server});
```

#### Step 6

Now, we want to listen for new server connections. We specify the port and a callback function that will run when a new connection is made.

```js
/* index.js */
// const http = require('http');
// const {WebSocketServer} = require('ws');
// const server = http.createServer();
// const wsServer = new WebSocketServer({server});
const PORT = 8000;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
```

Now, we can run the server with `node index.js`. We should see the message `Server is listening on port 8000` in the console.

---

The rest is dependent on the program we are building.

# Testing the Server

We can use tools like curl or Postman to test our server. Here is an example of Postman:

1. Go to Workspace > New > Request > WebSocket Request
2. Enter the URL of the server (e.g. `ws://localhost:8000`)

For our program, we would like to test a query parameter like `?name=John`, so the URL would be `ws://localhost:8000?name=John`.

# Creating the Client

#### Step 1

First, we create a new directory for our client code. Rather than creating it from scratch, we use the `vite` module.

```bash
npm create vite@latest client -- --template react
```

#### Step 2
Next, we install some packages that we will use in our client code.
```bash
cd client
npm install
npm install --react-use-websocket lodash.throttle perfect-cursors
```

We can run `npm run dev` to make sure that everything is okay.