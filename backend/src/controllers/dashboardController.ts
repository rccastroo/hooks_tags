import { Request, Response } from 'express';
import { getTags, getHooksWithTags, getHooksByTags } from '../models/dashboardModel';

export const fetchDashboardData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { actionTags, itemTags, nicheTags } = req.body;

    // Obtém todas as tags
    const tags = await getTags(actionTags, itemTags, nicheTags);
    const tagIds = tags.map(tag => tag.id);

    // Obtém os hooks associados às tags
    const hookIds = await getHooksByTags(tagIds);
    const hooksWithTags = await getHooksWithTags(hookIds);

    // Organiza as tags em categorias
    const actionTagsMap = new Map<number, string[]>(
      tags
        .filter(tag => actionTags.includes(tag.name))
        .map(tag => [tag.id, [tag.name]])
    );
    const itemTagsMap = new Map<number, string[]>(
      tags
        .filter(tag => itemTags.includes(tag.name))
        .map(tag => [tag.id, [tag.name]])
    );
    const nicheTagsMap = new Map<number, string[]>(
      tags
        .filter(tag => nicheTags.includes(tag.name))
        .map(tag => [tag.id, [tag.name]])
    );

    // Prepara a resposta com os dados formatados
    res.status(200).json({
      authenticated: true,
      hooks: hooksWithTags.map(({ hook, tags }) => ({
        id: hook.id,
        name: hook.name,
        actionTags: tags.filter(tag => actionTagsMap.has(tag.id)).map(tag => tag.name),
        itemTags: tags.filter(tag => itemTagsMap.has(tag.id)).map(tag => tag.name),
        nicheTags: tags.filter(tag => nicheTagsMap.has(tag.id)).map(tag => tag.name),
        description: hook.description,
        link: hook.link,
        downloads: hook.downloads,
      })),
      tags: tags
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
  }
};
