import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ImagePicker } from  'nativescript-imagepicker';
import * as ImageSourceModule from 'image-source';
let ImageCropper = require('nativescript-imagecropper');

import { JwtHttpService, ConfigurationService, DialogService } from '../';

interface Image {
    imageSource: any;
}

class ImageEntry  {
    id: string;
    picture: any;
    selectedImageSource: any = null;
    selectedPicture: any = null;
    imageSource: any = null;

    constructor(picture: any, selectedImageSource: any, selectedPicture: any) {
        if (null !== picture) {
            this.picture = picture;
            this.imageSource = ImageSourceModule.fromBase64(picture);
        }
        this.selectedImageSource = selectedImageSource;
        this.selectedPicture = selectedPicture;
    }
}


/**
 * Image Service
 * Laden von Bilder vom Device
 * Speicher des Bildes auf dem Server
 * Laden aller Bilder einer Organisation und Speichern in einem Cache. Für Responsive Bedienung
 */
@Injectable()
export class ImageService {

    /**
     * ImagePicker für Zugriff auf Filesystem
     */
    private imagePicker: ImagePicker;
    /**
     * Picture Map für den Cache der Bilder
     */
    private pictureMap: Map<string, ImageEntry>;

    constructor(private jwtHttp: JwtHttpService,
                private dialogService: DialogService,
                private configurationService: ConfigurationService) {
        this.pictureMap = new Map<string, ImageEntry>();
    }

    /**
     * Öffnet den Image Picker Dialog für das Auswählen eines Bildes von Device
     * @param id
     * @param image
     */
    public openNew(id: string, image: Image): void  {
        this.imagePicker = new ImagePicker();
        this.startSelectionNew(this.imagePicker, id, image);
    }

    /**
     * Wandelt Image in Base64 um und speichert dies im Cache
     * @param context
     * @param id
     * @param image
     */
    private startSelectionNew(context, id: string, image: Image): void {
        let thisContext = this;
        context
            .authorize()
            .then(function() {
                return context.present();
            })
            .then(function(selection) {
                selection.forEach(function(selected) {
                    let base64 = ImageSourceModule.fromFile(selected.fileUri).toBase64String('UTF-8');
                    let imageSource = ImageSourceModule.fromBase64(base64);
                    let imageEntry = thisContext.pictureMap.get(id);
                    if (imageEntry === undefined) {
                        if (id === undefined) {
                            id = '1';
                        }
                        thisContext.pictureMap.set(id, new ImageEntry(null, imageSource , base64));
                    } else {
                        imageEntry.selectedImageSource =  imageSource;
                        imageEntry.selectedPicture = base64;
                    }
                    image.imageSource =  imageSource;
                });
            }).catch(function (e) {
            });
    }

    /**
     * Liefert ein Bild als ImageSource vom cache
     * @param id
     * @returns {any}
     */
    public getImageFromCache(id: string): any {
        let imageEntry = this.pictureMap.get(id);
        if (imageEntry !== undefined) {
            if (     (null !== imageEntry.imageSource)
                &&  (undefined !== imageEntry.imageSource)) {
                return imageEntry.imageSource;
            }
        }
        return ImageSourceModule.fromResource('kein_foto');
    }


    /**
     * Überprüfung ob der Benutzer ein neues Bild mit dem Image Picker selektiert hat
     * @param id
     * @returns {boolean} TRUE wenn neues Bild selektiert ist
     */
    public hasNewImage(id: string) {
        let imageEntry = this.pictureMap.get(id);
        if (imageEntry !== undefined) {
            if (null !== imageEntry.selectedPicture) {
                return true;
            }
        }
        imageEntry = this.pictureMap.get('1');
        if (imageEntry !== undefined) {
            if (null !== imageEntry.selectedPicture) {
                return true;
            }
        }
        return false;
    }

    /**
     * Speicher das Bild auf dem Server
     * @param id
     * @returns {any}
     */
    public saveImage(id: string) {
        let imageEntry = this.pictureMap.get(id);
        if (imageEntry === undefined) {
            imageEntry = this.pictureMap.get('1');
            if (imageEntry === undefined) {
                return;
            }
            this.pictureMap.set(id, imageEntry);
            this.pictureMap.delete('1');
        }
        if (null !== imageEntry.selectedPicture) {
            return Observable.create(observer => {
                imageEntry.id = id;
                imageEntry.picture = imageEntry.selectedPicture;
                imageEntry.imageSource = imageEntry.selectedImageSource;
                imageEntry.selectedImageSource = null;
                imageEntry.selectedPicture = null;
                this.jwtHttp.post(this.configurationService.createImageUrl, {id: id, picture: imageEntry.picture}).subscribe(
                    data => {
                        observer.next(data);
                        observer.complete();
                    });
            });
        }
    }

    /**
     * Laden aller Bilder in den cache für Responsive Bedienung
     * @param id
     * @returns {any}
     */
    public loadAllImages() {
        this.jwtHttp.get(this.configurationService.imageUrl + '/all' + '?filter=organisation').subscribe(images => {
            if (images !== undefined) {
                images.forEach(image => {
                    let imageEntry = this.pictureMap.get(image.id);
                    if (imageEntry === undefined) {
                        this.pictureMap.set(image.id, new ImageEntry(image.picture, null, null));
                    } else {
                        imageEntry.picture = image.picture;
                    }
                });
            }
        });
    }
}