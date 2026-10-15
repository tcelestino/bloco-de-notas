const API = 'https://api.raindrop.io/rest/v1';
const PER_PAGE = 50;
const MAX_PAGES = 3;
const EXCLUDED_COLLECTION = 'videos';

const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

const hostname = (link) => {
  try {
    return new URL(link).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

const isYoutube = (link) => {
  const host = hostname(link);
  return host === 'youtu.be' || host === 'youtube.com' || host.endsWith('.youtube.com');
};

// Retorna o Set de ids da coleção com o título dado e de todas as suas descendentes.
const excludedCollectionIds = (collections, title) => {
  const target = normalize(title);
  const ids = new Set(collections.filter((c) => normalize(c.title) === target).map((c) => c._id));
  let grew = true;
  while (grew) {
    grew = false;
    for (const c of collections) {
      if (c.parent && ids.has(c.parent.$id) && !ids.has(c._id)) {
        ids.add(c._id);
        grew = true;
      }
    }
  }
  return ids;
};

const request = async (fetchFn, token, path) => {
  const response = await fetchFn(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(`Raindrop: GET ${path} respondeu ${response.status}`);
  }
  return response.json();
};

const fetchFavoritos = async ({ token, fetchFn = fetch, limit = 5 }) => {
  if (!token) return [];

  const [roots, children] = await Promise.all([
    request(fetchFn, token, '/collections'),
    request(fetchFn, token, '/collections/childrens'),
  ]);
  const excluded = excludedCollectionIds([...roots.items, ...children.items], EXCLUDED_COLLECTION);

  const favoritos = [];
  for (let page = 0; page < MAX_PAGES && favoritos.length < limit; page++) {
    const { items } = await request(
      fetchFn,
      token,
      `/raindrops/0?sort=-created&perpage=${PER_PAGE}&page=${page}`,
    );
    if (items.length === 0) break;
    for (const raindrop of items) {
      if (excluded.has(raindrop.collection?.$id) || isYoutube(raindrop.link)) continue;
      favoritos.push({
        title: raindrop.title?.trim() || raindrop.link,
        link: raindrop.link,
        domain: raindrop.domain || hostname(raindrop.link),
      });
    }
  }
  return favoritos.slice(0, limit);
};

module.exports = { fetchFavoritos, isYoutube, normalize, excludedCollectionIds };
