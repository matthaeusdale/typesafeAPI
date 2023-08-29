import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { NameResponse, NumberResponse } from '../../../shared/responses';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'frontEnd';
	numberMessage!: NumberResponse;

	currentNumber: any;
	currentNumberToAdd: any;

	currentName!: string;
	nameMessage!: NameResponse;

	constructor(private apiService: ApiService) { }

	ngOnInit() { };

	public submitNumbersClicked() {
		if (!isNaN(parseInt(this.currentNumberToAdd))) {
			this.apiService.add(parseInt(this.currentNumber), parseInt(this.currentNumberToAdd)).subscribe(data => {
				this.numberMessage = data;
			});
		} else if (!isNaN(parseInt(this.currentNumber))) {
			this.apiService.add(parseInt(this.currentNumber)).subscribe(data => {
				this.numberMessage = data;
			});
		}
	}

	public submitNameClicked() {
		this.apiService.greet(this.currentName).subscribe(data => {
			this.nameMessage = data;
		});
	}
}
