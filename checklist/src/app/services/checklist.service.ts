import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Checklist, ChecklistItem, ChecklistPhase } from '../components/checklist/checklist.type';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

// private checklist: Checklist | undefined = undefined;
private checklist: Checklist | undefined = {
    id: "b140071a-3df3-4a50-a6f5-3c1078b0c0ba",
    name: "Example Checklist",
    phases: [
      {
        id: "9af859df-3ea0-455a-bef1-d25b3291d2ef",
        name: "Section 1",
        items: [
          {
            id: "1e736c56-9522-4fd1-9c05-ab9c9897cb1b",
            text: "Item 1",
            action: "Something",
            checked: false,
          } as ChecklistItem,
          {
            id: "ed2f1559-cf12-49a4-8e01-602e2e343fa3",
            text: "Item 2",
            action: "Something",
            checked: false,

          } as ChecklistItem,
          {
            id: "b80ac5ea-49b4-427c-8d4a-35679ae33a58",
            text: "Item 3",
            action: "Something",
            checked: false,

          } as ChecklistItem,
        ]
      } as ChecklistPhase,
      {
        id: "a6a84411-7baa-4dae-a549-0f1b733e4181",
        name: "Section 2",
        items: [
          {
            id: "a20a2dcf-9167-4c62-b502-14c2ec91c791",
            text: "Item 4",
            action: "Something",
            checked: false,

          } as ChecklistItem,
          {
            id: "82bfba49-b6e2-4430-bad5-5123348b9199",
            text: "Item 5",
            action: "Something",
            checked: false,

          } as ChecklistItem,
          {
            id: "b8935a37-f705-4794-9bb3-675adbc2ccfc",
            text: "Item 6",
            action: "Something",
            checked: false,
          } as ChecklistItem,
        ]
      } as ChecklistPhase,
    ]
  } as Checklist;

  checklist$ = new BehaviorSubject<Checklist | undefined>(this.checklist);

  constructor(
    private db: NgxIndexedDBService,
  ) {
    // this.db
    // .add('checklists', {
    //   id: "e3138da9-f0d1-4a67-b3f1-cfef2e1b3d89",
    //   checklist: this.checklist,
    // })
    // .subscribe((record) => {
    //   console.log('Added image to pending: ', record.id);
    // });
  }

  loadChecklist(id: string): Observable<Checklist> {
    let resp: Subject<Checklist> = new Subject()

    this.db.getByKey<any>('checklists', id).subscribe((checklist: Checklist) => {
      if (checklist == undefined) {
        console.log("could not find checklist")
        return
      }

      // console.log("loading checklist", checklist)
      resp.next(checklist)


      this.checklist = checklist;

      this.checklist$.next(this.checklist);
    })

    return resp
  }

  newChecklist(name: string): string {
    this.checklist = {
      id: v4(),
      name: name,
    } as Checklist

    this.saveChecklist();

    return this.checklist.id
  }

  addPhase(name: string, index: number): string {
    if (this.checklist == undefined) {
      return ""
    }

    const phase: ChecklistPhase = {
      id: v4(),
      name: name,
      items: []
    }

    this.checklist.phases.splice(index, 0, phase);

    this.saveChecklist();

    console.log("added phase", phase)
    return phase.id
  }

  removeSection(section: ChecklistPhase) {
    if (this.checklist == undefined) {
      return
    }

    const index = this.checklist.phases.indexOf(section);
    this.checklist.phases.splice(index, 1);
    this.saveChecklist();
  }

  addItem(section: ChecklistPhase, item: ChecklistItem) {
    if (this.checklist == undefined) {
      return
    }

    section.items.push(item);
    this.saveChecklist();
  }

  removeItem(section: ChecklistPhase, item: ChecklistItem) {
    if (this.checklist == undefined) {
      return
    }

    const index = section.items.indexOf(item);
    section.items.splice(index, 1);
    this.saveChecklist();
  }

  checkItem(section: ChecklistPhase, item: ChecklistItem) {
    if (this.checklist == undefined) {
      return
    }
    const index = section.items.indexOf(item);
    section.items[index].checked = true;
    this.saveChecklist();
  }

  saveChecklist() {
    if (this.checklist == undefined) {
      return
    }

    this.db.update('checklists', this.checklist).subscribe().unsubscribe();
    console.log("saved checklist")
    this.checklist$.next(this.checklist);


  }

}
