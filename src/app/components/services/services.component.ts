import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    {
      title: 'Entreprises & Bureaux',
      description: 'Entretien de sièges sociaux, bureaux, immeubles et espaces de coworking.',
      image: 'assets/service-entreprise.jpg',
      icon: '<path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" fill="currentColor"/>'
    },
    {
      title: 'Commerces & Établissements',
      description: 'Nettoyage complet pour boutiques, salons, magasins et espaces professionnels.',
      image: 'assets/service-commerce.jpg',
      icon: '<path d="M21 8V7L18 2H6L3 7V8C3 8.55228 3.44772 9 4 9C4.55228 9 5 8.55228 5 8V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V8C19 8.55228 19.4477 9 20 9C20.5523 9 21 8.55228 21 8Z" stroke="currentColor" stroke-width="2" fill="none"/>'
    },
    {
      title: 'Résidentiel de Standing',
      description: 'Service sur-mesure pour appartements, logements privés et villas premium.',
      image: 'assets/service-residential.jpg',
      icon: '<path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="currentColor"/>'
    },
    {
      title: 'Fin de Chantier & Déménagement',
      description: 'Remise en état approfondie après travaux, rénovations ou avant état des lieux.',
      image: 'assets/service-chantier.jpg',
      icon: '<path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 11L12 14L16 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    }
  ];

  contactWhatsApp() {
    const phone = '32477209989';
    const message = encodeURIComponent('Bonjour, je souhaite obtenir plus d\'informations sur vos services de nettoyage.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
