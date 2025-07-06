import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPreference } from './set-preference';

describe('SetPreference', () => {
  let component: SetPreference;
  let fixture: ComponentFixture<SetPreference>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetPreference]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPreference);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
