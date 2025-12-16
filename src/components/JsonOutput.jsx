import React, { useState } from 'react';
import { Download, Copy, Code } from 'lucide-react';

const JsonOutput = ({ flowData, onExport }) => {
  const [activeTab, setActiveTab] = useState('json');
  const [copied, setCopied] = useState(false);

  const generatePythonCode = () => {
    const imports = new Set(['import numpy as np']);
    let code = '';
    
    flowData.nodes.forEach(node => {
      const params = node.data.params || {};
      const paramStr = Object.entries(params)
        .filter(([_, value]) => value !== '' && value !== null)
        .map(([key, value]) => `${key}=${value}`)
        .join(', ');
      
      code += `# ${node.data.description}\n`;
      code += `result_${node.id} = ${node.data.name}(${paramStr})\n\n`;
    });

    return Array.from(imports).join('\n') + '\n\n' + code;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const jsonOutput = JSON.stringify(flowData, null, 2);
  const pythonCode = generatePythonCode();

  return (
    <div style={{
      width: '350px',
      background: '#1e293b',
      borderLeft: '1px solid #475569',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #475569',
        background: '#0f172a'
      }}>
        <h3 style={{ color: 'white', margin: 0, fontSize: '16px' }}>
          Output & Export
        </h3>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #475569'
      }}>
        {['json', 'python'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '12px',
              background: activeTab === tab ? '#334155' : 'transparent',
              border: 'none',
              color: activeTab === tab ? 'white' : '#94a3b8',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Action Buttons */}
        <div style={{
          padding: '12px',
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid #475569'
        }}>
          <button
            onClick={() => copyToClipboard(activeTab === 'json' ? jsonOutput : pythonCode)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              background: '#3b82f6',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            <Copy size={14} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          
          <button
            onClick={() => downloadFile(
              activeTab === 'json' ? jsonOutput : pythonCode,
              activeTab === 'json' ? 'numpy_flow.json' : 'numpy_flow.py',
              activeTab === 'json' ? 'application/json' : 'text/plain'
            )}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              background: '#10b981',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            <Download size={14} />
            Download
          </button>
        </div>

        {/* Code Display */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px'
        }}>
          <pre style={{
            background: '#0f172a',
            padding: '12px',
            borderRadius: '6px',
            color: '#e2e8f0',
            fontSize: '12px',
            fontFamily: 'Monaco, Consolas, monospace',
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            {activeTab === 'json' ? jsonOutput : pythonCode}
          </pre>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        padding: '12px',
        borderTop: '1px solid #475569',
        background: '#0f172a',
        color: '#94a3b8',
        fontSize: '12px'
      }}>
        <div>Nodes: {flowData.nodes?.length || 0}</div>
        <div>Edges: {flowData.edges?.length || 0}</div>
        <div>Functions: {new Set(flowData.nodes?.map(n => n.data.name)).size || 0}</div>
      </div>
    </div>
  );
};

export default JsonOutput;