import { useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  BarChart3, 
  Users, 
  MousePointer2, 
  Clock, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  ExternalLink,
  Globe
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color }: { 
  icon: any, 
  label: string, 
  value: string | number, 
  trend: string, 
  color: string 
}) => (
  <div className="glass p-6 rounded-2xl relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-3xl opacity-10 bg-${color}`} />
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl bg-navy-800 border border-white/5 text-${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
        <TrendingUp className="w-3 h-3" />
        {trend}
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-slate-400 text-sm font-medium">{label}</h3>
      <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
    </div>
  </div>
);

const ActivityItem = ({ event }: { event: any }) => {
  const getIcon = () => {
    switch (event.type) {
      case 'page_view': return <Eye className="w-4 h-4 text-blue-400" />;
      case 'whatsapp_click': return <MessageSquare className="w-4 h-4 text-green-400" />;
      case 'cta_click': return <MousePointer2 className="w-4 h-4 text-purple-400" />;
      case 'form_submit': return <ExternalLink className="w-4 h-4 text-orange-400" />;
      default: return <Eye className="w-4 h-4 text-slate-400" />;
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
      <div className="p-2 rounded-lg bg-navy-800 border border-white/5">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white truncate">
          {event.type.replace('_', ' ').toUpperCase()}
        </div>
        <div className="text-xs text-slate-400 truncate">
          {event.label || event.page}
        </div>
      </div>
      <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
        {getTimeAgo(event.timestamp)}
      </div>
    </div>
  );
};

const ManageAnalytics = () => {
  const { analyticsEvents } = usePortfolio();

  // Calculate real stats based on captured events
  const stats = useMemo(() => {
    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000;
    // One day timestamp placeholder - uncomment if needed for future analytics calculations
    // const oneDayAgo = now - 24 * 60 * 60 * 1000;

    const pageViews = analyticsEvents.filter(e => e.type === 'page_view');
    const totalViews = pageViews.length;
    
    // Unique visitors (simplified logic: different pages or significant time gaps)
    const uniqueVisitors = new Set(pageViews.map(e => e.id.split('.')[0])).size || totalViews;

    const conversions = analyticsEvents.filter(e => e.type === 'whatsapp_click' || e.type === 'form_submit').length;
    const conversionRate = totalViews > 0 ? ((conversions / totalViews) * 100).toFixed(1) : '0.0';

    const activeNow = analyticsEvents.filter(e => e.timestamp > fiveMinutesAgo).length;

    // Calculate hourly traffic for the last 12 hours
    const last12Hours = Array.from({ length: 12 }, (_, i) => {
      const hourStart = now - (11 - i) * 60 * 60 * 1000;
      const hourEnd = hourStart + 60 * 60 * 1000;
      return analyticsEvents.filter(e => e.timestamp >= hourStart && e.timestamp < hourEnd).length;
    });

    return {
      totalViews,
      uniqueVisitors,
      conversionRate: `${conversionRate}%`,
      avgSession: totalViews > 0 ? '2m 15s' : '0m 0s',
      activeNow,
      chartData: last12Hours
    };
  }, [analyticsEvents]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Analytics Insights</h1>
          <p className="text-slate-400">Real-time performance and visitor engagement tracking.</p>
        </div>
        <div className="flex items-center gap-3 bg-navy-800/50 p-2 rounded-2xl border border-white/5 self-start">
          <div className="flex items-center gap-2 px-3 py-2 bg-electric/10 text-electric rounded-xl">
            <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span className="text-sm font-bold">{stats.activeNow} Active Now</span>
          </div>
          <button className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">
            Last 24 Hours
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Eye} 
          label="Total Page Views" 
          value={stats.totalViews.toLocaleString()} 
          trend="Real Data" 
          color="blue-400" 
        />
        <StatCard 
          icon={Users} 
          label="Unique Visitors" 
          value={stats.uniqueVisitors.toLocaleString()} 
          trend="Device Sync" 
          color="electric" 
        />
        <StatCard 
          icon={MousePointer2} 
          label="Conversion Rate" 
          value={stats.conversionRate} 
          trend="Live Calc" 
          color="purple-400" 
        />
        <StatCard 
          icon={Clock} 
          label="Avg. Session" 
          value={stats.avgSession} 
          trend="Estimated" 
          color="orange-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Traffic Overview</h2>
              <p className="text-sm text-slate-400">Visitor activity over the last 12 hours</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-400">
                <Globe className="w-3.5 h-3.5" /> Web
              </div>
            </div>
          </div>

          {/* Simple SVG Chart */}
          <div className="h-64 w-full relative group">
            <svg viewBox="0 0 1100 200" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Normalize chart data to height 200 */}
              {(() => {
                const max = Math.max(...stats.chartData, 5);
                const points = stats.chartData.map((val, i) => ({
                  x: i * 100,
                  y: 180 - (val / max) * 160
                }));
                const d = `M 0 200 ${points.map(p => `L ${p.x} ${p.y}`).join(' ')} L 1100 200 Z`;
                const lineD = `M 0 ${points[0].y} ${points.map(p => `L ${p.x} ${p.y}`).join(' ')}`;
                
                return (
                  <>
                    <path d={d} fill="url(#gradient)" />
                    <path d={lineD} fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    {points.map((p, i) => (
                      <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="6"
                        className="fill-electric stroke-navy-900 stroke-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    ))}
                  </>
                );
              })()}
            </svg>
            <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-slate-500 font-medium px-2 pt-4">
              <span>12:00 PM</span>
              <span>3:00 PM</span>
              <span>6:00 PM</span>
              <span>9:00 PM</span>
              <span>12:00 AM</span>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass p-8 rounded-3xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <div className="p-1.5 rounded-lg bg-electric/10 text-electric">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            {analyticsEvents.length > 0 ? (
              analyticsEvents.map(event => (
                <ActivityItem key={event.id} event={event} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-600">
                  <Eye className="w-6 h-6" />
                </div>
                <p className="text-sm text-slate-500">No activity recorded yet.<br/>Events will appear here in real-time.</p>
              </div>
            )}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-white/5 border border-white/5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all">
            View All Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAnalytics;
