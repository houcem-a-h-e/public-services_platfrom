Plateforme Sécurisée de Gestion de Services Publics

Description du Projet
Ce projet a été développé comme évaluation technique pour démontrer la capacité à construire une plateforme sécurisée de gestion de services publics. Il comprend un frontend basé sur Angular et un backend avec NestJS, orchestrés via un workspace Nx.

Fonctionnalités Réalisées

Frontend Angular avec intégration Keycloak :

Authentification des utilisateurs via Keycloak (login/logout).

Gestion des rôles utilisateur : citoyen, agent, et admin.

Protection des routes frontend en fonction des rôles (crétaion des services géré seulement par admin et agent).

Les utilisateurs peuvent rechercher, consulter, modifier et supprimer des services selon leurs droits.

Backend NestJS :

Création d’une API REST pour la gestion des services publics.

Intégration partielle avec Keycloak. Les JWT sont émis correctement, mais leur validation et décodage dans le backend rencontrent des problèmes techniques.

Architecture Nx Workspace :

Une structure modulaire favorisant la réutilisation du code (libs partagées).

Intégration des scripts centralisés pour le build et le déploiement.

Docker et Keycloak :

Une image Docker personnalisée pour Keycloak, configurée avec les utilisateurs et les rôles de l'application.

Un fichier docker-compose.yml situé à la racine du projet pour un démarrage facile de Keycloak.

URL pour accéder à Keycloak : http://localhost:8888.

Comptes Utilisateurs de Test

Email	                                Mot de Passe	Rôle

houcem.eddinhe.aouissaoui@outlook.com	123456a	        admin
a.houcem@outlook.com	                123456a	        agent
houseem.aouiss.ci@gmail.com	            123456a	        citoyen

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

Accéder à Keycloak : http://localhost:8888.

Les identifiants Keycloak (admin par défaut) sont définis dans le docker-compose.yml.

Choisir le realm "public-services" au niveau de l'interface de keycloak pour vérifier la configuration (par défaut "master")

Lancer le backend :

nx serve backend

Lancer le frontend :

nx serve frontend

Accéder à l'application :

Frontend : http://localhost:4200

Backend : http://localhost:3000/api

Limitations
L'intégration Keycloak côté backend n'est pas totalement fonctionnelle. Le décodage des JWT nécessite des ajustements techniques.

MOSIP n’a pas été intégré dans ce projet.

Pas de base de données : Les données sont fictives et stockées en mémoire.


Fonctionnalités à Améliorer

Résolution du problème de décodage des JWT dans NestJS.

Intégration avec une base de données pour persister les données.

Connexion au système MOSIP pour la gestion de l'identité numérique.


Auteurs
Houcem Eddine Aouissaoui