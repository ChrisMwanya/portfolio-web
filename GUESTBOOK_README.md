# Configuration du Livre d'Or

## Variables d'environnement requises

Pour que le système de livre d'or fonctionne correctement, vous devez ajouter les variables suivantes dans votre fichier `.env` (à créer à la racine du projet si nécessaire) :

### 1. Email et mot de passe administrateur

```bash
NEXT_PUBLIC_ADMIN_EMAIL=christian@example.com
NEXT_PUBLIC_ADMIN_PASSWORD=123456789
```

**Important** : Ces identifiants sont utilisés pour se connecter à la page d'administration.

### 2. Secret NextAuth

```bash
NEXTAUTH_SECRET=votre_secret_nextauth_ici
```

Générez un secret sécurisé avec la commande :

```bash
openssl rand -base64 32
```

## Utilisation

### Soumettre un témoignage

1. Visitez `/guestbook`
2. Remplissez le formulaire avec :
   - Nom complet
   - Email
   - Rôle/Relation (Apprenant, Collègue, Client, etc.)
   - Entreprise (optionnel)
   - Note (1-5 étoiles)
   - Témoignage (minimum 10 caractères)
3. Cliquez sur "Soumettre le témoignage"
4. Le témoignage sera sauvegardé dans `contents/testimonials/pending/`

### Gérer les témoignages (Admin)

1. Visitez `/auth/signin` pour vous connecter
2. Entrez vos identifiants :
   - **Email** : `christian@example.com`
   - **Mot de passe** : `123456789`
3. Après connexion, vous serez redirigé vers `/admin/testimonials`
4. Vous verrez la liste des témoignages en attente
5. Pour chaque témoignage :
   - Cliquez sur **Approuver** pour le publier (déplacé vers `contents/testimonials/approved/`)
   - Cliquez sur **Rejeter** pour le supprimer

### Voir les témoignages approuvés

Les témoignages approuvés s'affichent automatiquement sur la page `/guestbook`.

## Structure des fichiers

```
contents/testimonials/
├── pending/          # Témoignages en attente
│   └── {timestamp}-{slug}.md
└── approved/         # Témoignages approuvés
    └── {timestamp}-{slug}.md
```

Format du fichier Markdown :

```markdown
---
name: John Doe
email: john@example.com
role: Apprenant
company: Kadea Academy
date: 2025-12-11T18:30:00.000Z
status: pending
rating: 5
---

Contenu du témoignage ici...
```

## API Routes

- `GET /api/testimonials` - Récupère tous les témoignages approuvés
- `POST /api/testimonials` - Soumet un nouveau témoignage
- `GET /api/testimonials/admin` - Liste les témoignages en attente (admin uniquement)
- `POST /api/testimonials/admin` - Approuve ou rejette un témoignage (admin uniquement)
