// NumPy simulator for real-time preview without actual NumPy
export class NumpySimulator {
  constructor() {
    this.cache = new Map();
  }

  // Simulate NumPy array creation and operations
  simulate(functionName, params = {}) {
    const cacheKey = `${functionName}_${JSON.stringify(params)}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let result;
    try {
      result = this.executeFunction(functionName, params);
      this.cache.set(cacheKey, result);
    } catch (error) {
      result = {
        error: error.message,
        success: false
      };
    }

    return result;
  }

  executeFunction(functionName, params) {
    const functions = {
      'np.array': () => this.createArray(params),
      'np.zeros': () => this.createZeros(params),
      'np.ones': () => this.createOnes(params),
      'np.linspace': () => this.createLinspace(params),
      'np.add': () => this.add(params),
      'np.multiply': () => this.multiply(params),
      'np.sin': () => this.sin(params),
      'np.cos': () => this.cos(params),
      'np.mean': () => this.mean(params),
      'np.std': () => this.std(params),
      'np.sum': () => this.sum(params),
      'np.dot': () => this.dot(params),
      'np.transpose': () => this.transpose(params),
      'np.reshape': () => this.reshape(params),
      'np.concatenate': () => this.concatenate(params)
    };

    if (functions[functionName]) {
      return functions[functionName]();
    }

    throw new Error(`Unknown function: ${functionName}`);
  }

  createArray(params) {
    const data = this.parseArrayData(params.data || '[1, 2, 3]');
    const dtype = params.dtype || 'float64';
    
    return {
      data: data,
      shape: this.getShape(data),
      dtype: dtype,
      size: this.getSize(data),
      ndim: this.getNdim(data),
      success: true,
      preview: this.formatPreview(data)
    };
  }

  createZeros(params) {
    const shape = this.parseShape(params.shape || '(3, 3)');
    const dtype = params.dtype || 'float64';
    const data = this.createZerosArray(shape);
    
    return {
      data: data,
      shape: shape,
      dtype: dtype,
      size: this.getSize(data),
      ndim: shape.length,
      success: true,
      preview: this.formatPreview(data)
    };
  }

  createOnes(params) {
    const shape = this.parseShape(params.shape || '(2, 2)');
    const dtype = params.dtype || 'float64';
    const data = this.createOnesArray(shape);
    
    return {
      data: data,
      shape: shape,
      dtype: dtype,
      size: this.getSize(data),
      ndim: shape.length,
      success: true,
      preview: this.formatPreview(data)
    };
  }

  createLinspace(params) {
    const start = parseFloat(params.start || 0);
    const stop = parseFloat(params.stop || 10);
    const num = parseInt(params.num || 50);
    
    const data = [];
    const step = (stop - start) / (num - 1);
    
    for (let i = 0; i < num; i++) {
      data.push(start + i * step);
    }
    
    return {
      data: data,
      shape: [num],
      dtype: 'float64',
      size: num,
      ndim: 1,
      success: true,
      preview: this.formatPreview(data)
    };
  }

  add(params) {
    const arr1 = this.getDefaultArray();
    const arr2 = this.getDefaultArray();
    const result = arr1.map((val, i) => val + (arr2[i] || 0));
    
    return {
      data: result,
      shape: [result.length],
      dtype: 'float64',
      size: result.length,
      ndim: 1,
      success: true,
      preview: this.formatPreview(result)
    };
  }

  multiply(params) {
    const arr1 = this.getDefaultArray();
    const arr2 = this.getDefaultArray();
    const result = arr1.map((val, i) => val * (arr2[i] || 1));
    
    return {
      data: result,
      shape: [result.length],
      dtype: 'float64',
      size: result.length,
      ndim: 1,
      success: true,
      preview: this.formatPreview(result)
    };
  }

  sin(params) {
    const arr = this.getDefaultArray();
    const result = arr.map(val => Math.sin(val));
    
    return {
      data: result,
      shape: [result.length],
      dtype: 'float64',
      size: result.length,
      ndim: 1,
      success: true,
      preview: this.formatPreview(result)
    };
  }

  cos(params) {
    const arr = this.getDefaultArray();
    const result = arr.map(val => Math.cos(val));
    
    return {
      data: result,
      shape: [result.length],
      dtype: 'float64',
      size: result.length,
      ndim: 1,
      success: true,
      preview: this.formatPreview(result)
    };
  }

  mean(params) {
    const arr = this.getDefaultArray();
    const result = arr.reduce((sum, val) => sum + val, 0) / arr.length;
    
    return {
      data: result,
      shape: [],
      dtype: 'float64',
      size: 1,
      ndim: 0,
      success: true,
      preview: result.toFixed(4)
    };
  }

  std(params) {
    const arr = this.getDefaultArray();
    const mean = arr.reduce((sum, val) => sum + val, 0) / arr.length;
    const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
    const result = Math.sqrt(variance);
    
    return {
      data: result,
      shape: [],
      dtype: 'float64',
      size: 1,
      ndim: 0,
      success: true,
      preview: result.toFixed(4)
    };
  }

  sum(params) {
    const arr = this.getDefaultArray();
    const result = arr.reduce((sum, val) => sum + val, 0);
    
    return {
      data: result,
      shape: [],
      dtype: 'float64',
      size: 1,
      ndim: 0,
      success: true,
      preview: result.toString()
    };
  }

  dot(params) {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const result = arr1.reduce((sum, val, i) => sum + val * arr2[i], 0);
    
    return {
      data: result,
      shape: [],
      dtype: 'float64',
      size: 1,
      ndim: 0,
      success: true,
      preview: result.toString()
    };
  }

  transpose(params) {
    const data = [[1, 2], [3, 4]];
    const result = data[0].map((_, colIndex) => data.map(row => row[colIndex]));
    
    return {
      data: result,
      shape: [2, 2],
      dtype: 'float64',
      size: 4,
      ndim: 2,
      success: true,
      preview: this.formatPreview(result)
    };
  }

  reshape(params) {
    const arr = [1, 2, 3, 4, 5, 6];
    const newShape = this.parseShape(params.newshape || '(2, 3)');
    
    return {
      data: this.reshapeArray(arr, newShape),
      shape: newShape,
      dtype: 'float64',
      size: arr.length,
      ndim: newShape.length,
      success: true,
      preview: this.formatPreview(this.reshapeArray(arr, newShape))
    };
  }

  concatenate(params) {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const result = [...arr1, ...arr2];
    
    return {
      data: result,
      shape: [result.length],
      dtype: 'float64',
      size: result.length,
      ndim: 1,
      success: true,
      preview: this.formatPreview(result)
    };
  }

  // Helper methods
  parseArrayData(dataStr) {
    try {
      return eval(dataStr);
    } catch {
      return [1, 2, 3];
    }
  }

  parseShape(shapeStr) {
    try {
      return eval(shapeStr);
    } catch {
      return [3];
    }
  }

  getShape(data) {
    if (Array.isArray(data)) {
      if (Array.isArray(data[0])) {
        return [data.length, data[0].length];
      }
      return [data.length];
    }
    return [];
  }

  getSize(data) {
    if (Array.isArray(data)) {
      return data.flat(Infinity).length;
    }
    return 1;
  }

  getNdim(data) {
    if (!Array.isArray(data)) return 0;
    if (!Array.isArray(data[0])) return 1;
    return 2; // Simplified for demo
  }

  getDefaultArray() {
    return [1, 2, 3, 4, 5];
  }

  createZerosArray(shape) {
    if (shape.length === 1) {
      return new Array(shape[0]).fill(0);
    } else if (shape.length === 2) {
      return new Array(shape[0]).fill(null).map(() => new Array(shape[1]).fill(0));
    }
    return [0];
  }

  createOnesArray(shape) {
    if (shape.length === 1) {
      return new Array(shape[0]).fill(1);
    } else if (shape.length === 2) {
      return new Array(shape[0]).fill(null).map(() => new Array(shape[1]).fill(1));
    }
    return [1];
  }

  reshapeArray(arr, newShape) {
    if (newShape.length === 1) {
      return arr.slice(0, newShape[0]);
    } else if (newShape.length === 2) {
      const result = [];
      for (let i = 0; i < newShape[0]; i++) {
        result.push(arr.slice(i * newShape[1], (i + 1) * newShape[1]));
      }
      return result;
    }
    return arr;
  }

  formatPreview(data) {
    if (typeof data === 'number') {
      return data.toFixed(4);
    }
    
    if (Array.isArray(data)) {
      if (data.length <= 6) {
        if (Array.isArray(data[0])) {
          return data.map(row => 
            row.length <= 6 ? 
            `[${row.map(val => typeof val === 'number' ? val.toFixed(2) : val).join(', ')}]` :
            `[${row.slice(0, 3).map(val => typeof val === 'number' ? val.toFixed(2) : val).join(', ')}, ..., ${row.slice(-1)[0].toFixed(2)}]`
          ).join('\n');
        }
        return `[${data.map(val => typeof val === 'number' ? val.toFixed(2) : val).join(', ')}]`;
      } else {
        const preview = data.slice(0, 3).map(val => typeof val === 'number' ? val.toFixed(2) : val);
        const last = data[data.length - 1];
        return `[${preview.join(', ')}, ..., ${typeof last === 'number' ? last.toFixed(2) : last}]`;
      }
    }
    
    return String(data);
  }
}

export const numpySimulator = new NumpySimulator();