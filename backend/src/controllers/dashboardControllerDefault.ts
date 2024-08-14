import { Request, Response } from 'express';
import { getTags, getHooksWithTags } from '../models/dashboardDefaultModel';

// Controller para buscar os dados do dashboard
export const fetchDashboardDataDefault = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtém todas as tags
    const tags = await getTags();

    // Obtém todos os hooks e suas tags associadas
    const hooksWithTags = await getHooksWithTags();

    // Mapeia as tags por categoria diretamente do resultado obtido
    const actionTagsMap = tags.filter(tag => tag.category === 'ação');
    const itemTagsMap = tags.filter(tag => tag.category === 'itens');
    const nicheTagsMap = tags.filter(tag => tag.category === 'nicho');

    // Formata os hooks com as tags associadas
    const formattedHooks = hooksWithTags.map(hook => ({
      id: hook.id,
      name: hook.name,
      actionTags: hook.tags
        .filter(tag => actionTagsMap.some(actionTag => actionTag.id === tag.id))
        .map(tag => tag.name),
      itemTags: hook.tags
        .filter(tag => itemTagsMap.some(itemTag => itemTag.id === tag.id))
        .map(tag => tag.name),
      nicheTags: hook.tags
        .filter(tag => nicheTagsMap.some(nicheTag => nicheTag.id === tag.id))
        .map(tag => tag.name),
      description: hook.description,
      link: hook.link,
      downloads: hook.downloads,
    }));

    // Responde com os dados combinados
    res.status(200).json({
      authenticated: true,
      hooks: formattedHooks,
      tags
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
  }
};
