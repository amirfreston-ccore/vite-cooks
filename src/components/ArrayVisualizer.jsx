import React from 'react';

const ArrayVisualizer = ({ data, shape, dtype, maxDisplay = 100 }) => {
  const renderScalar = (value) => (
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
      {typeof value === 'number' ? value.toFixed(4) : value}
    </div>
  );

  const render1DArray = (arr) => {
    const displayArr = arr.length > maxDisplay ? arr.slice(0, maxDisplay) : arr;
    const hasMore = arr.length > maxDisplay;

    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        padding: '8px',
        background: '#0f172a',
        borderRadius: '6px',
        border: '1px solid #475569'
      }}>
        {displayArr.map((val, i) => (
          <div
            key={i}
            style={{
              background: '#1e293b',
              color: '#e2e8f0',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontFamily: 'monospace',
              border: '1px solid #334155',
              minWidth: '40px',
              textAlign: 'center'
            }}
          >
            {typeof val === 'number' ? val.toFixed(2) : val}
          </div>
        ))}
        {hasMore && (
          <div style={{
            color: '#64748b',
            padding: '4px 8px',
            fontSize: '11px',
            alignSelf: 'center'
          }}>
            ... +{arr.length - maxDisplay} more
          </div>
        )}
      </div>
    );
  };

  const render2DArray = (arr) => {
    const maxRows = 10;
    const maxCols = 8;
    const displayRows = arr.length > maxRows ? arr.slice(0, maxRows) : arr;
    const hasMoreRows = arr.length > maxRows;

    return (
      <div style={{
        background: '#0f172a',
        borderRadius: '6px',
        border: '1px solid #475569',
        padding: '8px',
        overflow: 'auto'
      }}>
        <div style={{
          display: 'grid',
          gap: '2px',
          gridTemplateColumns: `repeat(${Math.min(arr[0]?.length || 0, maxCols)}, 1fr)`,
          maxWidth: '100%'
        }}>
          {displayRows.map((row, i) => {
            const displayCols = row.length > maxCols ? row.slice(0, maxCols) : row;
            const hasMoreCols = row.length > maxCols;
            
            return (
              <React.Fragment key={i}>
                {displayCols.map((val, j) => (
                  <div
                    key={`${i}-${j}`}
                    style={{
                      background: '#1e293b',
                      color: '#e2e8f0',
                      padding: '4px',
                      borderRadius: '3px',
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      border: '1px solid #334155',
                      textAlign: 'center',
                      minWidth: '35px'
                    }}
                  >
                    {typeof val === 'number' ? val.toFixed(1) : val}
                  </div>
                ))}
                {hasMoreCols && (
                  <div style={{
                    color: '#64748b',
                    padding: '4px',
                    fontSize: '9px',
                    alignSelf: 'center'
                  }}>
                    ...
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        {hasMoreRows && (
          <div style={{
            color: '#64748b',
            textAlign: 'center',
            marginTop: '8px',
            fontSize: '10px'
          }}>
            ... +{arr.length - maxRows} more rows
          </div>
        )}
      </div>
    );
  };

  const renderArrayInfo = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
      gap: '8px',
      marginBottom: '8px',
      fontSize: '10px'
    }}>
      <div style={{
        background: '#1e293b',
        padding: '6px',
        borderRadius: '4px',
        textAlign: 'center',
        border: '1px solid #334155'
      }}>
        <div style={{ color: '#64748b' }}>Shape</div>
        <div style={{ color: '#e2e8f0', fontWeight: 'bold' }}>
          ({shape?.join(', ') || 'scalar'})
        </div>
      </div>
      <div style={{
        background: '#1e293b',
        padding: '6px',
        borderRadius: '4px',
        textAlign: 'center',
        border: '1px solid #334155'
      }}>
        <div style={{ color: '#64748b' }}>Type</div>
        <div style={{ color: '#e2e8f0', fontWeight: 'bold' }}>
          {dtype}
        </div>
      </div>
      <div style={{
        background: '#1e293b',
        padding: '6px',
        borderRadius: '4px',
        textAlign: 'center',
        border: '1px solid #334155'
      }}>
        <div style={{ color: '#64748b' }}>Size</div>
        <div style={{ color: '#e2e8f0', fontWeight: 'bold' }}>
          {Array.isArray(data) ? data.flat(Infinity).length : 1}
        </div>
      </div>
    </div>
  );

  if (typeof data === 'number') {
    return (
      <div>
        {renderArrayInfo()}
        {renderScalar(data)}
      </div>
    );
  }

  if (Array.isArray(data)) {
    return (
      <div>
        {renderArrayInfo()}
        {Array.isArray(data[0]) ? render2DArray(data) : render1DArray(data)}
      </div>
    );
  }

  return (
    <div style={{
      color: '#64748b',
      textAlign: 'center',
      padding: '16px',
      fontSize: '12px'
    }}>
      No data to visualize
    </div>
  );
};

export default ArrayVisualizer;