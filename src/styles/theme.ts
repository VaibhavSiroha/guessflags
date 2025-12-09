export const theme = {
    colors: {
        // Dark glass background with subtle blue undertones
        background: '#080b12',
        backgroundGradient: 'linear-gradient(145deg, #080b12 0%, #0d1117 30%, #101820 60%, #0a0f16 100%)',

        // Glass effects - layered for depth
        glass: 'rgba(20, 30, 45, 0.6)',
        glassLight: 'rgba(40, 55, 75, 0.4)',
        glassHover: 'rgba(35, 50, 70, 0.7)',
        glassBorder: 'rgba(100, 150, 200, 0.15)',
        glassBorderLight: 'rgba(150, 200, 255, 0.1)',

        // Primary accent - Cyan/Teal for modern glass look
        primary: '#00d4aa',
        primaryHover: '#00f0c0',
        primaryDark: '#00a888',
        primaryGlow: 'rgba(0, 212, 170, 0.35)',

        // Secondary accent - Ice blue
        secondary: '#38bdf8',
        secondaryGlow: 'rgba(56, 189, 248, 0.3)',

        // Status colors
        success: '#22c55e',
        successGlow: 'rgba(34, 197, 94, 0.35)',
        error: '#f43f5e',
        errorGlow: 'rgba(244, 63, 94, 0.35)',
        warning: '#fbbf24',
        warningGlow: 'rgba(251, 191, 36, 0.3)',

        // Text colors
        text: '#f1f5f9',
        textMuted: '#94a3b8',
        textDim: '#64748b',
        textGlow: 'rgba(241, 245, 249, 0.8)',
    },
    shadows: {
        // 3D layered glass shadows
        glass: `
            0 4px 6px rgba(0, 0, 0, 0.2),
            0 8px 24px rgba(0, 0, 0, 0.3),
            0 16px 48px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `,
        glassHover: `
            0 6px 12px rgba(0, 0, 0, 0.25),
            0 12px 32px rgba(0, 0, 0, 0.35),
            0 24px 64px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.08)
        `,
        glass3d: `
            0 2px 4px rgba(0, 0, 0, 0.15),
            0 8px 16px rgba(0, 0, 0, 0.2),
            0 16px 32px rgba(0, 0, 0, 0.15),
            inset 0 2px 4px rgba(255, 255, 255, 0.03),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2)
        `,
        // Glows
        glow: '0 0 30px rgba(0, 212, 170, 0.25), 0 0 60px rgba(0, 212, 170, 0.15)',
        glowStrong: '0 0 20px rgba(0, 212, 170, 0.4), 0 0 40px rgba(0, 212, 170, 0.25), 0 0 80px rgba(0, 212, 170, 0.15)',
        successGlow: '0 0 25px rgba(34, 197, 94, 0.3), 0 0 50px rgba(34, 197, 94, 0.15)',
        errorGlow: '0 0 25px rgba(244, 63, 94, 0.3), 0 0 50px rgba(244, 63, 94, 0.15)',
        // 3D button shadows
        button3d: `
            0 4px 0 rgba(0, 0, 0, 0.3),
            0 6px 12px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
        button3dPressed: `
            0 2px 0 rgba(0, 0, 0, 0.3),
            0 3px 6px rgba(0, 0, 0, 0.2),
            inset 0 1px 2px rgba(0, 0, 0, 0.2)
        `,
    },
    blur: '20px',
    blurLight: '12px',
    radius: {
        sm: '10px',
        md: '14px',
        lg: '20px',
        xl: '28px',
        round: '50%',
    },
    transitions: {
        fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        normal: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        spring: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    // 3D transforms
    transforms: {
        lift: 'translateY(-4px)',
        press: 'translateY(2px)',
        tiltLeft: 'perspective(1000px) rotateY(-2deg)',
        tiltRight: 'perspective(1000px) rotateY(2deg)',
    },
};

export type Theme = typeof theme;
