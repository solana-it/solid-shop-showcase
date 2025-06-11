import { useState, useMemo } from 'react';
import { Search, Filter, Grid3X3, List, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '../pages/Index';

interface ProductListingProps {
  onViewProduct: (product: Product) => void;
}

const ProductListing = ({ onViewProduct }: ProductListingProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sample products data
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      category: "Electronics",
      brand: "AudioTech",
      description: "High-quality wireless headphones with noise cancellation and premium sound quality",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"],
      rating: 4.8,
      reviews: 1250,
      inStock: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 249,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      category: "Wearables",
      brand: "FitTech",
      description: "Advanced fitness tracking with heart rate monitoring and GPS",
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"],
      rating: 4.6,
      reviews: 890,
      inStock: true
    },
    {
      id: 3,
      name: "Professional Camera Lens",
      price: 599,
      originalPrice: 799,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop",
      category: "Photography",
      brand: "LensPro",
      description: "Professional grade 85mm f/1.4 portrait lens for stunning photography",
      images: ["https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop"],
      rating: 4.9,
      reviews: 456,
      inStock: true
    },
    {
      id: 4,
      name: "Minimalist Desk Setup",
      price: 449,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
      category: "Office",
      brand: "WorkSpace",
      description: "Complete minimalist desk setup for enhanced productivity",
      images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop"],
      rating: 4.7,
      reviews: 234,
      inStock: true
    },
    {
      id: 5,
      name: "Gaming Mechanical Keyboard",
      price: 159,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop",
      category: "Electronics",
      brand: "GameTech",
      description: "RGB mechanical gaming keyboard with premium switches",
      images: ["https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop"],
      rating: 4.5,
      reviews: 678,
      inStock: true
    },
    {
      id: 6,
      name: "Wireless Mouse",
      price: 79,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
      category: "Electronics",
      brand: "TechPro",
      description: "Precision wireless mouse with ergonomic design",
      images: ["https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop"],
      rating: 4.3,
      reviews: 445,
      inStock: true
    },
    // Add more products to demonstrate pagination
    ...Array.from({ length: 20 }, (_, i) => ({
      id: 7 + i,
      name: `Product ${7 + i}`,
      price: Math.floor(Math.random() * 500) + 50,
      image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=500&h=500&fit=crop`,
      category: ['Electronics', 'Fashion', 'Home', 'Sports'][Math.floor(Math.random() * 4)],
      brand: ['Brand A', 'Brand B', 'Brand C'][Math.floor(Math.random() * 3)],
      description: `Description for product ${7 + i}`,
      images: [`https://images.unsplash.com/photo-${1500000000000 + i}?w=500&h=500&fit=crop`],
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      reviews: Math.floor(Math.random() * 1000) + 100,
      inStock: Math.random() > 0.1
    }))
  ];

  const categories = ['all', 'Electronics', 'Wearables', 'Photography', 'Office', 'Fashion', 'Home', 'Sports'];
  const brands = ['AudioTech', 'FitTech', 'LensPro', 'WorkSpace', 'GameTech', 'TechPro', 'Brand A', 'Brand B', 'Brand C'];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedBrands, priceRange, sortBy, allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands(prev => [...prev, brand]);
    } else {
      setSelectedBrands(prev => prev.filter(b => b !== brand));
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">All Products</h1>
            <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
          </div>
          
          {/* Search and View Toggle */}
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className="h-4 w-4 ml-auto" />
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Category</h3>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Brand</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                      />
                      <label htmlFor={brand} className="text-sm text-foreground cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-20"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            {paginatedProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {paginatedProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                    onClick={() => onViewProduct(product)}
                  >
                    <CardContent className="p-0">
                      <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
                        <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'rounded-t-lg'}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                              viewMode === 'list' ? 'w-full h-48' : 'w-full h-64'
                            }`}
                          />
                          {product.originalPrice && (
                            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-semibold">
                              SALE
                            </div>
                          )}
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-semibold">Out of Stock</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4 flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-foreground line-clamp-2 flex-1">{product.name}</h3>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-foreground">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            <Button 
                              size="sm"
                              disabled={!product.inStock}
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewProduct(product);
                              }}
                            >
                              {product.inStock ? 'View' : 'Unavailable'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Previous
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(i + 1)}
                    className="w-10"
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
