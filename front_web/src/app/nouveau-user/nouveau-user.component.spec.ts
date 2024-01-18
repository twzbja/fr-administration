import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauUserComponent } from './nouveau-user.component';

describe('NouveauUserComponent', () => {
  let component: NouveauUserComponent;
  let fixture: ComponentFixture<NouveauUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
