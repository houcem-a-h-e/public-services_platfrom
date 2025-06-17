Plateforme Sécurisée de Gestion de Services Publics
Description du Projet
Ce projet a été développé comme une évaluation technique, démontrant la capacité à concevoir une plateforme sécurisée de gestion de services publics. Il inclut :

Frontend : Angular avec Material Design.

Backend : NestJS.

Workspace : Structure modulaire avec Nx.

Authentification : Keycloak (OIDC/OAuth2) avec gestion des rôles.

Fonctionnalités Réalisées

🔒 Frontend Angular avec Keycloak
Authentification des utilisateurs via Keycloak (login/logout).

Gestion des rôles utilisateur : citoyen, agent, et admin.

Protection des routes selon les rôles :

Seuls les admins et agents peuvent créer des services.

Les citoyens peuvent rechercher, consulter, modifier et supprimer des services.

Recherche dynamique des services.

🌐 Backend NestJS
Création d’une API REST pour gérer les services publics.

Intégration partielle de Keycloak :

JWT émis correctement.

Décodage des JWT non fonctionnel (à résoudre).

🛠 Architecture Nx Workspace
Structure modulaire pour une meilleure réutilisation du code.

Libs partagées : modèles, services, UI.

Scripts centralisés pour le build et le déploiement.

🐳 Docker et Keycloak
Image Docker personnalisée pour Keycloak, configurée avec les rôles et utilisateurs du projet.

Fichier docker-compose.yml pour démarrer facilement Keycloak.

URL Keycloak : http://localhost:8888.

Comptes Utilisateurs de Test

Email	Mot de Passe	Rôle

houcem.eddinhe.aouissaoui@outlook.com	123456a	Admin

a.houcem@outlook.com	123456a	Agent

houseem.aouiss.ci@gmail.com	123456a	Citoyen

Prérequis
Node.js : Version 22 ou supérieure.

Docker et Docker Compose installés.

Angular CLI pour lancer l'application frontend.

Étapes d'Installation
Cloner le projet :

git clone <URL_DU_REPO>
cd <Dossier_Du_Projet>
Installer les dépendances :


npm install
Démarrer Keycloak :

docker-compose up -d
URL : http://localhost:8888.

Dans Keycloak, choisissez le realm public-services.

Lancer le backend :


nx serve backend
Lancer le frontend :


nx serve frontend
Accéder à l'application :

Frontend : http://localhost:4200

Backend : http://localhost:3000/api

Limitations
Backend : Décodage des JWT non fonctionnel.

MOSIP : Non intégré dans ce projet.

Base de données : Données fictives stockées en mémoire.

Améliorations Futures
Résolution du problème de décodage des JWT dans NestJS.

Intégration avec une base de données.

Intégration de MOSIP pour la gestion de l'identité numérique.

Auteur
Houcem Eddine Aouissaoui
📧 houcem.eddinhe.aouissaoui@outlook.com
