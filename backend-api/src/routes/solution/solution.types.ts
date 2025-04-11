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

export interface GetSolutionsRequest {
    category: string;
}
