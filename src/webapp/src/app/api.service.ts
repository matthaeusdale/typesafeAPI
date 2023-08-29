import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NumberRequest, NameRequest } from '../../../shared/requests';
import { NumberResponse, NameResponse } from '../../../shared/responses';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
    
	constructor(private http: HttpClient) { }

	add(num: number, valueToAdd: number = 10): Observable<NumberResponse> {
        const body: NumberRequest = { "number1": num, "number2": valueToAdd };
        return this.http.post<NumberResponse>("http://localhost:3000/api/add", body);
	}

	greet(name: string): Observable<NameResponse> {
        const body: NameRequest = { "name": name};
        return this.http.post<NameResponse>("http://localhost:3000/api/greet", body);
	}
}
