// Common styles used across slides
export const slideStyles = {
  // Container styles
  container: {
    maxW4xl: 'max-w-4xl mx-auto',
    maxW6xl: 'max-w-6xl mx-auto',
    maxW7xl: 'max-w-7xl mx-auto'
  },

  // Title styles
  title: {
    main: 'text-3xl md:text-5xl font-bold text-white mb-12 text-center',
    large: 'text-4xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4',
    subtitle: 'text-2xl md:text-4xl font-semibold text-purple-300 mb-8',
    sectionTitle: 'text-xl font-semibold',
    subsectionTitle: 'text-lg font-semibold'
  },

  // Card styles with color variants
  card: {
    base: 'rounded-2xl p-6 border',
    red: 'bg-red-950/30 border-red-800/30',
    emerald: 'bg-emerald-950/30 border-emerald-800/30',
    blue: 'bg-blue-950/30 border-blue-800/30',
    purple: 'bg-purple-950/30 border-purple-800/30',
    yellow: 'bg-yellow-950/30 border-yellow-800/30',
    orange: 'bg-orange-950/30 border-orange-800/30',
    slate: 'bg-slate-800/50 border-slate-700/50',
    gradient: {
      redOrange: 'bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-800/30',
      purpleBlue: 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-800/30'
    }
  },

  // Text colors
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    accent: {
      red: 'text-red-400',
      emerald: 'text-emerald-400',
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      yellow: 'text-yellow-400',
      orange: 'text-orange-400',
      cyan: 'text-cyan-400',
      green: 'text-green-400'
    }
  },

  // Code block styles
  codeBlock: {
    wrapper: 'bg-slate-900/50 rounded-xl p-4 overflow-x-auto',
    wrapperLarge: 'bg-slate-900/80 rounded-xl p-6 overflow-x-auto',
    code: '!bg-transparent !p-0 !m-0'
  },

  // List styles
  list: {
    base: 'space-y-3',
    item: 'flex items-start gap-1',
    bullet: 'inline-block w-4 text-center flex-shrink-0'
  },

  // Badge/Number styles
  badge: {
    small: 'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm',
    medium: 'w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg',
    gradient: {
      greenBlue: 'bg-gradient-to-r from-green-500 to-blue-500',
      cyanBlue: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      orangeRed: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  }
};

// Helper function to combine classes
export const combineClasses = (...classes) => classes.filter(Boolean).join(' ');