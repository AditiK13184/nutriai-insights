import { useState } from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Account Button */}
          <button
            onClick={() => setOpen(!open)}
            className="h-10 w-10 rounded-full bg-sage-light flex items-center justify-center"
          >
            <User className="h-5 w-5 text-primary" />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-6 top-16 w-40 bg-card border border-border rounded-lg shadow-md z-50">
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-muted"
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-muted"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
