
// Export supabase client
export { supabase, tableExists } from './client';

// Export table creation functions
export { createContainersTable } from './tables/containers';
export { createSalesDataTable } from './tables/sales-data';
export { createProjectsTable } from './tables/projects';
export { createTokenInvestmentsTable } from './tables/token-investments';
export { createUsersTable } from './tables/users';
