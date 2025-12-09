import { Variants } from 'framer-motion';

export const flagEnter: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
};

export const shake: Variants = {
    shake: {
        x: [0, -10, 10, -10, 10, -5, 5, 0],
        transition: { duration: 0.5 },
    },
};

export const pulse: Variants = {
    initial: { scale: 1 },
    pulse: {
        scale: [1, 1.2, 0.8, 1],
        transition: { duration: 0.4 },
    },
};

export const bounce: Variants = {
    initial: { scale: 1, y: 0 },
    bounce: {
        y: [0, -10, 0],
        scale: [1, 1.1, 1],
        transition: { duration: 0.4, ease: 'easeOut' },
    },
};

export const glassFade: Variants = {
    initial: { opacity: 0, scale: 0.9, backdropFilter: 'blur(0px)' },
    animate: {
        opacity: 1,
        scale: 1,
        backdropFilter: 'blur(16px)',
        transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export const slideUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
};

export const heartBeat: Variants = {
    initial: { scale: 1 },
    beat: {
        scale: [1, 0.8, 1.1, 1],
        opacity: [1, 0.5, 1, 1],
        transition: { duration: 0.4 },
    },
    lost: {
        scale: [1, 1.3, 0],
        opacity: [1, 0.5, 0],
        transition: { duration: 0.5 },
    },
};

export const popIn: Variants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};
