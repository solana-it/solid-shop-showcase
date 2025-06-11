import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter!",
    });

    setEmail('');
  };

  const footerLinks = {
    'Shop': [
      'All Products',
      'Electronics',
      'Fashion',
      'Home & Garden',
      'Sports',
      'Sale Items'
    ],
    'Support': [
      'Contact Us',
      'FAQ',
      'Shipping Info',
      'Returns',
      'Size Guide',
      'Track Order'
    ],
    'Company': [
      'About Us',
      'Careers',
      'Press',
      'Sustainability',
      'Affiliate Program',
      'Gift Cards'
    ],
    'Legal': [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy',
      'Accessibility',
      'Terms of Use'
    ]
  };

  return (
    <footer className="bg-secondary/20 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Stay in the loop
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest updates, exclusive offers, and new product releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button 
                className="px-8"
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-primary mb-4">Novamart</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Your one-stop destination for quality products at unbeatable prices. 
                We're committed to providing the best shopping experience.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">support@novamart.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">123 Commerce St, City, State 12345</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-foreground mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2024 Novamart. All rights reserved.
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">We accept:</span>
              <div className="flex space-x-1">
                <div className="w-8 h-5 bg-primary rounded text-xs text-primary-foreground flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="w-8 h-5 bg-orange-500 rounded text-xs text-white flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-8 h-5 bg-blue-600 rounded text-xs text-white flex items-center justify-center font-bold">
                  AMEX
                </div>
                <div className="w-8 h-5 bg-indigo-600 rounded text-xs text-white flex items-center justify-center font-bold">
                  PP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
