import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {
  
  user: any;
  userForm : FormGroup;

  constructor( public translate: TranslateService,
              public dialogRef: MatDialogRef<ModalUserComponent>,
              private fb: FormBuilder,
              private snackBar:MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) 
              { 
                translate.addLangs(['en', 'es']);
                translate.setDefaultLang('es');
                this.user= data.user;
                this.createForm();
    
    }
    switchLang(lang: string) {
      this.translate.use(lang);
    }
  

  ngOnInit(): void {
    this.loadInformation()
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      mail: new FormControl({ value: '', disabled: true }),
      nickName: new FormControl({ value: '', disabled: true }),
      password: ['',[Validators.required]],
      avatar: ['']
    });
  }

  loadInformation(){
    this.userForm.patchValue({
      nickName: this.user.nickName,
      avatar: this.user.avatar
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveData() {
    // this.userService.updateInfo(user);
    sessionStorage.setItem('avatar', this.userForm.get('avatar').value);

    this.snackBar.open('Info actualizada con exito!', '', {
      duration: 3000
    });
    this.dialogRef.close(this.user);
  }

}
