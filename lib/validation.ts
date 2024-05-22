import { z } from 'zod';

export const keyVaultSchema = z.object({
  azureTenantId: z.string().min(1, "Required"),
  azureClientId: z.string().min(1, "Required"),
  azureClientSecret: z.string().min(1, "Required"),
  keyVaultUri: z.string().min(1, "Required"),
  secretName: z.string().min(1, "Required"),
});

export type KeyVault = z.infer<typeof keyVaultSchema>;
