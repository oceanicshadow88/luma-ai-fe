const RedirectNoticePage = () => {
    return (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.5rem' }}>
                Please access Luma AI through your organization’s unique URL
            </h1>
            <p style={{ marginTop: '1rem', color: '#666' }}>
                To log in or register, visit your organization’s dedicated workspace URL.
                <br />
                For example: <code>yourorg.lumaai.com</code>
            </p>
        </div>
    );
};

export default RedirectNoticePage;
