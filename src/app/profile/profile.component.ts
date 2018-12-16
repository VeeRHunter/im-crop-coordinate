import { Component, OnInit, ViewChild, } from '@angular/core';
import { trigger, animate, transition, style, query, stagger } from '@angular/animations';
import { AngularCropperjsComponent } from 'angular-cropperjs';

declare var $: any;

import { Options } from 'ng5-slider';
import { range } from 'rxjs/observable/range';



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
  @ViewChild('backCropper') public backCropper: AngularCropperjsComponent;
  cropperOptions: any;
  backCropperOptions: any;

  public filterList = ['Original', 'Brightness', 'Contrast', 'Grayscale', 'Saturate', 'Sepia'];

  public croppedImage: any;

  public preCropImage: any;
  public selIndex: any;
  public selFilter: any;
  public mainFilter: any;

  public value = 0;
  public options: Options = {
    floor: 0,
    ceil: 10,
    step: 0.1,
    hidePointerLabels: true,
    autoHideLimitLabels: true,
    hideLimitLabels: true
  };

  public strValue = 0;
  // public strMaxValue = 20;
  public strOptions: Options = {
    floor: -180,
    ceil: 180,
    step: 1,
    hidePointerLabels: true,
    autoHideLimitLabels: true,
    hideLimitLabels: true
  };

  myImage = null;
  scaleValX = 1;
  scaleValY = 1;


  public backCroppedImage: any;
  public backValue = 0;
  public backOptions: Options = {
    floor: 0,
    ceil: 10,
    step: 0.1,
    hidePointerLabels: true,
    autoHideLimitLabels: true,
    hideLimitLabels: true
  };

  public backStrValue = 0;
  public backStrOptions: Options = {
    floor: -180,
    ceil: 180,
    step: 1,
    hidePointerLabels: true,
    autoHideLimitLabels: true,
    hideLimitLabels: true
  };

  backImage = null;
  backScaleValX = 1;
  backScaleValY = 1;

  constructor() {
  }

  ngOnInit() {
    this.selectImage('Original');
    this.myImage = 'assets/images/webdevelopment3.jpg';
    this.backImage = 'assets/images/sample-logos/bg3.jpg';

    this.croppedImage = 'assets/images/5863c7afb5bcb_black-woman-thinking.-pf.jpg';
    this.cropperOptions = {
      dragMode: 'move',
      aspectRatio: 1,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      autoCropArea: 1,
      minContainerWidth: 558,
      minContainerHeight: 300,
      zoomOnWheel: false,
      rounded: true,
      cropBoxMovable: false,
      cropBoxResizable: false,
    };


    this.backCroppedImage = 'url(assets/images/sample-logos/bg3.jpg)';
    const backImageData = document.getElementById('profile_background');
    // or however you get a handle to the IMG
    this.backCropperOptions = {
      dragMode: 'move',
      aspectRatio: backImageData.clientWidth / backImageData.clientHeight,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      autoCropArea: 1,
      minContainerWidth: 558,
      minContainerHeight: 300,
      zoomOnWheel: false,
      rounded: true,
      cropBoxMovable: false,
      cropBoxResizable: false,
    };
  }

  savePhoto() {
    const croppedImgB64String = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
    this.croppedImage = croppedImgB64String;
    this.mainFilter = this.selFilter;
    $('#modal_theme_edit_profile_image').modal('toggle');


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
    setTimeout(() => {
      this.strightenBackMouseUp(0);
      $('#pro_str_value').slideDown('normal');
      // this.setRangeFromImage();
      // this.reset();
    }, 1000);
  }

  selectImage(className) {
    this.selIndex = className;
    this.selFilter = className;
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
    this.setRangeFromImage();
    const croppedData = this.angularCropper.cropper.getCropBoxData();
    this.angularCropper.cropper.zoomTo(rangeValue, {
      x: croppedData.width / 2 + croppedData.left,
      y: croppedData.height / 2 + croppedData.top,
    });
  }

  reset() {
    this.value = 0;
    this.strValue = 0;
    this.angularCropper.cropper.reset();
  }

  setRangeFromImage() {

  }

  strightenMouseUp(strightenValue) {
    this.angularCropper.cropper.rotateTo(strightenValue);
  }

  strightenMouseDown() {
    console.log('Strighten MouseDown');
  }

  flipX() {
    this.scaleValX = this.scaleValX * -1;
    this.angularCropper.cropper.scaleX(this.scaleValX);
  }

  flipY() {
    this.scaleValY = this.scaleValY * -1;
    this.angularCropper.cropper.scaleY(this.scaleValY);
  }

  move(x, y) {
    this.angularCropper.cropper.move(x, y);
  }

  setBackZoomImage(rangeValue) {
    // console.log(rangeValue);
    this.setRangeFromBackImage();
    const croppedData = this.backCropper.cropper.getCropBoxData();
    this.backCropper.cropper.zoomTo(rangeValue, {
      x: croppedData.width / 2 + croppedData.left,
      y: croppedData.height / 2 + croppedData.top,
    });
  }

  openNewProfilePhoto() {
    document.getElementById('profile_image_open').click();
  }


  getProfilePhoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.angularCropper.cropper.destroy();
        this.myImage = event.target.result;
        console.log(this.myImage);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  setRangeFromBackImage() {

  }

  openProfileBackground() {
    setTimeout(() => {
      // this.backReset();
    }, 1000);
  }

  strightenBackMouseDown() {
    console.log('Strighten MouseDown');
  }

  strightenBackMouseUp(strightenValue) {
    this.value = 0;
    this.backCropper.cropper.rotateTo(strightenValue);
  }

  backFlipX() {
    this.backScaleValX = this.backScaleValX * -1;
    this.backCropper.cropper.scaleX(this.backScaleValX);
  }

  backFlipY() {
    this.backScaleValY = this.backScaleValY * -1;
    this.backCropper.cropper.scaleY(this.backScaleValY);
  }

  backReset() {
    this.backValue = 0;
    this.backStrValue = 0;
    this.backCropper.cropper.reset();
  }

  saveBackImage() {
    const croppedImgB64String = this.backCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
    this.backCroppedImage = 'url(' + croppedImgB64String + ')';
    $('#modal_theme_edit_background_image').modal('toggle');


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }

  }

  openNewBackImage() {
    document.getElementById('back_image_open').click();
  }

  getBackImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.backCropper.cropper.destroy();
        this.backImage = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
