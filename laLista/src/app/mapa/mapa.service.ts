import { Injectable } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})


export class MapaService {
    private apiKey: string = 'AIzaSyAbBUI4NYtxMFDCOlq2Bky6cvrnIiiPqic';
    private map: any;

  constructor() { }  async initializeMap(mapElement: HTMLElement) {
    const currentPosition = await this.getCurrentPosition();

    if (!this.map) {
      this.map = await GoogleMap.create({
        id: 'my-map',
        element: mapElement,
        apiKey: this.apiKey,
        config: {
          center: {
            lat: currentPosition.coords.latitude,
            lng: currentPosition.coords.longitude,
          },
          zoom: 15,
        },
      });
    }
  }

  
  async addMarkerToMap(latitude: number, longitude: number, title: string) {
    if (this.map) {
      await this.map.addMarker({
        coordinate: {
          lat: latitude,
          lng: longitude,
        },
        title: title,
      });
    }
  }

  
  async getCurrentPosition(): Promise<GeolocationPosition> {
    const currentPosition = await Geolocation.getCurrentPosition();
    return currentPosition;
  }
}
