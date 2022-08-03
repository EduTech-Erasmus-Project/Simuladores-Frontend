import { Component, OnInit, Renderer2 } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { MenuService } from "./service/app.menu.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  
  horizontalMenu: boolean = true;

  darkMode = false;

  menuColorMode = "light";

  menuColor = "layout-menu-light";

  themeColor = "blue";

  layoutColor = "blue";

  ripple = true;

  inputStyle = "outlined";

  rightPanelClick: boolean;

  rightPanelActive: boolean;

  menuClick: boolean;

  staticMenuActive: boolean;

  menuMobileActive: boolean;

  megaMenuClick: boolean;

  megaMenuActive: boolean;

  megaMenuMobileClick: boolean;

  megaMenuMobileActive: boolean;

  topbarItemClick: boolean;

  topbarMobileMenuClick: boolean;

  topbarMobileMenuActive: boolean;

  sidebarActive: boolean;

  activeTopbarItem: any;

  topbarMenuActive: boolean;

  menuHoverActive: boolean;

  configActive: boolean;

  configClick: boolean;

  constructor(
    public renderer: Renderer2,
    private menuService: MenuService,
    private primengConfig: PrimeNGConfig
  ) {
    //console.log("APP-ROOT");
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onLayoutClick() {
    //console.log("onLayoutClick");

    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (!this.rightPanelClick) {
      this.rightPanelActive = false;
    }

    if (!this.megaMenuClick) {
      this.megaMenuActive = false;
    }

    if (!this.megaMenuMobileClick) {
      this.megaMenuMobileActive = false;
    }

    if (!this.menuClick) {
      if (this.isHorizontal()) {
        this.menuService.reset();
      }

      if (this.menuMobileActive) {
        this.menuMobileActive = false;
      }

      this.menuHoverActive = false;
    }

    if (this.configActive && !this.configClick) {
      this.configActive = false;
    }

    this.configClick = false;
    this.menuClick = false;
    this.topbarItemClick = false;
    this.megaMenuClick = false;
    this.megaMenuMobileClick = false;
    this.rightPanelClick = false;
  }

  onMegaMenuButtonClick(event) {
    this.megaMenuClick = true;
    this.megaMenuActive = !this.megaMenuActive;
    event.preventDefault();
  }

  onMegaMenuClick(event) {
    this.megaMenuClick = true;
    event.preventDefault();
  }

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();

    //console.log("tap click baner");
  }

  onRightPanelButtonClick(event) {
    this.rightPanelClick = true;
    this.rightPanelActive = !this.rightPanelActive;

    event.preventDefault();
  }

  onRightPanelClose(event) {
    this.rightPanelActive = false;
    this.rightPanelClick = false;

    event.preventDefault();
  }

  onRightPanelClick(event) {
    this.rightPanelClick = true;

    event.preventDefault();
  }

  onTopbarMobileMenuButtonClick(event) {
    this.topbarMobileMenuClick = true;
    this.topbarMobileMenuActive = !this.topbarMobileMenuActive;

    event.preventDefault();
  }

  onMegaMenuMobileButtonClick(event) {
    this.megaMenuMobileClick = true;
    this.megaMenuMobileActive = !this.megaMenuMobileActive;

    event.preventDefault();
  }

  onMenuButtonClick(event) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.isMobile()) {
      this.menuMobileActive = !this.menuMobileActive;
    }

    event.preventDefault();
  }

  onSidebarClick(event: Event) {
    this.menuClick = true;
  }

  onToggleMenuClick(event: Event) {
    this.staticMenuActive = !this.staticMenuActive;
    event.preventDefault();
  }

  onConfigClick(event) {
    this.configClick = true;
  }

  onRippleChange(event) {
    this.ripple = event.checked;
    this.primengConfig = event.checked;
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return window.innerWidth <= 991;
  }

  isHorizontal() {
    return this.horizontalMenu === true;
  }
}
