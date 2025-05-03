
import { Company, User } from "@/types";

// Mock company data
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Grameen Bank",
    sector: "Banking",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=150&auto=format&fit=crop",
    headquarters: "Dhaka",
    founded: "1983",
    revenue: "$380 million",
    employees: "25,000+",
    website: "https://www.grameen.com",
    description: "Pioneering microfinance organization founded by Nobel Peace Prize winner Muhammad Yunus."
  },
  {
    id: "2",
    name: "BRAC",
    sector: "NGO & Social Enterprise",
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=150&auto=format&fit=crop",
    headquarters: "Dhaka",
    founded: "1972",
    revenue: "$900 million",
    employees: "100,000+",
    website: "https://www.brac.net",
    description: "One of the largest NGOs in the world, focused on alleviating poverty and empowering the poor."
  },
  {
    id: "3",
    name: "Beximco Group",
    sector: "Conglomerate",
    logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=150&auto=format&fit=crop",
    headquarters: "Dhaka",
    founded: "1970",
    revenue: "$1.2 billion",
    employees: "45,000+",
    website: "https://www.beximco.com",
    description: "Diversified conglomerate with interests in pharmaceuticals, textiles, and real estate."
  },
  {
    id: "4",
    name: "Square Group",
    sector: "Pharmaceuticals & Consumer Goods",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=150&auto=format&fit=crop",
    headquarters: "Dhaka",
    founded: "1958",
    revenue: "$700 million",
    employees: "28,000+",
    website: "https://www.squaregroup.com",
    description: "Leading pharmaceutical company with diversified interests."
  },
  {
    id: "5",
    name: "Bashundhara Group",
    sector: "Conglomerate",
    logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=150&auto=format&fit=crop",
    headquarters: "Dhaka",
    founded: "1987",
    revenue: "$1.5 billion",
    employees: "30,000+",
    website: "https://www.bashundharagroup.com",
    description: "Major conglomerate with businesses in paper, cement, real estate, and media."
  },
  {
    id: "6",
    name: "Grameenphone",
    sector: "Telecommunications",
    logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=150&auto=format&fit=crop",
    headquarters: "Dhaka",
    founded: "1997",
    revenue: "$1.6 billion",
    employees: "5,000+",
    website: "https://www.grameenphone.com",
    description: "Largest mobile telecommunications operator in Bangladesh."
  },
  {
    id: "7",
    name: "ACI Limited",
    sector: "Consumer Goods & Pharmaceuticals",
    logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=150&auto=format&fit=crop",
    headquarters: "Dhaka",
    founded: "1968",
    revenue: "$400 million",
    employees: "15,000+",
    website: "https://www.aci-bd.com",
    description: "Major player in pharmaceuticals, consumer brands, and agriculture."
  },
  {
    id: "8",
    name: "PRAN-RFL Group",
    sector: "Food Processing & Consumer Goods",
    logo: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=150&auto=format&fit=crop",
    headquarters: "Dhaka",
    founded: "1981",
    revenue: "$800 million",
    employees: "100,000+",
    website: "https://www.prangroup.com",
    description: "Leading food and beverage processor and exporter."
  },
  {
    id: "9",
    name: "Walton Group",
    sector: "Electronics & Home Appliances",
    logo: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=150&auto=format&fit=crop",
    headquarters: "Dhaka",
    founded: "1977",
    revenue: "$950 million",
    employees: "25,000+",
    website: "https://www.waltonbd.com",
    description: "Bangladesh's largest electronics manufacturer and exporter."
  },
  {
    id: "10",
    name: "Akij Group",
    sector: "Conglomerate",
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=150&auto=format&fit=crop",
    headquarters: "Dhaka",
    founded: "1950",
    revenue: "$1.1 billion",
    employees: "55,000+",
    website: "https://www.akij.net",
    description: "Diversified conglomerate with businesses in tobacco, food, textiles, and cement."
  }
];

// Mock admin credentials
const mockAdmin: User = {
  username: "admin",
  password: "admin123",
  isAdmin: true
};

let companies = [...mockCompanies];

// Simulate JWT token generation
const generateToken = (user: User): string => {
  return `mock-jwt-token-${user.username}-${Date.now()}`;
};

// Service functions to simulate API calls
export const companiesApi = {
  // Get all companies
  getAll: async (): Promise<Company[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...companies]);
      }, 300);
    });
  },

  // Search companies
  search: async (query: string): Promise<Company[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = companies.filter(
          (company) =>
            company.name.toLowerCase().includes(query.toLowerCase()) ||
            company.sector.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  },

  // Get a single company by ID
  getById: async (id: string): Promise<Company | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const company = companies.find((c) => c.id === id);
        resolve(company);
      }, 300);
    });
  },

  // Add a new company
  add: async (company: Omit<Company, "id">): Promise<Company> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCompany = {
          ...company,
          id: `${companies.length + 1}`
        };
        companies = [...companies, newCompany];
        resolve(newCompany);
      }, 300);
    });
  },

  // Update a company
  update: async (id: string, company: Partial<Company>): Promise<Company> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = companies.findIndex((c) => c.id === id);
        if (index !== -1) {
          companies[index] = { ...companies[index], ...company };
          resolve(companies[index]);
        } else {
          reject(new Error("Company not found"));
        }
      }, 300);
    });
  },

  // Delete a company
  delete: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        companies = companies.filter((c) => c.id !== id);
        resolve(true);
      }, 300);
    });
  }
};

// Auth service
export const authApi = {
  // Login
  login: async (username: string, password: string): Promise<{ user: User; token: string } | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === mockAdmin.username && password === mockAdmin.password) {
          resolve({
            user: { ...mockAdmin },
            token: generateToken(mockAdmin)
          });
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  // Verify token (simplified)
  verifyToken: async (token: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(token.startsWith("mock-jwt-token-admin"));
      }, 300);
    });
  }
};
