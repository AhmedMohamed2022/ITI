export interface IProductDetails {
  id: number;
  name: string;
  description: string;
  categoryName: string;
  price: number;
  quantity: number;
  vendorName: string;
  createdAt: Date;
  images: Array<string>;
}
