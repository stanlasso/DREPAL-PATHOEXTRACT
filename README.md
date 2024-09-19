

# DREPAL-PATHOEXTRACT
DREPAL-PATHOEXTRACT is an open-source bioinformatics application designed for (i) quality control of NGS data, (ii) removal of contamination from the host and other microorganisms, and (iii) de novo assembly of reads corresponding to a pathogen of interest, specifically P. falciparum. This application is tailored for Illumina sequencing data obtained from patient samples positive for malaria caused by P. falciparum.
DREPAL-PATHOEXTRACT leverages Snakemake to orchestrate various workflows, enabling deployment in diverse environments, whether local or cloud-based. Additionally, the application relies exclusively on software packages available through Bioconda and Conda-Forge, ensuring a simplified installation process that is accessible to a wide range of users.


# Documentation
The complete documentation for DREPAL-PATHOEXTRACT, including a practical guide and a detailed description of the application, is available online. It provides instructions on configuration, pipeline usage, and concrete examples to help optimize analysis efficiency. To access the manual, please visit the following link: DREPAL-PATHOEXTRACT Manual.

# Installation of DREPAL-PATHOEXTRACT
DREPAL-PATHOEXTRACT is designed for easy installation and configuration through the use of Conda, an open-source package and environment management system compatible with Windows, macOS, and Linux. The application is hosted on GitHub and can be installed locally or deployed in a cloud environment.

## Downloading and Cloning the Source Code
To begin, download the source code for DREPAL-PATHOEXTRACT from GitHub by following the steps below:
1.	Ensure that Git is installed on your system. If not, you can download and install it from the official Git website.
2.	Open a command prompt or terminal on your system.
3.	Navigate to the directory where you would like to clone the project.
4.	Clone the project from GitHub by executing the following command:


```
# sh
git clone https://github.com/stanlasso/DREPAL-PATHOEXTRACT.git
```

5-Once the cloning process is complete, navigate to the DREPAL-PATHOEXTRACT directory

```
# sh
conda activate DREPAL-PATHOEXTRACT
```

## Installation of Conda and Snakemake

### 1. Installation de Conda :

# 1.	Installation of Conda
- Download the Miniconda installation script : 

```
# sh
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

- Run the Miniconda installation script :

```
# sh
bash Miniconda3-latest-Linux-x86_64.sh
```

- Follow the on-screen instructions to complete the installation process. It is recommended to close and reopen your terminal after the installation.

### 2.Installation of Snakemake :

- Install the Mamba package manager :

```
# sh
conda install -n base -c conda-forge mamba
```

- Create a Conda environment and install the minimal version of Snakemake :

```
# sh
mamba create -c bioconda -c conda-forge -n snakemake snakemake-minimal
```

- Activate the Snakemake environment :

```
# sh
conda activate snakemake
```

## Installation de PM2 et du Serveur Apache
To manage and deploy the backend of DREPAL-PATHOEXTRACT, we use PM2 and Apache tools. The instructions below outline the installation process for these components:

### 1. Installation of PM2 :

-  Update existing packages :
```
# sh
sudo apt update
```

- Install Node.js :

```
# sh
sudo apt install nodejs
```

- Install npm (if necessary):
```
# sh
sudo apt install npm
```
- Install PM2 globally :
```
# sh
sudo npm install pm2 -g
```
### 2. Installation of the Apache Server :

- Update existing packages :

```
# sh
sudo apt update
```

- install Apache server :

```
# sh
sudo apt install apache2
```

- Verify that the Apache server is running :
```
# sh
sudo systemctl status apache2
```

- 	If Apache is not running, start it :
```
# sh
sudo service apache2 start
```

## Application Configuration

### 1. Frontend Deployment :

- Copy the contents of the frontend folder into the Apache web directory :
```
# sh
sudo cp -r patho /var/www/html/
```

- Access the application through your browser by entering the URL `localhost/patho`.
### 2.	Backend Dependencies Installation :

- Navigate to the toolskit directory and install the dependencies :
```
# sh
cd toolskit
npm install
```

- Start the backend using PM2 :
```
# sh
pm2 start server.js
```

And there you have it; you are now ready to begin processing your data!


## Author
•	ASSOHOUN Egomli Stanislas

•	Mail: stanlasso@gmail.com

•	Linkedin: https://www.linkedin.com/in/stanislas-assohoun-2b973bab/

## Contributors 
•	Aristide Béranger AKO

• <a href="https://www.linkedin.com/in/paul-christian-ako-78636b122/" target="_blank">Christian Paul AKO</a>

•	Jérôme Kablan ADOU

•	Ronan JAMBOU

## Licence
MIT

## Contact
Stanlasso (GitHub/email)
