import { RadialBarChart, RadialBar, Legend } from 'recharts';

// #region Sample data
const data = [
  {
    name: '18-24',
    uv: 31.47,
    pv: 2400,
    fill: 'red',
  },
  {
    name: '25-29',
    uv: 26.69,
    pv: 4567,
    fill: '#4453f4',
  },
  {
    name: '30-34',
    uv: 15.69,
    pv: 1398,
    fill: '#4453f4',
  },

];

// #endregion
const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const SimpleRadialBarChart = () => {
  return (
    <RadialBarChart
      style={{ width: '100%',  
        aspectRatio: 1.618
       }}
      responsive
      cx="30%"
      cy="50%"
      innerRadius="10%"
      outerRadius="80%"
      barSize={12}
      data={data}
    >
      <RadialBar
        label={{ position: 'insideStart', fill: '#fff' }}
        background
        dataKey="uv"
        cornerRadius={10}
        startAngle={90}
        endAngle={450}
      />
      <Legend 
        content={({ payload }) => (
          <div style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {payload.map((entry, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: entry.color
                }}></div>
                <span style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  {entry.value}
                </span>
              </div>
            ))}
          </div>
        )}
      />
    </RadialBarChart>
  );
};

export default SimpleRadialBarChart;