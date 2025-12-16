import React, { useState } from 'react';
import { Eye, EyeOff, BarChart3, Grid } from 'lucide-react';
import ArrayVisualizer from './ArrayVisualizer.jsx';
import DataTable from './DataTable.jsx';

const ResultPanel = ({ nodeResults, selectedNodeId, onNodeSelect }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showStats, setShowStats] = useState(true);

  const getResultsArray = () => {
    return Object.entries(nodeResults).map(([nodeId, result]) => ({
      nodeId,
      ...result
    }));
  };

  const renderNodeTable = (result) => {
    if (!result.success) {
      return (
        <div style={{
          background: '#7f1d1d',
          border: '1px solid #dc2626',
          borderRadius: '6px',
          padding: '12px',
          color: '#fca5a5'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Error</div>
          <div style={{ fontSize: '12px' }}>{result.error}</div>
        </div>
      );
    }

    const data = result.result || result.data;
    
    // Handle scalar values
    if (typeof data === 'number') {
      return (
        <div style={{
          background: '#0f172a',
          border: '1px solid #10b981',
          borderRadius: '6px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#10b981',
            fontFamily: 'monospace'
          }}>
            {data.toFixed(6)}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>
            Scalar Value
          </div>
        </div>
      );
    }

    // Handle 1D arrays
    if (Array.isArray(data) && !Array.isArray(data[0])) {
      return (
        <div style={{
          background: '#0f172a',
          border: '1px solid #475569',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: '#1e293b',
            padding: '8px 12px',
            borderBottom: '1px solid #475569',
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#e2e8f0'
          }}>
            Array [{data.length}] - {result.dtype}
          </div>
          <div style={{
            maxHeight: '200px',
            overflow: 'auto',
            padding: '8px'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '11px',
              fontFamily: 'monospace'
            }}>
              <thead>
                <tr>
                  <th style={{
                    background: '#1e293b',
                    color: '#64748b',
                    padding: '4px 8px',
                    border: '1px solid #334155',
                    textAlign: 'left'
                  }}>Index</th>
                  <th style={{
                    background: '#1e293b',
                    color: '#64748b',
                    padding: '4px 8px',
                    border: '1px solid #334155',
                    textAlign: 'left'
                  }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 50).map((value, index) => (
                  <tr key={index}>
                    <td style={{
                      background: '#0f172a',
                      color: '#94a3b8',
                      padding: '4px 8px',
                      border: '1px solid #334155'
                    }}>
                      {index}
                    </td>
                    <td style={{
                      background: '#0f172a',
                      color: '#e2e8f0',
                      padding: '4px 8px',
                      border: '1px solid #334155'
                    }}>
                      {typeof value === 'number' ? value.toFixed(4) : value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length > 50 && (
              <div style={{
                textAlign: 'center',
                padding: '8px',
                color: '#64748b',
                fontSize: '10px'
              }}>
                ... showing first 50 of {data.length} elements
              </div>
            )}
          </div>
        </div>
      );
    }

    // Handle 2D arrays (matrices)
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const rows = data.length;
      const cols = data[0].length;
      const maxRows = 20;
      const maxCols = 10;
      
      return (
        <div style={{
          background: '#0f172a',
          border: '1px solid #475569',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: '#1e293b',
            padding: '8px 12px',
            borderBottom: '1px solid #475569',
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#e2e8f0'
          }}>
            Matrix [{rows} × {cols}] - {result.dtype}
          </div>
          <div style={{
            maxHeight: '300px',
            overflow: 'auto',
            padding: '8px'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '10px',
              fontFamily: 'monospace'
            }}>
              <thead>
                <tr>
                  <th style={{
                    background: '#1e293b',
                    color: '#64748b',
                    padding: '4px',
                    border: '1px solid #334155',
                    minWidth: '30px'
                  }}></th>
                  {data[0].slice(0, maxCols).map((_, colIndex) => (
                    <th key={colIndex} style={{
                      background: '#1e293b',
                      color: '#64748b',
                      padding: '4px',
                      border: '1px solid #334155',
                      minWidth: '60px',
                      textAlign: 'center'
                    }}>
                      {colIndex}
                    </th>
                  ))}
                  {cols > maxCols && (
                    <th style={{
                      background: '#1e293b',
                      color: '#64748b',
                      padding: '4px',
                      border: '1px solid #334155'
                    }}>...</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, maxRows).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td style={{
                      background: '#1e293b',
                      color: '#64748b',
                      padding: '4px',
                      border: '1px solid #334155',
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>
                      {rowIndex}
                    </td>
                    {row.slice(0, maxCols).map((cell, colIndex) => (
                      <td key={colIndex} style={{
                        background: '#0f172a',
                        color: '#e2e8f0',
                        padding: '4px',
                        border: '1px solid #334155',
                        textAlign: 'center'
                      }}>
                        {typeof cell === 'number' ? cell.toFixed(3) : cell}
                      </td>
                    ))}
                    {cols > maxCols && (
                      <td style={{
                        background: '#0f172a',
                        color: '#64748b',
                        padding: '4px',
                        border: '1px solid #334155',
                        textAlign: 'center'
                      }}>...</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {(rows > maxRows || cols > maxCols) && (
              <div style={{
                textAlign: 'center',
                padding: '8px',
                color: '#64748b',
                fontSize: '10px'
              }}>
                Showing {Math.min(rows, maxRows)} × {Math.min(cols, maxCols)} of {rows} × {cols}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div style={{ color: '#64748b', fontSize: '12px', textAlign: 'center', padding: '16px' }}>
        No data to display
      </div>
    );
  };

  const renderStats = (result) => {
    if (!result.success) return null;

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        marginTop: '8px',
        fontSize: '10px',
        color: '#64748b'
      }}>
        <div>Shape: ({result.shape?.join(', ') || 'scalar'})</div>
        <div>Size: {result.size}</div>
        <div>Dims: {result.ndim}D</div>
        <div>Type: {result.dtype}</div>
      </div>
    );
  };

  const results = getResultsArray();

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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <h3 style={{ color: 'white', margin: 0, fontSize: '16px' }}>
            Results Preview
          </h3>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              style={{
                background: viewMode === 'grid' ? '#3b82f6' : 'transparent',
                border: '1px solid #475569',
                color: 'white',
                padding: '4px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              <Grid size={14} />
            </button>
            <button
              onClick={() => setShowStats(!showStats)}
              style={{
                background: showStats ? '#3b82f6' : 'transparent',
                border: '1px solid #475569',
                color: 'white',
                padding: '4px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              <BarChart3 size={14} />
            </button>
          </div>
        </div>
        
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
          {results.length} node{results.length !== 1 ? 's' : ''} • {results.filter(r => r.success).length} successful
        </div>
      </div>

      {/* Results List */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '16px'
      }}>
        {results.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: '14px',
            marginTop: '40px'
          }}>
            No results yet. Add nodes to see previews.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '12px',
            gridTemplateColumns: viewMode === 'grid' ? '1fr' : '1fr'
          }}>
            {results.map((result) => (
              <div
                key={result.nodeId}
                onClick={() => onNodeSelect && onNodeSelect(result.nodeId)}
                style={{
                  background: selectedNodeId === result.nodeId ? '#334155' : '#0f172a',
                  border: `1px solid ${selectedNodeId === result.nodeId ? '#3b82f6' : '#475569'}`,
                  borderRadius: '8px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {/* Node Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: result.success ? '#10b981' : '#dc2626'
                  }}>
                    {result.functionName || result.nodeId}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#64748b',
                    background: '#1e293b',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {result.nodeId}
                  </div>
                </div>

                {/* Result Table */}
                {renderNodeTable(result)}

                {/* Statistics */}
                {showStats && result.success && result.stats && Object.keys(result.stats).length > 0 && (
                  <div style={{
                    background: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '6px',
                    padding: '8px',
                    marginTop: '8px'
                  }}>
                    <div style={{
                      fontSize: '10px',
                      fontWeight: 'bold',
                      color: '#e2e8f0',
                      marginBottom: '6px'
                    }}>
                      Statistics
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '4px',
                      fontSize: '9px'
                    }}>
                      {Object.entries(result.stats).map(([key, value]) => (
                        <div key={key} style={{
                          background: '#0f172a',
                          padding: '4px 6px',
                          borderRadius: '3px',
                          border: '1px solid #334155'
                        }}>
                          <div style={{ color: '#64748b', textTransform: 'uppercase' }}>{key}</div>
                          <div style={{ color: '#e2e8f0', fontFamily: 'monospace', fontWeight: 'bold' }}>
                            {typeof value === 'number' ? value.toFixed(4) : value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shape and Type Info */}
                {result.success && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '4px',
                    marginTop: '8px',
                    fontSize: '9px'
                  }}>
                    <div style={{
                      background: '#0f172a',
                      padding: '4px 6px',
                      borderRadius: '3px',
                      border: '1px solid #334155',
                      textAlign: 'center'
                    }}>
                      <div style={{ color: '#64748b' }}>Shape</div>
                      <div style={{ color: '#e2e8f0', fontWeight: 'bold' }}>
                        {result.shape ? `(${result.shape.join(', ')})` : 'scalar'}
                      </div>
                    </div>
                    <div style={{
                      background: '#0f172a',
                      padding: '4px 6px',
                      borderRadius: '3px',
                      border: '1px solid #334155',
                      textAlign: 'center'
                    }}>
                      <div style={{ color: '#64748b' }}>Size</div>
                      <div style={{ color: '#e2e8f0', fontWeight: 'bold' }}>
                        {result.size || 1}
                      </div>
                    </div>
                    <div style={{
                      background: '#0f172a',
                      padding: '4px 6px',
                      borderRadius: '3px',
                      border: '1px solid #334155',
                      textAlign: 'center'
                    }}>
                      <div style={{ color: '#64748b' }}>Type</div>
                      <div style={{ color: '#e2e8f0', fontWeight: 'bold' }}>
                        {result.dtype || 'unknown'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Category */}
                {result.category && (
                  <div style={{
                    fontSize: '10px',
                    color: '#64748b',
                    marginTop: '8px',
                    textAlign: 'right'
                  }}>
                    {result.category}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {results.length > 0 && (
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #475569',
          background: '#0f172a',
          fontSize: '11px',
          color: '#64748b'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>Success: {results.filter(r => r.success).length}</div>
            <div>Errors: {results.filter(r => !r.success).length}</div>
            <div>Arrays: {results.filter(r => r.success && Array.isArray(r.data)).length}</div>
            <div>Scalars: {results.filter(r => r.success && typeof r.data === 'number').length}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPanel;