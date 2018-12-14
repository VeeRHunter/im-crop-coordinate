import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';
import { AngularCropperjsComponent } from 'angular-cropperjs';

import Cropper from 'cropperjs';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
declare var $: any;

import { CoordinatesService, TransformationType, Direction } from 'angular-coordinates';
import { Options } from 'ng5-slider';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('imganimate', [
      transition('* => *', [
        query('img', style({ opacity: 0 })),

        query('img', stagger('60ms', [
          animate('600ms 1.3s ease-out', style({ opacity: 1 }))
        ]))
      ])
    ]),

    trigger('page', [
      transition('* => *', [
        query('.page-content', style({ opacity: 0 })),

        query('.page-content', stagger('30ms', [
          animate('600ms 1.2s ease-out', style({ opacity: 1 }))
        ]))
      ])
    ]),


  ]

})
export class ProfileComponent implements OnInit {
  isLoggedin = false;
  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
  cropperOptions: any;

  public filterList = ['original', 'Brightness', 'Contrast', 'Grayscale', 'Saturate', 'Sepia'];

  data: any;
  cropperSettings: CropperSettings;

  public img: any;
  public cropper: any;
  public cropEnable = false;
  public croppedImage: any;
  public zoomRange = 1.0;

  public preCropImage: any;
  public selIndex: any;
  public selFilter: any;
  public mainFilter: any;
  public enableZoom = false;
  public direction = Direction;
  public type = TransformationType;
  value = 0.1;
  options: Options = {
    floor: 0.1,
    ceil: 2,
    step: 0.05,
    hidePointerLabels: true,
    autoHideLimitLabels: true,
    hideLimitLabels: true
  };

  myImage = null;
  scaleValX = 1;
  scaleValY = 1;



  constructor(public coordinatesService: CoordinatesService) {
    this.cropperOptions = {
      dragMode: 'crop',
      aspectRatio: 1,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      autoCropArea: 0.8,
      minContainerWidth: 558,
      minContainerHeight: 300,
      minCropBoxWidth: 120,
      minCropBoxHeight: 120,
      zoomOnWheel: false,
      rounded: true,
    };

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};
    this.croppedImage = 'assets/images/5863c7afb5bcb_black-woman-thinking.-pf.jpg';
    this.data.original = 'assets/images/webdevelopment3.jpg';

  }

  ngOnInit() {
    this.selectImage(0);
    this.myImage = 'assets/images/webdevelopment3.jpg';
    this.img = document.getElementById('image');
    this.cropper = new Cropper(this.img, {
      aspectRatio: 16 / 9,
      crop(event) {
      },
    });
  }

  savePhoto() {
    const croppedImgB64String = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
    this.croppedImage = croppedImgB64String;
    this.mainFilter = this.selFilter;
    const modalItem = document.getElementById('modal_theme_edit_profile_image');
    $('#modal_theme_edit_profile_image').modal('toggle');
    this.cropEnable = false;


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }

  }

  getPrePhoto() {
    const croppedImgB64String = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
    this.preCropImage = croppedImgB64String;
  }

  cropImage() {
    this.cropEnable = true;
    setTimeout(() => {
      this.setRangeFromImage();
    }, 1000);
  }

  selectImage(index) {
    this.selIndex = index;
    this.selFilter = this.filterList[index];
    $('.cropper-hide').addClass(this.selFilter);
    if (typeof ($('.cropper-hide').attr('class')) !== 'undefined') {
      const classList = $('.cropper-hide').attr('class').split(/\s+/);
      for (const list of classList) {
        if (list !== this.selFilter && list !== 'cropper-hide') {
          $('.cropper-hide').removeClass(list);
        }
      }
    }
  }

  setZoomImage(rangeValue) {
    if (this.enableZoom) {
      // this.setRangeFromImage();
      const croppedData = this.angularCropper.cropper.getCropBoxData();
      this.angularCropper.cropper.zoomTo(rangeValue, {
        x: croppedData.width / 2 + croppedData.left,
        y: croppedData.height / 2 + croppedData.top,
      });
      // this.angularCropper.cropper.scale(rangeValue);
      this.angularCropper.cropper.zoomTo(this.zoomRange);
    }
  }

  rangeMouseDown() {
    this.enableZoom = true;

  }

  rangeMouseUp(rangeValue) {
    this.enableZoom = false;
    this.setRangeFromImage();
    const croppedData = this.angularCropper.cropper.getCropBoxData();
    this.angularCropper.cropper.zoomTo(rangeValue, {
      x: croppedData.width / 2 + croppedData.left,
      y: croppedData.height / 2 + croppedData.top,
    });
    // this.angularCropper.cropper.scale(1, 1);
  }

  reset() {
    this.angularCropper.cropper.reset();
  }

  setRangeFromImage() {
    const canvasData = this.angularCropper.cropper.getCanvasData();
    let canMin = canvasData.width;
    let camMax = canvasData.width;
    if (canvasData.width > canvasData.height) {
      canMin = canvasData.height;
      camMax = canvasData.width;
    } else {
      canMin = canvasData.width;
      camMax = canvasData.height;
    }
    const croppedData = this.angularCropper.cropper.getCropBoxData();
    const cropMin = croppedData.width;

    if (cropMin === canMin) {

      this.value = (Math.round(((camMax - cropMin) / 11) * 10)) / 100.00;
      this.options = {
        floor: this.value,
        ceil: 2,
        step: 0.05,
        hidePointerLabels: true,
        autoHideLimitLabels: true,
        hideLimitLabels: true
      };
    }
  }

}
