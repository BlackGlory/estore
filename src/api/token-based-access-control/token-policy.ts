import { AccessControlDAO } from '@dao/index.js'

export function getAllNamespaces(): string[] {
  return AccessControlDAO.TokenPolicy.getAllNamespacesWithTokenPolicies()
}

export function get(namespace: string): {
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
} {
  return AccessControlDAO.TokenPolicy.getTokenPolicies(namespace)
}

export function setWriteTokenRequired(namespace: string, val: boolean): void {
  return AccessControlDAO.TokenPolicy.setWriteTokenRequired(namespace, val)
}

export function unsetWriteTokenRequired(namespace: string): void {
  return AccessControlDAO.TokenPolicy.unsetWriteTokenRequired(namespace)
}

export function setReadTokenRequired(namespace: string, val: boolean): void {
  return AccessControlDAO.TokenPolicy.setReadTokenRequired(namespace, val)
}

export function unsetReadTokenRequired(namespace: string): void {
  return AccessControlDAO.TokenPolicy.unsetReadTokenRequired(namespace)
}

export function setDeleteTokenRequired(namespace: string, val: boolean): void {
  return AccessControlDAO.TokenPolicy.setDeleteTokenRequired(namespace, val)
}

export function unsetDeleteTokenRequired(namespace: string): void {
  return AccessControlDAO.TokenPolicy.unsetDeleteTokenRequired(namespace)
}
