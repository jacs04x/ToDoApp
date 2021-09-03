import { Component, OnInit } from '@angular/core';
import {TodoService} from 'src/app/_services/todo.service';
import { Todo } from 'src/app/_models/todo';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $:any

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos : Todo [] | any
  todoForm : FormGroup | any 
  submitted = false
  constructor(private todoService: TodoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.todoForm = this.formBuilder.group({
      todo: ['']
    })
    this.getToDos()
  }

  getToDos(){
    this.todoService.getToDos().subscribe(
      res => {
        this.todos = res
        console.log(this.todos)
      },
      err => {
        console.log(err)
      }
      
    )
  }

  creaToDo(){

    this.submitted = true
    if(this.todoForm.invalid){
      this.showFail("hacen falta datos \n\n 😢")
      return
    }
    const newToDo = new Todo(0, this.todoForm.value.todo, false)
    this.todoService.createToDo(newToDo).subscribe(
      res => {
        
        this.getToDos()
      },
      err => {
        console.log(JSON.stringify(err))
        this.showSucces("creada!")
        this.getToDos()
        this.todoForm.reset()
        this.submitted = false
      }
    )

  }
  


  cambia(completada: Todo){
    const nuevoToDo = completada
    nuevoToDo.completada = true

    this.todoService.completada(nuevoToDo).subscribe(
      res => {
        
        this.getToDos()
      },
      err => {
        
        this.getToDos()
      }
    )
    
  }

  regresa(completada: Todo){
    const nuevoToDo = completada
    nuevoToDo.completada = false

    this.todoService.completada(nuevoToDo).subscribe(
      res => {
        
        this.getToDos()
      },
      err => {
               
        this.getToDos()
      }
    )
    
  }

  
  
  
  get f () {return this.todoForm.controls}


  editar(todo: Todo){
    Swal.fire({
      showCancelButton: true,
      input: 'text',
      inputLabel: 'Editar Tarea',
      inputPlaceholder: 'ingresa',
      inputAttributes: {
        'aria-label': 'Type your message here'
      }
    }).then((result) => {
      if (result.value) {
        todo.todo= result.value
        this.todoService.updateToDo(todo).subscribe(
          res => {
            this.showSucces("editado!")
            this.getToDos()
          },
          err => {
            this.showToast("Editado!")
            this.getToDos()
          }
        )
      }
      else {
        return
      }
    })
  
  
  }

  showToast(titulo: any){
   const Toast= Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: titulo
    })
  }

  showQuestion(toDo: number){
    Swal.fire({
      title: 'Eliminar?',
      text: "No se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.todoService.deleteToDo(toDo).subscribe(
          res => {
            
            this.getToDos()
          },
          err => {
            console.log(JSON.stringify(err))
            this.getToDos()
          }
        )
        Swal.fire(
          'Eliminado!',
          '',
          'success'
        )
      }
    })
  }


  showFail(message: any){
    Swal.fire({
      icon: 'error',
      title: message
      
    });
  }




  showSucces(message: any){
    Swal.fire({
      icon: 'success',
      title: message,
    });
  }


}
