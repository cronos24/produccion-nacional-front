import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarProgramasComponent } from './components/listar-programas/listar-programas.component';

const routes: Routes = [
  {
    path: 'listarPrograma',
    component: ListarProgramasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramaRoutingModule { }
