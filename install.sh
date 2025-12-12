#!/bin/bash

# TradeMatch Installation Script
# This script sets up the complete TradeMatch application

echo "================================"
echo "TradeMatch Setup Script"
echo "================================"
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}→ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check prerequisites
print_step "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi
print_success "Node.js is installed: $(node --version)"

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi
print_success "npm is installed: $(npm --version)"

if ! command -v mysql &> /dev/null; then
    print_error "MySQL is not installed. Please install MySQL Server."
    exit 1
fi
print_success "MySQL is installed"

echo ""
print_step "Setting up Backend..."

# Navigate to backend directory
cd backend || { print_error "backend directory not found"; exit 1; }

# Install dependencies
print_step "Installing npm dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Create .env.local from example
if [ ! -f .env.local ]; then
    print_step "Creating .env.local..."
    cp .env.local.example .env.local
    print_success ".env.local created. Please update with your MySQL credentials."
else
    print_success ".env.local already exists"
fi

echo ""
print_step "Database Setup Instructions"
echo "Please run the following commands in your MySQL client:"
echo ""
echo "  mysql -u root -p"
echo "  source ../database/schema.sql;"
echo ""
echo "Or directly:"
echo "  mysql -u root -p < database/schema.sql"
echo ""

echo ""
print_success "Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env.local with your MySQL credentials"
echo "2. Run: mysql -u root -p < database/schema.sql"
echo "3. Start the backend: cd backend && npm run dev"
echo "4. Open index.html in your browser for the frontend"
echo ""
echo "Backend will run on: http://localhost:3000"
echo "Frontend: Open index.html in your browser"
