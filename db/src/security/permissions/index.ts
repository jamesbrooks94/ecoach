import { adminPermissions } from './admin'
const roleMapping: { [key: string]: string[] } = {
  Admin: adminPermissions,
}

export const getPermissions = (role: string): string[] => roleMapping[role] || []
