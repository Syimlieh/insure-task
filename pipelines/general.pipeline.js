const { ORDER_DIRECTIONS } = require("../utils/constants.utils");

const fetchFilterPipeline = (filters) => {
  const page = parseInt(filters.page, 10) || 1;
  const limit = parseInt(filters.limit, 10) || 100;
  const order_by = filters.order_by || "updatedAt";
  const order_direction = filters.order_direction?.toUpperCase() === ORDER_DIRECTIONS.ASC ? 1 : -1;

  return [
    { $project: { _id: 0, __v: 0 } },
    { $sort: { [order_by]: order_direction } },
    { $facet: {
        items: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        pagination: [{ $count: "totalRecords" }]
      }
    }
  ];
};

module.exports = { fetchFilterPipeline };
