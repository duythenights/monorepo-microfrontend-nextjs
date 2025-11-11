#!/bin/bash
set -e

echo "🔧 Node version: $(node --version)"
echo "📦 pnpm version: $(pnpm --version)"

# Setup SSH for private submodules (if needed)
if [ -n "$SSH_PRIVATE_KEY" ]; then
  echo "🔑 Setting up SSH key..."
  mkdir -p ~/.ssh
  echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_ed25519
  chmod 600 ~/.ssh/id_ed25519
  ssh-keyscan github.com >> ~/.ssh/known_hosts 2>/dev/null
  git config --global url."git@github.com:".insteadOf "https://github.com/"
fi

# Update submodules
echo "📦 Initializing submodules..."
git submodule sync --recursive
git submodule update --init --recursive

# Install dependencies with pnpm
echo "📦 Installing dependencies with pnpm..."
pnpm install --frozen-lockfile

# Build specific app
if [ -n "$1" ]; then
  echo "🔨 Building $1..."
  pnpm turbo run build --filter=$1
else
  echo "🔨 Building all apps..."
  pnpm turbo run build
fi

echo "✅ Build completed!"