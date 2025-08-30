# Supabase Authentication Setup for ALX Polly

This guide will help you set up Supabase authentication for your ALX Polly polling application.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `alx-polly` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
5. Click "Create new project"

## 2. Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

## 3. Configure Environment Variables

Add the following to your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from step 2.

## 4. Configure Authentication Settings

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Configure the following:

### Site URL
- Set to `http://localhost:3000` for development
- Set to your production URL for deployment

### Redirect URLs
Add these redirect URLs:
- `http://localhost:3000/auth/callback`
- `http://localhost:3000/auth/reset-password`
- `http://localhost:3000/polls`

### Email Templates (Optional)
You can customize the email templates in **Authentication** → **Email Templates**

## 5. Enable Email Confirmation (Recommended)

1. Go to **Authentication** → **Settings**
2. Enable "Enable email confirmations"
3. This ensures users verify their email before accessing the app

## 6. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/auth/register`
3. Create a test account
4. Check your email for the confirmation link
5. Sign in at `http://localhost:3000/auth/login`

## 7. Database Schema (Optional)

If you want to store additional user data, you can create a `profiles` table:

```sql
-- Create a profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

## 8. Production Deployment

When deploying to production:

1. Update your environment variables with production URLs
2. Update Supabase redirect URLs to include your production domain
3. Consider enabling additional security features like:
   - Rate limiting
   - CAPTCHA
   - Two-factor authentication

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Double-check your environment variables
   - Ensure you're using the `anon` key, not the `service_role` key

2. **Redirect errors**
   - Verify your redirect URLs in Supabase settings
   - Check that your `NEXT_PUBLIC_APP_URL` is correct

3. **Email not sending**
   - Check your Supabase project's email settings
   - Verify your site URL configuration

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Next.js Documentation](https://nextjs.org/docs)

## Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables for all sensitive configuration
- Regularly rotate your API keys
- Monitor your Supabase dashboard for unusual activity
