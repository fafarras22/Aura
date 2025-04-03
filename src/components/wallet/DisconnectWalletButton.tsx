
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Unlink, X } from "lucide-react";

interface DisconnectWalletButtonProps extends Omit<ButtonProps, 'onClick'> {
  variant?: "icon" | "text" | "full";
  onSuccess?: () => void;
}

export const DisconnectWalletButton: React.FC<DisconnectWalletButtonProps> = ({
  variant = "full",
  onSuccess,
  className,
  ...props
}) => {
  const { disconnect, wallet } = useWallet();
  const { toast } = useToast();

  if (!wallet.connected) {
    return null;
  }

  const handleDisconnect = () => {
    disconnect();
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been successfully disconnected.",
    });
    
    if (onSuccess) {
      onSuccess();
    }
  };

  // Icon-only button
  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDisconnect}
        className={className}
        aria-label="Disconnect wallet"
        title="Disconnect wallet"
        {...props}
      >
        <LogOut className="h-4 w-4" />
      </Button>
    );
  }

  // Text-only button
  if (variant === "text") {
    return (
      <Button
        variant="ghost"
        onClick={handleDisconnect}
        className={`text-red-500 hover:text-red-600 hover:bg-red-50 px-2 ${className}`}
        {...props}
      >
        Disconnect
      </Button>
    );
  }

  // Full button with icon and text
  return (
    <Button
      variant="outline"
      onClick={handleDisconnect}
      className={`gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200 ${className}`}
      {...props}
    >
      <LogOut className="h-4 w-4" />
      Disconnect Wallet
    </Button>
  );
};
