import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { BanerRegisterComponent } from "./baner-register/baner-register.component";
import { ContributorsComponent } from "./contributors/contributors.component";

@NgModule({
  declarations: [
    BanerRegisterComponent,
    ContributorsComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [
    BanerRegisterComponent,
    ContributorsComponent,
  ],
})
export class ComponentsModule {}
