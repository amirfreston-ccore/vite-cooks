import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import NumpyNode from './components/NumpyNode.jsx';
import Sidebar from './components/Sidebar.jsx';
import JsonOutput from './components/JsonOutput.jsx';
import ResultPanel from './components/ResultPanel.jsx';
import GlobalTheme from './theme/index.jsx';
import { numpyFunctions } from './numpyFunctions.js';
import { numpySimulator } from './utils/numpySimulator.js';

import Bot from './bot';
import Theme from './theme';


const nodeTypes = {
  numpyNode: NumpyNode,
};

let nodeId = 0;
const getId = () => `node_${nodeId++}`;

function FlowApp() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeResults, setNodeResults] = useState({});
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showResultPanel, setShowResultPanel] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const functionData = JSON.parse(event.dataTransfer.getData('application/json'));

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      addNodeToFlow(functionData, position);
    },
    [reactFlowInstance]
  );

  const addNodeToFlow = (functionData, position = { x: 100, y: 100 }) => {
    const newNode = {
      id: getId(),
      type: 'numpyNode',
      position,
      data: {
        ...functionData,
        functionDef: numpyFunctions[functionData.functionKey],
        params: {},
        onParamChange: handleNodeParamChange,
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const handleNodeParamChange = useCallback((nodeId, newParams) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              params: newParams,
            },
          };
        }
        return node;
      })
    );
    
    // Update results when parameters change
    updateNodeResult(nodeId, newParams);
  }, [setNodes]);

  const processFlowWithBackend = useCallback(async () => {
    if (nodes.length === 0) {
      setNodeResults({});
      return;
    }

    setIsProcessing(true);
    try {
      const flowData = getFlowData();
      const response = await fetch('http://localhost:1990/api/process-flow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flowData)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNodeResults(data.results);
          setBackendConnected(true);
        } else {
          console.error('Backend processing failed:', data.error);
          // Fallback to local simulation
          updateNodeResultsLocally();
        }
      } else {
        console.error('Backend request failed');
        // Fallback to local simulation
        updateNodeResultsLocally();
        setBackendConnected(false);
      }
    } catch (error) {
      console.error('Backend connection failed:', error);
      // Fallback to local simulation
      updateNodeResultsLocally();
      setBackendConnected(false);
    } finally {
      setIsProcessing(false);
    }
  }, [nodes, edges]);

  const updateNodeResultsLocally = useCallback(() => {
    const results = {};
    nodes.forEach(node => {
      const result = numpySimulator.simulate(node.data.name, node.data.params || {});
      results[node.id] = {
        ...result,
        functionName: node.data.name,
        category: node.data.category,
        nodeId: node.id
      };
    });
    setNodeResults(results);
  }, [nodes]);

  // Check backend health on mount
  React.useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:1990/api/health');
        setBackendConnected(response.ok);
      } catch {
        setBackendConnected(false);
      }
    };
    checkBackend();
  }, []);

  // Process flow when nodes or edges change
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (backendConnected) {
        processFlowWithBackend();
      } else {
        updateNodeResultsLocally();
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeoutId);
  }, [nodes, edges, backendConnected, processFlowWithBackend, updateNodeResultsLocally]);

  const getFlowData = () => ({
    nodes: nodes.map(node => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: {
        name: node.data.name,
        category: node.data.category,
        description: node.data.description,
        inputs: node.data.inputs,
        outputs: node.data.outputs,
        params: node.data.params,
        functionKey: node.data.functionKey
      }
    })),
    edges: edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle
    }))
  });

  const clearFlow = () => {
    setNodes([]);
    setEdges([]);
    setNodeResults({});
    setSelectedNodeId(null);
  };

  const exportFlow = () => {
    const flowData = getFlowData();
    const dataStr = JSON.stringify(flowData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'numpy_flow.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <GlobalTheme>
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Sidebar onAddNode={(functionData) => addNodeToFlow(functionData)} />
      
      <div style={{ flex: 1, position: 'relative' }}>
        {/* Toolbar */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={clearFlow}
            style={{
              padding: '8px 16px',
              background: '#dc2626',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Clear All
          </button>
          <button
            onClick={exportFlow}
            style={{
              padding: '8px 16px',
              background: '#059669',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Export JSON
          </button>
          <button
            onClick={() => setShowResultPanel(!showResultPanel)}
            style={{
              padding: '8px 16px',
              background: showResultPanel ? '#7c3aed' : '#475569',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {showResultPanel ? 'Hide' : 'Show'} Results
          </button>
          <button
            onClick={processFlowWithBackend}
            disabled={isProcessing || nodes.length === 0}
            style={{
              padding: '8px 16px',
              background: isProcessing ? '#6b7280' : '#3b82f6',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              fontSize: '12px'
            }}
          >
            {isProcessing ? 'Processing...' : 'Process Flow'}
          </button>
          <div style={{
            padding: '8px 12px',
            background: backendConnected ? '#10b981' : '#dc2626',
            borderRadius: '6px',
            fontSize: '11px',
            color: 'white'
          }}>
            {backendConnected ? '● Backend Connected' : '● Local Mode'}
          </div>
        </div>

        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            style={{ background: '#0f0f23' }}
          >
            <Controls />
            <MiniMap 
              style={{
                background: '#1e293b',
                border: '1px solid #475569'
              }}
              nodeColor={(node) => {
                const colors = {
                  'Array Creation': '#4f46e5',
                  'Mathematical': '#059669',
                  'Statistics': '#dc2626',
                  'Linear Algebra': '#7c2d12',
                  'Array Manipulation': '#7c3aed'
                };
                return colors[node.data?.category] || '#6b7280';
              }}
            />
            <Background color="#1e293b" gap={16} />
          </ReactFlow>
        </div>
      </div>

      {showResultPanel ? (
        <ResultPanel 
          nodeResults={nodeResults}
          selectedNodeId={selectedNodeId}
          onNodeSelect={setSelectedNodeId}
        />
      ) : (
        <JsonOutput 
          flowData={getFlowData()} 
          onExport={exportFlow}
        />
      )}
      </div>
    </GlobalTheme>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      {/* <FlowApp /> */}
      {/* <Bot/> */}
      <Theme/>
    </ReactFlowProvider>
  );
}

export default App;