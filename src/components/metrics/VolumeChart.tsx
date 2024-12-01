import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface VolumeChartProps {
  data: Array<{ date: string; value: number }>;
  color: string;
}

export function VolumeChart({ data, color }: VolumeChartProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.6,
        delay: 0.2,
        ease: [0.32, 0.72, 0, 1]
      }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="75%" stopColor={color} stopOpacity={0.05} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#525252"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#262626' }}
            dy={10}
          />
          <YAxis 
            stroke="#525252"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#262626' }}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              background: '#1A1A1A',
              border: '1px solid #262626',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
              color: '#fff',
              padding: '12px'
            }}
            formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, 'Volume']}
            labelStyle={{ color: '#a3a3a3', marginBottom: '4px' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
            animationDuration={1500}
            animationBegin={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}