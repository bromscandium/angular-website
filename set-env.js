const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env');
const targetPath = path.resolve(__dirname, 'src/app/environments/environment.ts');

if (!fs.existsSync(envPath)) {
  console.error('.env file not found! Please create one based on .env.example');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

const environmentContent = `export const environment = {
  production: ${envVars.PRODUCTION || 'false'},
  weatherApiKey: '${envVars.WEATHER_API_KEY || ''}',
  baseHref: '${envVars.BASE_HREF || '/'}'
};
`;

fs.writeFileSync(targetPath, environmentContent);
console.log('environment.ts generated successfully');
