#!/bin/bash

echo "Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo "To deploy to Netlify:"
    echo "1. Install Netlify CLI: npm install -g netlify-cli"
    echo "2. Login to Netlify: ntl login"
    echo "3. Deploy: ntl deploy --prod"
    echo ""
    echo "Or use the Netlify dashboard:"
    echo "- Go to https://app.netlify.com"
    echo "- Create new site from Git"
    echo "- Connect your repository"
    echo "- Set build command: npm run build"
    echo "- Set publish directory: dist"
    echo "- Deploy!"
else
    echo "Build failed!"
    exit 1
fi