import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { DivisionService } from '../../division/division.service';
import { AnnounceService } from '../announce.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-announce-edit',
  templateUrl: './announce-edit.component.html',
  styleUrls: ['./announce-edit.component.css']
})
export class AnnounceEditComponent implements OnInit {

  @Input() allDivisions: any;
  @Input() announce: any;

  public subscription: Subscription;

  public editAnnounce: FormGroup;
  // Text Editor
  public decoupledEditor = DecoupledEditor;

  // Check Division
  public checklist: any;
  public checkedList: any;

  @Output() closeFormEventEmitter = new EventEmitter();
  constructor(
    private announceService: AnnounceService
  ) { }

  ngOnInit() {
    this.allDivisions = this.allDivisions.map((div) => {
      div.isSelected = false;
      return div;
    });
    this.initNewAnnounceForm();
    console.log(this.announce);
    const arrdivisions = this.announce.assignTo;
    arrdivisions.forEach((division) => {
      const selectedDivision = this.allDivisions.filter(div => div._id === division._id)[0];
      selectedDivision.isSelected = true;
    });

    console.log(this.allDivisions);
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  private initNewAnnounceForm() {
    this.editAnnounce = new FormGroup({
      assignTo: new FormControl(
        this.announce.assignTo
      ),
      content: new FormControl(
        this.announce.content,
        [
          Validators.required,
          Validators.minLength(50)
        ]
      )
    });
  }

  public onEditAnnounce() {
    // this.getCheckedItemList();
    this.emitValueToOutside(this.announce._id, null);
    console.log(this.editAnnounce.value);
  }

  closeEditForm() {
    this.emitValueToOutside(this.announce._id, null);
  }

  private emitValueToOutside(id: string, editedAnnounce: boolean) {
    this.closeFormEventEmitter.emit({id, editedAnnounce});
  }
  // checkUncheckAll() {
  //   this.allDivisions = this.allDivisions.map((item) => {
  //     item.isSelected = this.editAnnounce.value.masterSelected;
  //     return item;
  //   });
  //   this.getCheckedItemList();
  // }

  // isAllSelected(id) {

  //   const changedDivision = this.allDivisions.filter((div) => div._id === id)[0];
  //   changedDivision.isSelected = !changedDivision.isSelected;

  //   this.editAnnounce.value.masterSelected = this.allDivisions.every( (item) => {
  //       return item.isSelected === true;
  //   });
  //   this.getCheckedItemList();
  // }

  // getCheckedItemList() {
  //   this.editAnnounce.value.assignTo = [];
  //   this.allDivisions.forEach((item) => {
  //     if (item.isSelected) {
  //       this.editAnnounce.value.assignTo.push(item);
  //     }
  //   });
  // }

}
