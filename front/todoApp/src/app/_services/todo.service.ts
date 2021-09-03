import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Todo} from '../_models/todo';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

   API_URL = 'https://ptodoapp.herokuapp.com' 

  constructor(private httpClient: HttpClient) { }

  getToDos(){
    return this.httpClient.get(this.API_URL)
  }

  createToDo(todo: Todo){
    return this.httpClient.post(this.API_URL+"/new", todo);
  }

  completada(todo: Todo){
    return this.httpClient.put(this.API_URL+"/completar/"+todo._id,todo);
  }

  updateToDo(todo: Todo){
    return this.httpClient.put(this.API_URL+"/edit/"+todo._id, todo)   
  }

  deleteToDo(id: number){
    return this.httpClient.delete(this.API_URL+"/delete/"+id);
  }

}
