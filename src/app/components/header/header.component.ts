import { Component, HostListener, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslationService } from "../../services/translation.service";

@Component({
  selector: "app-header",
  imports: [CommonModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  isLanguageDropdownOpen = false;
  logoSrc = "assets/logo.png";
  translationService = inject(TranslationService);

  constructor() {
    if (typeof window !== "undefined") {
      this.updateLogo();
    }
    console.log("Header component initialized with logo:", this.logoSrc);
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener("window:resize")
  onWindowResize() {
    this.updateLogo();
  }

  updateLogo() {
    if (typeof window !== "undefined") {
      this.logoSrc =
        window.innerWidth < 768 ? "assets/logo-1.jpeg" : "assets/logo.png";
    }
  }

  onImageError(event?: any) {
    console.error("Logo failed to load:", this.logoSrc);
    if (event) {
      console.error("Image error event:", event);
    }
    this.logoSrc = "assets/logo-1.jpeg";
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  selectLanguage(lang: 'fr' | 'nl' | 'en') {
    this.translationService.setLanguage(lang);
    this.isLanguageDropdownOpen = false;
  }

  get currentLanguage() {
    return this.translationService.currentLanguage();
  }

  getLanguageFlag(lang: string): string {
    const flags: { [key: string]: string } = {
      'fr': 'assets/fr.jpg',
      'nl': 'assets/nl.jpg',
      'en': 'assets/en.jpg'
    };
    return flags[lang] || flags['fr'];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const languageSelector = target.closest('.language-selector');
    if (!languageSelector && this.isLanguageDropdownOpen) {
      this.isLanguageDropdownOpen = false;
    }
  }
}
