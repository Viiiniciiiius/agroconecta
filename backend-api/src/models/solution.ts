import mongoose, { Document, Schema } from 'mongoose';

export interface ISolution extends Document {
  title: string;
  category: 'product' | 'service' | 'scientific_article' | 'machinery';
  details?: string;
  priceDollar?: number;
  link?: string;
  publishDate: Date;
  starRating?: number;
  ownerContact?: {
    email?: string;
    phone?: string;
    other?: string;
  };
}

const SolutionSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['product', 'service', 'scientific_article', 'machinery'], required: true },
  details: { type: String },
  priceDollar: { type: Number },
  link: { type: String },
  publishDate: { type: Date, default: Date.now },
  starRating: { type: Number, min: 0, max: 5 },
  ownerContact: {
    email: { type: String },
    phone: { type: String },
    other: { type: String }
  }
});

export const SolutionModel = 
  mongoose.models.Solution || mongoose.model<ISolution>('Solution', SolutionSchema);
