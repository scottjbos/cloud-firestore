import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CctransactionComponent } from './cctransaction.component';

describe('CctransactionComponent', () => {
  let component: CctransactionComponent;
  let fixture: ComponentFixture<CctransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CctransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CctransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
