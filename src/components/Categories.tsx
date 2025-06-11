
import { Grid, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface CategoriesProps {
  onNavigate: (page: string) => void;
}

const Categories = ({ onNavigate }: CategoriesProps) => {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Smartphones, laptops, tablets and more',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      productCount: 156
    },
    {
      id: 2,
      name: 'Fashion',
      description: 'Clothing, shoes, and accessories',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      productCount: 89
    },
    {
      id: 3,
      name: 'Home & Garden',
      description: 'Furniture, decor, and garden supplies',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      productCount: 234
    },
    {
      id: 4,
      name: 'Sports & Fitness',
      description: 'Equipment, apparel, and accessories',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      productCount: 78
    },
    {
      id: 5,
      name: 'Beauty & Health',
      description: 'Skincare, makeup, and wellness products',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      productCount: 145
    },
    {
      id: 6,
      name: 'Books & Media',
      description: 'Books, movies, music, and games',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      productCount: 92
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Shop by Category</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of products organized by categories to help you find exactly what you're looking for.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search categories..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Grid className="h-4 w-4" />
            <span>View All</span>
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => onNavigate('products')}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {category.productCount} products
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onNavigate('products')}
                  >
                    Browse →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Brands */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Featured Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG'].map((brand) => (
              <div key={brand} className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-lg font-bold text-muted-foreground">{brand[0]}</span>
                </div>
                <h3 className="font-medium text-foreground">{brand}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
