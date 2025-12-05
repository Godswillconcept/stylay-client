# Stylay - Deployment Guide

This guide covers how to deploy your Stylay React application to Netlify with GitHub integration.

## Prerequisites

- GitHub repository for your project
- Netlify account

## Option 1: Manual Deployment via Netlify Dashboard

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Go to [Netlify](https://app.netlify.com) and:**
   - Click "Add new site"
   - Choose "Import an existing project"
   - Connect your GitHub account
   - Select your repository

3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add environment variables:**
   - Go to Site settings → Build & deploy → Environment
   - Add variables:
     - `VITE_API_URL`: `https://merry-jennet-lenient.ngrok-free.app/api/v1`
     - `VITE_DOMAIN_URL`: `https://merry-jennet-lenient.ngrok-free.app`
     - `NODE_VERSION`: `20`

5. **Deploy!**

## Option 2: GitHub Actions + Netlify (Recommended)

This setup automatically deploys your site when you push to the main/master branch.

### Setup Steps:

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git branch -M main
   git push -u origin main
   ```

2. **Get Netlify credentials:**
   - Go to [Netlify User Settings](https://app.netlify.com/user/applications#personal-access-tokens)
   - Create a new personal access token
   - Note your Site ID from Site settings

3. **Add GitHub Secrets:**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
     - `NETLIFY_SITE_ID`: Your Netlify site ID
     - `VITE_API_URL`: `https://merry-jennet-lenient.ngrok-free.app/api/v1`
     - `VITE_DOMAIN_URL`: `https://merry-jennet-lenient.ngrok-free.app`

4. **Trigger deployment:**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions workflow"
   git push origin main
   ```

5. **Monitor deployment:**
   - Check the Actions tab in your GitHub repository
   - View deployment status on Netlify

## Environment Variables

The following environment variables are required:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://merry-jennet-lenient.ngrok-free.app/api/v1` |
| `VITE_DOMAIN_URL` | `https://merry-jennet-lenient.ngrok-free.app` |
| `NODE_VERSION` | `20` |

## Troubleshooting

### Build Failures
- Check the build logs in Netlify or GitHub Actions
- Ensure all dependencies are in package.json
- Verify environment variables are set correctly

### API Connection Issues
- Confirm `VITE_API_URL` is set correctly
- Check if the API endpoint is accessible
- Verify CORS settings on the backend

### Deployment Issues
- Ensure your repository is public or you have proper permissions
- Check Netlify plan limits (bandwidth, builds)
- Verify GitHub Actions are enabled for your repository

## Files Created/Modified

- `netlify.toml` - Netlify configuration
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `DEPLOYMENT.md` - This file