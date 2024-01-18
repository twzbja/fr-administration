import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvellAssociationComponent } from './nouvell-association.component';

describe('NouvellAssociationComponent', () => {
  let component: NouvellAssociationComponent;
  let fixture: ComponentFixture<NouvellAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvellAssociationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvellAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
