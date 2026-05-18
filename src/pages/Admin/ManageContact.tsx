import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ContactInfo } from '../../data/portfolioData';
import { Save, Check } from 'lucide-react';

const timeOptions = Array.from({ length: 24 * 2 }).map((_, i) => {
  const hour = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? '00' : '30';
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour.toString().padStart(2, '0')}:${minutes} ${period}`;
});

const ManageContact = () => {
  const { contactInfo, updateContactInfo } = usePortfolio();
  const [form, setForm] = useState<ContactInfo>({ ...contactInfo });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white font-[Poppins]">Manage Contact Info</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Card 1: General Contact Information */}
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Save className="w-5 h-5 text-electric" />
            General Information
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">WhatsApp Number</label>
                <input
                  type="text"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors"
                  placeholder="e.g. 9511618005"
                />
                <p className="text-[10px] text-slate-500 mt-1">Enter number without + or 91 prefix for the link</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Display Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors"
                  placeholder="e.g. +91 95116 18005"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors"
                placeholder="hello@techsuccession.in"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors"
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Availability & Response Time */}
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Check className="w-5 h-5 text-electric" />
            Availability & Response
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">⏰ Response Time</label>
                <input
                  type="text"
                  value={form.responseTime}
                  onChange={(e) => setForm({ ...form, responseTime: e.target.value })}
                  className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors"
                  placeholder="e.g. 2 hours"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Work Starts</label>
                  <select
                    value={form.workHoursStart}
                    onChange={(e) => setForm({ ...form, workHoursStart: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors appearance-none cursor-pointer"
                  >
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Work Ends</label>
                  <select
                    value={form.workHoursEnd}
                    onChange={(e) => setForm({ ...form, workHoursEnd: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors appearance-none cursor-pointer"
                  >
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              This will be shown as: "We typically respond within <b>{form.responseTime}</b> during our working hours (<b>{form.workHoursStart}</b> to <b>{form.workHoursEnd}</b>)."
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saved}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${
            saved 
              ? 'bg-green-500 text-white' 
              : 'bg-electric hover:bg-electric/90 text-white hover:shadow-lg hover:shadow-electric/25'
          }`}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Changes Saved Successfully!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save All Contact Information
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ManageContact;
