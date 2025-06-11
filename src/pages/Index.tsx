import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import ProductListing from '../components/ProductListing';
import ProductDetails from '../components/ProductDetails';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import OrderConfirmation from '../components/OrderConfirmation';
import Categories from '../components/Categories';
import About from '../components/About';
import Contact from '../components/Contact';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const handlePlaceOrder = (billingInfo: any) => {
    const order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: cartItems,
      total: getTotalPrice(),
      billingInfo,
      date: new Date().toLocaleDateString()
    };
    setOrderDetails(order);
    setCartItems([]);
    setCurrentPage('order-confirmation');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onViewProduct={viewProduct} />;
      case 'products':
        return <ProductListing onViewProduct={viewProduct} />;
      case 'categories':
        return <Categories onNavigate={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'product-details':
        return (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setCurrentPage('products')}
          />
        );
      case 'cart':
        return (
          <Cart
            items={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => setCurrentPage('checkout')}
            onContinueShopping={() => setCurrentPage('products')}
          />
        );
      case 'checkout':
        return (
          <Checkout
            items={cartItems}
            total={getTotalPrice()}
            onPlaceOrder={handlePlaceOrder}
            onBack={() => setCurrentPage('cart')}
          />
        );
      case 'order-confirmation':
        return (
          <OrderConfirmation
            order={orderDetails}
            onContinueShopping={() => setCurrentPage('home')}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} onViewProduct={viewProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={getTotalItems()}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      <main className="pt-16">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
