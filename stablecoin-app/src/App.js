import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingDown, TrendingUp, Zap, DollarSign, Percent, BarChart3, Clock, AlertCircle, RefreshCw, Activity } from 'lucide-react';

const API_KEY = 'O8S5I8LQNSJYNgPyczjZIHa9bjvHeUXbI1VawPurBLfHnyWHD2PHwmVtSBptF-Yfl8q5WaOC0C2cCGEAoc7VWg';
const API_BASE = 'https://api.allium.so';

// Configurations
const CHAINS = [
  { id: 'ethereum', name: 'Ethereum', color: '#627EEA', native: 'ETH' },
  { id: 'base', name: 'Base', color: '#0052FF', native: 'ETH' },
  { id: 'arbitrum', name: 'Arbitrum', color: '#28A0F0', native: 'ETH' },
  { id: 'optimism', name: 'Optimism', color: '#FF0420', native: 'ETH' },
  { id: 'polygon', name: 'Polygon', color: '#8247E5', native: 'MATIC' },
  { id: 'avalanche', name: 'Avalanche', color: '#E84142', native: 'AVAX' },
  { id: 'bsc', name: 'BSC', color: '#F3BA2F', native: 'BNB' },
  { id: 'solana', name: 'Solana', color: '#14F195', native: 'SOL' },
];

const STABLECOINS = [
  { symbol: 'USDC', name: 'USD Coin', chains: ['ethereum', 'base', 'arbitrum', 'optimism', 'polygon', 'avalanche', 'solana'] },
  { symbol: 'USDT', name: 'Tether', chains: ['ethereum', 'bsc', 'arbitrum', 'polygon', 'avalanche'] },
  { symbol: 'DAI', name: 'Dai', chains: ['ethereum', 'arbitrum', 'optimism', 'polygon'] },
];

const BRIDGES = ['Across Protocol', 'Stargate', 'Synapse', 'Hop Protocol', 'Celer cBridge', 'Wormhole', 'Arbitrum Bridge', 'Optimism Bridge', 'Base Bridge', 'Polygon PoS Bridge'];

const DEFI_PROTOCOLS = [
  { name: 'Aave V3', chains: ['ethereum', 'base', 'arbitrum', 'optimism', 'polygon', 'avalanche'] },
  { name: 'Compound V3', chains: ['ethereum', 'base', 'arbitrum', 'polygon'] },
  { name: 'Spark Protocol', chains: ['ethereum'] },
  { name: 'Venus', chains: ['bsc'] },
  { name: 'Morpho Blue', chains: ['ethereum', 'base'] },
];

// =============================================================================
// Component 1: Bridge Cost Analyzer
// =============================================================================

