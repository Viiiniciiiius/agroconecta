export interface ISolution {
  _id?: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateSolutionRequest {
  body: {
    title: string;
    description: string;
  };
}

export interface UpdateSolutionRequest {
  params: {
    _id: string;
  };
  body: {
    title?: string;
    description?: string;
  };
}

export interface DeleteSolutionRequest {
    _id: string;
}

export interface GetSolutionsRequest {
    query: {
        category: string;
    };
}

export interface GetSolutionByIdRequest {
    _id: string;
}
