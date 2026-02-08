import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface Service {
  id: number;
  titleKey: string;
  descKey: string;
  image: string;
  color: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  translationService = inject(TranslationService);

  services: Service[] = [
    {
      id: 1,
      titleKey: 'service1.title',
      descKey: 'service1.desc',
      image: 'assets/entreprise_et_bureau.jpg',
      color: '#1DA1F2'
    },
    {
      id: 2,
      titleKey: 'service2.title',
      descKey: 'service2.desc',
      image: 'assets/commerce_&_etablissement.jpg',
      color: '#2E8B57'
    },
    {
      id: 3,
      titleKey: 'service3.title',
      descKey: 'service3.desc',
      image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: '#1DA1F2'
    },
    {
      id: 4,
      titleKey: 'service4.title',
      descKey: 'service4.desc',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: '#2E8B57'
    }
  ];
}
