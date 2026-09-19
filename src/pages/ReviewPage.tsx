import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router'
import { PageHeading } from '../components/layout/PageHeading'
import { CheckboxField } from '../components/forms/CheckboxField'
import { FormActions } from '../components/forms/FormActions'
import { useOnboarding } from '../context/OnboardingContext'
import { useStepForm } from '../hooks/useStepForm'
import { accounts } from '../data/accounts'
import { formatMoney, fundingMethods } from '../data/funding'

function ReviewSection({ title, to, children }: { title: string; to: string; children: ReactNode }) {
  return <section className="review-section"><div className="review-label"><h2>{title}</h2><Link to={to} className="text-link">Edit<span className="sr-only"> {title.toLowerCase()}</span></Link></div><div className="review-value">{children}</div></section>
}

export function ReviewPage() {
  const { data, update, submit } = useOnboarding()
  const navigate = useNavigate()
  const { errors, onSubmit } = useStepForm(6, () => { if (submit()) navigate('/apply/processing', { replace: true }) })
  const { personalInfo: person, contactInfo: contact, address } = data
  return <>
    <PageHeading eyebrow="ONE LAST LOOK" title="Ready when you are." description="Check your information, then review the disclosures before submitting your application." />
    <div className="review-summary">
      <ReviewSection title="Personal information" to="/apply/personal"><p>{[person.firstName, person.middleName, person.lastName].filter(Boolean).join(' ')}</p><p className="muted">Date of birth: {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(`${person.dateOfBirth}T12:00:00`))}</p></ReviewSection>
      <ReviewSection title="Contact information" to="/apply/contact"><p>{contact.email}</p><p>{contact.phone}</p></ReviewSection>
      <ReviewSection title="Address" to="/apply/address"><p>{address.street}{address.apartment && `, ${address.apartment}`}</p><p>{address.city}, {address.state} {address.zip}</p></ReviewSection>
      <ReviewSection title="Selected accounts" to="/apply/accounts">{accounts.filter(account => data.selectedAccounts.includes(account.id)).map(account => <p key={account.id}>{account.name}</p>)}</ReviewSection>
      <ReviewSection title="Funding method" to="/apply/funding"><p>{fundingMethods.find(method => method.id === data.funding.method)?.name}</p>{data.funding.method === 'bank' && <p>{data.funding.demoBank.replace('Demo ', '').replace('Sample ', '')}</p>}<p className="muted">{formatMoney(data.funding.amount)} total opening deposit</p></ReviewSection>
    </div>
    <form noValidate onSubmit={onSubmit}>
      <div className="disclosures"><h2>Disclosures & consent</h2><div className="sample-disclosure"><strong>Account terms and privacy information</strong><p>Review the account terms, fee schedules, privacy information, and electronic-delivery disclosures before continuing.</p></div>
        <div className="space-y-5">
          <CheckboxField id="disclosuresAccepted" checked={data.disclosuresAccepted} onChange={value => update('disclosuresAccepted', value)} error={errors.disclosuresAccepted}>I have read and accept the disclosures.</CheckboxField>
          <CheckboxField id="consentAccepted" checked={data.consentAccepted} onChange={value => update('consentAccepted', value)} error={errors.consentAccepted}>I consent to submitting this application and opening the selected accounts.</CheckboxField>
        </div>
      </div>
      <FormActions back="/apply/funding" label="Submit Application" />
    </form>
  </>
}
