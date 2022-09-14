import { DataService } from './data.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = false;
  myForm: FormGroup;
  urlPath = new FormControl();
  responseData: any;
  wordCount: number;
  displayedColumns: string[] = ['rank', 'word', 'count'];
  dataSource: any[] = [];
  get formControls() {
    return this.myForm.controls;
  }
  constructor(private _fb: FormBuilder, private _dataService: DataService) {
    this.myForm = this._fb.group({
      text: ['', [Validators.required, Validators.maxLength(20)]],
    });
    this.urlPath.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this._dataService.getSampleData(value);
    });
    this._dataService.isLoading$.subscribe((value) => {
      this.isLoading = value;
    });
    this._dataService.wordCount$.subscribe((value) => {
      this.wordCount = value;
    });
    this._dataService.data$.subscribe((value: any) => {
      this.responseData = value.description;
      if (this.responseData) {
        this._dataService.countWords(this.responseData);
        this._dataService.checkWorkOccurences(this.responseData);
      }
    });
    this._dataService.rankedWords$.subscribe((val) => {
      this.dataSource = val;
    });
  }
}
