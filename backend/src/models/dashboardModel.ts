import pool from '../config/database';

// Interfaces
interface Hook {
  id: number;
  name: string;
  description: string;
  link: string;
  downloads: number;
  active: boolean;
}

interface Tag {
  id: number;
  name: string;
  category: string;
  active: boolean;
}

// Função para obter tags associadas aos hooks filtrados por nome
export const getTagsByHookIds = async (hookIds: number[]): Promise<Tag[]> => {
  if (hookIds.length === 0) return [];

  const placeholders = hookIds.map((_, index) => `$${index + 1}`).join(',');
  const query = `
    SELECT DISTINCT t.*
    FROM tags t
    JOIN hooks_tags ht ON t.id = ht.tag_id
    WHERE ht.hook_id IN (${placeholders});
  `;
  const result = await pool.query(query, hookIds);

  return result.rows as Tag[];
};

// Função para obter hooks associados às tags
export const getHooksByTags = async (tagIds: number[]): Promise<number[]> => {
  if (tagIds.length === 0) return [];

  const placeholders = tagIds.map((_, index) => `$${index + 1}`).join(',');
  const query = `SELECT DISTINCT hook_id FROM hooks_tags WHERE tag_id IN (${placeholders});`;
  const result = await pool.query(query, tagIds);

  return result.rows.map(row => row.hook_id);
};

// Função para obter hooks filtrados por IDs
export const getHooks = async (hookIds: number[]): Promise<Hook[]> => {
  if (hookIds.length === 0) return [];

  const placeholders = hookIds.map((_, index) => `$${index + 1}`).join(',');
  const query = `SELECT * FROM hooks WHERE id IN (${placeholders});`;
  const result = await pool.query(query, hookIds);

  return result.rows as Hook[];
};

// Função para obter tags com base nas tags de ação, itens e nicho
export const getTags = async (actionTags: string[], itemTags: string[], nicheTags: string[]): Promise<Tag[]> => {
  const allTags = actionTags.concat(itemTags, nicheTags);

  if (allTags.length === 0) return [];

  // Cria placeholders para a consulta
  const placeholders = allTags.map((_, index) => `$${index + 1}`).join(',');
  const query = `
    SELECT * FROM tags
    WHERE name IN (${placeholders});
  `;

  // Executa a consulta com os valores
  const result = await pool.query(query, allTags);

  return result.rows as Tag[];
};

// Função para obter hooks com tags associadas
export const getHooksWithTags = async (hookIds: number[]): Promise<{ hook: Hook; tags: Tag[] }[]> => {
  if (hookIds.length === 0) return [];

  const hooks = await getHooks(hookIds);
  const tags = await getTagsByHookIds(hookIds);

  return hooks.map(hook => ({
    hook,
    tags: tags.filter(tag => tag.id in hookIds) // Verifica se a tag está associada ao hook
  }));
};
