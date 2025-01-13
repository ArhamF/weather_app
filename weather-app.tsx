'use client'

import { useState } from 'react'
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Mock weather data (replace with actual API call in a real application)
const mockWeatherData = {
  hourly: Array.from({ length: 6 }, (_, i) => ({
    time: new Date(Date.now() + i * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: Math.round(Math.random() * 15 + 10),
    windchill: Math.round(Math.random() * 10 + 5),
    icon: ['Sun', 'Cloud', 'CloudRain', 'CloudSnow', 'Wind'][Math.floor(Math.random() * 5)],
  })),
  daily: Array.from({ length: 6 }, (_, i) => ({
    day: new Date(Date.now() + i * 86400000).toLocaleDateString([], { weekday: 'short' }),
    temp: Math.round(Math.random() * 15 + 10),
    windchill: Math.round(Math.random() * 10 + 5),
    icon: ['Sun', 'Cloud', 'CloudRain', 'CloudSnow', 'Wind'][Math.floor(Math.random() * 5)],
  })),
}

const WeatherIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const IconComponent = {
    Sun, Cloud, CloudRain, CloudSnow, Wind
  }[icon] || Cloud

  return <IconComponent className={`weather-icon ${className}`} />
}

export default function WeatherApp() {
  const [viewMode, setViewMode] = useState<'hourly' | 'daily'>('hourly')

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="relative group">
        {/* Card */}
        <div className="relative group overflow-hidden rounded-xl p-6 backdrop-blur-sm border border-white/10
          bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10
          hover:from-purple-500/20 hover:via-blue-500/20 hover:to-pink-500/20
          transition-all duration-500">
          
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 
              bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20
              animate-gradient-shift opacity-30" />
            {[...Array(3)].map((_, i) => (
              <div
                key={`bg-element-${i}`}
                className={`
                  absolute w-64 h-64 rounded-full
                  ${i === 0 ? 'bg-purple-600/10 top-1/4 left-1/4 animate-float-slow' :
                    i === 1 ? 'bg-blue-600/10 top-1/2 right-1/4 animate-float-medium' :
                    'bg-pink-600/10 bottom-1/4 left-1/2 animate-float-fast'}
                  blur-3xl
                `}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative space-y-4">
            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-center">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 
                bg-clip-text text-transparent bg-animate-gradient">
                Weather Forecast
              </span>
            </h1>

            {/* View mode toggle */}
            <div className="flex justify-center space-x-2">
              <Button
                onClick={() => setViewMode('hourly')}
                variant={viewMode === 'hourly' ? 'default' : 'outline'}
                size="sm"
                className={`
                  transition-colors duration-300
                  ${viewMode === 'hourly'
                    ? 'bg-purple-500/50 hover:bg-purple-500/70 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-purple-200'}
                `}
              >
                Next 6 Hours
              </Button>
              <Button
                onClick={() => setViewMode('daily')}
                variant={viewMode === 'daily' ? 'default' : 'outline'}
                size="sm"
                className={`
                  transition-colors duration-300
                  ${viewMode === 'daily'
                    ? 'bg-purple-500/50 hover:bg-purple-500/70 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-purple-200'}
                `}
              >
                Next 6 Days
              </Button>
            </div>

            {/* Weather information */}
            <div className="grid grid-cols-3 gap-2">
              {(viewMode === 'hourly' ? mockWeatherData.hourly : mockWeatherData.daily).map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center p-2 rounded-lg
                    bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300
                    overflow-hidden cursor-pointer"
                  whileHover="hover"
                >
                  <span className="text-xs font-medium text-purple-200">
                    {viewMode === 'hourly' ? item.time : item.day}
                  </span>
                  <WeatherIcon icon={item.icon} className="text-blue-300 my-1 w-8 h-8" />
                  <motion.div
                    className="flex items-center justify-center w-full h-6 overflow-hidden"
                  >
                    <motion.div
                      className="flex items-center justify-center space-x-2"
                      initial={{ x: 0 }}
                      variants={{
                        hover: { x: 1 }
                      }}
                    >
                      <motion.span 
                        className="text-sm font-bold text-pink-200"
                      >
                        {item.temp}°C
                      </motion.span>
                      <motion.span 
                        className="text-xs font-medium text-blue-200"
                        initial={{ opacity: 0, width: 0 }}
                        variants={{
                          hover: { opacity: 1, width: 'auto' }
                        }}
                      >
                        {item.windchill}°C
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
      </div>
    </div>
  )
}

