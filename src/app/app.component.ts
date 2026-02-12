import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ValuesComponent } from './components/values/values.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    ValuesComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-services />
      <app-about />
      <app-values />
      <app-contact />
    </main>
    <app-footer />
  `,
  styles: [`
    :host {
      display: block;
    }

    main {
      overflow-x: hidden;
    }
  `]
})
export class AppComponent {
  title = 'NetPro Cleaning';
}
