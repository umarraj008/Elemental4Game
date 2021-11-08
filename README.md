
# Elemental 4 Game

This is an online action-fantasy turn based game! 

## Programmers

- [@UmarRajput](https://github.com/umarraj008)
- [@ShadmanHoque](https://github.com/shadhoq26)
- [@SatbirLidder](https://github.com/SSLidder)
## Setup

Make sure when deploying the server, the IP Address and Port Numbers within the Public/client.js is the same as your IP Adress and Port Number:
```
  //Public/Client.js
  const address = "http://[Server IP Address]";
  const port = "[Port Number]";
```

By default the port is set to 3000, but can be changed to what ever number.
Make sure the port number matches in the Server/main.js:
```
  //Server/main.js
  const port = process.env.PORT || [Port Number];
```

## Deployment

To start the server and install dependancies

```bash
  cd [folder location]
  npm start
```

If that doesnt install dependancies, then use:
```bash
  cd [folder location]
  npm install
```

Starting the server
```bash
  cd [folder location]
  node Server/main.js
```

![Logo](https://github.com/umarraj008/Elemental4Game/blob/main/Public/resources/images/Elemental4Logo.png?raw=true)

