# Configuration de l'envoi d'emails

## Service utilisé : Resend

L'application utilise **Resend** pour l'envoi d'emails professionnels avec un design attractif.

## Configuration requise

### 1. Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit (100 emails/jour gratuits)
3. Vérifiez votre adresse email

### 2. Obtenir votre API Key

1. Connectez-vous à votre dashboard Resend
2. Allez dans la section "API Keys"
3. Cliquez sur "Create API Key"
4. Donnez-lui un nom (ex: "NetPro Production")
5. Copiez la clé générée (elle ne sera affichée qu'une seule fois)

### 3. Configurer dans Supabase

L'API key doit être configurée comme secret dans Supabase:

1. Allez dans votre projet Supabase
2. Allez dans "Project Settings" > "Edge Functions"
3. Dans la section "Secrets", ajoutez:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Votre clé API Resend

### 4. Configurer votre domaine (Optionnel mais recommandé)

Pour envoyer depuis votre propre domaine (`contact@netprocleaning.be`):

1. Dans Resend, allez dans "Domains"
2. Cliquez sur "Add Domain"
3. Entrez votre domaine: `netprocleaning.be`
4. Suivez les instructions pour ajouter les enregistrements DNS:
   - SPF
   - DKIM
   - DMARC
5. Attendez la vérification (peut prendre quelques minutes à quelques heures)
6. Une fois vérifié, modifiez le fichier `supabase/functions/send-quote-email/index.ts`:
   ```typescript
   from: "NetPro Cleaning <contact@netprocleaning.be>",
   ```

## Format de l'email

L'email envoyé contient:
- Design professionnel avec gradients et couleurs attrayantes
- Badge du type de service demandé
- Informations du client (nom, email, téléphone)
- Adresse du service
- Message du client (si fourni)
- Bouton d'action pour répondre directement
- Footer avec les coordonnées de NetPro Cleaning

## Test de l'envoi

Pour tester l'envoi d'emails:

1. Remplissez le formulaire de contact sur le site
2. Soumettez la demande
3. Vérifiez votre boîte email `contact@netprocleaning.be`
4. En cas de problème, consultez les logs dans Supabase:
   - Allez dans "Edge Functions"
   - Sélectionnez "send-quote-email"
   - Consultez les "Logs"

## Limites

- **Plan gratuit**: 100 emails/jour, 3000 emails/mois
- **Plan Pro**: À partir de 20$/mois pour 50,000 emails/mois

## Support

En cas de problème avec l'envoi d'emails:
1. Vérifiez que la clé API est bien configurée dans Supabase
2. Consultez les logs de l'Edge Function
3. Vérifiez que votre domaine est bien vérifié (si vous utilisez un domaine personnalisé)
4. Contactez le support Resend si nécessaire
