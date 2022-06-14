function getParsedRelations(relations: string) {
  return relations.length === 0 ? null : relations.split(',');
}

export { getParsedRelations };
