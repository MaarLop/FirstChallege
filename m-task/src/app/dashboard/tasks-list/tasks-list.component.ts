import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../services/task.service';

import { TranslateService } from '@ngx-translate/core';
import { CreateEditModalComponent } from './create-edit-task/modal.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from 'src/app/_models/task';



@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

export class TaskListComponent implements OnInit {
  loading = true;
  listTask: Task[]=[];
  // listTaskNextToEnd:Task[]=[];
  // listTaskInProgress: Task[] = [];
  // hideUpdate:boolean = true;

  displayedColumns: string[] = [ 'name', 'description', 'estimate', 'state', 'action'];
  dataSource: MatTableDataSource<any>;
  selected = '1';
  // dataSourceEnd: MatTableDataSource<any>;
  // dataSourceProgress: MatTableDataSource<any>;

  private paginatorTask: MatPaginator;
  // private paginatorTaskNxtToEnd: MatPaginator;
  // private paginatorInProgress: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginatorTask = mp;
    // this.paginatorTaskNxtToEnd = mp;
    // this.paginatorInProgress = mp;
    this.setDataSourceAttributes();
  }

  constructor(public translate: TranslateService, private taskService: TaskService, 
    public dialog: MatDialog, public snackBar:MatSnackBar,private router: Router) 
  {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.getTasks();
    this.dataSource = new MatTableDataSource(this.listTask);
    // this.dataSourceEnd = new MatTableDataSource(this.listTaskNextToEnd);
    // this.dataSourceProgress = new MatTableDataSource(this.listTaskInProgress)
    if(sessionStorage.getItem('userId') == null){
      this.router.navigate(['/login']);
      return;
    }
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginatorTask;
    // this.dataSourceEnd.paginator = this.paginatorTaskNxtToEnd;
    // this.dataSourceProgress.paginator = this.paginatorInProgress;
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  
  getTasks(): void {
    this.listTask = this.taskService.getAllTask();
    this.reloadTable();
  }

  getPlannedTask(): void {
    this.listTask = this.taskService.getPlannedTask();
    this.reloadTable();
  }

  getInProgressTask(): void {
    this.listTask = this.taskService.getInProgressTask();
    this.reloadTable();
  }

  getClosedTask(): void {
    this.listTask = this.taskService.getClosedTask();
    this.reloadTable();
  }

  deleteTask(id:number){
    this.listTask = this.taskService.delete(id);
    this.dataSource = new MatTableDataSource(this.listTask);
    this.dataSource._updateChangeSubscription();
    // this.loading = false;
  };
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
  createTask(){
    const dialogRef = this.dialog.open(CreateEditModalComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      let newTask = this.taskService.createOrUpdateTask(result);
      this.listTask.push(newTask);
      this.dataSource = new MatTableDataSource(this.listTask);
      this.dataSource._updateChangeSubscription();  
    });    
  } 

  editTask(idTask): void{
    let task= this.taskService.getTakById(idTask);
    const dialogRef = this.dialog.open(CreateEditModalComponent, {
        data: { idTask: idTask, task: task }
      });
    dialogRef.afterClosed().subscribe(result=>{
      let editedTask = this.taskService.createOrUpdateTask(result.data);
      this.replaceTaskIfItsNecessary(editedTask);
    });

  }

  replaceTaskIfItsNecessary(task: any){
    let updateItem = this.listTask.find(this.findIndexToUpdate, task.id);

    let index = this.listTask.indexOf(updateItem);
    
    this.listTask[index] = task;
    this.dataSource = new MatTableDataSource(this.listTask);
    this.dataSource._updateChangeSubscription();

  }

  findIndexToUpdate(newItem) { 
    return newItem.id === this;
  }

  changeState(idTask: number){
    this.taskService.changeTaskState(idTask);
  }

  public onOptionsSelected(event) {
    const value = event.value;
    this.selected = value;

    this.reloadTask();
  }

  reloadTask(): void {
    switch(this.selected){
      case "2": {
        this.getPlannedTask();
        break;
      }
      case "3": {
        this.getInProgressTask();
        break;
        
      }
      case "4": {
        this.getClosedTask();
        break;
      }
      default: {
        this.getTasks();
        break;
      }
    }
  }

  reloadTable(){
    this.dataSource = new MatTableDataSource(this.listTask);
    this.setDataSourceAttributes();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

