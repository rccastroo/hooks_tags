import pool from '../config/database';

// Interfaces
interface Hook {
  id: number;
  name: string;
  description: string;
  link: string;
  downloads: number;
  active: boolean;
  tags: Tag[];
}

interface Tag {
  id: number;
  name: string;
  category: string;
  active: boolean;
}

// Função para obter hooks com tags associadas
export const getHooksWithTags = async (): Promise<Hook[]> => {
  const query = `
    SELECT 
      h.id AS "hookId", 
      h.name AS "hookName", 
      h.description AS "hookDescription",
      h.link AS "hookLink",
      h.downloads AS "hookDownloads",
      h.active AS "hookActive",
      t.id AS "tagId", 
      t.name AS "tagName", 
      t.category AS "tagCategory", 
      t.active AS "tagActive"
    FROM hooks h
    LEFT JOIN hooks_tags ht ON h.id = ht.hook_id
    LEFT JOIN tags t ON t.id = ht.tag_id
    WHERE h.active = true;
  `;
  const result = await pool.query(query);

  // Organiza os hooks e tags
  const hooksMap: { [key: number]: Hook } = {};

  result.rows.forEach(row => {
    if (!hooksMap[row.hookId]) {
      hooksMap[row.hookId] = {
        id: row.hookId,
        name: row.hookName,
        description: row.hookDescription,
        link: row.hookLink,
        downloads: row.hookDownloads,
        active: row.hookActive,
        tags: []
      };
    }

    if (row.tagId) {
      hooksMap[row.hookId].tags.push({
        id: row.tagId,
        name: row.tagName,
        category: row.tagCategory,
        active: row.tagActive
      });
    }
  });

  return Object.values(hooksMap);
};

// Função para obter todas as tags
export const getTags = async (): Promise<Tag[]> => {
  const query = `SELECT * FROM tags WHERE active = true;`;
  const result = await pool.query(query);
  return result.rows as Tag[];
};
