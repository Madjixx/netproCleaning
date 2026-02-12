import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  logoSrc = 'assets/logo.png';

  constructor() {
    if (typeof window !== 'undefined') {
      this.updateLogo();
    }
    console.log('Header component initialized with logo:', this.logoSrc);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateLogo();
  }

  updateLogo() {
    if (typeof window !== 'undefined') {
      this.logoSrc = window.innerWidth < 768 ? 'assets/logo2.png' : 'assets/logo.png';
    }
  }

  onImageError(event?: any) {
    console.error('Logo failed to load:', this.logoSrc);
    if (event) {
      console.error('Image error event:', event);
    }
    this.logoSrc = 'assets/logo2.png';
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
