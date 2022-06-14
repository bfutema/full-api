import { Like } from 'typeorm';

function getParsedWhere(q: string) {
  if (q.length === 0) return {};

  const where = {};

  const whereMatrix = q.split(',').map(f => f.split('('));

  whereMatrix.forEach(filter => {
    const [operator, attribute, value] = filter;

    if (operator.toLowerCase() === 'like') {
      where[attribute.trim()] = Like(`%${value.slice(0, -2).trim()}%`);
    }
  });

  return where;
}

export { getParsedWhere };
