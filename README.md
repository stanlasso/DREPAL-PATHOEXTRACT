

# DREPAL-PATHOEXTRACT
DREPAL-PATHOEXTRACT est un pipeline Snakemake intégré conçu pour le contrôle qualité, la filtration, la double soustraction digitale, et la génération de fichiers consensus à partir de données de séquençage Sanger et NGS. Le but de DREPAL-PATHOEXTRACT est d'optimiser l'analyse de vos données de séquençage, vous permettant ainsi de vous concentrer sur les aspects les plus intéressants de vos recherches.

DREPAL-PATHOEXTRACT est une application full web (client-serveur) qui peut être installée sur une machine locale ou utilisée dans un environnement réseau. Elle se divise en deux parties principales : le pipeline d'analyse et les outils d'extraction.

Le pipeline d'analyse est le cœur de DREPAL-PATHOEXTRACT. Construit avec Snakemake, il permet de gérer le contrôle qualité et le filtrage digital en une seule exécution, du téléversement des isolats à la génération des fichiers consensus. Grâce à des outils comme FastQC, MultiQC, et TrimGalore, il garantit une analyse complète et précise des données de séquençage.

![DREPAL-PATHOEXTRACT pipeline](data/DREPAL-PATHOEXTRACT-logo.png)

Les outils d'extraction sont des flux de travail indépendants conçus pour faciliter l'analyse comparative, qu'il s'agisse d'assembler les lectures retenues, de traiter des isolats provenant de diverses plateformes NGS, ou d'intégrer des données de séquençage Sanger et NGS. Avec une structure d'entrée et de sortie uniformisée, DREPAL-PATHOEXTRACT permet d'analyser des centaines à des milliers d'échantillons/patients en une seule exécution, tout en assurant une flexibilité maximale.

DREPAL-PATHOEXTRACT a été développé avec l'idée de fournir un outil performant et accessible, optimisé pour une utilisation sur les systèmes Linux (Ubuntu). En intégrant ce que nous avons appris de précédentes expériences, nous avons conçu DREPAL-PATHOEXTRACT pour être rapide, portable, et facile à utiliser, quel que soit le volume de données à traiter.

# Documentation
La documentation complète de DREPAL-PATHOEXTRACT, incluant un guide pratique et une présentation détaillée de l'application, est accessible en ligne. Vous y trouverez des instructions sur la configuration, l'utilisation du pipeline, ainsi que des exemples concrets pour maximiser l'efficacité de vos analyses. Pour consulter le manuel, veuillez visiter le lien suivant : [DREPAL-PATHOEXTRACT manual](https://conda.io/projects/conda/en/latest/user-guide/install/index.html)

Nous vous recommandons vivement de consulter cette ressource pour une compréhension approfondie de DREPAL-PATHOEXTRACT et de ses fonctionnalités.

# Installation de DREPAL-PATHOEXTRACT
DREPAL-PATHOEXTRACT est conçu pour être facilement installé et configuré grâce à l'utilisation de Conda, un système de gestion de paquets et d'environnements open source fonctionnant sous Windows, macOS et Linux. L'application est disponible sur GitHub et peut être installée sur une machine locale ou utilisée dans un environnement réseau.

## Téléchargement et Clonage du Code Source
Pour commencer, téléchargez le code source de DREPAL-PATHOEXTRACT depuis GitHub en suivant les étapes ci-dessous :

1-Assurez-vous que Git est installé sur votre système. Si ce n'est pas le cas, téléchargez et installez Git à partir du site officiel de Git.
2-Ouvrez une invite de commande ou un terminal sur votre système.
3-Accédez au répertoire dans lequel vous souhaitez cloner le projet.
4-Clonez le projet à partir de GitHub en utilisant la commande suivante :

```
# sh
git clone https://github.com/stanlasso/DREPAL-PATHOEXTRACT.git
```

5-Une fois le clonage terminé, accédez au répertoire DREPAL-PATHOEXTRACT 

```
# sh
conda activate DREPAL-PATHOEXTRACT
```

## Installation de Conda et Snakemake
DREPAL-PATHOEXTRACT dépend de plusieurs outils et bibliothèques. Pour gérer ces dépendances, nous utilisons Conda. Suivez ces étapes pour installer Conda et Snakemake :

### 1. Installation de Conda :

- Téléchargez le script d'installation de Miniconda :

```
# sh
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```


- Exécutez le script d'installation de Miniconda :

```
# sh
bash Miniconda3-latest-Linux-x86_64.sh
```

- Suivez les instructions à l'écran pour finaliser l'installation. N'oubliez pas de fermer et de rouvrir votre terminal après l'installation.

### 2.Installation de Snakemake :

- Installez Mamba pour une installation rapide des paquets :

```
# sh
conda install -n base -c conda-forge mamba
```

- Créez un environnement conda et installez la version minimale de Snakemake :

```
# sh
mamba create -c bioconda -c conda-forge -n snakemake snakemake-minimal
```

- Activez l'environnement Snakemake :

```
# sh
conda activate snakemake
```

## Installation de PM2 et du Serveur Apache
Pour gérer et déployer le backend de DREPAL-PATHOEXTRACT, nous utilisons PM2 et Apache. Voici comment les installer :

### 1. Installation de PM2 :

-  Mettez à jour les paquets existants :
```
# sh
sudo apt update
```

- Installez Node.js :

```
# sh
sudo apt install nodejs
```

- Installez npm (si nécessaire) :
```
# sh
sudo apt install npm
```
- Installez PM2 globalement :
```
# sh
sudo npm install pm2 -g
```
### 2. Installation du Serveur Apache :

- Mettez à jour les paquets existants :

```
# sh
sudo apt update
```

- Installez le serveur Apache :

```
# sh
sudo apt install apache2
```

- Vérifiez que le serveur Apache est en cours d'exécution :
```
# sh
sudo systemctl status apache2
```

- Si Apache n'est pas en cours d'exécution, démarrez-le :
```
# sh
sudo service apache2 start
```

## Configuration de l'Application

### 1. Déploiement du Frontend :

- Copiez le contenu du dossier frontend dans le répertoire web d'Apache :
```
# sh
sudo cp -r patho /var/www/html/
```

- Accédez à l'application via votre navigateur en entrant l'URL `localhost/patho`.
### 2. Installation des Dépendances du Backend :

- Accédez au répertoire `toolskit` et installez les dépendances :
```
# sh
cd toolskit
npm install
```

- Démarrez le backend avec PM2 :
```
# sh
pm2 start server.js
```

And voilà, you are all set to get started processing your data!


## Auteur
- ASSOHOUN Egomli Stanislas
- Mail: stanlasso@gmail.com
- Linkedin: https://www.linkedin.com/in/stanislas-assohoun-2b973bab/

## Contributeurs
- Christian Paul AKO
- Christian-Renaud SERY
- Ronan JAMBOU

## Licence
MIT

## Contact
Stanlasso (GitHub/email)
