import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/users';
import { ModalUserComponent } from './modal-user/modal-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = true;
  user:any
  listDonations: any[] = [];

  constructor(public dialog: MatDialog, 
              public snackBar:MatSnackBar,
              private router: Router) 
              {
              }

  ngOnInit(): void {
    if(sessionStorage.getItem('userId') == null || sessionStorage.getItem('picture') == null){
      this.router.navigate(['/login']);
      return;
    }
    
    this.getUsersById();
  }

  getUsersById() :void {
    const name = sessionStorage.getItem('username');
    const picture = sessionStorage.getItem('picture');

    this.user = new User(name, picture)
  }

  editUserModal(){
    const dialogRef = this.dialog.open(ModalUserComponent, {
      data: { user: this.user }
    });
    
    dialogRef.afterClosed().subscribe(res => {
      this.user.avatar =  sessionStorage.getItem('picture');
      console.log(this.user)
    });
  }

}
