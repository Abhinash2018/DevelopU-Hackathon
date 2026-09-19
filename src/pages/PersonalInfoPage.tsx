import { useNavigate } from 'react-router'
import { PageHeading } from '../components/layout/PageHeading'
import { FormField } from '../components/forms/FormField'
import { FormActions } from '../components/forms/FormActions'
import { useOnboarding } from '../context/OnboardingContext'
import { useStepForm } from '../hooks/useStepForm'

export function PersonalInfoPage() {
  const { data, update } = useOnboarding()
  const navigate = useNavigate()
  const { errors, onSubmit } = useStepForm(1, () => navigate('/apply/contact'))
  const set = (field: keyof typeof data.personalInfo, value: string) => update('personalInfo', { ...data.personalInfo, [field]: value })
  return <>
    <PageHeading eyebrow="NICE TO MEET YOU" title="Let’s start with you." description="Tell us a little about yourself. Please use fictional information for this demo." />
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <p className="form-note">All fields are required unless marked optional.</p>
      <div className="form-grid">
        <FormField id="firstName" label="First name" value={data.personalInfo.firstName} onChange={e => set('firstName', e.target.value)} error={errors.firstName} required maxLength={80} />
        <FormField id="middleName" label="Middle name" value={data.personalInfo.middleName} onChange={e => set('middleName', e.target.value)} optional maxLength={80} />
        <FormField id="lastName" label="Last name" value={data.personalInfo.lastName} onChange={e => set('lastName', e.target.value)} error={errors.lastName} required maxLength={80} />
        <FormField id="dateOfBirth" label="Date of birth" type="date" min="1900-01-01" value={data.personalInfo.dateOfBirth} onChange={e => set('dateOfBirth', e.target.value)} error={errors.dateOfBirth} hint="Use a fictional date of birth." required />
      </div>
      <div className="quiet-note">There’s no identity check in this prototype, and we don’t ask for a Social Security number.</div>
      <FormActions back="/" />
    </form>
  </>
}
