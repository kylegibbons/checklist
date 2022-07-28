import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { ChecklistService } from 'src/app/services/checklist.service';
import { Checklist } from './checklist.type';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
  activePhase: number = 0;
  editMode: boolean = false;

  checklist: Checklist | undefined;

  checklistForm = this.formBuilder.group({});

  constructor(
    private checklistService: ChecklistService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['editMode']) {
        this.editMode = true;
      }
    })

    this.route.params.subscribe((params) => {
      console.log(params)

      if (params['id'] == undefined) {
        console.log("id is empty")
        return
      }

      this.checklistService.loadChecklist(params['id']).subscribe((checklist) => {
        if (checklist == undefined) {
          console.log("could not find checklist")
          return
        }

        console.log("loaded checklist", checklist)
          this.checklist = checklist



          if (this.checklist.phases == undefined) {
            this.checklist.phases = []
          }

          this.checklist.phases.forEach((phase) => {
            this.checklistForm.addControl(phase.id, new FormControl([]))

          })
          // this.checklistService.checklist$.subscribe(checklist2 => {
          //   this.checklist = checklist2;
          // })
        })
    })



    //


  }

  phaseTitleClick(event: Event) {
    event.cancelBubble = true;
  }

  phaseCloseClick(event: Event) {
    event.cancelBubble = true;
  }

  addPhase(index: number) {
    const id = this.checklistService.addPhase("", index)

    this.checklistForm.addControl(id, new FormControl([]))
  }

  setPhase(phase: number) {
    this.activePhase = phase;
  }

  selectionChange() {
    console.log(this.checklistForm.value)
  }

}
