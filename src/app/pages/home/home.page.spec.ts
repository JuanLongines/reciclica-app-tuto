import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router, provideRouter } from '@angular/router';
import { routes } from 'src/app/app.routes';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router:Router;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      providers:[
        provideRouter(routes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    router=TestBed.get(Router);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to pickup calls on see all',()=>{
    spyOn(router,'navigate'); //Observe router when navigate calls
    component.goToPickupCalls(); //call method in component or page
    expect(router.navigate).toHaveBeenCalledWith(['pickup-calls']); //execute text with params
  });

  it('should go to pickup calls on create pickup call',()=>{
    spyOn(router,'navigate');
    component.newPickupCall();

    expect(router.navigate).toHaveBeenCalledWith(['pickup-call']);
  });
});
