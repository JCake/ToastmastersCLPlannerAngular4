import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  { 
  showingInstructions = false;
  plannedRoles: DefinedRole[] = [];
  roles: String[];
  selectedRole: String;
  selectedProject: String;
  rolesToProjects: Map<String, String[]> = new Map();
  // NOTE:  One role that MUST always be filled is TIMER, so that is assumed...
  projectsToRequirements: Map<String, Requirement> = new Map();
  projectRequirements: Requirement[];

  TM = 'Toastmaster';
  GE = 'General Evaluator';
  evaluator = 'Speech Evaluator';
  TTM = 'Topicsmaster';

  CL1 = 'CL1: Listening';
  CL2 = 'CL2: Critical Thinking';
  CL3 = 'CL3: Giving Feedback';
  CL4 = 'CL4: Time Management';
  CL5 = 'CL5: Planning and Implementation';
  CL6 = 'CL6: Organization and Delegation';
  CL7 = 'CL7: Facilitation';
  // NOTE:  Having extra spaces breaks matching up fields to UI because UI only shows one space!
  CL8 = 'CL8: Motivation';
  CL9 = 'CL9: Mentoring';
  CL10 = 'CL10: Team Building';
  selectedForCL10 = false;

  constructor(){
    this.projectsToRequirements.set(this.CL1, new Requirement(this.CL1, 3));
    this.projectsToRequirements.set(this.CL2, new Requirement(this.CL2, 2));
    this.projectsToRequirements.set(this.CL3, new Requirement(this.CL3, 3));
    const project4Req = new Requirement(this.CL4, 1);
    project4Req.preText = 'Timer role plus '; // Already added to plannedRoles below
    this.projectsToRequirements.set(this.CL4, project4Req);
    this.projectsToRequirements.set(this.CL5, new Requirement(this.CL5, 3));
    const project6Req = new Requirement(this.CL6, 1);
    project6Req.numFilled = 1; // Because already aldded to plannedRoles below
    this.projectsToRequirements.set(this.CL6, project6Req);
    this.projectsToRequirements.set(this.CL7, new Requirement(this.CL7, 2));
    const project8Req = new Requirement(this.CL8, 2);
    project8Req.preText = 'Chair position plus '; // Already added to plannedRoles below
    this.projectsToRequirements.set(this.CL8, project8Req);
    this.projectsToRequirements.set(this.CL9, new Requirement(this.CL9, 1));
    this.projectsToRequirements.set(this.CL10, new Requirement(this.CL10, 2)); // Default to meeting roles

    this.projectRequirements = [];
    this.projectsToRequirements.forEach((value, key) => {
      this.projectRequirements.push(value);
    });

    this.rolesToProjects.set('Befriend a Guest', [this.CL7]);
    this.rolesToProjects.set('Speaker', [this.CL4, this.CL5]);
    this.rolesToProjects.set('Table Topics Speaker', [this.CL1]);
    this.rolesToProjects.set('Ah-Counter', [this.CL1]);
    this.rolesToProjects.set('Grammarian',
      [this.CL3, this.CL2, this.CL1, this.CL4]);
    this.rolesToProjects.set(this.evaluator,
      [this.CL3, this.CL2, this.CL1, this.CL8]);
    this.rolesToProjects.set(this.TTM, [this.CL5, this.CL7, this.CL4]);
    this.rolesToProjects.set(this.TM, [this.CL8, this.CL5, this.CL7,this.CL4]); 
    this.rolesToProjects.set(this.GE,
      [this.CL3, this.CL8, this.CL2, this.CL5, this.CL7]);
    this.rolesToProjects.set('Mentor New or Current Member', [this.CL9]);
    this.rolesToProjects.set('Serve on HPL Committee', [this.CL9]);

    this.determineNeededRoles();
    this.selectedRole = this.roles[0];
    this.selectRecommendedProject(this.selectedRole);
    this.plannedRoles.push(new DefinedRole('Timer', this.CL4));
    this.plannedRoles.push(new DefinedRole('Help with club contest, event, campaign, newsletter, or website', this.CL6));
    this.plannedRoles.push(new DefinedRole('Chair Club Membership or PR Campaign', this.CL8));
  }

  determineNeededRoles(){
    this.roles = []; 
    this.rolesToProjects.forEach((value, key) => {
      if(value.length > 0){
        this.roles.push(key);
      }
    });
  }

  addRole(role: String, projectToUse: String) {
    const possibleProjectsForRole: String[] = this.rolesToProjects.get(role);
    const indexOfProjectToUse = possibleProjectsForRole.indexOf(projectToUse);
    if(indexOfProjectToUse === -1){
      console.error(`Could not find project ${projectToUse} for role ${role}'s list ${possibleProjectsForRole} so using default instead`);
      projectToUse = this.rolesToProjects.get(role).pop();
    } else {
      this.rolesToProjects.get(role).splice(indexOfProjectToUse, 1);
    }
    
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
    this.selectRecommendedProject(this.selectedRole);

  }

  selectRecommendedProject(forRole: String){
    this.selectedProject = this.rolesToProjects.get(forRole)[0];
  }

  // TODO CODING Figure out what is going wrong when Toastmaster is selected!
  roleChanged(ngChangeEvent){
    console.log(`Role changed to ${ngChangeEvent}`);
    this.selectRecommendedProject(ngChangeEvent);
    console.log(`Recommended Project is: ${this.selectedProject}`);
  }

  chairForCL10(){
    const requirementForCL10 = this.projectsToRequirements.get(this.CL10);
    requirementForCL10.numNeeded = 1; // Chairing means only one task is needed
    requirementForCL10.numFilled = 1;

    this.plannedRoles.push(new DefinedRole('Chair club contest, event, campaign, newsletter, or website', this.CL10));
  
    this.selectedForCL10 = true;
  }

  doMeetingRolesForCL10(){
    const requirementForCL10 = this.projectsToRequirements.get(this.CL10);
    requirementForCL10.numFilled = 2;

    this.plannedRoles.push(new DefinedRole(this.TM, this.CL10));
    this.plannedRoles.push(new DefinedRole('General Evaluator', this.CL10));

    this.selectedForCL10 = true;
  }

  findPage(role: DefinedRole){
    switch(role.project) {
      case this.CL1:
        return role.role === this.evaluator || role.role === 'Table Topics Speaker' ? '8' : '9';
      case this.CL2:
        return role.role === this.GE ? '13' : '12';
      case this.CL3:
        return role.role === this.GE ? '18' : '17';
      case this.CL4:
        if(role.role === this.TM){
          return '22';
        } else {
          return role.role === this.TTM ? '24' : '23';
        }
      case this.CL5:
        return role.role === this.GE || role.role === 'Speaker' ? '27' : '28';
      case this.CL6:
        return '32-34';
      case this.CL7:
        return role.role === this.TM || role.role === this.GE ? '38' : '39';
      case this.CL8:
        return role.role === this.TM || role.role === this.evaluator ? '43' : '44-45';
      case this.CL9:
        return '48-49';
      case this.CL10:
        return role.role === this.TM || role.role === this.GE ? '53' : '54-56';
      default:
        return '';
    }

  }

  buildSamplePlan(){
    if(!this.selectedForCL10){
      this.doMeetingRolesForCL10();
    }
    while(this.roles.length > 0){
      this.addRole(this.roles[0], null);  
    }
    
  }

  print(){
    window.print();
  }
}

export class DefinedRole {
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
  public preText: String; // Supplied if additional requirementes
  constructor(project: String, numNeeded: number){
    this.project = project;
    this.numNeeded = numNeeded;
  }

  isComplete(){
    return this.numFilled === this.numNeeded;
  }
}
