import { useState } from 'react'
import { Button } from '../components/common/Button'
import { Icon } from '../components/common/Icon'

const topics = [
  { title: 'Phishing messages', question: 'How do I recognize phishing?', icon: 'lock' as const, keywords: ['phish', 'email', 'link', 'text'], answer: 'Watch for urgent language, unexpected links, spelling or address mismatches, and requests for passwords or one-time codes. Open the official UFCU app or type the known website address yourself instead of using the link.' },
  { title: 'Impersonation scams', question: 'How can I identify an impersonation scam?', icon: 'user' as const, keywords: ['imperson', 'call', 'caller', 'fake'], answer: 'A caller can appear familiar or use a convincing name. Do not rely on caller ID alone. End the call and contact UFCU through an official phone number or secure channel you already trust.' },
  { title: 'Account takeover', question: 'How do I protect my account from takeover?', icon: 'shield' as const, keywords: ['takeover', 'password', 'protect', 'security'], answer: 'Use a unique password, keep your contact information current, turn on available security alerts, and never share a verification code. Review account activity regularly and report anything you do not recognize.' },
  { title: 'Suspicious transactions', question: 'What should I do if I see a suspicious transaction?', icon: 'question' as const, keywords: ['transaction', 'charge', 'suspicious', 'payment'], answer: 'Review the merchant details, pause before responding to anyone who contacts you about the charge, and contact UFCU through an official channel. Do not move money to a so-called safe account.' },
  { title: 'Safe online banking', question: 'How can I stay safe while using public Wi-Fi?', icon: 'lock' as const, keywords: ['wifi', 'public', 'online', 'internet'], answer: 'Avoid sensitive account actions on unknown networks, keep your device updated, use a screen lock, and make sure the website address is correct before signing in.' },
]

export function LearnAIPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  function ask(nextQuestion = question) {
    const normalized = nextQuestion.toLowerCase()
    const match = topics.find(topic => topic.keywords.some(keyword => normalized.includes(keyword)))
    setAnswer(match?.answer || 'Ask about phishing, impersonation scams, account takeover, suspicious transactions, or safer online banking habits.')
  }

  return <div className="feature-page learn-ai-page">
    <div className="feature-heading"><div><p className="member-eyebrow">SECURITY EDUCATION</p><h1>Learn AI</h1><p>Get clear answers about fraud, privacy, and safer online banking habits.</p></div><span className="feature-heading-icon"><Icon name="shield" size={28} /></span></div>
    <section className="learn-search-panel"><label htmlFor="security-question">Ask a security question</label><div className="learn-search-row"><input id="security-question" className="member-input" value={question} onChange={event => setQuestion(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') ask() }} placeholder="How do I know if a message is really from UFCU?" /><Button onClick={() => ask()}>Ask Learn AI <Icon name="arrow" size={17} /></Button></div><p>Learn AI provides education and guidance. It does not complete banking actions or replace official UFCU support.</p></section>
    {answer && <section className="learn-answer" aria-live="polite"><span className="learn-answer-icon"><Icon name="checkCircle" size={21} /></span><div><p className="member-eyebrow">GUIDANCE</p><p>{answer}</p></div></section>}
    <div className="feature-section-heading"><div><p className="member-eyebrow">EXPLORE TOPICS</p><h2>What do you want to understand?</h2></div></div>
    <div className="learning-topic-grid">{topics.map(topic => <button type="button" className="learning-topic-card" key={topic.title} onClick={() => { setQuestion(topic.question); setAnswer(topic.answer) }}><span className="learning-topic-icon"><Icon name={topic.icon} size={21} /></span><span><strong>{topic.title}</strong><small>{topic.question}</small></span><Icon name="chevronRight" size={17} /></button>)}</div>
    <section className="security-warning"><Icon name="info" size={19} /><p><strong>Remember:</strong> UFCU will never ask for your password, PIN, or one-time security code through an unsolicited message.</p></section>
  </div>
}
