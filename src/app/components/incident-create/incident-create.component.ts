import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cat } from 'src/app/common/cat';
import { Incident } from 'src/app/common/incident';
import { CatService } from 'src/app/services/cat.service';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-incident-create',
  templateUrl: './incident-create.component.html',
  styleUrls: ['./incident-create.component.css']
})
export class IncidentCreateComponent implements OnInit {
  createForm!: FormGroup;
  cats!: Cat[];
  formValid = true;

  constructor(private incidentService: IncidentService, public fb: FormBuilder, private catService: CatService, private router: Router) { }

  ngOnInit(): void {
    this.catService.getCatList().subscribe((response) => {
      this.cats = response;
    })
    this.createForm = this.fb.nonNullable.group({
      cat: new FormControl('', Validators.required),
      year: new FormControl(new Date().getFullYear(), [Validators.required, Validators.max(new Date().getFullYear())]),
      day: new FormControl(new Date().getDay(), [Validators.required, Validators.min(1), Validators.max(31)]),
      month: new FormControl(new Date().getMonth(), [Validators.required, Validators.min(1), Validators.max(12)])
    })
  }

  changeCat(event: any) {
    alert(event.target.value)
    this.createForm.patchValue({ cat: event.target.value });
  }

  postIncident() {
    if (!this.createForm.valid) {
      this.formValid = false;
      return;
    }
    this.formValid = true;
    this.incidentService.postIncident(new Incident(0, this.createForm.value.cat.id, this.createForm.value.cat.userId, new Date(this.createForm.value.year, this.createForm.value.month, this.createForm.value.day), this.createForm.value.cat.name))
      .subscribe(() => {
        this.router.navigateByUrl("/home");
      })
  }


}
