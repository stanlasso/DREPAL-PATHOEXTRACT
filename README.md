# Titre du projet
project_name = "DREPAL-PATHOEXTRACT"

# Description du projet
project_description = "Un pipeline Snakemake intégré pour le contrôle qualité, la filtration, la double soustraction digitale, et la génération de fichiers consensus à partir de données de séquençage Sanger et NGS."

# Fonctionnalités principales
features = [
    "Gestion des isolats : Televerser un ou plusieurs isolat(s) et visualiser leurs qualités via fastqc et multiqc",
    "Contôle qualité: Ajuster la qualité de isolats avec trimgalore",
    "Filtrage digitale: soustraction de l'hôte et extraction du pathogène d'interet",
    "Pipeline: execution en un workflow unique du contrôle de qualité et du filtrage digital",
    "Assemblage: assemblage des lectures de qualité retenues",
]

# Prérequis
requirements = [
    "Git",
    "Conda",
    "Snakemake",
    "PM2",
    "Serveur Apache",
]

# Étapes d'installation
installation_steps = [
    "Cloner le code source depuis GitHub:",
    "```",
    "git clone [https://github.com/stanlasso/DREPAL-PATHOEXTRACT.git](https://github.com/stanlasso/DREPAL-PATHOEXTRACT.git)",
    "```",
    "Installer les dépendances: Conda, Snakemake, PM2 et Apache",
    "```",
    "# Installer Conda",
    "wget [https://repo.anaconda.com/miniconda/Miniconda3-py37_23.1.0-1-Linux-x86_64.sh](https://repo.anaconda.com/miniconda/Miniconda3-py37_23.1.0-1-Linux-x86_64.sh)",
    "bash Miniconda3-py37_23.1.0-1-Linux-x86_64.sh",
    "",
    "# Installer Mamba",
    "conda install -n base -c conda-forge mamba",
    "",
    "# Installer Snakemake",
    "mamba create -c bioconda -c conda-forge -n snakemake snakemake-minimal",
    "",
    "# Installer PM2",
    "sudo npm install pm2 -g",
    "",
    "# Installer Apache",
    "sudo apt update",
    "sudo apt install apache2",
    "```",
    "Copier le frontend dans le répertoire www/html du serveur Apache:",
    "```",
    "sudo cp -r patho /var/www/html/",
    "```",
    "Installer les composants du backend (Toolskit):",
    "```",
    "cd toolskit",
    "npm install",
    "```",
    "Créer un compte utilisateur",
]

# Fonctionnalités générales
general_features = [
    "Filtres: recherche de fichiers par nom, extension, date de modification, etc.",
    "Suppression de fichiers",
    "Suivi de l'état des processus",
    "Téléchargement des journaux",
]

# Fonctionnalités spécifiques
specific_features = [
    "**Génome de référence**: indexation, vérification",
    "**Analyses des échantillons**:
        * Gestion des échantillons
        * Contrôle qualité (FastQC, MultiQC)
        * Double soustraction digitale
        * Pipeline
    * **Gestion des résultats**",
]

# Documentation
documentation_url = "https://www.linguee.fr/francais-anglais/traduction/non+valide.html"

# Author
author = [
    "ASSOHOUN Egomli Stanislas",
    "Mail: stanlasso@gmail.com",
    "Linkedin: https://www.linkedin.com/in/stanislas-assohoun-2b973bab/",
]

# Contributeurs
contributors = [
    "Christian Paul AKO",
    "Christian-Renaud SERY",
    "Ronan JAMBOU",
    ]

# Licence
license = "MIT"

# Contact
contact_info = "Stanlasso (GitHub/email)"

# Générer le README.md
generate_readme(
    project_name,
    project_description,
    features,
    requirements,
    installation_steps,
    general_features,
    specific_features,
    documentation_url,
    contributors,
    license,
    contact_info,
)
