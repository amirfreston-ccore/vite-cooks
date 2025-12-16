# NumPy React Flow App

A full-featured React Flow application for creating visual NumPy function workflows with JSON output processing.

## Features

- **Visual Node Editor**: Drag-and-drop interface for NumPy functions
- **Function Categories**: Array Creation, Mathematical, Statistics, Linear Algebra, Array Manipulation
- **Parameter Editing**: Interactive parameter configuration for each function
- **Real-time JSON Output**: Live JSON generation of the flow structure
- **Python Code Generation**: Automatic Python code generation from flows
- **Processors**: Both JavaScript and Python processors for executing flows

## Installation

### Frontend Setup
```bash
# Install Node.js dependencies
npm install
# or
yarn install
```

### Backend Setup
```bash
# Install Python dependencies
cd backend
pip3 install -r requirements.txt
```

## Usage

### Start Backend Server (Required for Real NumPy Processing)
```bash
# Terminal 1: Start Python backend
cd backend
python3 server.py
# Backend will run on http://localhost:1990
```

### Start Frontend Development Server
```bash
# Terminal 2: Start React frontend
npm run dev
# Frontend will run on http://localhost:1996
```

### Start Both (Alternative)
```bash
# Start both backend and frontend together
npm run start:full
```

### Building the App
```bash
npm run build
# or
yarn build
```

## Application Structure

### Main Components

1. **Sidebar** (`src/components/Sidebar.jsx`)
   - Browse NumPy functions by category
   - Search functionality
   - Drag-and-drop to canvas

2. **NumpyNode** (`src/components/NumpyNode.jsx`)
   - Custom node component for NumPy functions
   - Parameter editing interface
   - Visual categorization with color coding

3. **JsonOutput** (`src/components/JsonOutput.jsx`)
   - Real-time JSON output display
   - Python code generation
   - Export functionality

4. **App** (`src/App.jsx`)
   - Main React Flow integration
   - Flow management and state handling

### NumPy Functions Database

The app includes comprehensive NumPy function definitions in `src/numpyFunctions.js`:

- **Array Creation**: array, zeros, ones, linspace
- **Mathematical**: add, multiply, sin, cos
- **Statistics**: mean, std, sum
- **Linear Algebra**: dot, transpose
- **Array Manipulation**: reshape, concatenate

## JSON Output Format

The app generates JSON in the following structure:

```json
{
  "nodes": [
    {
      "id": "node_0",
      "type": "numpyNode",
      "position": { "x": 100, "y": 100 },
      "data": {
        "name": "np.array",
        "category": "Array Creation",
        "description": "Create an array from a list or tuple",
        "inputs": ["data", "dtype"],
        "outputs": ["ndarray"],
        "params": {
          "data": "[1, 2, 3]",
          "dtype": "float64"
        }
      }
    }
  ],
  "edges": [
    {
      "id": "edge_0",
      "source": "node_0",
      "target": "node_1",
      "sourceHandle": "ndarray",
      "targetHandle": "x"
    }
  ]
}
```

## Processors

### Python Processor (`src/processors/pythonProcessor.py`)

Execute NumPy flows from JSON:

```bash
python src/processors/pythonProcessor.py flow.json
```

Features:
- Topological sorting for correct execution order
- Parameter type conversion
- Result serialization
- Error handling

### JavaScript Processor (`src/processors/jsProcessor.js`)

Analyze and process flows:

```bash
node src/processors/jsProcessor.js flow.json
```

Features:
- Flow analysis and complexity calculation
- Dependency graph generation
- Code generation (Python and JavaScript)
- Cycle detection

## Example Workflows

### Basic Array Operations
1. Create array with `np.array`
2. Apply mathematical operations (`np.sin`, `np.cos`)
3. Calculate statistics (`np.mean`, `np.std`)

### Linear Algebra Pipeline
1. Create matrices with `np.ones` and `np.zeros`
2. Perform matrix multiplication with `np.dot`
3. Transpose results with `np.transpose`

### Data Processing Flow
1. Generate data with `np.linspace`
2. Reshape arrays with `np.reshape`
3. Concatenate results with `np.concatenate`

## Advanced Features

### Parameter Types
- **Arrays**: Reference other nodes or literal arrays
- **Shapes**: Tuple notation for array dimensions
- **Scalars**: Numeric values for mathematical operations
- **Axes**: Dimension specification for statistical operations

### Visual Features
- Color-coded nodes by category
- Input/output handles for connections
- Expandable parameter panels
- Mini-map for navigation
- Background grid and controls

### Export Options
- JSON flow definition
- Python executable code
- Copy to clipboard
- Download files

## Development

### Adding New Functions

1. Add function definition to `src/numpyFunctions.js`
2. Update the Python processor mapping in `pythonProcessor.py`
3. Test with the JavaScript processor

### Customizing Nodes

Modify `src/components/NumpyNode.jsx` to:
- Change visual appearance
- Add new parameter types
- Implement custom validation

### Extending Processors

Both processors are modular and can be extended with:
- New function implementations
- Additional output formats
- Enhanced error handling
- Performance optimizations

## Requirements

- Node.js 16+
- React 18+
- Python 3.7+ (for Python processor)
- NumPy (for Python processor execution)

## License

MIT License - see LICENSE file for details.