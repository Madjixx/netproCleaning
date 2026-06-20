import { Injectable, signal } from '@angular/core';

export type Language = 'fr' | 'en' | 'nl';

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
    nl: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLanguage = signal<Language>('fr');

  private translations: Translations = {
    'nav.home': {
      fr: 'Accueil',
      en: 'Home',
      nl: 'Home'
    },
    'nav.about': {
      fr: 'À propos',
      en: 'About',
      nl: 'Over ons'
    },
    'nav.services': {
      fr: 'Services',
      en: 'Services',
      nl: 'Diensten'
    },
    'nav.values': {
      fr: 'Nos valeurs',
      en: 'Our Values',
      nl: 'Onze waarden'
    },
    'nav.contact': {
      fr: 'Contact',
      en: 'Contact',
      nl: 'Contact'
    },
    'hero.title': {
      fr: "L'excellence du nettoyage pour tous vos espaces",
      en: 'Excellence in cleaning for all your spaces',
      nl: 'Uitmuntendheid in reiniging voor al uw ruimtes'
    },
    'hero.subtitle': {
      fr: 'Que vous soyez un professionnel, un commerçant ou un particulier, NETPRO CLEANING apporte la rigueur du luxe à chaque mission.',
      en: 'Whether you are a professional, merchant or individual, NETPRO CLEANING brings luxury standards to every mission.',
      nl: 'Of u nu een professional, handelaar of particulier bent, NETPRO CLEANING brengt luxestandaarden naar elke opdracht.'
    },
    'hero.cta': {
      fr: 'Demander un devis',
      en: 'Request a quote',
      nl: 'Vraag een offerte aan'
    },
    'hero.cta-secondary': {
      fr: 'Contactez-nous',
      en: 'Contact Us',
      nl: 'Neem contact op'
    },
    'about.title': {
      fr: 'Qui sommes-nous',
      en: 'About Us',
      nl: 'Over ons'
    },
    'about.text1': {
      fr: "NETPRO CLEANING est née d'une ambition simple : redéfinir les standards de la propreté en apportant la rigueur du luxe à tous les types d'espaces.",
      en: 'NETPRO CLEANING was born from a simple ambition: to redefine cleanliness standards by bringing luxury rigor to all types of spaces.',
      nl: 'NETPRO CLEANING is geboren uit een eenvoudige ambitie: reinigingsnormen herdefiniëren door luxe precisie naar alle soorten ruimtes te brengen.'
    },
    'about.text2': {
      fr: "Nous intervenons avec une exigence de haute précision afin de garantir des environnements sains, soignés et prestigieux.",
      en: 'We operate with high precision requirements to ensure healthy, well-maintained and prestigious environments.',
      nl: 'We werken met hoge precisie-eisen om gezonde, goed onderhouden en prestigieuze omgevingen te garanderen.'
    },
    'services.title': {
      fr: 'Des prestations',
      en: 'Services',
      nl: 'Diensten'
    },
     'services.desc': {
      fr: 'sur mesure',
      en: 'custom made',
      nl: 'op maat gemaakt'
    },
    'service1.title': {
      fr: 'Entreprise & Bureaux',
      en: 'Corporate & Offices',
      nl: 'Bedrijven & Kantoren'
    },
    'service1.desc': {
      fr: 'Entretien de sièges sociaux, bureaux, immeubles et espaces de coworking.',
      en: 'Maintenance of headquarters, offices, buildings and coworking spaces.',
      nl: 'Onderhoud van hoofdkantoren, kantoren, gebouwen en coworking-ruimtes.'
    },
    'service2.title': {
      fr: 'Commerces & Établissements',
      en: 'Shops & Establishments',
      nl: 'Winkels & Instellingen'
    },
    'service2.desc': {
      fr: 'Nettoyage complet pour boutiques, salons, magasins et espaces professionnels.',
      en: 'Complete cleaning for shops, salons, stores and professional spaces.',
      nl: 'Volledige reiniging voor winkels, salons, winkels en professionele ruimtes.'
    },
    'service3.title': {
      fr: 'Résidentiel de Standing',
      en: 'Premium Residential',
      nl: 'Premium Residentieel'
    },
    'service3.desc': {
      fr: 'Service sur-mesure pour appartements, villas et biens premium.',
      en: 'Tailor-made service for apartments, villas and premium properties.',
      nl: 'Op maat gemaakte service voor appartementen, villa\'s en premium woningen.'
    },
    'service4.title': {
      fr: 'Fin de Chantier & Déménagement',
      en: 'Post-Construction & Moving',
      nl: 'Na bouw & Verhuizing'
    },
    'service4.desc': {
      fr: "Remise en état approfondie après travaux ou avant état des lieux.",
      en: 'Thorough restoration after construction or before property inspection.',
      nl: 'Grondige restauratie na bouwwerkzaamheden of voor inspecties.'
    },
    'service.cta': {
      fr: 'Demander un devis',
      en: 'Request a quote',
      nl: 'Vraag een offerte aan'
    },
    'service.cta-secondary': {
      fr: 'Contactez-nous',
      en: 'Contact Us',
      nl: 'Neem contact op'
    },
    'values.title': {
      fr: 'Nos Valeurs & Engagements',
      en: 'Our Values & Commitments',
      nl: 'Onze waarden & toezeggingen'
    },
    'value1.title': {
      fr: 'Excellence et précision',
      en: 'Excellence and precision',
      nl: 'Uitmuntendheid en precisie'
    },
    'value1.desc': {
      fr: 'Nous traitons chaque espace avec le même souci du détail et de la finition parfaite.',
      en: 'We treat each space with the same attention to detail and perfect finish.',
      nl: 'We behandelen elke ruimte met dezelfde aandacht voor detail en perfecte afwerking.'
    },
    'value2.title': {
      fr: 'Polyvalence professionnelle',
      en: 'Professional versatility',
      nl: 'Professionele veelzijdigheid'
    },
    'value2.desc': {
      fr: "Notre savoir-faire s'étend aux bureaux, immeubles, appartements et espaces spécialisés.",
      en: 'Our expertise extends to offices, buildings, apartments and specialized spaces.',
      nl: 'Onze expertise strekt zich uit tot kantoren, gebouwen, appartementen en gespecialiseerde ruimtes.'
    },
    'value3.title': {
      fr: 'Discrétion et efficacité',
      en: 'Discretion and efficiency',
      nl: 'Discretie en efficiëntie'
    },
    'value3.desc': {
      fr: 'Nous intervenons avec une totale confidentialité pour respecter votre tranquillité.',
      en: 'We operate with complete confidentiality to respect your peace of mind.',
      nl: 'We werken met volledige vertrouwelijkheid om uw gemoedsrust te respecteren.'
    },
    'value4.title': {
      fr: 'Réactivité',
      en: 'Responsiveness',
      nl: 'Reactievermogen'
    },
    'value4.desc': {
      fr: 'Nous garantissons une intervention rapide, organisée et soignée.',
      en: 'We guarantee a quick, organized and thorough intervention.',
      nl: 'We garanderen een snelle, georganiseerde en zorgvuldige interventie.'
    },
    'contact.title': {
      fr: 'Contactez-nous',
      en: 'Contact Us',
      nl: 'Neem contact op'
    },
    'footer.legal': {
      fr: 'Bruxelles, Belgique',
      en: 'Brussels, Belgium',
      nl: 'Brussel, België'
    },
    'footer.rights': {
      fr: 'Tous droits réservés',
      en: 'All rights reserved',
      nl: 'Alle rechten voorbehouden'
    },
    'quote.title': {
      fr: 'Demander un devis',
      en: 'Request a Quote',
      nl: 'Offerte aanvragen'
    },
    'quote.name': {
      fr: 'Nom complet',
      en: 'Full name',
      nl: 'Volledige naam'
    },
    'quote.email': {
      fr: 'Email',
      en: 'Email',
      nl: 'E-mail'
    },
    'quote.phone': {
      fr: 'Téléphone',
      en: 'Phone',
      nl: 'Telefoon'
    },
    'quote.service': {
      fr: 'Type de service',
      en: 'Service type',
      nl: 'Type dienst'
    },
    'quote.service.corporate': {
      fr: 'Entreprise & Bureaux',
      en: 'Corporate & Offices',
      nl: 'Bedrijven & Kantoren'
    },
    'quote.service.commercial': {
      fr: 'Commerces & Établissements',
      en: 'Shops & Establishments',
      nl: 'Winkels & Instellingen'
    },
    'quote.service.residential': {
      fr: 'Résidentiel de Standing',
      en: 'Premium Residential',
      nl: 'Premium Residentieel'
    },
    'quote.service.construction': {
      fr: 'Fin de Chantier & Déménagement',
      en: 'Post-Construction & Moving',
      nl: 'Na bouw & Verhuizing'
    },
    'quote.address': {
      fr: 'Adresse',
      en: 'Address',
      nl: 'Adres'
    },
    'quote.message': {
      fr: 'Message (optionnel)',
      en: 'Message (optional)',
      nl: 'Bericht (optioneel)'
    },
    'quote.submit': {
      fr: 'Envoyer la demande',
      en: 'Send request',
      nl: 'Aanvraag verzenden'
    },
    'quote.success': {
      fr: 'Votre demande de devis a été envoyée avec succès !',
      en: 'Your quote request has been sent successfully!',
      nl: 'Uw offerteaanvraag is succesvol verzonden!'
    },
    'quote.error': {
      fr: 'Une erreur est survenue. Veuillez réessayer.',
      en: 'An error occurred. Please try again.',
      nl: 'Er is een fout opgetreden. Probeer het opnieuw.'
    },
    'contact.whatsapp': {
      fr: 'Bonjour, je souhaite obtenir plus d\'informations sur vos services de nettoyage.',
      en: 'Hello, I would like to get more information about your cleaning services.',
      nl: 'Hallo, ik wil graag meer informatie over uw schoonmaakdiensten.'
    },
    'contact.whatsapp.label': {
      fr: 'Contactez-nous',
      en: 'Contact us',
      nl: 'Neem contact op'
    },
    'contact.phone': {
      fr: 'Téléphone',
      en: 'Phone',
      nl: 'Telefoon'
    },
    'contact.address': {
      fr: 'Adresse',
      en: 'Address',
      nl: 'Adres'
    },
    
    // ============================================
    // NOUVELLES CLÉS POUR LES ERREURS DE VALIDATION
    // ============================================
    
    // Erreurs de validation - champs requis
    'quote.errors.nameRequired': {
      fr: 'Le nom est requis',
      en: 'Name is required',
      nl: 'Naam is verplicht'
    },
    'quote.errors.emailRequired': {
      fr: "L'email est requis",
      en: 'Email is required',
      nl: 'E-mail is verplicht'
    },
    'quote.errors.phoneRequired': {
      fr: 'Le téléphone est requis',
      en: 'Phone is required',
      nl: 'Telefoon is verplicht'
    },
    'quote.errors.serviceRequired': {
      fr: 'Le type de service est requis',
      en: 'Service type is required',
      nl: 'Servicetype is verplicht'
    },
    'quote.errors.addressRequired': {
      fr: "L'adresse est requise",
      en: 'Address is required',
      nl: 'Adres is verplicht'
    },
    
    // Erreurs de validation - format invalide
    'quote.errors.invalidEmail': {
      fr: "L'adresse email n'est pas valide",
      en: 'Email address is not valid',
      nl: 'E-mailadres is niet geldig'
    },
    'quote.errors.phoneInvalid': {
      fr: 'Le numéro de téléphone doit contenir au moins 9 chiffres',
      en: 'Phone number must contain at least 9 digits',
      nl: 'Telefoonnummer moet minimaal 9 cijfers bevatten'
    },
    'quote.errors.serviceEmpty': {
      fr: 'Le type de service ne peut pas être vide',
      en: 'Service type cannot be empty',
      nl: 'Servicetype mag niet leeg zijn'
    },
    
    // Erreurs de validation - longueur
    'quote.errors.nameTooLong': {
      fr: 'Le nom est trop long (max 100 caractères)',
      en: 'Name is too long (max 100 characters)',
      nl: 'Naam is te lang (max 100 tekens)'
    },
    'quote.errors.addressTooLong': {
      fr: "L'adresse est trop longue (max 500 caractères)",
      en: 'Address is too long (max 500 characters)',
      nl: 'Adres is te lang (max 500 tekens)'
    },
    'quote.errors.messageTooLong': {
      fr: 'Le message est trop long (max 1000 caractères)',
      en: 'Message is too long (max 1000 characters)',
      nl: 'Bericht is te lang (max 1000 tekens)'
    },
    
    // Erreurs serveur
    'quote.errors.submitFailed': {
      fr: "Échec de l'envoi de la demande",
      en: 'Failed to submit quote request',
      nl: 'Verzenden van offerteaanvraag mislukt'
    },
    'quote.errors.rateLimit': {
      fr: 'Vous avez atteint la limite de demandes. Veuillez réessayer plus tard.',
      en: 'You have reached the request limit. Please try again later.',
      nl: 'U heeft de limiet van aanvragen bereikt. Probeer het later opnieuw.'
    },
    'quote.errors.missingFields': {
      fr: 'Veuillez remplir tous les champs obligatoires.',
      en: 'Please fill in all required fields.',
      nl: 'Vul alle verplichte velden in.'
    }
  };

  setLanguage(lang: Language) {
    this.currentLanguage.set(lang);
  }

  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      return key;
    }
    return translation[this.currentLanguage()];
  }

  t(key: string): string {
    return this.translate(key);
  }
}