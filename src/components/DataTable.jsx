import React from 'react';

const DataTable = ({ tableData, stats, functionName }) => {
  if (!tableData) {
    return (
      <div style={{ color: '#64748b', fontSize: '12px', textAlign: 'center', padding: '16px' }}>
        No data available
      </div>
    );
  }

  const renderScalar = () => (
    <div style={{
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      fontFamily: 'monospace'
    }}>
      {typeof tableData.value === 'number' ? tableData.value.toFixed(6) : tableData.value}
    </div>
  );

  const renderVector = () => (
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
        Vector ({tableData.data.length} elements)
        {tableData.hasMore && <span style={{ color: '#64748b' }}> - showing first 100</span>}
      </div>
      <div style={{
        maxHeight: '200px',
        overflow: 'auto',
        padding: '8px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: '4px'
        }}>
          {tableData.data.map((value, index) => (
            <div
              key={index}
              style={{
                background: '#1e293b',
                padding: '6px',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '11px',
                fontFamily: 'monospace',
                color: '#e2e8f0',
                border: '1px solid #334155'
              }}
            >
              <div style={{ color: '#64748b', fontSize: '9px' }}>[{index}]</div>
              {typeof value === 'number' ? value.toFixed(3) : value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMatrix = () => (
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
        Matrix {tableData.shape[0]} × {tableData.shape[1]}
        {tableData.hasMore && <span style={{ color: '#64748b' }}> - partial view</span>}
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
              {tableData.data[0]?.map((_, colIndex) => (
                <th
                  key={colIndex}
                  style={{
                    background: '#1e293b',
                    color: '#64748b',
                    padding: '4px',
                    border: '1px solid #334155',
                    minWidth: '60px'
                  }}
                >
                  {colIndex}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.data.map((row, rowIndex) => (
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
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      background: '#0f172a',
                      color: '#e2e8f0',
                      padding: '4px',
                      border: '1px solid #334155',
                      textAlign: 'center'
                    }}
                  >
                    {typeof cell === 'number' ? cell.toFixed(3) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTensor = () => (
    <div style={{
      background: '#0f172a',
      border: '1px solid #475569',
      borderRadius: '6px',
      padding: '16px',
      textAlign: 'center'
    }}>
      <div style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '8px' }}>
        {tableData.shape.length}D Tensor
      </div>
      <div style={{ color: '#64748b', fontSize: '12px' }}>
        Shape: ({tableData.shape.join(' × ')})
      </div>
      <div style={{ color: '#64748b', fontSize: '11px', marginTop: '4px' }}>
        Use lower dimensional view for detailed inspection
      </div>
    </div>
  );

  const renderStats = () => {
    if (!stats || Object.keys(stats).length === 0) return null;

    return (
      <div style={{
        background: '#1e293b',
        border: '1px solid #475569',
        borderRadius: '6px',
        padding: '12px',
        marginTop: '12px'
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 'bold',
          color: '#e2e8f0',
          marginBottom: '8px'
        }}>
          Statistics
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
          gap: '8px',
          fontSize: '10px'
        }}>
          {Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              style={{
                background: '#0f172a',
                padding: '6px',
                borderRadius: '4px',
                textAlign: 'center',
                border: '1px solid #334155'
              }}
            >
              <div style={{ color: '#64748b', textTransform: 'uppercase' }}>{key}</div>
              <div style={{ color: '#e2e8f0', fontFamily: 'monospace', fontWeight: 'bold' }}>
                {typeof value === 'number' ? value.toFixed(4) : value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {tableData.type === 'scalar' && renderScalar()}
      {tableData.type === 'vector' && renderVector()}
      {tableData.type === 'matrix' && renderMatrix()}
      {tableData.type === 'tensor' && renderTensor()}
      {renderStats()}
    </div>
  );
};

export default DataTable;