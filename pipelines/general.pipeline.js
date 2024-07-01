const { ORDER_DIRECTIONS } = require("../utils/constants.utils");


const fetchFilterPipeline = (filters) => {
  const page = parseInt(filters.page || 1);
  const limit = parseInt(filters.limit || 100);
  const order_by = filters.order_by || "updatedAt";
  const order_direction = filters.order_direction || ORDER_DIRECTIONS.ASC;

  const $sort = {};
  $sort[order_by] =
    order_direction.toUpperCase() === ORDER_DIRECTIONS.ASC ? 1 : -1;

  const $skip = (page - 1) * limit;
  const $limit = limit;

  const $project = { _id: 0, __v: 0 };

  const $facet = {
    items: [{ $skip }, { $limit }],
    pagination: [{ $count: "totalRecords" }],
  };

  return [{ $project }, { $sort }, { $facet }];
};

module.exports = { fetchFilterPipeline };
