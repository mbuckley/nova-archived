#!/bin/bash

CHANGED=$(git status --porcelain)

echo "Verifying build artifacts"

if [ -n "${CHANGED}" ]; then
  echo "❌ ERROR: You have uncommitted build artifacts. Please run 'npx lerna run build' locally and commit files"
  git status -s
  exit 1;
else
  echo "✅ Done"
  exit 0;
fi
