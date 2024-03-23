
def generate_readme(project_name, project_description, features, requirements, installation_steps, general_features, specific_features, documentation_url, contributors, license, contact_info):
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write("# {}\n\n".format(project_name))
        f.write("{}\n\n".format(project_description))
        
        f.write("## Fonctionnalités principales\n")
        for feature in features:
            f.write("- {}\n".format(feature))
        f.write("\n")
        
        f.write("## Prérequis\n")
        for requirement in requirements:
            f.write("- {}\n".format(requirement))
        f.write("\n")
        
        f.write("## Étapes d'installation\n")
        for step in installation_steps:
            f.write("{}\n".format(step))
        f.write("\n")
        
        f.write("## Fonctionnalités générales\n")
        for general_feature in general_features:
            f.write("- {}\n".format(general_feature))
        f.write("\n")
        
        f.write("## Fonctionnalités spécifiques\n")
        for specific_feature in specific_features:
            f.write("- {}\n".format(specific_feature))
        f.write("\n")
        
        f.write("## Documentation\n")
        f.write("[Documentation]({})\n\n".format(documentation_url))
        
        f.write("## Auteur\n")
        for author_info in author:
            f.write("- {}\n".format(author_info))
        f.write("\n")
        
        f.write("## Contributeurs\n")
        for contributor in contributors:
            f.write("- {}\n".format(contributor))
        f.write("\n")
        
        f.write("## Licence\n")
        f.write("{}\n\n".format(license))
        
        f.write("## Contact\n")
        f.write("{}\n".format(contact_info))


# Remplacez les variables suivantes par vos propres informations
project_name = "DREPAL-PATHOEXTRACT"
project_description = "Un pipeline Snakemake intégré pour le contrôle qualité, la filtration, la double soustraction digitale, et la génération de fichiers consensus à partir de données de séquençage Sanger et NGS."
features = [
    "Gestion des isolats : Téléverser un ou plusieurs isolats et visualiser leurs qualités via FastQC et MultiQC",
    "Contrôle qualité : Ajuster la qualité des isolats avec TrimGalore",
    "Filtrage digital : Soustraction de l'hôte et extraction du pathogène d'intérêt",
    "Pipeline : Exécution en un seul workflow du contrôle de qualité et du filtrage digital",
    "Assemblage : Assemblage des lectures de qualité retenues",
]
requirements = [
    "Git",
    "Conda",
    "Snakemake",
    "PM2",
    "Serveur Apache",
]
installation_steps = [
    "Cloner le code source depuis GitHub:",
    "```",
    "git clone https://github.com/stanlasso/DREPAL-PATHOEXTRACT.git",
    "```",
    "Installer les dépendances: Conda, Snakemake, PM2 et Apache",
    "```",
    "# Installer Conda",
    "wget https://repo.anaconda.com/miniconda/Miniconda3-py37_23.1.0-1-Linux-x86_64.sh",
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
general_features = [
    "Filtres: recherche de fichiers par nom, extension, date de modification, etc.",
    "Suppression de fichiers",
    "Suivi de l'état des processus",
    "Téléchargement des journaux",
]
specific_features = [
    "**Génome de référence**: indexation, vérification",
    "**Analyses des échantillons**:\n"
    "* Gestion des échantillons\n"
    "* Contrôle qualité (FastQC, MultiQC)\n"
    "* Double soustraction digitale\n"
    "* Pipeline\n"
    "* **Gestion des résultats**",
]
documentation_url = "https://www.linguee.fr/francais-anglais/traduction/non+valide.html"
author = [
    "ASSOHOUN Egomli Stanislas",
    "Mail: stanlasso@gmail.com",
    "Linkedin: https://www.linkedin.com/in/stanislas-assohoun-2b973bab/",
]
contributors = [
    "Christian Paul AKO",
    "Christian-Renaud SERY",
    "Ronan JAMBOU",
]
license = "MIT"
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
