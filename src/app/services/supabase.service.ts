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
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://uiujifxknbregvvwsizz.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdWppZnhrbmJyZWd2dndzaXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NTU3OTgsImV4cCI6MjA4NjEzMTc5OH0.Smuuy8EbLFiaX9GYnoEuiy9bf2WTEE-PZQmvyjWY05w'
    );
  }

  async submitQuoteRequest(quoteData: QuoteRequest) {
    const { data, error } = await this.supabase
      .from('quote_requests')
      .insert([quoteData])
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }
}
