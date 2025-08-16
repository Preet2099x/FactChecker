import React, { useState } from 'react';

// Main App Component
function App() {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!claim.trim()) {
      setError('Please enter a claim to check');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:3000/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          claim: claim.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to check claim');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        err.message || 
        'Failed to check claim. Make sure the backend server is running on port 3000.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getVerdictStyle = (verdict) => {
    switch (verdict?.toLowerCase()) {
      case 'real':
        return { 
          color: '#155724', 
          backgroundColor: '#d4edda', 
          borderColor: '#c3e6cb',
          borderWidth: '2px',
          borderStyle: 'solid'
        };
      case 'fake':
        return { 
          color: '#721c24', 
          backgroundColor: '#f8d7da', 
          borderColor: '#f5c6cb',
          borderWidth: '2px',
          borderStyle: 'solid'
        };
      case 'unverified':
        return { 
          color: '#856404', 
          backgroundColor: '#fff3cd', 
          borderColor: '#ffeaa7',
          borderWidth: '2px',
          borderStyle: 'solid'
        };
      default:
        return { 
          color: '#6c757d', 
          backgroundColor: '#e9ecef', 
          borderColor: '#ced4da',
          borderWidth: '2px',
          borderStyle: 'solid'
        };
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔍 Misinformation Checker</h1>
        <p style={styles.subtitle}>
          Enter a claim below to check its accuracy using real-time web search and AI analysis
        </p>

        <div style={styles.form}>
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="Enter a claim to fact-check (e.g., 'India became independent in 1930', 'The Earth is flat', etc.)"
            style={styles.textarea}
            rows={4}
          />
          
          <button 
            onClick={handleSubmit}
            disabled={loading || !claim.trim()}
            style={{
              ...styles.button,
              ...(loading || !claim.trim() ? styles.buttonDisabled : {})
            }}
          >
            {loading ? '🔄 Checking Claim...' : '🕵️ Check Claim'}
          </button>
        </div>

        {error && (
          <div style={styles.error}>
            <strong>❌ Error:</strong> {error}
          </div>
        )}

        {result && (
          <div style={styles.results}>
            <div 
              style={{
                ...styles.verdict,
                ...getVerdictStyle(result.verdict)
              }}
            >
              <h3 style={styles.verdictTitle}>
                {result.verdict === 'Fake' && '❌ CLAIM REJECTED: '}
                {result.verdict === 'Real' && '✅ CLAIM VERIFIED: '}
                {result.verdict === 'Unverified' && '⚠️ CLAIM UNVERIFIED: '}
                {result.verdict}
                {result.confidence && (
                  <span style={styles.confidence}>
                    (Confidence: {result.confidence})
                  </span>
                )}
              </h3>
            </div>

            <div style={styles.explanation}>
              <h4>
                {result.verdict === 'Fake' && '🚫 Why This Claim is False:'}
                {result.verdict === 'Real' && '✓ Evidence Supporting This Claim:'}
                {result.verdict === 'Unverified' && '📝 Analysis:'}
              </h4>
              <p style={styles.explanationText}>{result.explanation}</p>
            </div>

            {result.context && (
              <div style={styles.contextSection}>
                <h4>📚 Background & Context:</h4>
                <p style={styles.contextText}>{result.context}</p>
              </div>
            )}

            {result.whyMisinfo && result.verdict === 'Fake' && (
              <div style={styles.misinfoSection}>
                <h4>🤔 Why This Misinformation Spreads:</h4>
                <p style={styles.misinfoText}>{result.whyMisinfo}</p>
              </div>
            )}

            {result.sources && result.sources.length > 0 && (
              <div style={styles.sources}>
                <h4>🔗 Sources:</h4>
                <ul style={styles.sourcesList}>
                  {result.sources.map((source, index) => (
                    <li key={index} style={styles.sourceItem}>
                      <a 
                        href={source} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={styles.sourceLink}
                      >
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div style={styles.footer}>
          <p style={styles.note}>
            <strong>Note:</strong> This is a demo app using dummy API keys. 
            Replace with real Serper.dev and Gemini API keys for production use.
          </p>
        </div>
      </div>
    </div>
  );
}

// Styles object
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
    border: '1px solid #e1e5e9'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: '32px',
    lineHeight: '1.5'
  },
  form: {
    marginBottom: '24px'
  },
  textarea: {
    width: '100%',
    minHeight: '120px',
    padding: '16px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'inherit',
    resize: 'vertical',
    marginBottom: '16px',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '16px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    outline: 'none'
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed'
  },
  error: {
    padding: '16px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    borderRadius: '8px',
    marginBottom: '16px'
  },
  results: {
    marginTop: '24px'
  },
  verdict: {
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  verdictTitle: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: '700'
  },
  confidence: {
    fontSize: '0.9rem',
    fontWeight: '400',
    opacity: 0.8,
    marginLeft: '8px'
  },
  explanation: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  explanationText: {
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '8px 0 0 0',
    fontWeight: '500'
  },
  contextSection: {
    padding: '20px',
    backgroundColor: '#e8f4fd',
    border: '1px solid #bee5eb',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  contextText: {
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '8px 0 0 0',
    color: '#0c5460'
  },
  misinfoSection: {
    padding: '20px',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  misinfoText: {
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '8px 0 0 0',
    color: '#856404'
  },
  sources: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px'
  },
  sourcesList: {
    margin: '12px 0 0 0',
    padding: '0',
    listStyle: 'none'
  },
  sourceItem: {
    marginBottom: '8px'
  },
  sourceLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '14px',
    wordBreak: 'break-all'
  },
  footer: {
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid #e9ecef'
  },
  note: {
    fontSize: '14px',
    color: '#6c757d',
    textAlign: 'center',
    margin: 0,
    lineHeight: '1.4'
  }
};

export default App;