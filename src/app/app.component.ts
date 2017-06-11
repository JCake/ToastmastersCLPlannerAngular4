import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  { 
  name = 'Jessica';
  plannedRoles: DefinedRole[] = [];
  roles: String[];
  selectedRole: String;
  rolesToProjects: Map<String, String[]> = new Map();
  // NOTE:  One role that MUST always be filled is TIMER, so that is assumed...
  projectsToRequirements: Map<String, Requirement> = new Map();
  projectRequirements: Requirement[];

  CL1 = 'CL1: Listening';
  CL2 = 'CL2: Critical Thinking';
  CL3 = 'CL3: Giving Feedback';
  CL4 = 'CL4: Time Management';
  CL5 = 'CL5: Planning & Implementation';
  CL7 = 'CL7: Facilitation';
  CL8 = 'CL8:  Motivation';
  CL10 = 'CL10:  Team Building';
  meetingRolesForCL10 = false;

  constructor(){
    this.projectsToRequirements.set(this.CL1, new Requirement(this.CL1, 3));
    this.projectsToRequirements.set(this.CL2, new Requirement(this.CL2, 2));
    this.projectsToRequirements.set(this.CL3, new Requirement(this.CL3, 3));
    this.projectsToRequirements.set(this.CL4, new Requirement(this.CL4, 1)); //NOTE:  Apart from Timer
    this.projectsToRequirements.set(this.CL5, new Requirement(this.CL5, 3));
    this.projectsToRequirements.set(this.CL7, new Requirement(this.CL7, 2));
    this.projectsToRequirements.set(this.CL8, new Requirement(this.CL8, 2)); //NOTE:  In addition to chairing

    this.projectRequirements = [];
    this.projectsToRequirements.forEach((value, key) => {
      this.projectRequirements.push(value);
    });

    this.rolesToProjects.set('Befriend a Guest', [this.CL7]);
    this.rolesToProjects.set('Speaker', [this.CL4, this.CL5]);
    this.rolesToProjects.set('Table Topics Speaker', [this.CL1]);
    this.rolesToProjects.set('Ah-Counter', [this.CL1]);
    this.rolesToProjects.set('Grammarian',
      [this.CL4, this.CL1, this.CL2, this.CL3]);
    this.rolesToProjects.set('Speech Evaluator',
      [this.CL8, this.CL1,this.CL2, this.CL3]);
    this.rolesToProjects.set('Topicsmaster', [this.CL4, this.CL7, this.CL5]);
    this.rolesToProjects.set('General Evaluator',
      [this.CL7, this.CL5, this.CL2, this.CL8, this.CL3]);
    this.rolesToProjects.set('Toastmaster',
      [this.CL4, this.CL7, this.CL5, this.CL8]);   

    this.determineNeededRoles();
    this.selectedRole = this.roles[0];
    this.plannedRoles.push(new DefinedRole('Timer', this.CL4));
  }

  determineNeededRoles(){
    this.roles = []; 
    this.rolesToProjects.forEach((value, key) => {
      if(value.length > 0){
        this.roles.push(key);
      }
    });
  }

  addRole(role: String) {
    const projectToUse = this.rolesToProjects.get(role).pop();
    this.plannedRoles.push(new DefinedRole(role, projectToUse));

    this.projectsToRequirements.get(projectToUse).numFilled++;
    if(this.projectsToRequirements.get(projectToUse).numFilled === this.projectsToRequirements.get(projectToUse).numNeeded){
      this.rolesToProjects.forEach((value, key) => {
        const indexOfProject = value.indexOf(projectToUse);
        if(indexOfProject > -1){
          const removed = value.splice(indexOfProject, 1);
        }
      });  
    }

    this.determineNeededRoles();
    
    if(this.roles.indexOf(this.selectedRole) === -1){
      this.selectedRole = this.roles[0];
    }
  }

  doMeetingRolesForCL10(){
    this.plannedRoles.push(new DefinedRole('Toastmaster', this.CL10));
    this.plannedRoles.push(new DefinedRole('General Evaluator', this.CL10));

    const requirementForCL10 = new Requirement(this.CL10, 2);
    requirementForCL10.numFilled = 2;
    this.projectRequirements.push(requirementForCL10);

    this.meetingRolesForCL10 = true;
  }
}

class DefinedRole {
  public role: String
  public project: String
  constructor(role: String, project: String){
    this.role = role;
    this.project = project;
  }
}

class Requirement {
  public project: String;
  public numFilled: number = 0;
  public numNeeded: number;
  constructor(project: String, numNeeded: number){
    this.project = project;
    this.numNeeded = numNeeded;
  }
}
