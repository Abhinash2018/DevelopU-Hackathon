import { useNavigate } from 'react-router'
import { PageHeading } from '../components/layout/PageHeading'
import { FormField } from '../components/forms/FormField'
import { FormActions } from '../components/forms/FormActions'
import { useOnboarding } from '../context/OnboardingContext'
import { useStepForm } from '../hooks/useStepForm'

export function ContactInfoPage() {
  const { data, update } = useOnboarding()
  const navigate = useNavigate()
  const { errors, onSubmit } = useStepForm(2, () => navigate('/apply/address'))
  return <>
    <PageHeading eyebrow="KEEPING IN TOUCH" title="How can we reach you?" description="Add sample contact details to see how this step works. We won’t send any messages or make calls." />
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <div className="space-y-6">
        <FormField id="email" label="Email address" type="email" value={data.contactInfo.email} onChange={e => update('contactInfo', { ...data.contactInfo, email: e.target.value })} error={errors.email} placeholder="alex@example.com" hint="Use a fictional email address." required maxLength={254} />
        <FormField id="phone" label="Mobile phone number" type="tel" value={data.contactInfo.phone} onChange={e => update('contactInfo', { ...data.contactInfo, phone: e.target.value })} error={errors.phone} placeholder="(512) 555-0123" hint="Include your 3-digit area code." required maxLength={24} />
      </div>
      <FormActions back="/apply/personal" />
    </form>
  </>
}
