import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmeEditorComponent } from './arme-editor.component';

describe('ArmeEditorComponent', () => {
  let component: ArmeEditorComponent;
  let fixture: ComponentFixture<ArmeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
