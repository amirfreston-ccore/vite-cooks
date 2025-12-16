/**
 * JavaScript processor for NumPy React Flow JSON output
 * Processes the flow data and generates executable code or analysis
 */

class NumpyFlowProcessor {
  constructor() {
    this.results = {};
  }

  /**
   * Process the entire flow and return analysis
   */
  processFlow(flowData) {
    const nodes = flowData.nodes || [];
    const edges = flowData.edges || [];

    // Analyze the flow
    const analysis = this.analyzeFlow(nodes, edges);
    
    // Generate code
    const pythonCode = this.generatePythonCode(nodes, edges);
    const jsCode = this.generateJavaScriptCode(nodes, edges);

    return {
      flowId: flowData.id || 'unknown',
      analysis,
      generatedCode: {
        python: pythonCode,
        javascript: jsCode
      },
      summary: {
        totalNodes: nodes.length,
        totalEdges: edges.length,
        categories: this.getCategorySummary(nodes),
        complexity: this.calculateComplexity(nodes, edges)
      }
    };
  }

  /**
   * Analyze the flow structure and dependencies
   */
  analyzeFlow(nodes, edges) {
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    const dependencies = this.buildDependencyGraph(nodes, edges);
    const executionOrder = this.topologicalSort(dependencies);

    return {
      executionOrder,
      dependencies: Object.fromEntries(dependencies),
      cycles: this.detectCycles(dependencies),
      isolatedNodes: nodes.filter(node => 
        !edges.some(edge => edge.source === node.id || edge.target === node.id)
      ).map(node => node.id)
    };
  }

  /**
   * Build dependency graph from edges
   */
  buildDependencyGraph(nodes, edges) {
    const graph = new Map();
    
    // Initialize all nodes
    nodes.forEach(node => {
      graph.set(node.id, []);
    });

    // Add dependencies
    edges.forEach(edge => {
      if (graph.has(edge.target)) {
        graph.get(edge.target).push(edge.source);
      }
    });

    return graph;
  }

  /**
   * Topological sort for execution order
   */
  topologicalSort(dependencies) {
    const visited = new Set();
    const temp = new Set();
    const result = [];

    const visit = (nodeId) => {
      if (temp.has(nodeId)) {
        throw new Error(`Cycle detected involving node ${nodeId}`);
      }
      if (!visited.has(nodeId)) {
        temp.add(nodeId);
        const deps = dependencies.get(nodeId) || [];
        deps.forEach(dep => visit(dep));
        temp.delete(nodeId);
        visited.add(nodeId);
        result.push(nodeId);
      }
    };

    Array.from(dependencies.keys()).forEach(nodeId => {
      if (!visited.has(nodeId)) {
        visit(nodeId);
      }
    });

    return result;
  }

  /**
   * Detect cycles in the dependency graph
   */
  detectCycles(dependencies) {
    const visited = new Set();
    const recStack = new Set();
    const cycles = [];

    const hasCycle = (nodeId, path = []) => {
      if (recStack.has(nodeId)) {
        const cycleStart = path.indexOf(nodeId);
        cycles.push(path.slice(cycleStart).concat(nodeId));
        return true;
      }
      if (visited.has(nodeId)) {
        return false;
      }

      visited.add(nodeId);
      recStack.add(nodeId);
      path.push(nodeId);

      const deps = dependencies.get(nodeId) || [];
      for (const dep of deps) {
        if (hasCycle(dep, [...path])) {
          return true;
        }
      }

      recStack.delete(nodeId);
      return false;
    };

    Array.from(dependencies.keys()).forEach(nodeId => {
      if (!visited.has(nodeId)) {
        hasCycle(nodeId);
      }
    });

    return cycles;
  }

