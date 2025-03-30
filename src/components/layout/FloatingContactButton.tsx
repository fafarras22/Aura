
import React, { useState } from 'react';
import { Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useMobile } from '@/hooks/use-mobile';

export const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const isMobile = useMobile();

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
      {/* Floating button - positioned higher on mobile */}
      <div className={`fixed ${isMobile ? 'bottom-24' : 'bottom-6'} right-6 z-50`}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full w-12 h-12 shadow-lg ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
        </Button>
      </div>

      {/* Chat popup */}
      {isOpen && (
        <Card className={`fixed ${isMobile ? 'bottom-40' : 'bottom-24'} right-6 z-50 shadow-lg ${isMobile ? 'w-[85%] max-w-[280px]' : 'w-80 md:w-96'} overflow-hidden`}>
          <div className="bg-green-600 text-white py-2 px-3 font-medium flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>AKAR Customer Service</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-white hover:bg-green-700 rounded-full" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <CardContent className={`p-3 ${isMobile ? 'space-y-2' : 'p-4'}`}>
            {!isSent ? (
              <form onSubmit={handleSubmit} className={`${isMobile ? 'space-y-2' : 'space-y-3'}`}>
                <div className={`${isMobile ? 'text-xs mb-2' : 'text-sm mb-4'}`}>
                  <p className="font-medium">Hi there! 👋</p>
                  <p className="text-muted-foreground mt-1">
                    How can we help you today? Our AI assistant is ready to answer any questions about AKAR's products and services.
                  </p>
                </div>
                
                <div className={`${isMobile ? 'space-y-2' : 'space-y-3'}`}>
                  <Input
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    className={`${isMobile ? 'text-xs h-8' : ''}`}
                  />
                  
                  <Textarea
                    placeholder="What would you like to know about AKAR?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${isMobile ? 'min-h-[80px] text-xs' : 'min-h-[100px]'}`}
                    required
                  />
                  
                  <Button 
                    type="submit" 
                    className={`w-full bg-green-600 hover:bg-green-700 ${isMobile ? 'text-xs h-8' : ''}`}
                    disabled={isSending}
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className={`${isMobile ? 'py-4' : 'py-8'} text-center`}>
                <div className="mx-auto bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className={`font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>Thank You!</h3>
                <p className={`text-muted-foreground mt-1 ${isMobile ? 'text-xs' : ''}`}>
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
