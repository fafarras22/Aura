
import React, { useState } from 'react';
import { Leaf, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setMessage('');
        setEmail('');
        setIsSent(false);
        setIsOpen(false);
      }, 3000);
    }, 1000);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full w-12 h-12 shadow-lg ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Leaf className="h-5 w-5" />}
        </Button>
      </div>

      {/* Chat popup */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 shadow-lg w-80 md:w-96 overflow-hidden">
          <div className="bg-green-600 text-white py-3 px-4 font-medium flex justify-between items-center">
            <div className="flex items-center">
              <Leaf className="mr-2 h-5 w-5" />
              <span>AKAR Customer Service</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-white hover:bg-green-700 rounded-full" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardContent className="p-4">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="text-sm mb-4">
                  <p className="font-medium">Hi there! 👋</p>
                  <p className="text-muted-foreground mt-1">
                    How can we help you today? Our AI assistant is ready to answer any questions about AKAR's products and services.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Input
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                  />
                  
                  <Textarea
                    placeholder="What would you like to know about AKAR?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    disabled={isSending}
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8" />
                </div>
                <h3 className="font-medium text-lg">Thank You!</h3>
                <p className="text-muted-foreground mt-1">
                  We've received your message and will get back to you shortly.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};
