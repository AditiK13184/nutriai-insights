import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AccountPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AccountPanel = ({ open, onOpenChange }: AccountPanelProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "See you next time!",
    });

    onOpenChange(false);
    navigate("/");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Account
          </SheetTitle>
          <SheetDescription>
            Manage your profile, settings, and preferences.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">

          {/* Profile Button */}
          <Button
            variant="outline"
            className="w-full flex justify-start gap-3"
            onClick={() => {
              navigate("/settings");
              onOpenChange(false);
            }}
          >
            <Settings className="h-5 w-5" />
            Profile & Settings
          </Button>

          {/* Logout Button */}
          <Button
            variant="destructive"
            className="w-full flex justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccountPanel;
