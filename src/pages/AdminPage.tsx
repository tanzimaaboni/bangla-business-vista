
import { useState, useEffect } from "react";
import { Company } from "@/types";
import { companiesApi } from "@/services/api";
import { CompanyCard } from "@/components/CompanyCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { CompanyForm } from "@/components/CompanyForm";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);
  const [companyToDelete, setCompanyToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
      return;
    }
    
    fetchCompanies();
  }, [isAuthenticated, isAdmin, navigate]);

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
    if (!query.trim()) {
      setFilteredCompanies(companies);
      return;
    }
    
    try {
      const results = await companiesApi.search(query);
      setFilteredCompanies(results);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Failed to perform search",
        variant: "destructive"
      });
    }
  };

  const handleAddCompany = async (company: Omit<Company, "id">) => {
    try {
      const newCompany = await companiesApi.add(company);
      setCompanies([...companies, newCompany]);
      setFilteredCompanies([...filteredCompanies, newCompany]);
      toast({
        title: "Success",
        description: "Company added successfully"
      });
    } catch (error) {
      console.error("Error adding company:", error);
      toast({
        title: "Error",
        description: "Failed to add company",
        variant: "destructive"
      });
    }
  };

  const handleEditCompany = async (company: Omit<Company, "id">) => {
    if (!selectedCompany) return;
    
    try {
      const updatedCompany = await companiesApi.update(selectedCompany.id, company);
      
      const updatedCompanies = companies.map((c) =>
        c.id === selectedCompany.id ? updatedCompany : c
      );
      
      setCompanies(updatedCompanies);
      setFilteredCompanies(
        filteredCompanies.map((c) =>
          c.id === selectedCompany.id ? updatedCompany : c
        )
      );
      
      toast({
        title: "Success",
        description: "Company updated successfully"
      });
    } catch (error) {
      console.error("Error updating company:", error);
      toast({
        title: "Error",
        description: "Failed to update company",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCompany = async () => {
    if (!companyToDelete) return;
    
    try {
      await companiesApi.delete(companyToDelete);
      
      const updatedCompanies = companies.filter((c) => c.id !== companyToDelete);
      setCompanies(updatedCompanies);
      setFilteredCompanies(filteredCompanies.filter((c) => c.id !== companyToDelete));
      
      setCompanyToDelete(null);
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Company deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting company:", error);
      toast({
        title: "Error",
        description: "Failed to delete company",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (company: Company) => {
    setSelectedCompany(company);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setCompanyToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
        <p className="text-muted-foreground mb-8">
          Manage company listings from this dashboard
        </p>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search companies to manage..."
          />
          
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-bangladesh-green hover:bg-bangladesh-green/90"
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add New Company
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompanies.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-muted-foreground">
              No companies found. Add a new company to get started.
            </p>
          </div>
        ) : (
          filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
            />
          ))
        )}
      </div>
      
      {/* Add Company Dialog */}
      <CompanyForm
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddCompany}
        title="Add New Company"
      />
      
      {/* Edit Company Dialog */}
      <CompanyForm
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditCompany}
        company={selectedCompany}
        title="Edit Company"
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteCompany}
        title="Delete Company"
        description="Are you sure you want to delete this company? This action cannot be undone."
      />
    </div>
  );
};

export default AdminPage;
