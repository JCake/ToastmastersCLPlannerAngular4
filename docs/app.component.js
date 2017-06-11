"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        var _this = this;
        this.name = 'Jessica';
        this.plannedRoles = [];
        this.rolesToProjects = new Map();
        // NOTE:  One role that MUST always be filled is TIMER, so that is assumed...
        this.projectsToRequirements = new Map();
        this.CL1 = 'CL1: Listening';
        this.CL2 = 'CL2: Critical Thinking';
        this.CL3 = 'CL3: Giving Feedback';
        this.CL4 = 'CL4: Time Management';
        this.CL5 = 'CL5: Planning & Implementation';
        this.CL7 = 'CL7: Facilitation';
        this.CL8 = 'CL8:  Motivation';
        this.CL10 = 'CL10:  Team Building';
        this.meetingRolesForCL10 = false;
        this.projectsToRequirements.set(this.CL1, new Requirement(this.CL1, 3));
        this.projectsToRequirements.set(this.CL2, new Requirement(this.CL2, 2));
        this.projectsToRequirements.set(this.CL3, new Requirement(this.CL3, 3));
        this.projectsToRequirements.set(this.CL4, new Requirement(this.CL4, 1)); //NOTE:  Apart from Timer
        this.projectsToRequirements.set(this.CL5, new Requirement(this.CL5, 3));
        this.projectsToRequirements.set(this.CL7, new Requirement(this.CL7, 2));
        this.projectsToRequirements.set(this.CL8, new Requirement(this.CL8, 2)); //NOTE:  In addition to chairing
        this.projectRequirements = [];
        this.projectsToRequirements.forEach(function (value, key) {
            _this.projectRequirements.push(value);
        });
        this.rolesToProjects.set('Befriend a Guest', [this.CL7]);
        this.rolesToProjects.set('Speaker', [this.CL4, this.CL5]);
        this.rolesToProjects.set('Table Topics Speaker', [this.CL1]);
        this.rolesToProjects.set('Ah-Counter', [this.CL1]);
        this.rolesToProjects.set('Grammarian', [this.CL4, this.CL1, this.CL2, this.CL3]);
        this.rolesToProjects.set('Speech Evaluator', [this.CL8, this.CL1, this.CL2, this.CL3]);
        this.rolesToProjects.set('Topicsmaster', [this.CL4, this.CL7, this.CL5]);
        this.rolesToProjects.set('General Evaluator', [this.CL7, this.CL5, this.CL2, this.CL8, this.CL3]);
        this.rolesToProjects.set('Toastmaster', [this.CL4, this.CL7, this.CL5, this.CL8]);
        this.determineNeededRoles();
        this.selectedRole = this.roles[0];
        this.plannedRoles.push(new DefinedRole('Timer', this.CL4));
    }
    AppComponent.prototype.determineNeededRoles = function () {
        var _this = this;
        this.roles = [];
        this.rolesToProjects.forEach(function (value, key) {
            if (value.length > 0) {
                _this.roles.push(key);
            }
        });
    };
    AppComponent.prototype.addRole = function (role) {
        var projectToUse = this.rolesToProjects.get(role).pop();
        this.plannedRoles.push(new DefinedRole(role, projectToUse));
        this.projectsToRequirements.get(projectToUse).numFilled++;
        if (this.projectsToRequirements.get(projectToUse).numFilled === this.projectsToRequirements.get(projectToUse).numNeeded) {
            this.rolesToProjects.forEach(function (value, key) {
                var indexOfProject = value.indexOf(projectToUse);
                if (indexOfProject > -1) {
                    var removed = value.splice(indexOfProject, 1);
                }
            });
        }
        this.determineNeededRoles();
        if (this.roles.indexOf(this.selectedRole) === -1) {
            this.selectedRole = this.roles[0];
        }
    };
    AppComponent.prototype.doMeetingRolesForCL10 = function () {
        this.plannedRoles.push(new DefinedRole('Toastmaster', this.CL10));
        this.plannedRoles.push(new DefinedRole('General Evaluator', this.CL10));
        var requirementForCL10 = new Requirement(this.CL10, 2);
        requirementForCL10.numFilled = 2;
        this.projectRequirements.push(requirementForCL10);
        this.meetingRolesForCL10 = true;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/index.html'
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
var DefinedRole = (function () {
    function DefinedRole(role, project) {
        this.role = role;
        this.project = project;
    }
    return DefinedRole;
}());
var Requirement = (function () {
    function Requirement(project, numNeeded) {
        this.numFilled = 0;
        this.project = project;
        this.numNeeded = numNeeded;
    }
    return Requirement;
}());
//# sourceMappingURL=app.component.js.map