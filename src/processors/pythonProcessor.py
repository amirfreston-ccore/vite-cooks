#!/usr/bin/env python3
"""
Python processor for NumPy React Flow JSON output
Executes the flow and generates actual NumPy results
"""

import json
import numpy as np
import sys
from typing import Dict, Any, List

class NumpyFlowProcessor:
    def __init__(self):
        self.variables = {}
        self.results = {}
    
    def process_flow(self, flow_data: Dict[str, Any]) -> Dict[str, Any]:
        """Process the entire flow and return results"""
        nodes = flow_data.get('nodes', [])
        edges = flow_data.get('edges', [])
        
        # Sort nodes by dependencies (simple topological sort)
        sorted_nodes = self._topological_sort(nodes, edges)
        
        # Execute each node
        for node in sorted_nodes:
            try:
                result = self._execute_node(node)
                self.results[node['id']] = {
                    'function': node['data']['name'],
                    'result': self._serialize_result(result),
                    'shape': getattr(result, 'shape', None),
                    'dtype': str(getattr(result, 'dtype', type(result).__name__)),
                    'success': True
                }
                self.variables[node['id']] = result
            except Exception as e:
                self.results[node['id']] = {
                    'function': node['data']['name'],
                    'error': str(e),
                    'success': False
                }
        
        return {
            'flow_id': flow_data.get('id', 'unknown'),
            'execution_results': self.results,
            'summary': {
                'total_nodes': len(nodes),
                'successful': sum(1 for r in self.results.values() if r['success']),
                'failed': sum(1 for r in self.results.values() if not r['success'])
            }
        }
    
    def _topological_sort(self, nodes: List[Dict], edges: List[Dict]) -> List[Dict]:
        """Simple topological sort for node execution order"""
        # Create adjacency list
        graph = {node['id']: [] for node in nodes}
        in_degree = {node['id']: 0 for node in nodes}
        
        for edge in edges:
            graph[edge['source']].append(edge['target'])
            in_degree[edge['target']] += 1
        
        # Kahn's algorithm
        queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
        result = []
        
        while queue:
            node_id = queue.pop(0)
            result.append(node_id)
            
            for neighbor in graph[node_id]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        # Return nodes in execution order
        node_dict = {node['id']: node for node in nodes}
        return [node_dict[node_id] for node_id in result]
    
    def _execute_node(self, node: Dict[str, Any]) -> Any:
        """Execute a single node and return the result"""
        function_name = node['data']['name']
        params = node['data'].get('params', {})
        
        # Convert string parameters to appropriate types
        processed_params = self._process_parameters(params)
        
        # Map function names to actual NumPy functions
        function_map = {
            'np.array': self._create_array,
            'np.zeros': lambda **kwargs: np.zeros(eval(kwargs.get('shape', '(3, 3)')), 
                                                 dtype=kwargs.get('dtype', 'float64')),
            'np.ones': lambda **kwargs: np.ones(eval(kwargs.get('shape', '(2, 2)')), 
                                               dtype=kwargs.get('dtype', 'float64')),
            'np.linspace': lambda **kwargs: np.linspace(
                float(kwargs.get('start', 0)), 
                float(kwargs.get('stop', 10)), 
                int(kwargs.get('num', 50))
            ),
            'np.add': lambda **kwargs: np.add(
                self._get_array_param(kwargs.get('x1')), 
                self._get_array_param(kwargs.get('x2'))
            ),
            'np.multiply': lambda **kwargs: np.multiply(
                self._get_array_param(kwargs.get('x1')), 
                self._get_array_param(kwargs.get('x2'))
            ),
            'np.sin': lambda **kwargs: np.sin(self._get_array_param(kwargs.get('x'))),
            'np.cos': lambda **kwargs: np.cos(self._get_array_param(kwargs.get('x'))),
            'np.mean': lambda **kwargs: np.mean(
                self._get_array_param(kwargs.get('a')), 
                axis=kwargs.get('axis') if kwargs.get('axis') != 'null' else None
            ),
            'np.std': lambda **kwargs: np.std(
                self._get_array_param(kwargs.get('a')), 
                axis=kwargs.get('axis') if kwargs.get('axis') != 'null' else None
            ),
            'np.sum': lambda **kwargs: np.sum(
                self._get_array_param(kwargs.get('a')), 
                axis=kwargs.get('axis') if kwargs.get('axis') != 'null' else None
            ),
            'np.dot': lambda **kwargs: np.dot(
                self._get_array_param(kwargs.get('a')), 
                self._get_array_param(kwargs.get('b'))
            ),
            'np.transpose': lambda **kwargs: np.transpose(self._get_array_param(kwargs.get('a'))),
            'np.reshape': lambda **kwargs: np.reshape(
                self._get_array_param(kwargs.get('a')), 
                eval(kwargs.get('newshape', '(2, 3)'))
            ),
            'np.concatenate': lambda **kwargs: np.concatenate(
                [self._get_array_param(arr.strip()) for arr in kwargs.get('arrays', 'array1,array2').split(',')],
                axis=int(kwargs.get('axis', 0))
            )
        }
        
        if function_name in function_map:
            return function_map[function_name](**processed_params)
        else:
            raise ValueError(f"Unknown function: {function_name}")
    
    def _create_array(self, **kwargs):
        """Create array from data parameter"""
        data = kwargs.get('data', '[1, 2, 3]')
        dtype = kwargs.get('dtype', 'float64')
        
        # Parse the data string
        try:
            parsed_data = eval(data)
            return np.array(parsed_data, dtype=dtype)
        except:
            # Fallback to default
            return np.array([1, 2, 3], dtype=dtype)
    
    def _get_array_param(self, param_value):
        """Get array parameter, either from variables or create default"""
        if param_value in self.variables:
            return self.variables[param_value]
        elif param_value and param_value.startswith('['):
            # Try to parse as literal array
            try:
                return np.array(eval(param_value))
            except:
                pass
        
        # Return default array
        return np.array([1, 2, 3])
    
    def _process_parameters(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Process and convert parameter types"""
        processed = {}
        for key, value in params.items():
            if value == '' or value is None:
                continue
            processed[key] = value
        return processed
    
    def _serialize_result(self, result) -> Any:
        """Serialize NumPy arrays and other results for JSON output"""
        if isinstance(result, np.ndarray):
            if result.size < 100:  # Only serialize small arrays
                return result.tolist()
            else:
                return f"<ndarray shape={result.shape} dtype={result.dtype}>"
        elif isinstance(result, (np.integer, np.floating)):
            return float(result)
        else:
            return str(result)

def main():
    """Main function to process JSON input"""
    if len(sys.argv) != 2:
        print("Usage: python pythonProcessor.py <json_file>")
        sys.exit(1)
    
    json_file = sys.argv[1]
    
    try:
        with open(json_file, 'r') as f:
            flow_data = json.load(f)
        
        processor = NumpyFlowProcessor()
        results = processor.process_flow(flow_data)
        
        # Output results as JSON
        print(json.dumps(results, indent=2))
        
    except Exception as e:
        error_result = {
            'error': str(e),
            'success': False
        }
        print(json.dumps(error_result, indent=2))
        sys.exit(1)

if __name__ == "__main__":
    main()