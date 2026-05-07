export default function RootPage() {
  return (
    <div style={{ 
      fontFamily: 'system-ui, sans-serif', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#f8fafc',
      color: '#0f172a'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀 Smart Kids API</h1>
      <p style={{ fontSize: '1.2rem', color: '#64748b' }}>
        Server is running. Documentation: <code>/api/v1/health</code>
      </p>
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#e2e8f0', borderRadius: '0.5rem' }}>
        Status: <span style={{ color: '#10b981', fontWeight: 'bold' }}>Active</span>
      </div>
    </div>
  );
}
