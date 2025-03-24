const { writeFileSync } = require('fs');
const { resolve } = require('path');

const environmentFileContent = `
export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}'
};
`;

const filePath = resolve(__dirname, 'src/app/environments/environment.ts');

writeFileSync(filePath, environmentFileContent);
console.log(`Archivo de entorno escrito en: ${filePath}`);