  /**
   * Generate Python code from the flow
   */
  generatePythonCode(nodes, edges) {
    const imports = new Set(['import numpy as np']);
    let code = '# Generated NumPy code from React Flow\n\n';
    
    // Add imports
    code += Array.from(imports).join('\n') + '\n\n';

    // Sort nodes by execution order
    const dependencies = this.buildDependencyGraph(nodes, edges);
    const executionOrder = this.topologicalSort(dependencies);
    const nodeMap = new Map(nodes.map(node => [node.id, node]));

    // Generate code for each node
    executionOrder.forEach(nodeId => {
      const node = nodeMap.get(nodeId);
      if (!node) return;

      const params = node.data.params || {};
      const comment = `# ${node.data.description}`;
      const functionCall = this.generatePythonFunctionCall(node.data.name, params, nodeId);
      
      code += `${comment}\n`;
      code += `${nodeId} = ${functionCall}\n`;
      code += `print(f"${node.data.name} result shape: {${nodeId}.shape if hasattr(${nodeId}, 'shape') else type(${nodeId})}")\n\n`;
    });

    return code;
  }

  /**
   * Generate Python function call
   */
  generatePythonFunctionCall(functionName, params, nodeId) {
    const paramStrings = [];
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        // Handle different parameter types
        if (typeof value === 'string' && value.startsWith('node_')) {
          paramStrings.push(`${key}=${value}`);
        } else if (key === 'shape' || key === 'newshape') {
          paramStrings.push(`${key}=${value}`);
        } else if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('('))) {
          paramStrings.push(`${key}=${value}`);
        } else if (typeof value === 'string') {
          paramStrings.push(`${key}='${value}'`);
        } else {
          paramStrings.push(`${key}=${value}`);
        }
      }
    });

    return `${functionName}(${paramStrings.join(', ')})`;
  }

  /**
   * Generate JavaScript code (for demonstration)
   */
  generateJavaScriptCode(nodes, edges) {
    let code = '// Generated JavaScript code from React Flow\n';
    code += '// Note: This is a conceptual representation\n\n';

    const dependencies = this.buildDependencyGraph(nodes, edges);
    const executionOrder = this.topologicalSort(dependencies);
    const nodeMap = new Map(nodes.map(node => [node.id, node]));

    code += 'const results = {};\n\n';

    executionOrder.forEach(nodeId => {
      const node = nodeMap.get(nodeId);
      if (!node) return;

      code += `// ${node.data.description}\n`;
      code += `results.${nodeId} = {\n`;
      code += `  function: '${node.data.name}',\n`;
      code += `  params: ${JSON.stringify(node.data.params || {}, null, 2)},\n`;
      code += `  category: '${node.data.category}'\n`;
      code += `};\n\n`;
    });

    code += 'console.log("Flow execution results:", results);\n';
    return code;
  }

  /**
   * Get category summary
   */
  getCategorySummary(nodes) {
    const categories = {};
    nodes.forEach(node => {
      const category = node.data.category;
      categories[category] = (categories[category] || 0) + 1;
    });
    return categories;
  }

  /**
   * Calculate flow complexity
   */
  calculateComplexity(nodes, edges) {
    const nodeCount = nodes.length;
    const edgeCount = edges.length;
    const uniqueCategories = new Set(nodes.map(n => n.data.category)).size;
    
    // Simple complexity metric
    const complexity = nodeCount + (edgeCount * 0.5) + (uniqueCategories * 0.3);
    
    let level = 'Simple';
    if (complexity > 20) level = 'Complex';
    else if (complexity > 10) level = 'Moderate';

    return {
      score: Math.round(complexity * 10) / 10,
      level,
      factors: {
        nodes: nodeCount,
        edges: edgeCount,
        categories: uniqueCategories
      }
    };
  }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NumpyFlowProcessor;
} else if (typeof window !== 'undefined') {
  window.NumpyFlowProcessor = NumpyFlowProcessor;
}

// CLI usage for Node.js
if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  const path = require('path');

  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.log('Usage: node jsProcessor.js <json_file>');
    process.exit(1);
  }

  const jsonFile = args[0];
  
  try {
    const flowData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    const processor = new NumpyFlowProcessor();
    const results = processor.processFlow(flowData);
    
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Error processing flow:', error.message);
    process.exit(1);
  }
}