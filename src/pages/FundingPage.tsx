import { useNavigate } from 'react-router'
import { PageHeading } from '../components/layout/PageHeading'
import { FormField, SelectField } from '../components/forms/FormField'
import { FormActions } from '../components/forms/FormActions'
import { RadioCard } from '../components/forms/RadioCard'
import { Icon } from '../components/common/Icon'
import { useOnboarding } from '../context/OnboardingContext'
import { useStepForm } from '../hooks/useStepForm'
import { demoBanks, demoPaymentDetails, fundingMethods } from '../data/funding'

export function FundingPage() {
  const { data, update } = useOnboarding()
  const navigate = useNavigate()
  const { errors, onSubmit } = useStepForm(5, () => navigate('/apply/review'))
  const set = (field: keyof typeof data.funding, value: string) => update('funding', { ...data.funding, [field]: value })
  return <>
    <PageHeading eyebrow="A LITTLE TO GET STARTED" title="Make your first deposit." description="Choose how you would like to add funds to your new UFCU account." />
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <fieldset className="space-y-3"><legend className="field-legend">Choose how to fund your account</legend>{fundingMethods.map(method => <RadioCard key={method.id} id={method.id} label={method.name} description={method.description} checked={data.funding.method === method.id} onChange={() => set('method', method.id)} error={errors.method}><Icon name={method.icon} size={24} /></RadioCard>)}</fieldset>
      {errors.method && <p id="funding-method-error" className="field-error">{errors.method}</p>}
      {data.funding.method && <section className="funding-details" aria-label="Funding details">
        <div className="flex items-center justify-between gap-3 mb-5"><h2>Funding details</h2></div>
        <div className="form-grid">
          {data.funding.method === 'bank' && <div className="full-width"><SelectField id="demoBank" label="Bank" value={data.funding.demoBank} onChange={e => set('demoBank', e.target.value)} error={errors.demoBank} required><option value="">Choose a bank</option>{demoBanks.map(bank => <option key={bank} value={bank}>{bank.replace('Demo ', '').replace('Sample ', '')}</option>)}</SelectField></div>}
          {data.funding.method === 'manual' && <><FormField id="routingNumber" label="Routing number" value={demoPaymentDetails.routing} readOnly /><FormField id="accountNumber" label="Account number" value={demoPaymentDetails.account} readOnly /></>}
          {data.funding.method === 'card' && <><FormField id="cardNumber" label="Card number" value={demoPaymentDetails.card} readOnly /><FormField id="expiry" label="Expiration" value={demoPaymentDetails.expiry} readOnly /></>}
          <FormField id="amount" label="Total deposit amount ($)" inputMode="decimal" value={data.funding.amount} onChange={e => set('amount', e.target.value)} error={errors.amount} hint="Enter an amount between $0.01 and $10,000." required maxLength={12} />
        </div>
        <p className="fine-print">{data.funding.method === 'bank' ? 'Choose the bank that will provide your opening deposit.' : 'Review your funding details before continuing.'}</p>
      </section>}
      <FormActions back="/apply/accounts" />
    </form>
  </>
}
