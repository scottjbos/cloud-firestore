import { Component, ViewChild, NgZone } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Transaction } from '../cctransaction/cctransaction.model';
import { CctransactionService } from '../cctransaction/cctransaction.service';
import { MatBottomSheetRef, MatSnackBar } from '@angular/material';
import { FileStats } from './cctransactionfileuploadbottomsheet.filestats.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cctransactionfileuploadbottomsheet',
  templateUrl: './cctransactionfileuploadbottomsheet.component.html',
  styleUrls: ['./cctransactionfileuploadbottomsheet.component.css']
})
export class CctransactionFileuploadBottomsheetComponent {
  @ViewChild('file') file;
  private _fileStats: FileStats[] = [];
  private _fileStatsObservable: BehaviorSubject<FileStats[]> = new BehaviorSubject([]);
  
  constructor(
    private bottomSheetRef: MatBottomSheetRef<CctransactionFileuploadBottomsheetComponent>,
    public snackBar: MatSnackBar,
    private papa: Papa,
    private cctransactionService: CctransactionService) { }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this._fileStats.push({
          file: files[key],
          count: 0,
          status: "Not_Uploaded"
        });
        this._fileStatsObservable.next(this._fileStats);

        this.papa.parse(files[key], {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result, file) => {
            result.data.forEach(element => {
              let transaction = this.convertObjectNameToCamelCase(element);
              this.cctransactionService.addTransaction(<Transaction>transaction)
            });
            
            var fileStat = this._fileStats.find(x => x.file.name === file.name);
            fileStat.count = result.data.length;
            fileStat.status = "Complete";
            this._fileStatsObservable.next(this._fileStats);
          }
        });
      }
    }
  }

  fileStats() {
    return this._fileStatsObservable.asObservable();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  convertObjectNameToCamelCase(object: any) {
    let newObject = {};
    for (let origKey in object) {
      var newKey = origKey.replace(" ", "");
      newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
      newObject[newKey] = object[origKey];
    }
    return newObject;
  };
}