import { motion, AnimatePresence } from "framer-motion";


export default function SlideUpPanel({ isOpen, children }: any) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="fixed bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-2xl p-6 z-50"
                >{children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}