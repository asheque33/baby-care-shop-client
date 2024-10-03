export interface IProduct {
  _id: string;
  image: string;
  title: string;
  price: number;
  prevPrice: number;
  isFlashSale?: boolean;
  ratings: number;
  category: string;
  description: string;
}
