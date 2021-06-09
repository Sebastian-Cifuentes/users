import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':id',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule
  ]
})
export class UsersModule { }
