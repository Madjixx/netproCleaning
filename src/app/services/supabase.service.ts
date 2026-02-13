import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

      // Appeler l'Edge Function qui gère tout
      const { data, error } = await this.getClient().functions.invoke('hyper-service', {
        body: quoteData
      });

      if (error) {
        throw error;
      }

      // Vérifier si la réponse contient une erreur
      if (!data.success) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      return data;

    } catch (error) {
      console.error('Error submitting quote request:', error);
      
      // Gérer les erreurs spécifiques
      if (error instanceof Error) {
        if (error.message.includes('Rate limit')) {
          throw new Error('Vous avez atteint la limite de demandes. Veuillez réessayer plus tard.');
        }
        if (error.message.includes('Invalid email')) {
          throw new Error('L\'adresse email fournie n\'est pas valide.');
        }
        if (error.message.includes('Missing required fields')) {
          throw new Error('Veuillez remplir tous les champs obligatoires.');
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
      throw new Error('Le nom est requis');
    }
    if (!quoteData.email || quoteData.email.trim().length === 0) {
      throw new Error('L\'email est requis');
    }
    if (!quoteData.phone || quoteData.phone.trim().length === 0) {
      throw new Error('Le téléphone est requis');
    }
    if (!quoteData.service_type) {
      throw new Error('Le type de service est requis');
    }
    if (!quoteData.address || quoteData.address.trim().length === 0) {
      throw new Error('L\'adresse est requise');
    }

    // Validation de l'email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(quoteData.email)) {
      throw new Error('L\'adresse email n\'est pas valide');
    }

    // Validation du téléphone (au moins 9 chiffres)
    const phoneDigits = quoteData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 9) {
      throw new Error('Le numéro de téléphone doit contenir au moins 9 chiffres');
    }

    // Validation du service_type
    const validServiceTypes = ['end_construction', 'residence', 'office', 'commercial'];
    if (!validServiceTypes.includes(quoteData.service_type)) {
      throw new Error('Type de service invalide');
    }

    // Validation des longueurs
    if (quoteData.name.length > 100) {
      throw new Error('Le nom est trop long (max 100 caractères)');
    }
    if (quoteData.address.length > 500) {
      throw new Error('L\'adresse est trop longue (max 500 caractères)');
    }
    if (quoteData.message && quoteData.message.length > 1000) {
      throw new Error('Le message est trop long (max 1000 caractères)');
    }
  }
}