```markdown
# Titre du projet
DREPAL-PATHOEXTRACT

## Description du projet
Un pipeline Snakemake intégré pour le contrôle qualité, la filtration, la double soustraction digitale, et la génération de fichiers consensus à partir de données de séquençage Sanger et NGS.

## Fonctionnalités principales
- Gestion des isolats : Téléverser un ou plusieurs isolats et visualiser leurs qualités via FastQC et MultiQC
- Contrôle qualité : Ajuster la qualité des isolats avec TrimGalore
- Filtrage digital : Soustraction de l'hôte et extraction du pathogène d'intérêt
- Pipeline : Exécution en un seul workflow du contrôle de qualité et du filtrage digital
- Assemblage : Assemblage des lectures de qualité retenues

## Prérequis
- Git
- Conda
- Snakemake
- PM2
- Serveur Apache

## Étapes d'installation
1. Cloner le code source depuis GitHub:
    ```
    git clone https://github.com/stanlasso/DREPAL-PATHOEXTRACT.git
    ```
2. Installer les dépendances : Conda, Snakemake, PM2 et Apache
    ```
    # Installer Conda
    wget https://repo.anaconda.com/miniconda/Miniconda3-py37_23.1.0-1-Linux-x86_64.sh
    bash Miniconda3-py37_23.1.0-1-Linux-x86_64.sh
    
    # Installer Mamba
    conda install -n base -c conda-forge mamba
    
    # Installer Snakemake
    mamba create -c bioconda -c conda-forge -n snakemake snakemake-minimal
    
    # Installer PM2
    sudo npm install pm2 -g
    
    # Installer Apache
    sudo apt update
    sudo apt install apache2
    ```
3. Copier le frontend dans le répertoire www/html du serveur Apache:
    ```
    sudo cp -r patho /var/www/html/
    ```
4. Installer les composants du backend (Toolskit):
    ```
    cd toolskit
    npm install
    ```
5. Créer un compte utilisateur

## Fonctionnalités générales
- Filtres : Recherche de fichiers par nom, extension, date de modification, etc.
- Suppression de fichiers
- Suivi de l'état des processus
- Téléchargement des journaux

## Fonctionnalités spécifiques
- **Génome de référence** : Indexation, vérification
- **Analyses des échantillons** :
  - Gestion des échantillons
  - Contrôle qualité (FastQC, MultiQC)
  - Double soustraction digitale
  - Pipeline
- **Gestion des résultats**

## Documentation
[Documentation](https://www.linguee.fr/francais-anglais/traduction/non+valide.html)

## Auteur
- ASSOHOUN Egomli Stanislas
- Mail : stanlasso@gmail.com
- Linkedin : [Stanislas ASSOHOUN](https://www.linkedin.com/in/stanislas-assohoun-2b973bab/)

## Contributeurs
- Christian Paul AKO
- Christian-Renaud SERY
- Ronan JAMBOU

## Licence
MIT

## Contact
Stanlasso (GitHub/email)
```

Cela devrait fournir un rendu correct dans un fichier README.md sur Git.