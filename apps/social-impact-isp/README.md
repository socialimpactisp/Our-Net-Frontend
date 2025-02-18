# Social Impact ISP Platform

A modern ISP customer portal built with Vue 3, TypeScript, and Tailwind CSS. This project uses GitHub Workspaces to manage multiple packages and applications.

## Project Structure

This project is organized using GitHub Workspaces with the following structure:

```
.
├── apps/
│   └── social-impact-isp/    # Main customer portal application
├── packages/
│   ├── api/                  # API client package
│   └── ui/                   # Shared UI component library
└── package.json
```

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher) for workspace support
- Git
- Auth0 account for authentication
- Stripe account for payments

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-org/social-impact-isp.git
cd social-impact-isp
```

2. Install dependencies for all workspaces:

```bash
npm install
```

3. Set up environment variables:

```bash
cp apps/social-impact-isp/.env.sandbox apps/social-impact-isp/.env.local
```

Required environment variables:

```
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-api-audience
VITE_API_URL=your-api-url
VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key
```

4. Configure Auth0:

- Create a new Single Page Application in Auth0
- Add your application URLs to Allowed Callback URLs, Allowed Logout URLs, and Allowed Web Origins
- Configure the API settings in Auth0 to match your VITE_AUTH0_AUDIENCE

5. Start the development server:

```bash
npm -w social-impact-isp run dev
```

## Available Scripts

### Working with All Workspaces

Run a command across all workspaces:

```bash
npm --workspaces run <command>
```

Example:

```bash
npm --workspaces run build
```

### Working with Individual Workspaces

Run a command in a specific workspace:

```bash
npm -w <workspace-name> run <command>
```

Examples:

```bash
# Start the main application
npm -w social-impact-isp run dev

# Run UI component storybook
npm -w @affinity/ui run storybook

# Build the API client
npm -w @affinity/api run build
```

## Development Tools

### UI Component Development

We use Storybook for UI component development and documentation:

```bash
npm -w @affinity/ui run storybook
```

### Building for Production

1. Build all packages and applications:

```bash
npm --workspaces run build
```

2. Or build specific workspaces:

```bash
npm -w social-impact-isp run build
```

## Environment Configuration

The application supports different environments:

- `.env.sandbox` - Sandbox environment configuration (use for development)
- `.env.production` - Production environment configuration

Copy the appropriate environment file and rename it to `.env.local` for local development.

## Type Safety

The application uses TypeScript for type safety. Key type definitions can be found in:

- `src/types/api.ts` - API interfaces
- `src/lib/validation.ts` - Form validation types

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Troubleshooting

Common issues:

1. Auth0 authentication issues:
   - Verify your Auth0 configuration matches the environment variables
   - Check allowed URLs in Auth0 settings
   - Ensure VITE_AUTH0_AUDIENCE matches your API identifier

2. Form validation errors:
   - Check type definitions in validation.ts
   - Ensure form fields have proper type assertions

3. API connection issues:
   - Verify VITE_API_URL is correct
   - Check API is running and accessible

## License

[Your License Information Here]
