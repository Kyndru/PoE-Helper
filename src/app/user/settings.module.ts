import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';

@NgModule({
  declarations: [
    UserSettingsComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class SettingsModule {}
