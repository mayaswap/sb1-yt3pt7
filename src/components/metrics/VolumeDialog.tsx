import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VolumeChart } from './VolumeChart';

interface VolumeDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  data: Array<{ date: string; value: number }>;
  color: string;
}

export function VolumeDialog({ open, onClose, title, data, color }: VolumeDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.32, 0.72, 0, 1]
                }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                         w-[min(95vw,900px)] bg-surface border border-border 
                         rounded-xl shadow-2xl shadow-black/50 z-50"
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <Dialog.Title className="text-xl font-semibold text-white">
                      {title}
                    </Dialog.Title>
                    <Dialog.Close className="rounded-lg p-2 text-gray-400 
                                          hover:text-white hover:bg-white/5
                                          transition-colors">
                      <X className="h-5 w-5" />
                    </Dialog.Close>
                  </div>

                  <div className="p-6">
                    <div className="w-full h-[500px]">
                      <VolumeChart data={data} color={color} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}