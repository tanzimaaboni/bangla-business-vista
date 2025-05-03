
import { useState, useEffect } from "react";
import { Company, PaginationOptions } from "@/types";
import { companiesApi } from "@/services/api";
import { CompanyCard } from "@/components/CompanyCard";
import { SearchBar } from "@/components/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

const PAGE_SIZE = 6; // Number of companies per page for HomePage

const HomePage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationOptions>({
    currentPage: 1,
    totalPages: 1,
    pageSize: PAGE_SIZE
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCompanies();
  }, [pagination.currentPage]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      if (searchQuery) {
        const result = await companiesApi.search(searchQuery, pagination.currentPage, pagination.pageSize);
        setFilteredCompanies(result.data);
        setPagination(result.pagination);
      } else {
        const result = await companiesApi.getAll(pagination.currentPage, pagination.pageSize);
        setCompanies(result.data);
        setFilteredCompanies(result.data);
        setPagination(result.pagination);
      }
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
      const result = await companiesApi.getAll(1, pagination.pageSize);
      setCompanies(result.data);
      setFilteredCompanies(result.data);
      setPagination(result.pagination);
      return;
    }
    
    try {
      const result = await companiesApi.search(query, 1, pagination.pageSize);
      setFilteredCompanies(result.data);
      setPagination(result.pagination);
      
      if (result.data.length === 0) {
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

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const renderPagination = () => {
    const { currentPage, totalPages } = pagination;
    
    if (totalPages <= 1) return null;
    
    return (
      <Pagination className="mt-8">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
          )}
          
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            
            // Show first page, last page, and pages around current page
            if (
              pageNum === 1 ||
              pageNum === totalPages ||
              (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === currentPage}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            
            // Show ellipsis for breaks in page numbers
            if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
              return <PaginationItem key={`ellipsis-${pageNum}`}><PaginationEllipsis /></PaginationItem>;
            }
            
            return null;
          })}
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  const renderCompanyCards = () => {
    if (loading && pagination.currentPage === 1) {
      return Array.from({ length: pagination.pageSize }).map((_, index) => (
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
      
      {/* Pagination controls */}
      <div className="flex justify-center">
        {renderPagination()}
      </div>
    </div>
  );
};

export default HomePage;
