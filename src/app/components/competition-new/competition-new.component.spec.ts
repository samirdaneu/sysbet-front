import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionNewComponent } from './competition-new.component';

describe('CompetitionNewComponent', () => {
  let component: CompetitionNewComponent;
  let fixture: ComponentFixture<CompetitionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
