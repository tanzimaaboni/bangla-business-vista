
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-5xl font-bold mb-4 text-bangladesh-red">404</h1>
      <h2 className="text-2xl mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/" className="bg-bangladesh-green hover:bg-bangladesh-green/90">
          Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
