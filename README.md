# Local Explorer - Application de découverte d'activités

Cette application React permet aux utilisateurs de découvrir des activités locales adaptées à leur localisation et aux conditions météorologiques, avec une intégration de cartes pour visualiser les suggestions.

## Table des matières

1. [Prérequis](#prérequis)
2. [Configurer les variables d'environnement](#configurer-les-variables-denvironnement)
3. [Installer et lancer le projet](#installer-et-lancer-le-projet)
4. [Lancer avec Docker](#lancer-avec-docker)

---

## Prérequis

- **Node.js** (v18 ou supérieur)
- **Docker** et **Docker Compose**
- Un compte OpenAI avec une clé API valide
- Une clé API Google Maps

---

## Configurer les variables d'environnement


Avant de commencer, copiez le contenu du fichier .env.exemple et collez-le dans un fichier .env à la racine du projet, puis renseignez les valeurs des variables suivantes :


```bash
REACT_APP_WEATHER_API_KEY=keyAPIWeather
REACT_APP_GOOGLE_MAPS_API_KEY=keyAPIGoogleMaps
REACT_APP_OPENAI_API_KEY=keyAPIOpenAI
```

Remplacez les valeurs par vos propres clés API.

## Installer et lancer le projet

### 1. Installer les dépendances
```bash
yarn install
```

### 2. Lancer le projet
```bash
yarn start
```
L'application sera accessible sur http://localhost:3000.



## Configurer les variables d'environnement

### 1. Construire l'image Docker
```bash
docker-compose build
```

### 2. Démarrer le conteneur
```bash
docker-compose up
```

L'application sera accessible sur http://localhost:3000.