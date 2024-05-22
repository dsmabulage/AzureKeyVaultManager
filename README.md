# Azure Key Vault Secret Retrieval

This project demonstrates how to retrieve Azure Key Vault secrets using an App Registration with Managed Identity in a Node.js application. Follow the instructions below to set up your Azure Key Vault, configure the Managed Identity, and retrieve secrets from the Key Vault using a web interface.

## Prerequisites

- Azure account
- Access to the Azure Portal

## Setup Instructions

### 1. Create Azure Key Vault and Assign Managed Identity

Follow the detailed steps in [this Medium article](https://medium.com/@dileepa.mabulage.edu/access-azure-keyvault-secrets-through-nodejs-application-ccae7a7155c1) to:

1. **Create an Azure Key Vault**:
   - Log in to the Azure Portal.
   - Create a new Key Vault.
   - Note down the Key Vault URI.

2. **Register an Application**:
   - Navigate to Azure Active Directory.
   - Register a new application.
   - Note down the `Client ID` and `Tenant ID`.

3. **Create a Client Secret**:
   - In the newly created application, create a client secret.
   - Note down the `Client Secret`.

4. **Assign Access Policies**:
   - Go to your Key Vault.
   - Assign an access policy to the application, allowing it to read secrets.

### 2. Retrieve Secrets Using the Web Interface

After configuring your Key Vault and Managed Identity, you can retrieve secrets using a web interface:

1. **Go to the Website**:
   - Visit [Azure Key Vault Manager](https://azure-key-vault-manager.vercel.app/).

2. **Enter Credentials**:
   - Enter your `Client ID`, `Client Secret`, `Tenant ID`, and the names of the secrets you wish to retrieve.

3. **Retrieve Secrets**:
   - Submit the form to retrieve your secrets from the Key Vault.

## Usage

This project allows you to securely manage and retrieve secrets stored in Azure Key Vault through a web-based interface. Ensure you follow security best practices by keeping your credentials confidential and rotating them periodically.

## Contributing

Feel free to open issues or pull requests if you have any suggestions or improvements.
