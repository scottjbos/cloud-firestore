import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CctransactiondialogComponent } from './cctransactiondialog.component';

describe('CctransactiondialogComponent', () => {
  let component: CctransactiondialogComponent;
  let fixture: ComponentFixture<CctransactiondialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CctransactiondialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CctransactiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
