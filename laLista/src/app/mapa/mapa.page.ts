import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapaService } from './mapa.service';
import { GeolocationPosition } from '@capacitor/geolocation';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})


export class MapaPage implements OnInit {

  @ViewChild('mapaElement', { static: true }) mapElement: ElementRef | undefined;
  currentLatitude: number | null = null;
  currentLongitude: number | null = null;


  constructor(private mapaService: MapaService) { }

  async ngOnInit() {

    if (this.mapElement) {
      const mapElement = this.mapElement.nativeElement;

      try {
        await this.mapaService.initializeMap(mapElement);
        const currentPosition = await this.mapaService.getCurrentPosition();

        if (currentPosition) {
          this.currentLatitude = currentPosition.coords.latitude;
          this.currentLongitude = currentPosition.coords.longitude;
          this.mapaService.addMarkerToMap(
            currentPosition.coords.latitude,
            currentPosition.coords.longitude,
            'Su Ubicacion'
          );
        } else {
          console.error('Error al buscar su posicion.');
        }
      } catch (error) {
        console.error('Error iniciando mapa:', error);
      }
    }
  }


  }


