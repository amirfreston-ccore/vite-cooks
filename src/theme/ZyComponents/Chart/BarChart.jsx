import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', seenProduct: 4000, sales: 2400 },
  { name: 'Feb', seenProduct: 3000, sales: 1398 },
  { name: 'Mar', seenProduct: 2000, sales: 9800 },
  { name: 'Apr', seenProduct: 2780, sales: 3908 },
  { name: 'May', seenProduct: 1890, sales: 4800 },
  { name: 'Jun', seenProduct: 2390, sales: 3800 },
];

const TinyBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="8 8" horizontal={true} vertical={false} stroke='#cccccc70' />
        <XAxis dataKey="name" axisLine={false} tick={{ fill: '#cccccc', fontWeight: 300 }} fontSize={14} tickMargin={10} />
        <YAxis axisLine={false} tick={{ fill: '#cccccc', fontWeight: 300 }} tickMargin={10} />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div style={{
                  backgroundColor: '#000',
                  border: 'none',
                  borderRadius: '18px',
                  color: 'white',
                  fontSize: '12px',
                  padding: '12px'
                }}>
                  <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{label}</p>
                  {payload.map((entry, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: entry.color,
                        marginRight: '8px'
                      }}></div>
                      <span>{entry.dataKey === 'seenProduct' ? 'Seen Product' : 'Sales'}: {entry.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="seenProduct" fill="#d1d5db" radius={40} />
        <Bar dataKey="sales" fill="#4453f4" radius={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TinyBarChart;