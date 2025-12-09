export const theme = {
    colors: {
        background: '#0f0f1a',
        backgroundGradient: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
        glass: 'rgba(255, 255, 255, 0.05)',
        glassHover: 'rgba(255, 255, 255, 0.1)',
        glassBorder: 'rgba(255, 255, 255, 0.1)',
        primary: '#6366f1',
        primaryHover: '#818cf8',
        primaryGlow: 'rgba(99, 102, 241, 0.4)',
        success: '#10b981',
        successGlow: 'rgba(16, 185, 129, 0.4)',
        error: '#ef4444',
        errorGlow: 'rgba(239, 68, 68, 0.4)',
        warning: '#f59e0b',
        text: '#ffffff',
        textMuted: '#94a3b8',
        textDim: '#64748b',
    },
    shadows: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.3)',
        glassHover: '0 12px 40px rgba(0, 0, 0, 0.4)',
        glow: '0 0 20px rgba(99, 102, 241, 0.3)',
        successGlow: '0 0 20px rgba(16, 185, 129, 0.3)',
        errorGlow: '0 0 20px rgba(239, 68, 68, 0.3)',
    },
    blur: '16px',
    radius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
    },
    transitions: {
        fast: '0.15s ease',
        normal: '0.3s ease',
        slow: '0.5s ease',
    },
};

export type Theme = typeof theme;
