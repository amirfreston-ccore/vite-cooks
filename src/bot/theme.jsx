import React, { useState } from "react";
import { Power, Plus, Minus, Check, X } from "lucide-react";

export default function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [botActive, setBotActive] = useState(false);
  const [walletBalance, setWalletBalance] = useState(100);
  const [availableBalance, setAvailableBalance] = useState(180);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);

  const handleSubscribe = () => {
    if (availableBalance >= 100) {
      setIsSubscribed(true);
      setAvailableBalance(prev => prev - 100);
      // Set expiry date to 30 days from now
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
      setExpiryDate(expiry);
    }
  };

  const handleAddFunds = () => {
    const amount = parseFloat(fundAmount);
    if (amount > 0 && amount <= availableBalance) {
      setWalletBalance(prev => prev + amount);
      setAvailableBalance(prev => prev - amount);
      setFundAmount("");
      setShowAddFunds(false);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(fundAmount);
    if (amount > 0 && amount <= walletBalance) {
      setWalletBalance(prev => prev - amount);
      setAvailableBalance(prev => prev + amount);
      setFundAmount("");
      setShowWithdraw(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 flex items-start justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Trading Bot</h1>
          <p className="text-gray-400 text-sm">Automated trading solution</p>
        </div>


        {/* Subscription Section */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 mb-4 border border-gray-700/50 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300 font-medium">Subscription Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isSubscribed
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                {isSubscribed ? 'Active' : 'Inactive'}
              </span>
            </div>

            {!isSubscribed && (
              <button
                onClick={handleSubscribe}
                disabled={availableBalance < 100}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                Subscribe (100 USDT)
              </button>
            )}

            {isSubscribed && (
              <div className="space-y-3">
                <div className="flex items-center justify-center text-green-400 font-medium">
                  <Check className="w-5 h-5 mr-2" />
                  Subscription Active
                </div>
                <div className="bg-gray-900/50 rounded-xl p-3 border border-gray-700/30">
                  <div className="text-gray-400 text-xs mb-1">Expires On</div>
                  <div className="text-white font-semibold">
                    {expiryDate?.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bot Wallet Section */}
        <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 mb-4 border border-gray-700/50 shadow-2xl transition-all duration-500 ${!isSubscribed ? 'opacity-40 pointer-events-none grayscale' : ''
          }`}>
          <h2 className="text-lg font-bold text-white mb-4">Bot Wallet</h2>

          <div className="space-y-3 mb-4">
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
              <div className="text-gray-400 text-xs mb-1">Wallet Balance</div>
              <div className="text-2xl font-bold text-white">{walletBalance.toFixed(2)} <span className="text-sm text-gray-500">USDT</span></div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
              <div className="text-gray-400 text-xs mb-1">Available Balance</div>
              <div className="text-2xl font-bold text-yellow-400">{availableBalance.toFixed(2)} <span className="text-sm text-gray-500">USDT</span></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 relative">
            <button
              onClick={() => {
                setShowAddFunds(!showAddFunds);
                setShowWithdraw(false);
                setFundAmount('');
              }}
              className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center shadow-lg relative z-10 ${showAddFunds ? 'scale-[0.96] shadow-inner' : ''
                }`}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Funds
            </button>
            <button
              onClick={() => {
                setShowWithdraw(!showWithdraw);
                setShowAddFunds(false);
                setFundAmount('');
              }}
              disabled={walletBalance === 0}
              className={`bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center shadow-lg disabled:cursor-not-allowed disabled:opacity-50 relative z-10 ${showWithdraw ? 'scale-[0.96] shadow-inner' : ''
                }`}
            >
              <Minus className="w-4 h-4 mr-1" />
              Withdraw
            </button>
          </div>

          {/* Add Funds Input */}
          <div className={`transition-all duration-500 ease-out ${showAddFunds ? 'mt-4' : ''
            }`}>
            <div className={`transform transition-all duration-500 ease-out origin-top ${showAddFunds ? 'scale-y-100 opacity-100 translate-y-0' : 'scale-y-0 opacity-0 -translate-y-4 h-0'
              }`}>
              <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-xl p-4 border-2 border-green-500/50 shadow-lg shadow-green-500/20 ">
                <div className="flex items-center mb-3">
                  <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-green-400 font-semibold text-sm">Add Funds to Wallet</span>
                </div>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-gray-800/70 border-2 border-green-500/30 focus:border-green-500 rounded-lg px-4 py-3 text-white mb-3 focus:outline-none transition-colors placeholder-gray-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddFunds}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setShowAddFunds(false);
                      setFundAmount('');
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Withdraw Input */}
          <div className={`transition-all duration-500 ease-out ${showWithdraw ? 'mt-4' : ''
            }`}>
            <div className={`transform transition-all duration-500 ease-out origin-top ${showWithdraw ? 'scale-y-100 opacity-100 translate-y-0' : 'scale-y-0 opacity-0 -translate-y-4 h-0'
              }`}>
              <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-xl p-4 border-2 border-orange-500/50 shadow-lg shadow-orange-500/20 ">
                <div className="flex items-center mb-3">
                  <div className="w-1 h-6 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-orange-400 font-semibold text-sm">Withdraw from Wallet</span>
                </div>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-gray-800/70 border-2 border-orange-500/30 focus:border-orange-500 rounded-lg px-4 py-3 text-white mb-3 focus:outline-none transition-colors placeholder-gray-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleWithdraw}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setShowWithdraw(false);
                      setFundAmount('');
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bot Activation Toggle */}
        <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl transition-all duration-500 ${!isSubscribed ? 'opacity-40 pointer-events-none grayscale' : ''
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Bot Status</h2>
              <p className="text-sm text-gray-400">
                {botActive ? 'Trading bot is active' : 'Trading bot is inactive'}
              </p>
            </div>

            <button
              onClick={() => setBotActive(!botActive)}
              disabled={walletBalance === 0}
              className={`relative w-24 h-12 rounded-full transition-all duration-300 shadow-lg ${botActive
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/50'
                : 'bg-gray-700 shadow-gray-900/50'
                } ${walletBalance === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {/* OFF Label */}
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold transition-opacity duration-300 ${botActive ? 'opacity-0' : 'opacity-100 text-gray-400'
                }`}>
                OFF
              </span>

              {/* ON Label */}
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold transition-opacity duration-300 ${botActive ? 'opacity-100 text-white' : 'opacity-0'
                }`}>
                ON
              </span>

              <div className={`absolute top-1 left-1 w-10 h-10 bg-white/80 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${botActive ? 'translate-x-12' : 'translate-x-0'
                }`}>
                <Power className={`w-5 h-5 ${botActive ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
            </button>
          </div>

          {botActive && (
            <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-3">
              <div className="flex items-center text-green-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Bot is actively trading
              </div>
            </div>
          )}
        </div>

        {/* Info Note */}
        <div className="mt-4 text-center text-gray-500 text-xs">
          {!isSubscribed && 'Subscribe to unlock bot features'}
          {isSubscribed && walletBalance === 0 && 'Add funds to your bot wallet to start trading'}
        </div>
      </div>
    </div>);
};

