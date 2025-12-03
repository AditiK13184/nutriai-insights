import { Leaf } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizeClasses[size]} rounded-xl bg-primary flex items-center justify-center shadow-md`}>
        <Leaf className="text-primary-foreground" size={size === "lg" ? 28 : size === "md" ? 22 : 18} />
      </div>
      {showText && (
        <span className={`${textSizes[size]} font-bold text-foreground`}>
          Nutri<span className="text-primary">AI</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
