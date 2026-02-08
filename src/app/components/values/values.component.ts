import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface Value {
  id: number;
  titleKey: string;
  descKey: string;
  color: string;
}

@Component({
  selector: 'app-values',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './values.component.html',
  styleUrl: './values.component.css'
})
export class ValuesComponent {
  translationService = inject(TranslationService);

  values: Value[] = [
    {
      id: 1,
      titleKey: 'value1.title',
      descKey: 'value1.desc',
      color: '#1DA1F2'
    },
    {
      id: 2,
      titleKey: 'value2.title',
      descKey: 'value2.desc',
      color: '#2E8B57'
    },
    {
      id: 3,
      titleKey: 'value3.title',
      descKey: 'value3.desc',
      color: '#1DA1F2'
    },
    {
      id: 4,
      titleKey: 'value4.title',
      descKey: 'value4.desc',
      color: '#2E8B57'
    }
  ];
}
