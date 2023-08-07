import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatListingComponent } from './cat-listing.component';

describe('CatListingComponent', () => {
  let component: CatListingComponent;
  let fixture: ComponentFixture<CatListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
