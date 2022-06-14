function getParsedOrders(sort: string) {
  if (sort.length === 0) return {};

  const orders = {};

  const sortMatrix = sort.split(',').map(order_by => order_by.split('('));

  sortMatrix.forEach(filter => {
    const [by, attribute] = filter;

    orders[attribute.slice(0, -1).trim()] = by.trim().toUpperCase();
  });

  return orders;
}

export { getParsedOrders };
