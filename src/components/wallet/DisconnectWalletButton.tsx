
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

type ButtonVariant = ButtonProps["variant"];

interface DisconnectWalletButtonProps extends Omit<ButtonProps, "onClick" | "variant"> {
  // Using a custom variant prop that includes our additional variants
  variant?: ButtonVariant | "text" | "icon" | "full";
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

  // Map custom variants to actual button variants
  let buttonVariant: ButtonVariant = "outline";
  let buttonClassName = className || "";
  
  // Icon-only button
  if (variant === "icon") {
    buttonVariant = "ghost";
    return (
      <Button
        variant={buttonVariant}
        size="icon"
        onClick={handleDisconnect}
        className={buttonClassName}
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
    buttonVariant = "ghost";
    buttonClassName = `text-red-500 hover:text-red-600 hover:bg-red-50 px-2 ${buttonClassName}`;
    return (
      <Button
        variant={buttonVariant}
        onClick={handleDisconnect}
        className={buttonClassName}
        {...props}
      >
        Disconnect
      </Button>
    );
  }

  // Full button with icon and text
  if (variant === "full") {
    buttonVariant = "outline";
    buttonClassName = `gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200 ${buttonClassName}`;
    return (
      <Button
        variant={buttonVariant}
        onClick={handleDisconnect}
        className={buttonClassName}
        {...props}
      >
        <LogOut className="h-4 w-4" />
        Disconnect Wallet
      </Button>
    );
  }

  // Default case: use the provided variant
  return (
    <Button
      variant={variant as ButtonVariant}
      onClick={handleDisconnect}
      className={buttonClassName}
      {...props}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Disconnect
    </Button>
  );
};
