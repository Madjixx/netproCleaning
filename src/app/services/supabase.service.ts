import { Injectable, inject } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { TranslationService } from './translation.service';

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  address: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient | null = null;
  private translationService = inject(TranslationService);

  // Configuration Supabase
  private readonly SUPABASE_URL = 'https://dqgxtfxwcuckvkmohfvl.supabase.co';
  private readonly SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxZ3h0Znh3Y3Vja3ZrbW9oZnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NTYwMjEsImV4cCI6MjA4NjUzMjAyMX0.rfJt1VdpNvVkHFi9OZenxSVXYffeQLz4dFhk-dy7Kro';

  private getClient(): SupabaseClient {
    if (!this.supabase) {
      this.supabase = createClient(
        this.SUPABASE_URL,
        this.SUPABASE_ANON_KEY,
        {
          auth: {
            persistSession: false
          }
        }
      );
    }
    return this.supabase;
  }

  /**
   * Soumettre une demande de devis
   * Cette méthode appelle directement l'Edge Function qui gère:
   * - L'insertion dans la base de données (avec service_role pour bypasser RLS)
   * - Le rate limiting
   * - L'envoi d'email
   * - Le tracking IP/User-Agent
   */
  async submitQuoteRequest(quoteData: QuoteRequest) {
    try {
      // Validation côté client
      this.validateQuoteData(quoteData);

      console.log('📤 Envoi de la demande de devis:', quoteData);

      // Appeler l'Edge Function qui gère tout
      const { data, error } = await this.getClient().functions.invoke('hyper-service', {
        body: quoteData
      });

      if (error) {
        console.error('❌ Erreur Edge Function:', error);
        throw error;
      }

      // Vérifier si la réponse contient une erreur
      if (!data.success) {
        console.error('❌ Erreur dans la réponse:', data);
        throw new Error(data.error || this.translationService.t('quote.errors.submitFailed'));
      }

      console.log('✅ Demande envoyée avec succès:', data);
      return data;

    } catch (error) {
      console.error('❌ Error submitting quote request:', error);
      
      // Gérer les erreurs spécifiques
      if (error instanceof Error) {
        if (error.message.includes('Rate limit')) {
          throw new Error(this.translationService.t('quote.errors.rateLimit'));
        }
        if (error.message.includes('Invalid email')) {
          throw new Error(this.translationService.t('quote.errors.invalidEmail'));
        }
        if (error.message.includes('Missing required fields')) {
          throw new Error(this.translationService.t('quote.errors.missingFields'));
        }
      }
      
      throw error;
    }
  }

  /**
   * Validation des données avant envoi
   */
  private validateQuoteData(quoteData: QuoteRequest): void {
    // Vérifier les champs requis
    if (!quoteData.name || quoteData.name.trim().length === 0) {
      throw new Error(this.translationService.t('quote.errors.nameRequired'));
    }
    if (!quoteData.email || quoteData.email.trim().length === 0) {
      throw new Error(this.translationService.t('quote.errors.emailRequired'));
    }
    if (!quoteData.phone || quoteData.phone.trim().length === 0) {
      throw new Error(this.translationService.t('quote.errors.phoneRequired'));
    }
    if (!quoteData.service_type || quoteData.service_type.trim().length === 0) {
      throw new Error(this.translationService.t('quote.errors.serviceRequired'));
    }
    if (!quoteData.address || quoteData.address.trim().length === 0) {
      throw new Error(this.translationService.t('quote.errors.addressRequired'));
    }

    // Validation de l'email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(quoteData.email)) {
      throw new Error(this.translationService.t('quote.errors.invalidEmail'));
    }

    // Validation du service_type - accepter n'importe quelle valeur non vide
    // La validation stricte sera faite côté serveur
    if (quoteData.service_type.trim().length === 0) {
      throw new Error(this.translationService.t('quote.errors.serviceEmpty'));
    }

    // Validation des longueurs
    if (quoteData.name.length > 100) {
      throw new Error(this.translationService.t('quote.errors.nameTooLong'));
    }
    if (quoteData.address.length > 500) {
      throw new Error(this.translationService.t('quote.errors.addressTooLong'));
    }
    if (quoteData.message && quoteData.message.length > 1000) {
      throw new Error(this.translationService.t('quote.errors.messageTooLong'));
    }
  }
}