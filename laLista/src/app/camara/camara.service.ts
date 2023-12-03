import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

@Injectable({
  providedIn: 'root'
})


export class CamaraService {
  public photos: UserPhoto[] = [];

  constructor() { }


  public async addNewToGallery(): Promise<void> {
    try {
      // Take a photo
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });

      // Generate a unique name for the photo
      const fileName = new Date().getTime() + '.jpeg';

      // Add the new photo to the array
      this.photos.unshift({
        filepath: fileName,
        webviewPath: capturedPhoto.webPath
      });
    } catch (error) {
      console.error('Error tomando fotos:', error);
    }
  }
}

