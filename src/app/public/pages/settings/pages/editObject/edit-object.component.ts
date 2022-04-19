import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LearningObjectService } from "../../../../../services/learning-object.service";
import { ObjectLearning } from "../../../../../core/interfaces/ObjectLearning";
import { Subscription } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Preference } from "../../../../../core/interfaces/Preference";
import { EducationLevel } from "../../../../../core/interfaces/EducationLevel";
import { KnowledgeArea } from "../../../../../core/interfaces/KnowledgeArea";
import { License } from "../../../../../core/interfaces/License";
import { TokenService } from "../../../../../services/token.service";
import { MessageService } from "primeng/api";
import { SearchService } from "../../../../../services/search.service";
import { LearningObjectFile } from "../../../../../core/interfaces/LearningObjectFile";

@Component({
  selector: "app-edit-object",
  templateUrl: "./edit-object.component.html",
  styleUrls: ["./edit-object.component.scss"],
})
export class EditObjectComponent implements OnInit, OnDestroy {
  private subscribes: Subscription[] = [];
  public object: ObjectLearning;
  public file: File;
  public displayWindow: boolean;
  public objectForm: FormGroup;
  public editData: boolean = false;

  public preferencesData: Preference[];
  public educationLevels: EducationLevel[];
  public knowledgeArea: KnowledgeArea[];
  public licenses: License[];

  public loading: boolean = false;
  public currentFile: LearningObjectFile;
  public currentImg: string;

  public language = [
    { name: "Español", code: "es" },
    { name: "Ingles", code: "en" },
  ];

  constructor(
    private tokenService: TokenService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private objectService: LearningObjectService,
    private searchService: SearchService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.route.params.subscribe((params) => {
      this.getObjectDetail(Number(params.slug));
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscribes.forEach((item) => {
      item.unsubscribe();
    });
  }

  async getObjectDetail(id: number) {
    let detailSub = await this.objectService.getObjectDetailById(id).subscribe(
      (res: any) => {
        this.object = res;
        this.currentFile = res.learning_object_file;
        this.currentImg = res.avatar;
        this.loadForm();
        this.loading = false;
      },
      (err) => {
        console.log("err", err);
        this.router.navigateByUrl("/settings/my-objects");
      }
    );
    this.subscribes.push(detailSub);
  }

  async loadData() {
    let tokenSub = await this.tokenService
      .refreshToken()
      .subscribe((res) => {});
    let preferencesSub = await this.searchService
      .getPreferences()
      .subscribe((res) => {
        this.preferencesData = res.results.map((res) => {
          return { name: res.description, code: res.id };
        });
      });

    let educationLevelsSub = await this.searchService
      .getLevelEducation()
      .subscribe((res) => {
        this.educationLevels = res.results.map((res) => {
          return { name: res.description, code: res.id };
        });
      });

    let knowledgeAreaSub = await this.searchService
      .getInterestAreas()
      .subscribe((res) => {
        this.knowledgeArea = res.map((res) => {
          return { name: res.name, code: res.id };
        });
      });

    let licensesSub = await this.searchService
      .getLicenses()
      .subscribe((res: any) => {
        this.licenses = res.results.map((res) => {
          return { name: res.description, code: res.id };
        });
      });

    this.subscribes.push(
      tokenSub,
      preferencesSub,
      educationLevelsSub,
      knowledgeAreaSub,
      licensesSub
    );
  }

  loadForm() {
    this.objectForm = this.fb.group({
      general_title: [
        this.object?.general_title || null,
        [Validators.required],
      ],
      general_description: [
        this.object?.general_description || null,
        [Validators.required],
      ],
      general_keyword: [
        this.object?.general_keyword || null,
        [Validators.required],
      ],
      education_levels: [
        this.object?.education_levels.id || null,
        [Validators.required],
      ],
      general_language: [
        this.object?.general_language || null,
        [Validators.required],
      ],
      knowledge_area: [
        this.object?.knowledge_area.id || null,
        [Validators.required],
      ],
      license: [this.object?.license.id || null, [Validators.required]],
      adaptation: [this.object?.adaptation || "yes", [Validators.required]],
      educational_typicalAgeRange: [
        this.getRageAge(),
        [Validators.required, Validators.min(5), Validators.max(150)],
      ],
      avatar: [null],
    });
  }

  getRageAge() {
    if (this.object.educational_typicalAgeRange) {
      let range = this.object?.educational_typicalAgeRange.split("-");
      if (range?.length === 2) {
        return range.map((res) => {
          return parseInt(res);
        });
      } else {
        return [5, 100];
      }
    } else {
      return [5, 100];
    }
  }

  getErrorFormRequired(formValue): boolean {
    return (
      this.objectForm.get(formValue).hasError("required") &&
      this.objectForm.get(formValue).touched
    );
  }

  async onSubmit() {
    if (this.objectForm.valid) {
      //console.log("this.objectForm", this.objectForm.value);
      this.editData = true;
      this.loading = true;
      let data = this.objectForm.value;
      data.id = this.object.id;

      //console.log("data send before", this.objectForm);

      data.educational_typicalAgeRange = `${this.objectForm.value.educational_typicalAgeRange[0]}-${this.objectForm.value.educational_typicalAgeRange[1]}`;
      if (!this.objectForm.value.avatar) {
        delete data.avatar;
      }

      let addMetadataSub = await this.objectService
        .editMetadata(data)
        .subscribe(
          (res: any) => {
            //console.log("res send data", res);
            //this.getObjectDetail(this.object.id);
            this.object = res;
            this.currentImg = res.avatar;
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Se han actualizado los datos.",
            });
            this.file = null;
            this.loading = false;
            this.editData = false;
            //console.log("form ", this.objectForm.value);
            //return this.router.navigateByUrl("/settings/my-objects");
          },
          (err) => {
            console.log("err", err);
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail:
                "Se ah producido un error al guardar los datos, intente de nuevo",
            });
            this.loading = false;
          }
        );
      this.subscribes.push(addMetadataSub);
    } else {
      this.markTouchForm();
    }
  }
  markTouchForm() {
    (<any>Object).values(this.objectForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  onSelectImage(evet: any) {
    this.objectForm.patchValue({
      avatar: evet.currentFiles[0],
    });
  }

  showBasicDialog2() {
    this.displayWindow = true;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  clouceEvent(evt) {
    this.displayWindow = evt;
  }

  updateMetadataEvt(evt) {
    if (evt) {
      this.getObjectDetail(this.object.id);
    }
  }
}
