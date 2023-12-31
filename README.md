## Description 
This project functions as a proof of concept aimed at bolstering API reliability and security through the implementation of API request validation using Ajv. The primary objective was to generate JSON validation schema from interfaces that are shared between the Angular app and the Express backend. Requests that could usually have unexpected formatting now conform to strict TypeScript compile-time checking, streamlining development in a type-safe environment. This schema also added an additional layer of validation to incoming requests, completely preventing malformed or malicious endpoint requests.

## Project Setup
First, install ```npm``` if you don't have it already.

Then, install the packages in the server and webapp directories:    
```
cd src/server
npm install
```

Similarly for the angular: 
```
cd src/webapp
npm install
```

## To start the API
### To build
In the server directory, to compile TypeScript into JavaScript and to generate the validation schema of the shared request interfaces, use 
```
npm run build
```
This should be done initially and whenever you update the ```src/shared/requests.ts``` file or TypeScript source code. 

### To test
To test the application using the ```src/server/test/server.spec.ts``` file, use
```
npm test
``` 

### To run
To start the app on port 3000 (after you've run ```npm run build``` to generate the required files), use 
```
npm start
```

### End-to-end API setup
To build all required files, test the API, and start the server, use
```
npm run all
```

## To start the frontend
In the webapp directory, to build and start the frontend, use 
```
ng serve
```  
Once this is complete, you can access the app at http://localhost:4200.
