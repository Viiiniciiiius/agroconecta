export interface ISolution {
  _id?: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateSolutionRequest {
  title: string;
  category: 'product' | 'service' | 'scientific_article' | 'machinery' | 'irrigation';
  subcategory?: string; // ← NOVO CAMPO para subcategorias
  description?: string;
  priceDollar?: number;
  link?: string;
  publishDate: string;
  dataColeta?: string;
  starRating?: number;
  ownerContact?: {
    email?: string;
    phone?: string;
    other?: string;
  };
}

export interface GetSolutionsRequest {
    category?: string;
    subcategory?: string; // ← NOVO CAMPO para filtrar por subcategoria
}

export interface SolutionApiDto {
  id: string;
  title: string;
  category: 'product' | 'service' | 'scientific_article' | 'machinery' | 'irrigation';
  subcategory?: string; // ← NOVO CAMPO para subcategorias
  description?: string;
  priceDollar?: number;
  link?: string;
  publishDate: string;
  dataColeta?: string;
  starRating?: number;
  ownerContact?: {
    email?: string;
    phone?: string;
    other?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
