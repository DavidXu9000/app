import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Cat } from 'src/app/common/cat';
import { Incident } from 'src/app/common/incident';
import { CatService } from 'src/app/services/cat.service';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {
  selectedFile!:any

  @ViewChild("fileinput", { static: false })
  inputVar!: ElementRef;

  incident!: Incident;
  cat!: Cat;
  createForm  : FormGroup = this.fb.nonNullable.group({
      year: new FormControl(new Date().getFullYear(), [Validators.required, Validators.max(new Date().getFullYear())]),
      day: new FormControl(new Date().getDay(), [Validators.required, Validators.min(1), Validators.max(31)]),
      month: new FormControl(new Date().getMonth(), [Validators.required, Validators.min(1), Validators.max(12)])
    })

  constructor(private catService: CatService, private incidentService: IncidentService, private route: ActivatedRoute, public fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === undefined || !Number.isInteger(parseInt(id!))) {
      this.router.navigateByUrl('/404');
      return;
    }
     this.incidentService.getIncidentById(parseInt(id!)).subscribe((incident) => {
      this.incident = incident;
      alert(incident.catId)
      this.catService.getCatById(this.incident.catId).subscribe((cat) => {
        this.cat = cat;
      })
    })
    
  }

  patchIncident() {
    this.incidentService.patchIncident(new Incident(0, this.incident.catId, this.incident.userId, new Date(this.createForm.value.year, this.createForm.value.month, this.createForm.value.day), this.incident.catName))
  }

  deleteIncident() {
    this.incidentService.deleteIncident(this.incident);
  }

  changeFile(event: any) {
    this.selectedFile = event.target.files.item(0);
  }

  clearImage() {
    this.selectedFile = '';
    this.inputVar.nativeElement.value = "";
  }
}
