import { useEffect, useState } from 'react';
import { Section } from './utils/types';
import { computeSum } from './utils/helpers';
import NodeRenderer from './components/NodeRenderer';

function App() {
  const [data, setData] = useState<Section | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('http://localhost:4000/api/demo')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  const toggleCollapse = (path: number[]) => {
    const key = path.join('-');
    const newSet = new Set(collapsed);
    if (collapsed.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setCollapsed(newSet);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Annual Report</h1>
      {data ? (
        <>
          <h2>Total Sum: {computeSum(data)}</h2>
          <NodeRenderer
            node={data}
            path={[]}
            collapsed={collapsed}
            toggleCollapse={toggleCollapse}
            data={data}
            setData={setData}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
