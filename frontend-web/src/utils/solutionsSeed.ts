import { CreateSolutionForm } from "../types/solution";

export const solutionsSeed: CreateSolutionForm[] = [
    {
      title: 'Organic Fertilizer',
      category: 'product',
      details: 'High-quality organic fertilizer made from compost.',
      priceDollar: 20,
      link: 'https://example.com/organic-fertilizer',
      publishDate: new Date('2023-01-15'),
      starRating: 4.5,
      ownerContact: {
        email: 'contact@example.com',
        phone: '123-456-7890'
      }
    },
    {
      title: 'Precision Farming Service',
      category: 'service',
      details: 'Consulting service for precision farming techniques.',
      priceDollar: 150,
      link: 'https://example.com/precision-farming',
      publishDate: new Date('2023-02-10'),
      starRating: 4.8,
      ownerContact: {
        email: 'service@example.com'
      }
    },
    {
      title: 'Agriculture Trends Report',
      category: 'scientific_article',
      details: 'Comprehensive report on the latest agriculture trends.',
      priceDollar: 0,
      link: 'https://example.com/agriculture-trends',
      publishDate: new Date('2023-03-01'),
      starRating: 4.2,
      ownerContact: {
        email: 'report@example.com',
        other: 'LinkedIn: agriculturereport'
      }
    },
    {
      title: 'Farm Machinery Upgrade',
      category: 'machinery',
      details: 'Latest technology in farm machinery for efficient operations.',
      priceDollar: 25000,
      link: 'https://example.com/farm-machinery',
      publishDate: new Date('2023-04-20'),
      starRating: 4.7,
      ownerContact: {
        phone: '098-765-4321'
      }
    }
  ];