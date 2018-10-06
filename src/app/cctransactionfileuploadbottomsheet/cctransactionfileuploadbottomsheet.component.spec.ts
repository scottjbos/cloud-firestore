import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CctransactionfileuploadbottomsheetComponent } from './cctransactionfileuploadbottomsheet.component';

describe('CctransactionfileuploadbottomsheetComponent', () => {
  let component: CctransactionfileuploadbottomsheetComponent;
  let fixture: ComponentFixture<CctransactionfileuploadbottomsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CctransactionfileuploadbottomsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CctransactionfileuploadbottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
