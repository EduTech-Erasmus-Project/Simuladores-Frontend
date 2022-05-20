import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-user-password",
  templateUrl: "./user-password.component.html",
  styleUrls: ["./user-password.component.scss"],
})
export class UserPasswordComponent implements OnInit {
  public formPassword?: FormGroup;
  items: MenuItem[];

  constructor(private fb: FormBuilder) {
    this.formPassword = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      passwordConfirm: [null, Validators.required],
    });

    // this.items = [
    //   {
    //     label: "Update",
    //     icon: "pi pi-refresh",
    //     command: () => {
    //       //this.update();
    //       console.log("update");
    //     },
    //   },
    //   {
    //     label: "Delete",
    //     icon: "pi pi-times",
    //     command: () => {
    //       //this.delete();
    //       console.log("Delete");
    //     },
    //   },
    //   { label: "Angular.io", icon: "pi pi-info", url: "http://angular.io" },
    //   { separator: true },
    //   { label: "Setup", icon: "pi pi-cog", routerLink: ["/setup"] },
    // ];
  }

  ngOnInit(): void {}

  getErrorRequiredPass(field: string) {
    return (
      this.formPassword.get(field).hasError("required") &&
      this.formPassword.get(field).touched
    );
  }

  onSubmitPassword() {
    this.markTouchFormPassword();
    if (this.formPassword.valid) {
      console.log("Form submit");
    }
  }

  private markTouchFormPassword() {
    (<any>Object).values(this.formPassword.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
