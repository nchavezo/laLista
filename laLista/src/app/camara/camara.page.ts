import { Component, OnInit } from '@angular/core';
import { CamaraService } from './camara.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})

export class CamaraPage implements OnInit {
capturedImage: String='';

  constructor( public camaraService: CamaraService) { }

  ngOnInit() {}

  takePicture() {
    this.camaraService.addNewToGallery();
    this.capturedImage = '';
  }

  addPhotoToGallery() {
    this.camaraService.addNewToGallery();

  }

}
