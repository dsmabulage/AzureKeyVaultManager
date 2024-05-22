'use server';

import { DefaultAzureCredential } from '@azure/identity';
const { SecretClient } = require('@azure/keyvault-secrets');

import { keyVaultSchema } from '@/lib/validation';

export async function fetchKeyVaultValue(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    azureClientId,
    azureClientSecret,
    azureTenantId,
    keyVaultUri,
    secretName,
  } = keyVaultSchema.parse(values);

  process.env.AZURE_TENANT_ID = azureTenantId;
  process.env.AZURE_CLIENT_ID = azureClientId;
  process.env.AZURE_CLIENT_SECRET = azureClientSecret;

  const credential = new DefaultAzureCredential();

  const client = new SecretClient(keyVaultUri, credential);

  const secret = await client.getSecret(secretName);

  return secret.value;
}
