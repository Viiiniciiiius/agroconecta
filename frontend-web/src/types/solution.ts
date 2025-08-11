export interface SolutionCardProps {
  id: string;
  title: string;
  category: 'product' | 'service' | 'scientific_article' | 'machinery';
  priceDollar?: number;
}

export interface SolutionDetailsProps {
    id: string;
    title: string;
    category: 'product' | 'service' | 'scientific_article' | 'machinery';
    details?: string;
    priceDollar?: number;
    link?: string;
    publishDate: string;
    starRating?: number;
    ownerContact?: {
        email?: string;
        phone?: string;
        other?: string;
    };
}

export interface CreateSolutionForm {
    title: string
    category: 'product' | 'service' | 'scientific_article' | 'machinery'
    description?: string
    priceDollar?: number
    link?: string
    publishDate: string
    starRating?: number
    ownerContact?: {
        email?: string
        phone?: string
        other?: string
    }
}