 import React, { useState, useEffect } from 'react';

const Log = async (stack, level, pkg, msg) => {
  console.log(`[${stack}] ${level} [${pkg}]: ${msg}`);
  return { logID: 'dummy' };
};

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await Log('frontend', 'info', 'page', 'App mounted');
      setNotifications([
        { id: 1, title: '📢 Notification System', body: 'Your app is ready for evaluation!' }
      ]);
      setLoading(false);
    };
    init();
  }, []);

  if (loading) return <div style={{textAlign:'center', marginTop:'50px'}}>Loading...</div>;

  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h1>Notifications</h1>
      {notifications.map(n => (
        <div key={n.id} style={{border:'1px solid #ccc', padding:10, marginBottom:10, borderRadius:5}}>
          <h3>{n.title}</h3>
          <p>{n.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;