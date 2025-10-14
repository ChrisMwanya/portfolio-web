# 🎨 Structure de Layout Réorganisée

## 📋 Vue d'ensemble

La structure a été réorganisée pour permettre des layouts différents selon les pages :

### 🏗️ Hiérarchie des Layouts

```
app/
├── layout.tsx                 # Root layout (minimal, juste ThemeProvider)
├── (tabs)/
│   ├── layout.tsx            # Layout complet avec header + avatar + navbar
│   ├── page.tsx              # 🏠 Feed (PAGE D'ACCUEIL - déplacée ici!)
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── blog/
│   │   └── page.tsx
│   └── guestbook/
│       └── page.tsx
└── playlists/
    ├── layout.tsx            # Layout minimal (juste header de navigation)
    └── page.tsx              # Page des playlists
```

## ✨ Layouts Disponibles

### 1. **Root Layout** (`app/layout.tsx`)
- 🎯 **Rôle** : Wrapper global minimal
- 📦 **Contenu** :
  - ThemeProvider pour le dark mode
  - Toaster pour les notifications
  - HTML/Body tags

### 2. **Tabs Layout** (`app/(tabs)/layout.tsx`)
- 🎯 **Rôle** : Layout principal pour les pages principales
- 📦 **Contenu** :
  - Header complet avec logo et icônes
  - Avatar grand format avec effet glow
  - Informations personnelles (nom, bio, stacks)
  - Navbar avec menu items
  - Footer
  - Background animé avec orbes flottants
- 📄 **Pages utilisant ce layout** :
  - `/` (page d'accueil / Feed)
  - `/about`
  - `/projects`
  - `/blog`
  - `/guestbook`

### 3. **Playlists Layout** (`app/playlists/layout.tsx`)
- 🎯 **Rôle** : Layout minimal pour la page playlists
- 📦 **Contenu** :
  - Header simple (logo + icônes sociales + mode toggle)
  - Padding top pour le contenu
  - Pas d'avatar, pas de navbar, pas de footer
- 📄 **Pages utilisant ce layout** :
  - `/playlists`

## 🎨 Différences Visuelles

### Pages Tabs (/, /about, /projects, etc.)
- ✅ Grand avatar avec image de profil
- ✅ Bannière Ford T en arrière-plan
- ✅ Informations personnelles complètes
- ✅ Stacks/Technologies badges
- ✅ Navigation avec onglets
- ✅ Footer avec liens
- ✅ Background avec logo en watermark

### Page Playlists (/playlists)
- ✅ Header minimal (navigation uniquement)
- ✅ Breadcrumb pour retour à l'accueil
- ✅ Background gradient animé unique
- ✅ Orbes flottants colorés
- ✅ Design full-width sans contraintes
- ✅ Pas de navbar, pas de footer
- ✅ Focus sur le contenu musical

## 🚀 Avantages de cette Structure

1. **Flexibilité** : Chaque section peut avoir son propre design
2. **Performance** : Pas de composants inutiles chargés
3. **UX** : Expérience adaptée au contenu
4. **Maintenance** : Layouts isolés et faciles à modifier
5. **Scalabilité** : Facile d'ajouter de nouveaux layouts

## 📝 Comment Ajouter une Nouvelle Page avec Layout Custom

```tsx
// app/nouvelle-page/layout.tsx
import Header from '@/components/header/header';

export default function NouvellePageLayout({ children }) {
  return (
    <div>
      <Header>{/* Votre header custom */}</Header>
      <main>{children}</main>
    </div>
  );
}

// app/nouvelle-page/page.tsx
export default function NouvellePage() {
  return <div>Contenu de votre page</div>;
}
```

## 🎯 Navigation

- **Depuis n'importe quelle page** → Logo cliquable retourne à l'accueil
- **Page Playlists** → Breadcrumb "Accueil > Mes Playlists"
- **Feed "Mes Vibes"** → Clic sur Spotify embed → Redirige vers /playlists

## ⚠️ Important : Route Groups

Le dossier `(tabs)` utilise les **route groups** de Next.js (parenthèses) :
- ✅ Les parenthèses ne sont PAS incluses dans l'URL
- ✅ `app/(tabs)/page.tsx` → Route: `/` (page d'accueil)
- ✅ `app/(tabs)/about/page.tsx` → Route: `/about`
- ✅ Les route groups servent uniquement à organiser les layouts

---

✨ **Structure mise à jour le 14 octobre 2025**
