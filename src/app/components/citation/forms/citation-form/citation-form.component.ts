import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Violation } from 'src/app/models/violation';

@Component({
  selector: 'app-citation-form',
  templateUrl: './citation-form.component.html',
  styleUrls: ['./citation-form.component.css']
})
export class CitationFormComponent {
  // For use when editing citation in view citations
  @Input() violations?: Violation[]
  @Input() states: string[] = [];
  @Input() editingCitation: boolean = false;
  @Input() form!: FormGroup;

  groups = [
    'VC1463 Vehicle Code (Felony) Violations',
    'VC1463 Vehicle Code (Infraction) Violations',
    'VC1463 Vehicle Code (Misdemeanor) Violations',
    'VC15630 Unattended Child In Moving Vehicle',
    'VC16028 Proof of Correctable Insurance',
    'VC21212 Bicycle Safety Helmet Violations',
    'VC23760 Child Seat Restraint Traffic School',
    'VC23760 Child Seat Restraint Traffic School w/Prior',
    'VC27360.5 Child Passenger Seat Restraint (Traffic School)',
    'VC4001(a) Owner Responsibility',
    'VC40611 Vehicle Code (Infraction) Proof of Correctable',
    'VC40611 Vehicle Code (Misdemeanor) Proof of Correctable', 
    'VC42001.2 Motor Vehicle Exhaust Standards (POC)',
    'VC42007 Moving Vehicle (Infraction) Traffic School',
    'VC42007 Moving Vehicle (Misdemeanor) Traffic School',
    'VC42007/40611 Moving Vehicle (Infraction) (POC and TVS)',
    'VC42204 Off-Highway Motor Vehicle Fines and Forfeitures',
    'VC42204 Off-Highway Motor Vehicle Fines and Forfeitures- POC'
  ]

  descriptions = [
    "PC664-VC2800.2(a)-F-Attempt to Evade Police w/ Disregard for Safety (F)",
    "VC10501(a)-File False Report Of Vehicle Theft (F)",
    "CUT1105-I-Sleeping in Vehicle (I)",
    "PGT16.16.050-Failure To Obey Traffic Control Device (I)",
    "PC664-VC2800.2a-M-Attempt to Evade Police w/ Disregard for Safety (M)",
    "VC10501(a)-M-File False Report Of Vehicle Theft (M)",
    "VC15620(a)(1)-Child 6 Years Or Less-Unattended Vehicle (I)",
    "VC15620(a)(2)-Child 6 Years Or Less-Unattended Vehicle (I)",
    "VC16020a-Evidence Of Financial Responsibility (I)",
    "VC16028(a)-Fail Provide Evidence Financial Responsible (I)",
    "VC21212(a)-Bicycle Helmet Required/Under 18 Years (I)",
    "VC27360(a)-Child Restraints in rear seat-Child Under 8 (I)",
    "VC27360(b)-Transport child under 2-rear-facing restraint. (I)",
    "VC27360.5(a)-Safety Belt/Child Restraint-Over 8/Under 16 (I)",
    "VC40001(a)Owner Responsibility (AUTH)",
    "VC40001(b)Owner Responsibility (AUTH)",
    "SAT20-105(a)-Unlicensed Bicycle (I)",
    "VC12500(a)-I-Unlawful to Drive Unless Licensed (I)",
    "VC12500(a)-M-Unlawful to Drive Unless Licensed (M) ",
    "VC31401(d)-Farm Labor Cert Req (M)",
    "VC27153.5(a)-Motor Vehicle Exhaust Standards Specified (I)",
    "VC27153.5(b)-Motor Vehicle Exhaust Standards Specified (I)",
    "PGT16.20.040-No U-Turn (I)",
    "VC21100.3-Failure To Obey Traffic Directions (I) ",
    "VC21702(a)-Limitation On Driving Hours (M)",
    "VC32002(b)-Unlicensed Transport Of Hazardous Materials (M)",
    "VC14603-Violation Of License Restrictions (I)",
    "VC24002(b)-Unlawful To Operate Vehicle - Not Equipped (I)",
    "VC38025-Operate Offroad Vehicle Upon Highway (I)",
    "VC38025(a)-Drive On 2-Lane Highway (I)",
    "VC38010(a)-Off-Highway/Display Of I.D. Plates (I)",
    "VC38020-Registration Required For Off-Highway Vehicle (I)"
  ]

  codes = [
    "PC664-VC2800.2(a)",
    "VC10501(a)",
    "CUT1105-I",
    "PGT16.16.050",
    "PC664-VC2800.2a-M",
    "VC10501(a)-M",
    "VC15620(a)(1)",
    "VC15620(a)(2)",
    "VC16020a",
    "VC16028(a)",
    "VC21212(a)",
    "VC27360(a)",
    "VC27360(b)",
    "VC27360.5(a)",
    "VC40001(a)",
    "VC40001(b)",
    "SAT20-105(a)",
    "VC12500(a)",
    "VC12500(a)",
    "VC31401(d)",
    "VC27153.5(a)",
    "VC27153.5(b)",
    "PGT16.20.040",
    "VC21100.3",
    "VC21702(a)",
    "VC32002(b)",
    "VC14603",
    "VC24002(b)",
    "VC38025",
    "VC38025(a)",
    "VC38010(a)",
    "VC38020"
  ]
  
  constructor(private fb: FormBuilder) {
  }

  get citationInfo() {
    return this.form.get('citationInfo') as FormGroup;
  }

  submitForm() {
    // Check validity of form controls and mark as touched (changed)
    Object.keys(this.citationInfo.controls).forEach(control => {
      this.citationInfo.controls[control].markAsTouched();
      this.citationInfo.controls[control].updateValueAndValidity();
    });
  }

  // form array violations getter
  violationsArray(): FormArray {
    return this.form.get("citationInfo.violations") as FormArray;
  }

  // creates an empty violation form group
  newViolation(): FormGroup {
    return this.fb.group({
      group: '',
      code: '',
      degree: '',
      desc: '',
    })
  }

  // adds a new violation to the form and violations array
  addViolation() {
    this.violationsArray().push(this.newViolation());
    this.violations?.push(new Violation());
  }

  // remove a violation from the form and violations array
  removeViolation(i: number) {
    this.violationsArray().removeAt(i);
    this.violations?.splice(i, 1);
  }

}
