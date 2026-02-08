netproCleaning

Site web professionnel pour NetPro Cleaning - Service de nettoyage haute précision en Belgique.

## Configuration de l'envoi d'emails

Pour configurer l'envoi d'emails depuis le formulaire de contact, consultez le guide détaillé: [EMAIL_SETUP.md](./EMAIL_SETUP.md)

## Déploiement sur GitHub Pages

### Configuration initiale

1. Assurez-vous que votre repository GitHub s'appelle `netproCleaning`
2. Si votre repository a un nom différent, modifiez le `--base-href` dans `package.json`:
   ```json
   "build:gh-pages": "ng build --base-href=/VOTRE-REPO-NAME/"
   ```

### Déployer le site

Exécutez simplement:
```bash
npm run deploy
```

Cette commande va:
1. Builder le projet avec la bonne configuration
2. Créer les fichiers nécessaires pour GitHub Pages
3. Déployer sur la branche `gh-pages`

### Activer GitHub Pages

Après le premier déploiement:
1. Allez dans les paramètres de votre repository GitHub
2. Section "Pages" dans le menu latéral
3. Sélectionnez la branche `gh-pages` comme source
4. Sauvegardez

Votre site sera disponible à: `https://VOTRE-USERNAME.github.io/netproCleaning/`
