import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {


    constructor(private http: HttpClient ){}

    getCoordinates(city: string): Observable<any> {
        return this.http.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );
      }

    getCurrentWeather(lat: number, lon: number): Observable<any> {
        return this.http.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
    }
}
