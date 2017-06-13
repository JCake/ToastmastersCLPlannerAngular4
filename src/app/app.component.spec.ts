import { TestBed, async } from '@angular/core/testing';

import { AppComponent, DefinedRole } from './app.component';

describe('AppComponent', () => {
  // TODO TESTING CODING Get these to work!
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       AppComponent
  //     ],
  //   }).compileComponents();
  // }));

  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Toastmaster CL Planner');
  // }));

  describe('assinging roles and projects', () => {
    it('can use grammarian for CL3', () => {
      const classUnderTest = new AppComponent();
      classUnderTest.addRole('Grammarian', classUnderTest.CL3);
      expect(classUnderTest.rolesToProjects.get('Grammarian'))
        .toEqual([classUnderTest.CL2, classUnderTest.CL1, classUnderTest.CL4]);
      expect(classUnderTest.plannedRoles[1]).toEqual(new DefinedRole('Grammarian', classUnderTest.CL3));
    });

    // TODO CODING TESTING Figure out why in practice, choosing CL8 for GE causes issues
    it('can use general Evaluator for CL8', () => {
      const classUnderTest = new AppComponent();
      classUnderTest.addRole('General Evaluator', classUnderTest.CL8);
      expect(classUnderTest.rolesToProjects.get('General Evaluator'))
        .toEqual([classUnderTest.CL3, classUnderTest.CL2, classUnderTest.CL5, classUnderTest.CL7]);
      expect(classUnderTest.plannedRoles[1]).toEqual(new DefinedRole('General Evaluator', classUnderTest.CL8));
    });
  });
});
