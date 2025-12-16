#!/bin/bash

# Start NumPy Flow Backend Server

echo "Starting NumPy Flow Backend..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is required but not installed."
    exit 1
fi

# Check if pip is available
if ! command -v pip3 &> /dev/null; then
    echo "pip3 is required but not installed."
    exit 1
fi

# Install dependencies
echo "Installing Python dependencies..."
pip3 install -r requirements.txt

# Start the Flask server
echo "Starting Flask server on http://localhost:5000"
python3 server.py