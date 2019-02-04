
exports.grouping = (items, restrictionNum) => {
  const group = [];
  const objects = [];

  for (var i = 0; i < items.length; i++) {
    objects.push(items[i]);

    if (objects.length == restrictionNum) {
      group.push(objects);
      objects.length = 0;
    }
  }

  if (objects.length > 0) {
    group.push(objects);
  }

  return group;
};