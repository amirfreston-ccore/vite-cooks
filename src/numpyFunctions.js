// NumPy function definitions with their parameters and outputs
export const numpyFunctions = {
  // Array Creation
  array: {
    name: 'np.array',
    category: 'Array Creation',
    description: 'Create an array from a list or tuple',
    inputs: ['data', 'dtype'],
    outputs: ['ndarray'],
    params: {
      data: { type: 'list', required: true, default: '[1, 2, 3]' },
      dtype: { type: 'string', required: false, default: 'float64' }
    }
  },
  zeros: {
    name: 'np.zeros',
    category: 'Array Creation',
    description: 'Create array filled with zeros',
    inputs: ['shape', 'dtype'],
    outputs: ['ndarray'],
    params: {
      shape: { type: 'tuple', required: true, default: '(3, 3)' },
      dtype: { type: 'string', required: false, default: 'float64' }
    }
  },
  ones: {
    name: 'np.ones',
    category: 'Array Creation',
    description: 'Create array filled with ones',
    inputs: ['shape', 'dtype'],
    outputs: ['ndarray'],
    params: {
      shape: { type: 'tuple', required: true, default: '(2, 2)' },
      dtype: { type: 'string', required: false, default: 'float64' }
    }
  },
  linspace: {
    name: 'np.linspace',
    category: 'Array Creation',
    description: 'Create evenly spaced numbers',
    inputs: ['start', 'stop', 'num'],
    outputs: ['ndarray'],
    params: {
      start: { type: 'number', required: true, default: 0 },
      stop: { type: 'number', required: true, default: 10 },
      num: { type: 'number', required: false, default: 50 }
    }
  },
  
  // Mathematical Operations
  add: {
    name: 'np.add',
    category: 'Mathematical',
    description: 'Element-wise addition',
    inputs: ['x1', 'x2'],
    outputs: ['ndarray'],
    params: {
      x1: { type: 'array', required: true, default: 'array1' },
      x2: { type: 'array', required: true, default: 'array2' }
    }
  },
  multiply: {
    name: 'np.multiply',
    category: 'Mathematical',
    description: 'Element-wise multiplication',
    inputs: ['x1', 'x2'],
    outputs: ['ndarray'],
    params: {
      x1: { type: 'array', required: true, default: 'array1' },
      x2: { type: 'array', required: true, default: 'array2' }
    }
  },
  sin: {
    name: 'np.sin',
    category: 'Mathematical',
    description: 'Trigonometric sine',
    inputs: ['x'],
    outputs: ['ndarray'],
    params: {
      x: { type: 'array', required: true, default: 'array' }
    }
  },
  cos: {
    name: 'np.cos',
    category: 'Mathematical',
    description: 'Trigonometric cosine',
    inputs: ['x'],
    outputs: ['ndarray'],
    params: {
      x: { type: 'array', required: true, default: 'array' }
    }
  },
  
  // Statistical Functions
  mean: {
    name: 'np.mean',
    category: 'Statistics',
    description: 'Compute arithmetic mean',
    inputs: ['a', 'axis'],
    outputs: ['scalar/ndarray'],
    params: {
      a: { type: 'array', required: true, default: 'array' },
      axis: { type: 'number', required: false, default: null }
    }
  },
  std: {
    name: 'np.std',
    category: 'Statistics',
    description: 'Compute standard deviation',
    inputs: ['a', 'axis'],
    outputs: ['scalar/ndarray'],
    params: {
      a: { type: 'array', required: true, default: 'array' },
      axis: { type: 'number', required: false, default: null }
    }
  },
  sum: {
    name: 'np.sum',
    category: 'Statistics',
    description: 'Sum of array elements',
    inputs: ['a', 'axis'],
    outputs: ['ndarray'],
    params: {
      a: { type: 'array', required: true, default: 'array' },
      axis: { type: 'number', required: false, default: null }
    }
  },
  
  // Linear Algebra
  dot: {
    name: 'np.dot',
    category: 'Linear Algebra',
    description: 'Dot product of arrays',
    inputs: ['a', 'b'],
    outputs: ['ndarray'],
    params: {
      a: { type: 'array', required: true, default: 'array1' },
      b: { type: 'array', required: true, default: 'array2' }
    }
  },
  transpose: {
    name: 'np.transpose',
    category: 'Linear Algebra',
    description: 'Transpose array',
    inputs: ['a'],
    outputs: ['ndarray'],
    params: {
      a: { type: 'array', required: true, default: 'array' }
    }
  },
  
  // Array Manipulation
  reshape: {
    name: 'np.reshape',
    category: 'Array Manipulation',
    description: 'Reshape array',
    inputs: ['a', 'newshape'],
    outputs: ['ndarray'],
    params: {
      a: { type: 'array', required: true, default: 'array' },
      newshape: { type: 'tuple', required: true, default: '(2, 3)' }
    }
  },
  concatenate: {
    name: 'np.concatenate',
    category: 'Array Manipulation',
    description: 'Join arrays along axis',
    inputs: ['arrays', 'axis'],
    outputs: ['ndarray'],
    params: {
      arrays: { type: 'list', required: true, default: '[array1, array2]' },
      axis: { type: 'number', required: false, default: 0 }
    }
  }
};

export const categories = [...new Set(Object.values(numpyFunctions).map(fn => fn.category))];