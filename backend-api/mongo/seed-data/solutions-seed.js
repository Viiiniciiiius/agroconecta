const { default: mongoose } = require('mongoose');

const solutions = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Sistema de Irrigação Inteligente",
    category: "product",
    details: "Sistema automatizado de irrigação que utiliza sensores de umidade e temperatura para otimizar o uso de água na agricultura.",
    priceDollar: 2500,
    link: "https://example.com/irrigation-system",
    publishDate: new Date("2024-01-15"),
    starRating: 4.5,
    ownerContact: {
      email: "contato@agrotech.com",
      phone: "(11) 99999-8888",
      other: "WhatsApp: (11) 99999-8888"
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Consultoria em Agricultura Sustentável",
    category: "service",
    details: "Serviço de consultoria especializada em técnicas de agricultura sustentável e orgânica.",
    priceDollar: 150,
    link: "https://example.com/consulting",
    publishDate: new Date("2024-01-20"),
    starRating: 4.8,
    ownerContact: {
      email: "consultoria@agroverde.com",
      phone: "(21) 88888-7777"
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Estudo sobre Eficiência de Fertilizantes",
    category: "scientific_article",
    details: "Pesquisa sobre a eficiência de diferentes tipos de fertilizantes em culturas de milho e soja.",
    link: "https://example.com/research",
    publishDate: new Date("2024-01-10"),
    starRating: 4.2,
    ownerContact: {
      email: "pesquisa@universidade.edu.br"
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Trator com GPS Integrado",
    category: "machinery",
    details: "Trator equipado com sistema GPS para navegação precisa e otimização de rotas no campo.",
    priceDollar: 85000,
    link: "https://example.com/tractor",
    publishDate: new Date("2024-01-25"),
    starRating: 4.7,
    ownerContact: {
      email: "vendas@maquinaria.com",
      phone: "(31) 77777-6666"
    }
  }
];

module.exports = {
  solutions,
  async up(db, client) {
    await db.collection('solutions').insertMany(solutions);
  },
  async down(db, client) {
    await db.collection('solutions').deleteMany({
      _id: { $in: solutions.map(solution => solution._id) }
    });
  }
}; 