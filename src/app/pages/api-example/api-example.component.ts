import { Component } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-api-example',
  templateUrl: './api-example.component.html',
  styleUrls: ['./api-example.component.css']
})
export class ApiExampleComponent {
    constructor (private weatherService: WeatherService){}
    cityInput=""
    weatherData: any;
    error: string | null = null;
    weatherFetched: boolean = false;


    search() {
      if (!this.cityInput.trim()) return;
      this.weatherService.getCoordinates(this.cityInput.trim()).subscribe({
        next: (geoData) => {
          if (geoData.results && geoData.results.length > 0) {
            const { latitude, longitude, name, country } = geoData.results[0];
            this.weatherService.getCurrentWeather(latitude, longitude).subscribe({
              next: (weatherData) => {
                this.weatherData = {
                  city: name,
                  country: country,
                  ...weatherData.current_weather
                };
                this.error = null;
              }
            });
          } else {
            this.error = 'City not found.';
            this.weatherData = null;
          }
        },
        error: () => {
          this.error = 'Error fetching coordinates.';
          this.weatherData = null;
        }
      });
      this.weatherFetched = true;
      console.log(this.weatherData);
    }

    getWeatherDescription(code: number): { label: string, emoji: string } {
        const map: { [key: number]: { label: string, emoji: string } } = {
            0: { label: 'Clear sky', emoji: '☀️' },
            1: { label: 'Mainly clear', emoji: '🌤️' },
            2: { label: 'Partly cloudy', emoji: '⛅' },
            3: { label: 'Overcast', emoji: '☁️' },
            45: { label: 'Fog', emoji: '🌫️' },
            48: { label: 'Depositing rime fog', emoji: '🌫️' },
            51: { label: 'Light drizzle', emoji: '🌦️' },
            53: { label: 'Moderate drizzle', emoji: '🌦️' },
            55: { label: 'Dense drizzle', emoji: '🌧️' },
            61: { label: 'Slight rain', emoji: '🌧️' },
            63: { label: 'Moderate rain', emoji: '🌧️' },
            65: { label: 'Heavy rain', emoji: '🌧️' },
            80: { label: 'Rain showers', emoji: '🌧️' },
            95: { label: 'Thunderstorm', emoji: '⛈️' },
            96: { label: 'Thunderstorm with hail', emoji: '⛈️❄️' },
            99: { label: 'Thunderstorm with heavy hail', emoji: '⛈️❄️' },
          };

        return map[code] || { label: 'Unknown', emoji: '❓' };
    }
}
