import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputDefaultComponent } from "../../components/input-default/input-default.component";
import { TextareaComponent } from "../../components/textarea/textarea.component";

@Component({
  selector: 'app-create-new-access-place',
  templateUrl: './create-new-access-place.page.html',
  styleUrls: ['./create-new-access-place.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputDefaultComponent, TextareaComponent]
})
export class CreateNewAccessPlaceComponent  implements OnInit { 
  createNewAccessPlace: FormGroup;
  optionalsFields: FormGroup;
  numberCount: number = 0;

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

  onCreateAccessPlace(){
    console.log(this.createNewAccessPlace.valid);
    if(this.createNewAccessPlace.valid) {
      const accessPlaceData = {
        txCodigo: this.codeControl.value,
        nmLocalAcesso: this.nameControl.value,
        txDescricao: this.descriptionControl.value
      }

      // this.accessPlace.createAccessPlace(accessPlaceData).subscribe({
      //   next: async (response) => {
      //     await this.presentModal();
      //     this.loaderService.hide();
      //   },
      //   error: (error) => {
      //     console.error("Erro ao criar local de acesso: ", error);
      //     this.loaderService.hide();
      //   }
      // })
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
