
import { CheckCircle, Download, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface OrderConfirmationProps {
  order: any;
  onContinueShopping: () => void;
}

const OrderConfirmation = ({ order, onContinueShopping }: OrderConfirmationProps) => {
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Order not found</p>
      </div>
    );
  }

  const steps = [
    { icon: CheckCircle, title: 'Order Confirmed', description: 'Your order has been placed successfully', completed: true },
    { icon: Package, title: 'Processing', description: 'We are preparing your items', completed: false },
    { icon: Truck, title: 'Shipped', description: 'Your order is on the way', completed: false },
    { icon: CheckCircle, title: 'Delivered', description: 'Your order has been delivered', completed: false }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Order Number:</span>
                <span className="font-mono text-primary">{order.id}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Order Date:</span>
                <span>{order.date}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
              </div>

              <Separator />

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="font-medium">Items Ordered:</h4>
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Shipping Address:</h4>
                <div className="text-sm text-muted-foreground">
                  <p>{order.billingInfo.firstName} {order.billingInfo.lastName}</p>
                  <p>{order.billingInfo.address}</p>
                  <p>{order.billingInfo.city}, {order.billingInfo.state} {order.billingInfo.zipCode}</p>
                  <p>{order.billingInfo.country}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Estimated Delivery:</h4>
                <p className="text-sm text-muted-foreground">
                  3-5 business days (Standard shipping)
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Tracking Number:</h4>
                <p className="text-sm font-mono text-primary">Will be provided once shipped</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex flex-col items-center relative flex-1">
                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div 
                          className={`absolute top-6 left-1/2 w-full h-0.5 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                          style={{ transform: 'translateX(50%)' }}
                        />
                      )}
                      
                      {/* Step Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                        step.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      
                      {/* Step Info */}
                      <div className="text-center mt-2 max-w-24">
                        <p className={`text-xs font-medium ${
                          step.completed ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button size="lg" onClick={onContinueShopping}>
            Continue Shopping
          </Button>
        </div>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about your order, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                Email Support
              </Button>
              <Button variant="outline">
                Call (555) 123-4567
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmation;
