import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { SupabaseService, QuoteRequest } from '../../services/supabase.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  translationService = inject(TranslationService);
  supabaseService = inject(SupabaseService);

  phone = '0477 20 99 89';
  email = 'contact@netprocleaning.be';
  address = 'Rue de la Bonté 3, 1000 Bruxelles, Belgique';
  whatsappNumber = '+32477209989';

  quoteForm = signal<QuoteRequest>({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    address: '',
    message: ''
  });

  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  getWhatsAppLink(): string {
    const message = encodeURIComponent(
      `Bonjour, je souhaite obtenir plus d'informations sur vos services de nettoyage.`
    );
    return `https://wa.me/${this.whatsappNumber}?text=${message}`;
  }

  async submitQuote() {
    if (this.isSubmitting()) return;

    const form = this.quoteForm();
    if (!form.name || !form.email || !form.phone || !form.service_type || !form.address) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');

    try {
      await this.supabaseService.submitQuoteRequest(form);
      this.submitStatus.set('success');
      this.quoteForm.set({
        name: '',
        email: '',
        phone: '',
        service_type: '',
        address: '',
        message: ''
      });

      setTimeout(() => {
        this.submitStatus.set('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting quote:', error);
      this.submitStatus.set('error');

      setTimeout(() => {
        this.submitStatus.set('idle');
      }, 5000);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  updateForm(field: keyof QuoteRequest, value: string) {
    this.quoteForm.update(form => ({
      ...form,
      [field]: value
    }));
  }
}
