import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiAssociationComponent } from './profi-association.component';

describe('ProfiAssociationComponent', () => {
  let component: ProfiAssociationComponent;
  let fixture: ComponentFixture<ProfiAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfiAssociationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
