import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SlideAnimation {
    children: ReactNode;
}

const SlideAnimation: React.FC<SlideAnimation> = ({ children }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6  }}
        >
            {children}
        </motion.div>
    );
};

export default SlideAnimation;

