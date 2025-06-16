export interface PublicService {
    id: number;
    name: string;
    description: string;
    category: string;
    status: 'active' | 'inactive';
  }