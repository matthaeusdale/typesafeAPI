import { NameRequest, NumberRequest } from "../../shared/requests";
import { NameResponse, NumberResponse } from "../../shared/responses";
import express, { Request, Response, NextFunction } from 'express';
import Ajv from 'ajv';
import schemas from '../schemas.json'; // Load the generated JSON schemas

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middleware function to validate incoming payload against JSON Schema
const validatePayload = (schemaType: string) => (req: Request, res: Response, next: NextFunction) => {
    const ajv = new Ajv();
    const validateFn = ajv.compile(schemas.definitions[schemaType as keyof typeof schemas.definitions]);

    if (!validateFn(req.body)) {
        return res.status(400).json({ error: 'Invalid payload' });
    }
    
    next();
};

app.post('/api/add', validatePayload('NumberRequest'), (req: Request, res: Response) => {
    const request = req.body as NumberRequest;
    const response: NumberResponse = { result: request.number1 + request.number2 }
    res.send(response);
});

app.post('/api/greet', validatePayload('NameRequest'), (req: Request, res: Response) => {
    const request = req.body as NameRequest;
    const response: NameResponse = { message: 'Hello ' + request.name + '!' }
    res.send(response);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

export default app;
