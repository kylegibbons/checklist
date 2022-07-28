import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChecklistService } from 'src/app/services/checklist.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  nameFormControl = new FormControl('', Validators.required)

  form = this.formBuilder.group({
    name: this.nameFormControl,
   })

  constructor(
    private checklistService: ChecklistService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  createChecklist() {
    const id = this.checklistService.newChecklist(this.form.value.name)
    this.router.navigate(['/checklist', id, 'edit'])
  }

}
