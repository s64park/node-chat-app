# Node-chat-app

[Live Demo](https://desolate-badlands-38826.herokuapp.com/)

##Technologies
    Backend & Frontend: Node.js, Express.js, WebSocket, Mustache(template engine)

    Testing: Mocha.js, Expect.js, Supertest.js

##Implementation
- Enter Display Name (unique, if the specfic name already exists, a user should choose different name) 
and Room Name (case-insensitive) to join to the chat room. 

- Members in the room get notification of new joining members and exit members

- Each user can send their location url by clicking "send Location"

##Test
```
    > npm install
    > npm test
```