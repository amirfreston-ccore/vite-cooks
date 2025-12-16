#!/usr/bin/env python3
"""
Flask backend server for processing NumPy flow JSON and returning real results
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import json
import traceback
from typing import Dict, Any, List

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

class NumpyFlowProcessor:
    def __init__(self):
        self.variables = {}
        self.results = {}
    
    def process_flow(self, flow_data: Dict[str, Any]) -> Dict[str, Any]:
        """Process the entire flow and return results with actual NumPy data"""
        nodes = flow_data.get('nodes', [])
        edges = flow_data.get('edges', [])
        
        # Clear previous results
        self.variables.clear()
        self.results.clear()
        
        # Sort nodes by dependencies
        try:
            sorted_nodes = self._topological_sort(nodes, edges)
        except Exception as e:
            return {'error': f'Dependency resolution failed: {str(e)}', 'success': False}
        
        # Execute each node
        for node in sorted_nodes:
            try:
                result = self._execute_node(node)
                self.results[node['id']] = {
                    'nodeId': node['id'],
                    'functionName': node['data']['name'],
                    'category': node['data']['category'],
                    'result': self._serialize_result(result),
                    'shape': list(getattr(result, 'shape', [])),
                    'dtype': str(getattr(result, 'dtype', type(result).__name__)),
                    'size': int(getattr(result, 'size', 1)),
                    'ndim': int(getattr(result, 'ndim', 0)),
                    'success': True,
                    'tableData': self._create_table_data(result),
                    'stats': self._calculate_stats(result)
                }
                self.variables[node['id']] = result
            except Exception as e:
                self.results[node['id']] = {
                    'nodeId': node['id'],
                    'functionName': node['data']['name'],
                    'category': node['data']['category'],
                    'error': str(e),
                    'success': False
                }
        
        return {
            'success': True,
            'results': self.results,
            'summary': {
                'total_nodes': len(nodes),
                'successful': sum(1 for r in self.results.values() if r.get('success', False)),
                'failed': sum(1 for r in self.results.values() if not r.get('success', False))
            }
        }
    
    def _topological_sort(self, nodes: List[Dict], edges: List[Dict]) -> List[Dict]:
        """Topological sort for correct execution order"""
        graph = {node['id']: [] for node in nodes}
        in_degree = {node['id']: 0 for node in nodes}
        
        for edge in edges:
            graph[edge['source']].append(edge['target'])
            in_degree[edge['target']] += 1
        
        queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
        result = []
        
        while queue:
            node_id = queue.pop(0)
            result.append(node_id)
            
            for neighbor in graph[node_id]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        if len(result) != len(nodes):
            raise ValueError("Circular dependency detected")
        
        node_dict = {node['id']: node for node in nodes}
        return [node_dict[node_id] for node_id in result]
    
    def _execute_node(self, node: Dict[str, Any]) -> Any:
        """Execute a single node using safe exec approach"""
        function_name = node['data']['name']
        params = node['data'].get('params', {})
        
        # Create safe execution environment
        safe_globals = {
            'np': np,
            '__builtins__': {},
        }
        
        # Add current variables to execution context
        safe_globals.update(self.variables)
        
        # Process parameters and build function call
        processed_params = self._process_parameters(params)
        param_assignments = []
        
        for key, value in processed_params.items():
            if key in ['data', 'shape', 'newshape']:
                # Handle special parameter types
                param_assignments.append(f"{key} = {value}")
            elif key == 'dtype':
                param_assignments.append(f"{key} = '{value}'")
            elif key in ['axis'] and (value == 'null' or value == '' or value is None):
                param_assignments.append(f"{key} = None")
            elif self._is_node_reference(value):
                # Direct node reference
                param_assignments.append(f"{key} = {value}")
            elif self._is_array_literal(value):
                # Array literal
                param_assignments.append(f"{key} = np.array({value})")
            else:
                # Regular parameter
                if isinstance(value, str) and not value.replace('.', '').replace('-', '').isdigit():
                    param_assignments.append(f"{key} = '{value}'")
                else:
                    param_assignments.append(f"{key} = {value}")
        
        # Handle default parameters for common cases
        if function_name in ['np.add', 'np.multiply', 'np.subtract', 'np.divide']:
            if 'x1' not in processed_params:
                available_arrays = [k for k, v in self.variables.items() if isinstance(v, np.ndarray)]
                if available_arrays:
                    param_assignments.append(f"x1 = {available_arrays[0]}")
                else:
                    param_assignments.append("x1 = np.array([1, 2, 3])")
            
            if 'x2' not in processed_params:
                available_arrays = [k for k, v in self.variables.items() if isinstance(v, np.ndarray)]
                if len(available_arrays) > 1:
                    param_assignments.append(f"x2 = {available_arrays[-1]}")
                elif available_arrays:
                    param_assignments.append(f"x2 = {available_arrays[0]}")
                else:
                    param_assignments.append("x2 = np.array([1, 2, 3])")
        
        elif function_name in ['np.sin', 'np.cos', 'np.mean', 'np.std', 'np.sum', 'np.transpose']:
            param_key = 'x' if function_name in ['np.sin', 'np.cos'] else 'a'
            if param_key not in processed_params:
                available_arrays = [k for k, v in self.variables.items() if isinstance(v, np.ndarray)]
                if available_arrays:
                    param_assignments.append(f"{param_key} = {available_arrays[-1]}")
                else:
                    param_assignments.append(f"{param_key} = np.array([1, 2, 3])")
        
        # Build and execute the function call
        code_lines = param_assignments + [f"result = {function_name}({', '.join(processed_params.keys())})"]
        code = '\n'.join(code_lines)
        
        try:
            exec(code, safe_globals)
            return safe_globals['result']
        except Exception as e:
            raise ValueError(f"Execution failed for {function_name}: {str(e)}")
    
    def _parse_data(self, data_str):
        """Parse data string to Python object"""
        try:
            return eval(data_str)
        except:
            return [1, 2, 3]
    
    def _parse_shape(self, shape_str):
        """Parse shape string to tuple"""
        try:
            return eval(shape_str)
        except:
            return (3,)
    
    def _is_node_reference(self, value):
        """Check if value is a node reference"""
        return isinstance(value, str) and value in self.variables
    
    def _is_array_literal(self, value):
        """Check if value is an array literal"""
        return isinstance(value, str) and value.strip().startswith('[') and value.strip().endswith(']')
    
    def _process_parameters(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Process parameters"""
        processed = {}
        for key, value in params.items():
            if value != '' and value is not None:
                processed[key] = value
        return processed
    
    def _serialize_result(self, result) -> Any:
        """Serialize NumPy result for JSON"""
        if isinstance(result, np.ndarray):
            if result.size <= 1000:  # Serialize arrays up to 1000 elements
                return result.tolist()
            else:
                return f"<Large array: shape={result.shape}, dtype={result.dtype}>"
        elif isinstance(result, (np.integer, np.floating)):
            return float(result)
        else:
            return str(result)
    
    def _create_table_data(self, result):
        """Create table data for frontend display"""
        if isinstance(result, np.ndarray):
            if result.ndim == 0:
                return {'type': 'scalar', 'value': float(result)}
            elif result.ndim == 1:
                return {
                    'type': 'vector',
                    'data': result.tolist()[:100],  # Limit to 100 elements
                    'hasMore': result.size > 100
                }
            elif result.ndim == 2:
                rows, cols = result.shape
                max_rows, max_cols = 50, 20
                return {
                    'type': 'matrix',
                    'data': result[:max_rows, :max_cols].tolist(),
                    'shape': [rows, cols],
                    'hasMore': rows > max_rows or cols > max_cols
                }
            else:
                return {'type': 'tensor', 'shape': list(result.shape)}
        else:
            return {'type': 'scalar', 'value': float(result)}
    
    def _calculate_stats(self, result):
        """Calculate statistics for the result"""
        if isinstance(result, np.ndarray) and result.size > 0:
            try:
                return {
                    'min': float(np.min(result)),
                    'max': float(np.max(result)),
                    'mean': float(np.mean(result)),
                    'std': float(np.std(result)),
                    'sum': float(np.sum(result))
                }
            except:
                return {}
        return {}

# Global processor instance
processor = NumpyFlowProcessor()

@app.route('/api/process-flow', methods=['POST'])
def process_flow():
    """Process NumPy flow and return results"""
    try:
        flow_data = request.get_json()
        if not flow_data:
            return jsonify({'error': 'No flow data provided', 'success': False}), 400
        
        results = processor.process_flow(flow_data)
        return jsonify(results)
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'traceback': traceback.format_exc(),
            'success': False
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'numpy_version': np.__version__})

if __name__ == '__main__':
    print("Starting NumPy Flow Backend Server...")
    print("NumPy version:", np.__version__)
    app.run(debug=True, host='0.0.0.0', port=1990)