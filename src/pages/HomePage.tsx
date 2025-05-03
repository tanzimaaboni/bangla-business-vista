
import { useState, useEffect } from "react";
import { Company } from "@/types";
import { companiesApi } from "@/services/api";
import { CompanyCard } from "@/components/CompanyCard";
import { SearchBar } from "@/components/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const HomePage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companiesApi.getAll();
      setCompanies(data);
      setFilteredCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast({
        title: "Error",
        description: "Failed to load companies",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredCompanies(companies);
      return;
    }
    
    try {
      const results = await companiesApi.search(query);
      setFilteredCompanies(results);
      
      if (results.length === 0) {
        toast({
          title: "No Results",
          description: `No companies found matching "${query}"`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Failed to perform search",
        variant: "destructive"
      });
    }
  };

  const renderCompanyCards = () => {
    if (loading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="company-card">
          <div className="p-4 flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-md" />
            <div className="flex-grow">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
          <div className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-4 w-full mt-3" />
            <Skeleton className="h-4 w-4/5 mt-1" />
          </div>
        </div>
      ));
    }

    if (filteredCompanies.length === 0) {
      return (
        <div className="col-span-full text-center py-10">
          <p className="text-lg text-muted-foreground">
            No companies found{searchQuery ? ` matching "${searchQuery}"` : ""}.
          </p>
        </div>
      );
    }

    return filteredCompanies.map((company) => (
      <CompanyCard key={company.id} company={company} />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Top Bangladeshi Companies
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Explore the leading businesses shaping Bangladesh's economy across various sectors
        </p>
        
        <div className="flex justify-center mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderCompanyCards()}
      </div>
    </div>
  );
};

export default HomePage;
