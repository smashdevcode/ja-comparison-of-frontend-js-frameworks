import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumBoxComponent } from './album-box.component';

describe('AlbumBoxComponent', () => {
  let component: AlbumBoxComponent;
  let fixture: ComponentFixture<AlbumBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
