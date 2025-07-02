# Our Net ESP Platform

A modern Education Service Provider (ESP) and ISP customer portal built with Vue 3, TypeScript, and Tailwind CSS. This platform supports OurNet's mission to bridge the digital divide by providing both connectivity and educational opportunities to Māori communities.

## About Our Net

OurNet is pioneering the transition from a traditional Internet Service Provider (ISP) to an Education Service Provider (ESP), offering "education-led connectivity" that empowers whānau with the tools, skills, and knowledge to thrive in the digital world. Our platform integrates:

- Reliable internet connectivity
- Culturally aligned education programmes
- Digital literacy initiatives
- Community empowerment tools

## Project Structure

This project is organized using GitHub Workspaces with the following structure:

```
.
├── apps/
│   └── ournet-portal/        # Main customer and education portal
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
git clone https://github.com/Divoli/ournet-website.git
cd ournet-website
```

2. Install dependencies for all workspaces:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create your local environment file
cp apps/ournet-portal/.env.example apps/ournet-portal/.env.local
```

The `.env.local` file will contain these essential variables:

```
VITE_API_URL=http://localhost:3000
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_STRIPE_KEY=your-stripe-public-key
VITE_APPLICATION_IDENTIFIER=ournet
VITE_PUBLIC_DSN=your-sentry-dsn  # Optional, for error tracking
```

For sandbox environment testing:

```bash
# Create sandbox environment file when needed
cp apps/ournet-portal/.env.sandbox apps/ournet-portal/.env.sandbox.local
```

4. Configure Auth0:

- Create a new Single Page Application in Auth0
- Add your application URLs to Allowed Callback URLs, Allowed Logout URLs, and Allowed Web Origins
- Configure the API settings in Auth0 to match your VITE_AUTH0_AUDIENCE

5. Start the development server:

```bash
npm run dev
```

## Available Scripts

Run commands directly from the project root:

```bash
npm run dev

# Build for different environments
npm run build            # Default build
npm run build:development
npm run build:production
npm run build:sandbox

# Preview the production build
npm run preview

# Code quality and type checking
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run format      # Format code with Prettier
npm run type-check  # Run TypeScript type checking
```

## Environment Configuration

The application supports different environments:

- `.env.local` - Local development configuration (default for development)
- `.env.sandbox.local` - Sandbox environment configuration (for testing against sandbox APIs)
- `.env.production` - Production environment configuration

Development workflow:

1. Local Development (Default):

   ```bash
   # Start the development server with local configuration
   npm run dev
   ```

2. Sandbox Testing:

   ```bash
   # Start the development server with sandbox configuration
   npm run dev -- --mode sandbox
   ```

3. Production Build:

   ```bash
   # Build for production
   npm run build:production
   ```

## Type Safety

The application uses TypeScript for type safety. Key type definitions can be found in:

- `src/types/api.ts` - API interfaces
- `src/lib/validation.ts` - Form validation types

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

Please ensure your contributions align with OurNet's mission of empowering Māori communities through education-led connectivity.

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

