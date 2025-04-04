
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/context/wallet";

const Profile = () => {
  const navigate = useNavigate();
  const { wallet } = useWallet();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Sidebar */}
            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="" alt="User Profile" />
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {wallet.connected ? wallet.address.substring(0, 2) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-xl font-bold mb-1">
                      {wallet.connected ? 
                        `${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 4)}` : 
                        'Guest User'}
                    </h2>
                    
                    {wallet.connected ? (
                      <Badge variant="outline" className="mb-4">Verified Investor</Badge>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mb-4"
                        onClick={() => navigate('/login')}
                      >
                        Connect Wallet
                      </Button>
                    )}
                    
                    <div className="w-full space-y-3 mt-4">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard')}>
                        Dashboard
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/farm-projects')}>
                        My Investments
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-primary" onClick={() => navigate('/profile')}>
                        Profile Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/tokenization')}>
                        Token Management
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Profile Content */}
            <div className="w-full md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    View and update your account information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="security">Security</TabsTrigger>
                      <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal" className="pt-6">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Connect your wallet to update your personal information.
                        </p>
                        
                        {!wallet.connected && (
                          <Button onClick={() => navigate('/login')}>
                            Connect Wallet
                          </Button>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="security" className="pt-6">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Manage your security settings and recovery options.
                        </p>
                        
                        {!wallet.connected && (
                          <Button onClick={() => navigate('/login')}>
                            Connect Wallet
                          </Button>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="preferences" className="pt-6">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Customize your notification preferences and display settings.
                        </p>
                        
                        {!wallet.connected && (
                          <Button onClick={() => navigate('/login')}>
                            Connect Wallet
                          </Button>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
