import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'todo-list-manager',
  template: `
    <div class="todo">
      <h1>
        {{title}}
      </h1>
      <div class="todoAdd">
        <todo-input (submit)="addItem($event)"></todo-input>
      </div>
      <ul>
        <li *ngFor="let item of todoList">
          <todo-item [item]="item"
                    (remove)="removeItem($event)"
                    (changeTitle)="changeItemTitle($event)">
          </todo-item>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  private title: string = 'Minhas Tarefas';
  private todoList;

  constructor(private todoListService: TodoListService) {
  }

  ngOnInit() {
    this.todoList = this.todoListService.getTodoList();
  }

  addItem(title: string) {
    this.todoList = this.todoListService.addItem({ title });
  }

  removeItem(item) {
    this.todoList = this.todoListService.removeItem(item);
  }

  changeItemTitle({item, newTitle}) {
    this.todoListService.changeItemTitle(item, newTitle);
  }
}
