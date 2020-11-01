import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { StorageService } from '../service/storage.service';
import { UtilsService } from '../service/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const MEDIA_STORAGE_PATH = "salon-banner/";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit, OnDestroy {

  destroy$: Subject<null> = new Subject();
  fileToUpload: File;
  pictureForm: FormGroup;
  submitted = false;
  uploadProgress$: Observable<number>;

  @Input() imagePreview: string | ArrayBuffer;
  @Output() imageUrl = new EventEmitter();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly storageService: StorageService,
    private readonly utilService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.pictureForm = this.formBuilder.group({
      photo: [null, [Validators.required, this.image.bind(this)]],
      description: [null, Validators.required],
    });
    // this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => (this.user = user));

    this.pictureForm
      .get('photo')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((newValue) => {
        this.handleFileChange(newValue.files);
      });
  }

  handleFileChange([imageToUpload]) {
    this.fileToUpload = imageToUpload;
    const reader = new FileReader();
    reader.onload = (loadEvent) => (this.imagePreview = loadEvent.target.result);
    reader.readAsDataURL(imageToUpload);
  }

  postImage() {
    this.submitted = true;

    const { downloadUrl$, uploadProgress$ } = this.storageService.uploadFileAndGetMetadata(
      MEDIA_STORAGE_PATH,
      this.fileToUpload,
    );

    this.uploadProgress$ = uploadProgress$;

    downloadUrl$
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.snackBar.open(`${error.message} 😢`, 'Close', {
            duration: 4000,
          });
          return EMPTY;
        }),
      )
      .subscribe((downloadUrl) => {
        this.submitted = false;
        this.imageUrl.emit(downloadUrl)
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }

  private image(photoControl: AbstractControl): { [key: string]: boolean } | null {
    if (photoControl.value) {
      const [imageToUpload] = photoControl.value.files;
      return this.utilService.validateFile(imageToUpload)
        ? null
        : {
          image: true,
        };
    }
    return;
  }

}

