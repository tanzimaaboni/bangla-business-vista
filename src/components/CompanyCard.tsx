
import { Company } from "@/types";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface CompanyCardProps {
  company: Company;
  onEdit?: (company: Company) => void;
  onDelete?: (id: string) => void;
}

export function CompanyCard({ company, onEdit, onDelete }: CompanyCardProps) {
  const { isAdmin } = useAuth();

  return (
    <Card className="company-card animate-slide-in">
      <div className="p-4 flex items-center gap-4">
        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border">
          <img
            src={company.logo || "/placeholder.svg"}
            alt={`${company.name} logo`}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{company.name}</h3>
          <Badge className="bg-bangladesh-green text-white mt-1">{company.sector}</Badge>
        </div>
      </div>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Headquarters</p>
            <p>{company.headquarters}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Founded</p>
            <p>{company.founded}</p>
          </div>
          {company.revenue && (
            <div>
              <p className="text-muted-foreground">Revenue</p>
              <p>{company.revenue}</p>
            </div>
          )}
          {company.employees && (
            <div>
              <p className="text-muted-foreground">Employees</p>
              <p>{company.employees}</p>
            </div>
          )}
        </div>
        {company.description && (
          <p className="mt-3 text-sm text-muted-foreground">{company.description}</p>
        )}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-bangladesh-green hover:underline"
          >
            Visit Website
          </a>
        )}
      </CardContent>
      {isAdmin && onEdit && onDelete && (
        <CardFooter className="border-t pt-4 flex justify-end space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(company)}
            className="text-bangladesh-green border-bangladesh-green hover:bg-bangladesh-green hover:text-white"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onDelete(company.id)}
            className="text-bangladesh-red border-bangladesh-red hover:bg-bangladesh-red hover:text-white"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
