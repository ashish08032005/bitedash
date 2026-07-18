import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Clock, Phone, MessageSquare, ShieldCheck, Check, Bike, ChefHat, ClipboardList, MapPin, FastForward } from 'lucide-react';

export default function Tracking() {
  const { activeOrder, orders } = useApp();
  const navigate = useNavigate();

  const orderToTrack = activeOrder || orders[0];

  const [currentStage, setCurrentStage] = useState(0); 
  const [timeLeft, setTimeLeft] = useState(1500); 
  const timerRef = useRef(null);
  const simulationRef = useRef(null);

  const stages = [
    { title: 'Order Confirmed', desc: 'We have received your order.', icon: ClipboardList },
    { title: 'Preparing Food', desc: 'The kitchen is preparing your gourmet meal.', icon: ChefHat },
    { title: 'Out for Delivery', desc: 'Rahul (our delivery partner) is riding to your location.', icon: Bike },
    { title: 'Delivered', desc: 'Order delivered! Enjoy your meal.', icon: ShieldCheck }
  ];

  useEffect(() => {
    if (orderToTrack && currentStage < 3) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [orderToTrack, currentStage]);

  useEffect(() => {
    if (orderToTrack && currentStage < 3) {
      simulationRef.current = setInterval(() => {
        setCurrentStage((prev) => {
          if (prev < 3) return prev + 1;
          clearInterval(simulationRef.current);
          return prev;
        });
      }, 25000);
    }
    return () => clearInterval(simulationRef.current);
  }, [orderToTrack, currentStage]);

  if (!orderToTrack) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center animate-fade-in">
        <div className="rounded-full bg-slate-100 p-5 inline-block text-slate-400 dark:bg-slate-900">
          <Clock className="h-10 w-10 text-orange-500" />
        </div>
        <h2 className="mt-4 text-lg font-bold text-slate-700 dark:text-slate-300">No active orders</h2>
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          You don't have any recent orders to track.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20"
        >
          Order Food Now
        </Link>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCallDriver = () => {
    alert('Simulating call to driver Rahul Kumar (+91 98765-XXXXX)...');
  };

  const handleMessageDriver = () => {
    alert('Driver chat: "I have picked up your order and will reach in 10 minutes!"');
  };

  const handleFastForward = () => {
    if (currentStage < 3) {
      setCurrentStage((prev) => prev + 1);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8 animate-fade-in">
      
      {/* Demo Fast-Forward Helper Banner */}
      {currentStage < 3 && (
        <div className="flex items-center justify-between rounded-xl bg-orange-500/10 p-3.5 text-xs text-orange-400 dark:bg-orange-950/20 dark:text-orange-300 border border-orange-500/20">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-450 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span><strong>Demo Helper:</strong> Stages update automatically, or click fast forward.</span>
          </div>
          <button
            onClick={handleFastForward}
            className="flex items-center gap-1 font-bold text-orange-850 hover:text-orange-950 dark:text-orange-300 dark:hover:text-orange-200 border border-orange-550 rounded-lg px-2.5 py-1 bg-white dark:bg-slate-900"
          >
            <FastForward className="h-3.5 w-3.5" />
            <span>Fast Forward</span>
          </button>
        </div>
      )}

      {/* Main card */}
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg dark:border-slate-850 dark:bg-slate-900">
        
        {/* Banner with ETA */}
        <div className="bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-8 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-orange-100/90">Estimated Delivery Time</span>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-extrabold tracking-tight">
                {currentStage === 3 ? 'Delivered' : formatTime(timeLeft)}
              </h2>
              {currentStage < 3 && <span className="text-xs text-orange-100/80">mins left</span>}
            </div>
            <p className="text-xs text-orange-100/80 truncate max-w-sm">
              Delivered to: <span className="font-semibold">{orderToTrack.address}</span>
            </p>
          </div>
          <div className="self-start sm:self-center bg-white/10 px-4 py-2 rounded-2xl border border-white/5 backdrop-blur-md text-xs font-semibold">
            Order #{orderToTrack.id}
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Stepper Timeline */}
          <div className="relative">
            {/* Vertical path line */}
            <div className="absolute left-6 top-5 bottom-5 w-0.5 bg-slate-100 dark:bg-slate-800"></div>
            {/* Active colored bar overlay */}
            <div
              className="absolute left-6 top-5 w-0.5 bg-gradient-to-b from-orange-500 to-rose-500 transition-all duration-500"
              style={{ height: `${(currentStage / (stages.length - 1)) * 90}%` }}
            ></div>

            {/* Stages listing */}
            <div className="space-y-8 relative z-10">
              {stages.map((stage, idx) => {
                const IconComponent = stage.icon;
                const isCompleted = idx < currentStage;
                const isActive = idx === currentStage;
                const isPending = idx > currentStage;

                return (
                  <div key={idx} className="flex gap-4 items-start">
                    
                    {/* Circle icon marker */}
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ring-4 ${
                      isCompleted
                        ? 'bg-orange-500 text-white ring-orange-100 dark:ring-orange-950/40'
                        : isActive
                        ? 'bg-rose-500 text-white ring-rose-100 dark:ring-rose-950/40 animate-pulse'
                        : 'bg-slate-100 text-slate-400 ring-transparent dark:bg-slate-800 dark:text-slate-500'
                    }`}>
                      {isCompleted ? <Check className="h-5 w-5 stroke-[3]" /> : <IconComponent className="h-5 w-5" />}
                    </div>

                    {/* Stage details */}
                    <div className="space-y-0.5 mt-1.5 flex-1">
                      <h3 className={`text-xs font-bold transition-colors ${
                        isActive
                          ? 'text-slate-850 dark:text-slate-50 text-sm'
                          : isCompleted
                          ? 'text-slate-700 dark:text-slate-300'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}>
                        {stage.title}
                      </h3>
                      <p className={`text-[11px] ${
                        isActive
                          ? 'text-slate-500 dark:text-slate-400 font-medium'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}>
                        {stage.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Driver Profile Card */}
          {currentStage >= 2 && currentStage < 3 && (
            <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 text-white flex items-center justify-center font-bold text-sm">
                  RK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">Rahul Kumar</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Your delivery partner • 4.9 ★</p>
                  <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Royal Enfield (Black) • DL 3S AB 1234</p>
                </div>
              </div>

              {/* Call & Message Shortcuts */}
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleMessageDriver}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-705 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:bg-slate-800"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                  <span>Message</span>
                </button>
                <button
                  onClick={handleCallDriver}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call Partner</span>
                </button>
              </div>
            </div>
          )}

          {/* Footer Order Recap */}
          <div className="border-t border-slate-100 pt-6 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] text-slate-400">Delivering to</span>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                {orderToTrack.address}
              </p>
            </div>
            <Link
              to="/profile"
              className="text-xs font-bold text-orange-500 hover:text-orange-655 flex items-center gap-0.5"
            >
              View Order Details &rarr;
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
