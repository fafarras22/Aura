
// Admin and user credentials - in a real app, this would be stored securely on the server
export const ADMIN_PASSWORD = "admin@akar2025"; 

export const USERS = [
  { id: "admin-1", name: "Muhammad Farras", role: "admin" as const },
  { id: "client-1", name: "Guest", role: "client" as const, containerId: "CONT-001" }
];

// Mock container data - in a real app, this would come from a database
export const CONTAINERS = [
  { 
    id: "CONT-001", 
    name: "Jakarta Farm Container A", 
    location: "Jakarta", 
    status: "active" as const, 
    owner: "Guest",
    lastPayment: new Date(2025, 2, 15),
    nextPaymentDue: new Date(2025, 3, 15)
  },
  { 
    id: "CONT-002", 
    name: "Surabaya Farm Container B", 
    location: "Surabaya", 
    status: "active" as const, 
    owner: "Company B",
    lastPayment: new Date(2025, 2, 10),
    nextPaymentDue: new Date(2025, 3, 10)
  },
  { 
    id: "CONT-003", 
    name: "Bandung Farm Container C", 
    location: "Bandung", 
    status: "maintenance" as const, 
    owner: "Company C",
    lastPayment: new Date(2025, 1, 25),
    nextPaymentDue: new Date(2025, 2, 25)
  }
];

// User credentials - in a real app, these would be hashed and stored securely
export const USER_PASSWORDS: Record<string, string> = {
  "Muhammad Farras": "admin123",
  "Guest": "guest123"
};

// Function to add a new user (for sign-up functionality)
export const addNewUser = (name: string, password: string) => {
  // Generate a new user ID
  const userId = `client-${USERS.length + 1}`;
  
  // Create the new user object
  const newUser = {
    id: userId,
    name,
    role: "client" as const,
    // No containerId initially, would be assigned when they purchase/register a container
  };
  
  // Add the user to the USERS array
  USERS.push(newUser);
  
  // Add the password to the USER_PASSWORDS object
  USER_PASSWORDS[name] = password;
  
  return newUser;
};
