# Créez un réseau social d’entreprise - Groupomania

## Installation de l'application :

* ### 1 Créer une base de donnée mysql vierge et un utilisateur avec les droits créations :

Exemple :

    CREATE DATABASE groupomania;
    CREATE USER 'user'@'localhost' IDENTIFIED by 'mdp';
    GRANT ALL PRIVILEGES ON groupomania.* TO 'user'@'localhost';

Vous pouvez changer les valeurs de : groupomania / user / mdp

* ### 2 Connecter la base de donnée :

Ajouter un fichier .env dans le dossier ``backend`` Exemple :
    
    TOKEN="Abfdof231059fesfnbtiqpgmgej23105Fez20G9BFS8FEZQLKF2F34G"
    HOST=localhost
    USER=user
    PASSWORD=mdp
    DATABASE=groupomania

Si vous avez choisi d'autre valeurs lors de la création de la base de donnée il faudra renseigner vos valeurs.  
Vous pouvez laisser le TOKEN avec cette valeur cela n'a pas d'impact avec la base de donnée.
Lorsque vous lancerez le server Sequelize va créer tout les tables nécéssaires automatiquement.

* ### 3  Installation des modules :

Dans le dossier ``backend`` lancer les commandes : ``npm install`` puis ``nodemon`` pour lancer le serveur.

Dans le dossier ``frontend`` lancer les commandes : ``npm install`` puis ``npm start`` pour lancer l'application

Puis attendre le lancement automatique de votre navigateur sur l'adresse *`localhost:4800`*

## Créer un compte administrateur sur l'application :

Une fois sur l'application inscrivez-vous.  
La base de donnée étant vierge vous serez donc le premier utilisateur avec l'id 1.

Dans l'invite de commandes mysql :

    USE groupomania
    UPDATE Users SET isAdmin=true WHERE id=1;

Votre compte sera maintenant admin !