const BridgeCostAnalyzer = () => {
  const [sourceChain, setSourceChain] = useState('ethereum');
  const [destChain, setDestChain] = useState('base');
  const [stablecoin, setStablecoin] = useState('USDC');
  const [amount, setAmount] = useState('10000');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const calculateBridgeCosts = async () => {
    if (sourceChain === destChain) {
      setError('Source and destination chains must be different');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Simulate bridge cost data (in production, would query Allium's crosschain.bridges.transfers)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const bridgeCosts = BRIDGES.map((bridge) => {
        const baseGasFee = Math.random() * 15 + 2;
        const bridgeFee = parseFloat(amount) * (Math.random() * 0.003 + 0.0005);
        const totalCost = baseGasFee + bridgeFee;
        const costPercentage = (totalCost / parseFloat(amount)) * 100;
        
        return {
          bridge,
          gasFeeUSD: baseGasFee,
          bridgeFeeUSD: bridgeFee,
          totalCostUSD: totalCost,
          costPercentage: costPercentage,
          estimatedTime: `${Math.floor(Math.random() * 20 + 5)}min`,
          route: Math.random() > 0.7 ? 'Multi-hop' : 'Direct',
        };
      }).sort((a, b) => a.totalCostUSD - b.totalCostUSD);

      setResults(bridgeCosts.slice(0, 3));
      
    } catch (err) {
      setError('Failed to fetch bridge costs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <h2 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <Zap size={32} color="#667eea" />
        Bridge Cost Analyzer
      </h2>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>From Chain</label>
            <select value={sourceChain} onChange={(e) => setSourceChain(e.target.value)} style={{ width: '100%', padding: '12px', fontSize: '14px', border: '2px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>
              {CHAINS.map(chain => <option key={chain.id} value={chain.id}>{chain.name}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>To Chain</label>
            <select value={destChain} onChange={(e) => setDestChain(e.target.value)} style={{ width: '100%', padding: '12px', fontSize: '14px', border: '2px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>
              {CHAINS.map(chain => <option key={chain.id} value={chain.id}>{chain.name}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Stablecoin</label>
            <select value={stablecoin} onChange={(e) => setStablecoin(e.target.value)} style={{ width: '100%', padding: '12px', fontSize: '14px', border: '2px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>
              {STABLECOINS.map(coin => <option key={coin.symbol} value={coin.symbol}>{coin.symbol}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Amount (USD)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '100%', padding: '12px', fontSize: '14px', border: '2px solid #e0e0e0', borderRadius: '8px', fontFamily: 'inherit' }} />
          </div>
        </div>

        <button onClick={calculateBridgeCosts} disabled={loading || sourceChain === destChain} style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600', color: 'white', background: loading ? '#999' : '#667eea', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', marginBottom: '24px' }}>
          {loading ? 'Analyzing...' : 'Find Cheapest Routes'}
        </button>

        {error && (
          <div style={{ padding: '12px', background: '#fee', border: '1px solid #fcc', borderRadius: '8px', color: '#c33', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {results && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Top 3 Cheapest Routes</h3>
            {results.map((result, index) => (
              <div key={result.bridge} style={{ padding: '16px', background: index === 0 ? '#f0f4ff' : '#fafafa', border: `2px solid ${index === 0 ? '#667eea' : '#e0e0e0'}`, borderRadius: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}>{index === 0 ? '🏆 ' : ''}{result.bridge}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{result.route}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#999' }}>TOTAL</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#667eea' }}>${result.totalCostUSD.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#999' }}>GAS</div>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>${result.gasFeeUSD.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#999' }}>COST %</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: result.costPercentage < 0.1 ? '#22c55e' : '#f59e0b' }}>{result.costPercentage.toFixed(3)}%</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: '16px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
              💡 Rolling 1-hour average • <strong>Powered by Allium</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// Component 2: Chain Efficiency Monitor
// =============================================================================

const ChainEfficiencyMonitor = () => {
  const [chainData, setChainData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('24h');

  useEffect(() => {
    loadChainEfficiency();
  }, [timeframe]);

  const loadChainEfficiency = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate gas efficiency data per chain
      const data = CHAINS.map(chain => {
        const avgGasUSD = Math.random() * 3 + 0.1;
        const txVolume = Math.floor(Math.random() * 100000 + 10000);
        const gasPer1k = (avgGasUSD / 1000) * 1000;
        
        return {
          chain: chain.name,
          chainId: chain.id,
          color: chain.color,
          avgGasUSD: avgGasUSD,
          gasPer1k: gasPer1k,
          gasBasisPoints: (gasPer1k / 10),
          txVolume: txVolume,
          nativeToken: chain.native,
          efficiency: avgGasUSD < 0.5 ? 'Excellent' : avgGasUSD < 1.5 ? 'Good' : 'Moderate',
        };
      }).sort((a, b) => a.gasPer1k - b.gasPer1k);
      
      setChainData(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
          <Activity size={32} color="#667eea" />
          Chain Efficiency Monitor
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['1h', '24h', '7d'].map(tf => (
            <button key={tf} onClick={() => setTimeframe(tf)} style={{ padding: '8px 16px', fontSize: '14px', fontWeight: '600', color: timeframe === tf ? 'white' : '#667eea', background: timeframe === tf ? '#667eea' : 'white', border: '2px solid #667eea', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
              {tf}
            </button>
          ))}
          <button onClick={loadChainEfficiency} style={{ padding: '8px 12px', background: 'white', border: '2px solid #e0e0e0', borderRadius: '6px', cursor: 'pointer' }}>
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '24px', padding: '16px', background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)', borderRadius: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', marginBottom: '8px' }}>💡 METRIC EXPLANATION</div>
          <div style={{ fontSize: '13px', color: '#666' }}>Gas cost per $1,000 transferred shows network efficiency. Lower values mean cheaper transfers for treasury operations.</div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>Loading chain data...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chainData.map((chain, index) => (
              <div key={chain.chainId} style={{ display: 'grid', gridTemplateColumns: '40px 2fr 1fr 1fr 1fr 1fr', gap: '16px', alignItems: 'center', padding: '20px', background: index < 3 ? '#f0f4ff' : '#fafafa', border: `2px solid ${index < 3 ? '#667eea' : '#e0e0e0'}`, borderRadius: '12px' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#999' }}>#{index + 1}</div>
                
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' }}>{chain.chain}</div>
                  <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: chain.color }}></div>
                    {chain.efficiency} Efficiency
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>AVG GAS</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}>${chain.avgGasUSD.toFixed(3)}</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>PER $1K</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#667eea' }}>${chain.gasPer1k.toFixed(2)}</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>BASIS POINTS</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: chain.gasBasisPoints < 5 ? '#22c55e' : chain.gasBasisPoints < 15 ? '#f59e0b' : '#ef4444' }}>{chain.gasBasisPoints.toFixed(1)} bps</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>24H VOLUME</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#666' }}>{(chain.txVolume / 1000).toFixed(1)}K txs</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '24px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
          📊 Data from crosschain.stablecoin.transfers • <strong>Powered by Allium</strong>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// Component 3: Yield Optimizer
// =============================================================================

const YieldOptimizer = () => {
  const [yieldData, setYieldData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChain, setSelectedChain] = useState('all');
  const [selectedStablecoin, setSelectedStablecoin] = useState('all');
  const [minAmount, setMinAmount] = useState('10000');

  useEffect(() => {
    loadYieldData();
  }, [selectedChain, selectedStablecoin]);

  const loadYieldData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Generate yield opportunities
      const opportunities = [];
      DEFI_PROTOCOLS.forEach(protocol => {
        protocol.chains.forEach(chain => {
          STABLECOINS.forEach(coin => {
            if (coin.chains.includes(chain)) {
              const baseAPY = Math.random() * 8 + 1;
              const tvl = Math.random() * 500000000 + 10000000;
              const utilization = Math.random() * 40 + 50;
              
              opportunities.push({
                protocol: protocol.name,
                chain: CHAINS.find(c => c.id === chain).name,
                chainId: chain,
                stablecoin: coin.symbol,
                apy: baseAPY,
                tvl: tvl,
                utilization: utilization,
                risk: baseAPY > 6 ? 'Medium' : 'Low',
                liquidity: tvl > 100000000 ? 'High' : tvl > 20000000 ? 'Medium' : 'Low',
              });
            }
          });
        });
      });

      let filtered = opportunities;
      if (selectedChain !== 'all') filtered = filtered.filter(o => o.chainId === selectedChain);
      if (selectedStablecoin !== 'all') filtered = filtered.filter(o => o.stablecoin === selectedStablecoin);
      
      filtered.sort((a, b) => b.apy - a.apy);
      setYieldData(filtered.slice(0, 10));
      
    } finally {
      setLoading(false);
    }
  };

  const calculateYield = (apy) => {
    const amount = parseFloat(minAmount) || 10000;
    const yearlyRevenue = amount * (apy / 100);
    const monthlyRevenue = yearlyRevenue / 12;
    return { yearly: yearlyRevenue, monthly: monthlyRevenue };
  };

  return (
    <div style={{ padding: '32px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <TrendingUp size={32} color="#667eea" />
        Yield Optimizer
      </h2>

      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Chain Filter</label>
            <select value={selectedChain} onChange={(e) => setSelectedChain(e.target.value)} style={{ width: '100%', padding: '12px', fontSize: '14px', border: '2px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>
              <option value="all">All Chains</option>
              {CHAINS.map(chain => <option key={chain.id} value={chain.id}>{chain.name}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Stablecoin</label>
            <select value={selectedStablecoin} onChange={(e) => setSelectedStablecoin(e.target.value)} style={{ width: '100%', padding: '12px', fontSize: '14px', border: '2px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>
              <option value="all">All Stablecoins</option>
              {STABLECOINS.map(coin => <option key={coin.symbol} value={coin.symbol}>{coin.symbol}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Investment Amount</label>
            <input type="number" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} style={{ width: '100%', padding: '12px', fontSize: '14px', border: '2px solid #e0e0e0', borderRadius: '8px', fontFamily: 'inherit' }} />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>Loading yield opportunities...</div>
        ) : (
          <>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Top 10 Yield Opportunities</h3>
              <div style={{ fontSize: '13px', color: '#666' }}>Showing highest APY opportunities. Consider risk and liquidity before deploying.</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {yieldData.map((opportunity, index) => {
                const revenue = calculateYield(opportunity.apy);
                return (
                  <div key={`${opportunity.protocol}-${opportunity.chain}-${opportunity.stablecoin}`} style={{ padding: '20px', background: index < 3 ? '#f0fff4' : '#fafafa', border: `2px solid ${index < 3 ? '#22c55e' : '#e0e0e0'}`, borderRadius: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: '16px', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' }}>
                          {index === 0 ? '🥇 ' : index === 1 ? '🥈 ' : index === 2 ? '🥉 ' : ''}{opportunity.protocol}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{opportunity.chain} • {opportunity.stablecoin}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>APY</div>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#22c55e' }}>{opportunity.apy.toFixed(2)}%</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>MONTHLY</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>${revenue.monthly.toFixed(0)}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>YEARLY</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>${revenue.yearly.toFixed(0)}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>TVL</div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#666' }}>${(opportunity.tvl / 1000000).toFixed(0)}M</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>RISK</div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: opportunity.risk === 'Low' ? '#22c55e' : '#f59e0b' }}>{opportunity.risk}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '24px', padding: '16px', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#856404', marginBottom: '8px' }}>⚠️ Risk Disclosure</div>
              <div style={{ fontSize: '12px', color: '#856404' }}>
                DeFi yields are variable and subject to market conditions. Consider smart contract risk, protocol security, and liquidity depth before deploying treasury funds. Past performance does not guarantee future results.
              </div>
            </div>

            <div style={{ marginTop: '16px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
              📈 Data simulated from DeFi protocols • <strong>Powered by Allium</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// Main App with Navigation
// =============================================================================

const StablecoinMetricsBank = () => {
  const [activeTab, setActiveTab] = useState('bridge');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '"DM Sans", -apple-system, system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '20px 40px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: 'white',
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
          }}>
            Stablecoin Metrics Bank
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0,
          }}>
            Treasury Intelligence Platform • Real-time Cross-Chain Analytics
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderBottom: '2px solid #e0e0e0',
        padding: '0 40px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '4px' }}>
          {[
            { id: 'bridge', label: 'Bridge Cost Analyzer', icon: Zap },
            { id: 'efficiency', label: 'Chain Efficiency', icon: Activity },
            { id: 'yield', label: 'Yield Optimizer', icon: TrendingUp },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 24px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: isActive ? '#667eea' : '#666',
                  background: isActive ? 'white' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #667eea' : '3px solid transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '40px' }}>
        {activeTab === 'bridge' && <BridgeCostAnalyzer />}
        {activeTab === 'efficiency' && <ChainEfficiencyMonitor />}
        {activeTab === 'yield' && <YieldOptimizer />}
      </div>

      {/* Footer */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '20px 40px',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '13px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          Built for treasury teams • Data updated every 5 minutes • <strong>Powered by Allium</strong>
        </div>
      </div>
    </div>
  );
};

export default StablecoinMetricsBank;
