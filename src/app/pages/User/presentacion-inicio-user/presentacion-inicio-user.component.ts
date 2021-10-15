import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { PhotoService } from 'src/app/demo/service/photoservice';

@Component({
  selector: 'app-presentacion-inicio-user',
  templateUrl: './presentacion-inicio-user.component.html',
  styles: [
  ]
})
export class PresentacionInicioUserComponent implements OnInit {

    images: any[];

    galleriaResponsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '960px',
          numVisible: 4
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  constructor(private breadcrumbService: BreadcrumbService, private photoService: PhotoService) {
    this.breadcrumbService.setItems([
      { label: 'UI Kit' },
      { label: 'Charts', routerLink: ['/uikit/chart'] },
      { label: 'Media', routerLink: ['/uikit/media'] },
      {label: 'Timeline', routerLink: ['/pages/timeline']}
    ]);
   }

  ngOnInit(): void {
    this.photoService.getImages().then(images => {
      this.images = images;
    });
  }

}
