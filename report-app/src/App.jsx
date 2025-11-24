import { useState, useEffect } from 'react'
import './App.css'
import translations from './translations'

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'system'
  })
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language')
    return saved || 'tc'
  })

  useEffect(() => {
    const applyTheme = () => {
      if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
      } else {
        document.documentElement.setAttribute('data-theme', theme)
      }
    }
    applyTheme()

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', applyTheme)
      return () => mediaQuery.removeEventListener('change', applyTheme)
    }
  }, [theme])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = translations[language]

  const tabs = [
    { id: 'overview', label: t.tabs.overview },
    { id: 'capex', label: t.tabs.capex },
    { id: 'valuation', label: t.tabs.valuation },
    { id: 'concentration', label: t.tabs.concentration },
    { id: 'conclusion', label: t.tabs.conclusion }
  ]

  const handleChartClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="title">{t.title}</h1>
          <div className="controls">
            <div className="theme-toggle">
              <button
                className={theme === 'light' ? 'active' : ''}
                onClick={() => setTheme('light')}
                title={t.theme.light}
              >
                ☀️
              </button>
              <button
                className={theme === 'system' ? 'active' : ''}
                onClick={() => setTheme('system')}
                title={t.theme.system}
              >
                💻
              </button>
              <button
                className={theme === 'dark' ? 'active' : ''}
                onClick={() => setTheme('dark')}
                title={t.theme.dark}
              >
                🌙
              </button>
            </div>
            <div className="language-toggle">
              <button
                className={language === 'tc' ? 'active' : ''}
                onClick={() => setLanguage('tc')}
              >
                繁中
              </button>
              <button
                className={language === 'sc' ? 'active' : ''}
                onClick={() => setLanguage('sc')}
              >
                简中
              </button>
              <button
                className={language === 'en' ? 'active' : ''}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="tabs">
        <div className="container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="content">
        <div className="container">
          {activeTab === 'overview' && (
            <div className="section">
              <img
                src="/images/fd01439d-10547.png"
                alt="MacroMicro Logo"
                style={{width: '40%', margin: '1em 0'}}
              />
              <div className="intro-box">
                <strong>Dear MacroMicro, </strong><br />
                {t.content.intro}
              </div>

              <h3>{t.content.keyPoints}</h3>
              <p>{t.content.reportIntro}</p>

              <ul>
                <li>
                  <strong>{t.content.capexConcern}</strong>{t.content.capexDesc}
                </li>
                <li>
                  <strong>{t.content.valuationConcern}</strong>{t.content.valuationDesc}
                </li>
                <li>
                  <strong>{t.content.concentrationConcern}</strong>{t.content.concentrationDesc}
                </li>
              </ul>

              <hr />

              <p>{t.content.nvidiaReport}</p>

              <div className="chart-link" onClick={() => handleChartClick('https://www.macromicro.me/collections/4093/us-big-tech/81140/nvda-revenue-breakdown')}>
                <img
                  src="/images/6443a3da-384750.png"
                  alt="NVIDIA Revenue Breakdown"
                />
                <div className="chart-overlay">{t.clickToView}</div>
              </div>

              <p>{t.content.reportAnalysis}</p>
            </div>
          )}

          {activeTab === 'capex' && (
            <div className="section">
              <h2>{t.content.section1.title}</h2>
              <p>{t.content.section1.intro}</p>
              <p>{t.content.section1.investment}</p>

              <div className="chart-link" onClick={() => handleChartClick('https://www.macromicro.me/collections/4093/us-big-tech/109709/big-techs-m7-capex')}>
                <img
                  src="/images/0bdf9bbd-416949.png"
                  alt="Big Tech Capital Expenditure"
                />
                <div className="chart-overlay">{t.clickToView}</div>
              </div>

              <p>{t.content.section1.financing}</p>

              <blockquote>
                <ul>
                  <li><strong>{t.content.section1.debtFinancing}</strong>{t.content.section1.debtDesc}</li>
                  <li><strong>{t.content.section1.offBalance}</strong>{t.content.section1.offBalanceDesc}</li>
                </ul>
              </blockquote>

              <p>{t.content.section1.concern}</p>

              <img
                src="/images/9b72fb07-271843.png"
                alt="RPO Chart"
              />

              <h3>{t.content.section1.metric1}</h3>
              <p>{t.content.section1.metric1Desc}</p>

              <blockquote>
                <p><strong>{t.content.section1.fcfDef}</strong>{t.content.section1.fcfDesc}</p>
              </blockquote>

              <p>{t.content.section1.fcfAnalysis}</p>

              <div className="chart-link" onClick={() => handleChartClick('https://www.macromicro.me/charts/141866/big-tech-free-cash-flow')}>
                <img
                  src="/images/82a45a5a-638088.png"
                  alt="Big Tech Free Cash Flow"
                />
                <div className="chart-overlay">{t.clickToView}</div>
              </div>

              <h3>{t.content.section1.metric2}</h3>
              <p>{t.content.section1.metric2Desc}</p>

              <blockquote>
                <p><strong>{t.content.section1.capexRatioDef}</strong>{t.content.section1.capexRatioDesc}</p>
              </blockquote>

              <p>{t.content.section1.capexRatioAnalysis}</p>

              <img
                src="/images/943ceccf-618865.png"
                alt="Capex to Revenue Ratio"
              />
            </div>
          )}

          {activeTab === 'valuation' && (
            <div className="section">
              <h2>{t.content.section2.title}</h2>
              <p>{t.content.section2.intro}</p>

              <p><strong>{t.content.section2.differences}</strong></p>
              <ul>
                <li><strong>{t.content.section2.techBarrier}</strong>{t.content.section2.techBarrierDesc}</li>
                <li><strong>{t.content.section2.profitability}</strong>{t.content.section2.profitabilityDesc}</li>
                <li><strong>{t.content.section2.demandSource}</strong>{t.content.section2.demandSourceDesc}</li>
                <li><strong>{t.content.section2.companyHealth}</strong>{t.content.section2.companyHealthDesc}</li>
              </ul>

              <img
                src="/images/a29a2eda-285330.png"
                alt="Cisco vs NVIDIA Comparison"
              />

              <p>{t.content.section2.nvidiaPerformance}</p>

              <h3>{t.content.section2.metric3}</h3>
              <p>{t.content.section2.metric3Intro}</p>

              <blockquote>
                <p><strong>{t.content.section2.rule40Def}</strong>{t.content.section2.rule40Desc}</p>
              </blockquote>

              <p>{t.content.section2.rule40Example}</p>

              <img
                src="/images/0a4f8605-293690.png"
                alt="Rule of 40 Analysis"
              />
            </div>
          )}

          {activeTab === 'concentration' && (
            <div className="section">
              <h2>{t.content.section3.title}</h2>
              <p>{t.content.section3.intro}</p>

              <h3>{t.content.section3.metric4}</h3>
              <p>{t.content.section3.metric4Intro}</p>

              <blockquote>
                <p><strong>{t.content.section3.concentrationDef}</strong>{t.content.section3.concentrationDesc}</p>
              </blockquote>

              <p>{t.content.section3.analysis}</p>

              <div className="chart-link" onClick={() => handleChartClick('https://www.macromicro.me/collections/34/us-stock-relative/142686/us-sp-500-top-10-companies-market-cap-revenue-earnings-share')}>
                <img
                  src="/images/aa65d828-699426.png"
                  alt="S&P 500 Concentration"
                />
                <div className="chart-overlay">{t.clickToView}</div>
              </div>

              <h3>{t.content.section3.metric5}</h3>
              <p>{t.content.section3.metric5Intro}</p>

              <blockquote>
                <p><strong>{t.content.section3.inventoryDef}</strong>{t.content.section3.inventoryDesc}</p>
                <ul>
                  <li><strong>{t.content.section3.aiIntensive}</strong>{t.content.section3.aiIntensiveList}</li>
                  <li><strong>{t.content.section3.memory}</strong>{t.content.section3.memoryList}</li>
                  <li><strong>{t.content.section3.consumer}</strong>{t.content.section3.consumerList}</li>
                  <li><strong>{t.content.section3.automotive}</strong>{t.content.section3.automotiveList}</li>
                </ul>
              </blockquote>

              <p>{t.content.section3.inventoryAnalysis}</p>

              <div className="chart-link" onClick={() => handleChartClick('https://www.macromicro.me/charts/138656/world-major-semiconductor-companies-days-in-inventory-by-business')}>
                <img
                  src="/images/dbfc6b37-584402.png"
                  alt="Semiconductor Inventory Days"
                />
                <div className="chart-overlay">{t.clickToView}</div>
              </div>
            </div>
          )}

          {activeTab === 'conclusion' && (
            <div className="section">
              <h2>{t.content.conclusion.title}</h2>
              <p>{t.content.conclusion.summary}</p>
              <p>{t.content.conclusion.outlook}</p>
              <p>{t.content.conclusion.author}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.date}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
