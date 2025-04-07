export const createSolutionSchema = {
  body: {
    type: 'object',
    required: ['title', 'description', 'category', 'publishDate'],
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      category: { type: 'string', enum: ['product', 'service', 'scientific_article', 'machinery'] },
      details: { type: 'string' },
      priceDollar: { type: 'number' },
      link: { type: 'string' },
      publishDate: { type: 'string', format: 'date-time' },
      starRating: { type: 'number' },
      ownerContact: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          phone: { type: 'string' },
          other: { type: 'string' },
        },
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        category: { type: 'string' },
        details: { type: 'string' },
        priceDollar: { type: 'number' },
        link: { type: 'string' },
        publishDate: { type: 'string' },
        starRating: { type: 'number' },
        ownerContact: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            phone: { type: 'string' },
            other: { type: 'string' },
          },
        },
        createdAt: { type: 'string' },
      },
    },
  },
};

export const getSolutionsSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          category: { type: 'string' },
          details: { type: 'string' },
          priceDollar: { type: 'number' },
          link: { type: 'string' },
          publishDate: { type: 'string' },
          starRating: { type: 'number' },
          ownerContact: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              phone: { type: 'string' },
              other: { type: 'string' },
            },
          },
          createdAt: { type: 'string' },
        },
      },
    },
  },
};

export const getSolutionByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        category: { type: 'string' },
        details: { type: 'string' },
        priceDollar: { type: 'number' },
        link: { type: 'string' },
        publishDate: { type: 'string' },
        starRating: { type: 'number' },
        ownerContact: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            phone: { type: 'string' },
            other: { type: 'string' },
          },
        },
        createdAt: { type: 'string' },
      },
    },
  },
};

export const deleteSolutionSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
