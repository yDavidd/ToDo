import { Injectable } from '@angular/core';
import { Itarefas } from './itarefas';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  // o readonly que a variável é imutavel, não pode ser alterada.
  // A variavel API está recebendo o endereço da API
  private readonly API = "http://localhost:3000/tarefa";

  constructor(private http: HttpClient) { }

  listar() {
    // A interface <Itarefas> vai receber as informações do back-end
    return this.http.get<Itarefas[]>(this.API);
  }

  criar(tarefa: object) {
    // o pipe take 1 serve para ir apenas umas vez no servidor e voltar.
    return this.http.post(this.API, tarefa).pipe(take(1));
  }
}
