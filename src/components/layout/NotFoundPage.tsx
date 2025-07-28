const NotFoundPage = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <div style={{
          fontSize: '8rem',
          fontWeight: 'bold',
          color: '#e2e8f0',
          lineHeight: '1',
          marginBottom: '1rem'
        }}>
          404
        </div>
  
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '0.5rem',
          margin: '0 0 8px 0'
        }}>
          Oops! We couldn't find that page.
        </h1>
  
        <p style={{
          fontSize: '1rem',
          color: '#64748b',
          textAlign: 'center',
          maxWidth: '400px',
          lineHeight: '1.5',
          margin: '0 0 2rem 0'
        }}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </div>
    );
  };
  
  export default NotFoundPage;