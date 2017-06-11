webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Toastmaster CL Planner</h1>\n<button *ngIf=\"!showingInstructions\" (click)=\"showingInstructions = true\">See Instructions</button>\n<button *ngIf=\"showingInstructions\" (click)=\"showingInstructions = false\">Hide Instructions</button>\n<div *ngIf=\"showingInstructions\">\n    From the dropdown below, select a roles you would like to fill towards getting your CL and click \"Add Role\". This application will automatically suggest what CL project to get evaluated on for that role. Once all meeting role requirements are complete,\n    the dropdown will go away. See the bottom of the page for additional CL requirements beyond meeting roles.\n    <br/>\n</div>\n\n<table border=\"1\">\n    <thead>\n        <tr>\n            <th>Meeting Date</th>\n            <th>Meeting Role</th>\n            <th>Project</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let plannedRole of plannedRoles\">\n            <td></td>\n            <td>{{plannedRole.role}}</td>\n            <td>{{plannedRole.project}}</td>\n        </tr>\n    </tbody>\n</table>\n\n<br/>\n\n<div *ngIf=\"roles.length > 0; else elseBlock\">\n    <select [(ngModel)]=\"selectedRole\">\n        <option *ngFor=\"let role of roles\">{{role}}</option>\n    </select>\n    <button (click)=\"addRole(selectedRole)\">Add Role</button>\n\n</div>\n<ng-template #elseBlock>\n    <h3>All Required Meeting Roles Filled! See bottom of page for additional requirements.</h3>\n</ng-template>\n\n<h2>Above fulfills:</h2>\nTimer role required for CL4: Time Management, plus:\n<div *ngFor=\"let projectReq of projectRequirements\">\n    {{projectReq.project}}: {{projectReq.numFilled}} of {{projectReq.numNeeded}} roles needed.\n</div>\n\n<h2>Also must:</h2>\n\n<li>Help Organize a speech contest, special event, membership campaign or contest, or PR campaign, help produce newsletter, or help with website for CL6: Organization and Delegation</li>\n\n<li>Chair a Membership campaign or contest or PR campaign for {{CL8}}</li>\n\n<li>Mentor new member or existing member, or serve on HPL committee for CL9: Mentoring</li>\n\n<li *ngIf=\"!meetingRolesForCL10\">Chair a speech contest, special event, membership campaign or contest, or PR campaign, edit a newsletter, or serve as webmaster for {{CL10}} OR <button (click)=\"doMeetingRolesForCL10()\">Click here</button> to do Toastmaster + General Evaluator meeting\n    roles instead</li>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

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

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map