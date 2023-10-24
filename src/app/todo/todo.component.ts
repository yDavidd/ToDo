import { Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Itarefas } from '../services/itarefas';
import { TarefaService } from '../services/tarefa.service'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  form = new FormGroup({
    id: new FormControl(),
    tarefa: new FormControl(''),
  })

  aFazer: Itarefas[] = [];
  fazendo: Itarefas[] = [];
  finalizado: Itarefas[] = [];

  constructor(private servico: TarefaService) { }

  ngOnInit() { this.listar() }

  add(addObj: any) {
    this.aFazer.push(addObj);
  }
  
  Salvar() {
    const valorForm = this.form.value;
    this.servico.criar(valorForm).subscribe(
      success => {
        alert("Tarefa cadastrada com sucesso!");

        if (this.fazendo.length != 0 || this.finalizado.length != 0) {
          this.add(valorForm);
        }
        else {
          this.listar();
        }
      },
      Error => alert("Erro ao cadastrar a tarefa ")
    );
    this.form.reset();
  }

  listar() {
    this.servico.listar().subscribe(dados => this.aFazer = dados);
  }

  drop(event: CdkDragDrop<Itarefas[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
