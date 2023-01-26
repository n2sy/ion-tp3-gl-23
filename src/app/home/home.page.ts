import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  link =
    'http://apilayer.net/api/live?access_key=7b239b58f93255b5ef5795cdc77cee8c';
  tabCurrencies = ['EUR', 'TND', 'GBP', 'JPY', 'CNY'];
  message = '';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.tabCurrencies = [];
    this.http.get(this.link).subscribe({
      next: (response: any) => {
        for (const key in response['quotes']) {
          this.tabCurrencies.push(key.slice(3));
        }
      },
    });
  }

  onConvert(curr2: any) {
    let chaine = `USD${curr2}`;
    this.http.get(this.link).subscribe({
      next: (response: any) => {
        console.log(response['quotes']);
        this.message = `${response['quotes'][chaine]}`;
      },
    });
  }
}
