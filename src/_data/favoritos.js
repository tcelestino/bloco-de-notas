const { fetchFavoritos } = require('../../lib/raindrop');

// Carrega .env local (Node 22); em CI o token vem do ambiente.
try {
  process.loadEnvFile();
} catch {
  // sem .env: segue com o ambiente
}

const FAVORITOS_LIMIT = 4;

const loadFavoritos = async ({
  token = process.env.RAINDROP_TOKEN,
  fetchFn = fetch,
  warn = console.warn,
} = {}) => {
  if (!token) {
    warn('favoritos: RAINDROP_TOKEN ausente, seção "Últimos favoritos" omitida');
    return [];
  }
  try {
    return await fetchFavoritos({ token, fetchFn, limit: FAVORITOS_LIMIT });
  } catch (error) {
    warn(`favoritos: falha ao buscar no Raindrop, seção omitida (${error.message})`);
    return [];
  }
};

module.exports = loadFavoritos;
module.exports.loadFavoritos = loadFavoritos;
