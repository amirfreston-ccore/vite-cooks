import React, { useState } from 'react';
import { numpyFunctions, categories } from '../numpyFunctions.js';

const Sidebar = ({ onAddNode }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFunctions = Object.entries(numpyFunctions).filter(([key, func]) => {
    const matchesCategory = selectedCategory === 'All' || func.category === selectedCategory;
    const matchesSearch = func.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         func.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDragStart = (event, nodeType, functionData) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/json', JSON.stringify(functionData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{
      width: '300px',
      background: '#1e293b',
      borderRight: '1px solid #475569',
      padding: '16px',
      overflowY: 'auto',
      height: '100vh'
    }}>
      <h2 style={{ color: 'white', marginBottom: '16px', fontSize: '18px' }}>
        NumPy Functions
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search functions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '16px',
          background: '#0f172a',
          border: '1px solid #475569',
          borderRadius: '6px',
          color: 'white',
          fontSize: '14px'
        }}
      />

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '16px',
          background: '#0f172a',
          border: '1px solid #475569',
          borderRadius: '6px',
          color: 'white',
          fontSize: '14px'
        }}
      >
        <option value="All">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      {/* Function List */}
      <div>
        {filteredFunctions.map(([key, func]) => (
          <div
            key={key}
            draggable
            onDragStart={(event) => handleDragStart(event, 'numpyNode', { ...func, functionKey: key })}
            onClick={() => onAddNode({ ...func, functionKey: key })}
            style={{
              background: '#334155',
              border: '1px solid #475569',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '8px',
              cursor: 'grab',
              transition: 'all 0.2s',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#475569';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#334155';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
              {func.name}
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
              {func.category}
            </div>
            <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
              {func.description}
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>
              Inputs: {func.inputs.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;