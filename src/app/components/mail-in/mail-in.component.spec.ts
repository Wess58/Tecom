import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailInComponent } from './mail-in.component';

describe('MailInComponent', () => {
  let component: MailInComponent;
  let fixture: ComponentFixture<MailInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
