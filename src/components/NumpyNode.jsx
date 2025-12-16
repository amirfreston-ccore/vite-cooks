import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { numpySimulator } from '../utils/numpySimulator.js';

const NumpyNode = ({ data, id }) => {
  const [params, setParams] = useState(data.params || {});
  const [isExpanded, setIsExpanded] = useState(false);
  const [result, setResult] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  const handleParamChange = (paramName, value) => {
    const newParams = { ...params, [paramName]: value };
    setParams(newParams);
    
    // Update node data and trigger JSON output
    if (data.onParamChange) {
      data.onParamChange(id, newParams);
    }
  };

  // Simulate NumPy execution in real-time
  useEffect(() => {
    if (data.name) {
      const simulationResult = numpySimulator.simulate(data.name, params);
      setResult(simulationResult);
    }
  }, [data.name, params]);

  const getCategoryColor = (category) => {
    const colors = {
      'Array Creation': '#4f46e5',
      'Mathematical': '#059669',
      'Statistics': '#dc2626',
      'Linear Algebra': '#7c2d12',
      'Array Manipulation': '#7c3aed'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div className="numpy-node" style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      border: `2px solid ${getCategoryColor(data.category)}`,
      borderRadius: '12px',
      minWidth: '200px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      {/* Input Handles */}
      {data.inputs?.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={input}
          style={{
            top: `${30 + index * 25}px`,
            background: '#3b82f6',
            width: '12px',
            height: '12px'
          }}
        />
      ))}

      {/* Header */}
      <div style={{
        padding: '12px',
        borderBottom: '1px solid #475569',
        background: getCategoryColor(data.category),
        borderRadius: '10px 10px 0 0',
        color: 'white'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{data.name}</div>
        <div style={{ fontSize: '11px', opacity: 0.8 }}>{data.category}</div>
      </div>

      {/* Content */}
      <div style={{ padding: '12px', color: 'white' }}>
        <div style={{ fontSize: '12px', marginBottom: '8px', color: '#cbd5e1' }}>
          {data.description}
        </div>

        {/* Parameters */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'none',
            border: '1px solid #475569',
            color: '#cbd5e1',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: 'pointer',
            marginBottom: '8px'
          }}
        >
          {isExpanded ? 'Hide' : 'Show'} Parameters
        </button>

        {isExpanded && (
          <div style={{ marginTop: '8px' }}>
            {Object.entries(data.functionDef?.params || {}).map(([paramName, paramDef]) => (
              <div key={paramName} style={{ marginBottom: '8px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '11px', 
                  color: '#94a3b8',
                  marginBottom: '2px'
                }}>
                  {paramName} {paramDef.required && '*'}
                </label>
                <input
                  type="text"
                  value={params[paramName] || paramDef.default || ''}
                  onChange={(e) => handleParamChange(paramName, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '4px 6px',
                    background: '#0f172a',
                    border: '1px solid #475569',
                    borderRadius: '4px',
                    color: 'white',
                    fontSize: '11px'
                  }}
                  placeholder={paramDef.default}
                />
              </div>
            ))}
          </div>
        )}

        {/* Result Preview */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          style={{
            background: 'none',
            border: '1px solid #475569',
            color: '#cbd5e1',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: 'pointer',
            marginTop: '8px',
            marginBottom: '8px'
          }}
        >
          {showPreview ? 'Hide' : 'Show'} Result Preview
        </button>

        {showPreview && result && (
          <div style={{
            background: '#0f172a',
            border: '1px solid #475569',
            borderRadius: '6px',
            padding: '8px',
            marginBottom: '8px',
            fontSize: '10px'
          }}>
            {result.success ? (
              <>
                <div style={{ color: '#10b981', marginBottom: '4px', fontWeight: 'bold' }}>✓ Result</div>
                <div style={{ color: '#e2e8f0', fontFamily: 'monospace', marginBottom: '4px' }}>
                  {result.preview}
                </div>
                <div style={{ color: '#64748b', fontSize: '9px' }}>
                  Shape: ({result.shape?.join(', ') || 'scalar'}) | 
                  Size: {result.size} | 
                  Type: {result.dtype}
                </div>
              </>
            ) : (
              <>
                <div style={{ color: '#dc2626', marginBottom: '4px', fontWeight: 'bold' }}>✗ Error</div>
                <div style={{ color: '#fca5a5', fontSize: '9px' }}>
                  {result.error}
                </div>
              </>
            )}
          </div>
        )}

        {/* Inputs/Outputs Info */}
        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px' }}>
          <div>In: {data.inputs?.join(', ') || 'none'}</div>
          <div>Out: {data.outputs?.join(', ') || 'none'}</div>
        </div>
      </div>

      {/* Output Handles */}
      {data.outputs?.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={output}
          style={{
            top: `${50 + index * 25}px`,
            background: '#10b981',
            width: '12px',
            height: '12px'
          }}
        />
      ))}
    </div>
  );
};

export default NumpyNode;