import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Details from "./pages/Details";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Scanner from "./pages/Scanner";
import Meals from "./pages/Meals";
import Progress from "./pages/Progress";

// Profile Page (new)
import Profile from "./pages/Profile";

// Not Found Page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>

            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/details" element={<Details />} />

            {/* Dashboard + internal pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/chat" element={<Chat />} />
            <Route path="/dashboard/scanner" element={<Scanner />} />
            <Route path="/dashboard/meals" element={<Meals />} />
            <Route path="/dashboard/progress" element={<Progress />} />

            {/* Profile Page */}
            <Route path="/profile" element={<Profile />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
