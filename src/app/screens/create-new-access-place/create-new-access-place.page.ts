import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputDefaultComponent } from "../../components/input-default/input-default.component";
import { TextareaComponent } from "../../components/textarea/textarea.component";
import { InformativeModalComponent } from '../../components/informative-modal/informative-modal.component';

@Component({
  selector: 'app-create-new-access-place',
  templateUrl: './create-new-access-place.page.html',
  styleUrls: ['./create-new-access-place.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputDefaultComponent, TextareaComponent, InformativeModalComponent]
})
export class CreateNewAccessPlaceComponent  implements OnInit { 
  createNewAccessPlace: FormGroup;
  optionalsFields: FormGroup;
  numberCount: number = 0;
  isModalOpen = false;
  modalProps: ModalType = {
    hasIcon: false,
    iconClass: '',
    subtitle: '',
    title: '',
    hasSubtitle: false,
    modalType: "default"
  };

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createNewAccessPlace = this.fb.group({
      name: ['', [Validators.required]],
      code: [''],
      description: ['']
    })
    this.optionalsFields = this.fb.group({
      code: [''],
      description: ['']
    })
  }

  get codeControl(){
    return this.createNewAccessPlace.get('code') as FormControl;
  }

  get descriptionControl(){
    return this.createNewAccessPlace.get('description') as FormControl;
  }

  get nameControl(){
    return this.createNewAccessPlace.get('name') as FormControl;
  }

  onSubmit(){
    if(this.createNewAccessPlace.valid){
      console.log('enviado');
    }
  }

  openModal(
    hasIcon: boolean,
    iconClass: string,
    subtitle: string,
    title: string,
    hasSubtitle: boolean,
    modalType: any
  ) {
    this.modalProps = { hasIcon, iconClass, subtitle, title, hasSubtitle, modalType};
    this.isModalOpen = true;
  }

  handleModalDismiss() {
    if (this.modalProps.modalType === 'success') {
      this.router.navigate(['/local-de-acesso']);
    }
    this.isModalOpen = false; 
  }

  onCreateAccessPlace(){
    if(this.createNewAccessPlace.valid) {
      const accessPlaceData = {
        txCodigo: this.codeControl.value,
        nmLocalAcesso: this.nameControl.value,
        txDescricao: this.descriptionControl.value
      }

      const accessPlaceName = this.nameControl.value;

      this.openModal(true, "add", `O local de acesso ${accessPlaceName} foi criado com sucesso`, "Novo local de acesso", true, "success");
    }
  }

  onDescriptionChange(newDescription: string) {
    this.createNewAccessPlace.patchValue({
      description: newDescription
    });
  }


  ngOnInit() {
    this.createNewAccessPlace.patchValue({
      code: `CD0${this.numberCount}`
    });
  }

}

interface ModalType {
  hasIcon: boolean,
  iconClass: string,
  subtitle: string,
  title: string,
  hasSubtitle: boolean,
  modalType: 'default' | 'success' | 'warning' | 'error' | 'informative';
}