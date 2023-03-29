const { spawn } = require('child_process');

const shell = process.platform === 'win32' ? 'cmd' : 'bash';

const condaInit = spawn('conda', ['init', shell]);

condaInit.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

condaInit.on('close', (code) => {
  if (code !== 0) {
    console.error(`conda init process exited with code ${code}`);
    return;
  }

  function runSnakemake(env) {
    const snakemake = spawn('snakemake', ['-j', '4', '-s', 'Snakefile'], { shell: true, env: { ...process.env, ...env } });

    snakemake.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    snakemake.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    snakemake.on('close', (code) => {
      console.log(`snakemake process exited with code ${code}`);
      const condaDeactivate = spawn('conda', ['deactivate']);
      condaDeactivate.on('close', (code) => {
        console.log(`conda deactivate process exited with code ${code}`);
      });
    });
  }

  const condaActivate = spawn('conda', ['activate', 'snakemake']);
  condaActivate.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  condaActivate.on('close', (code) => {
    if (code !== 0) {
      console.error(`conda activate process exited with code ${code}`);
      return;
    }
    runSnakemake({ PATH: process.env.PATH });
  });
});
