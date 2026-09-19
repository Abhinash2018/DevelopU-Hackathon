import { useNavigate } from 'react-router'
import { PageHeading } from '../components/layout/PageHeading'
import { FormField, SelectField } from '../components/forms/FormField'
import { FormActions } from '../components/forms/FormActions'
import { useOnboarding } from '../context/OnboardingContext'
import { useStepForm } from '../hooks/useStepForm'
import { states } from '../data/states'

export function AddressPage() {
  const { data, update } = useOnboarding()
  const navigate = useNavigate()
  const { errors, onSubmit } = useStepForm(3, () => navigate('/apply/accounts'))
  const set = (field: keyof typeof data.address, value: string) => update('address', { ...data.address, [field]: value })
  return <>
    <PageHeading eyebrow="A PLACE TO CALL HOME" title="What’s your address?" description="Use a fictional U.S. residential address for your demo application." />
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="full-width"><FormField id="street" label="Street address" value={data.address.street} onChange={e => set('street', e.target.value)} error={errors.street} placeholder="123 Sample Street" required maxLength={160} /></div>
        <div className="full-width"><FormField id="apartment" label="Apartment, suite, or unit" value={data.address.apartment} onChange={e => set('apartment', e.target.value)} optional maxLength={80} /></div>
        <FormField id="city" label="City" value={data.address.city} onChange={e => set('city', e.target.value)} error={errors.city} required maxLength={80} />
        <SelectField id="state" label="State" value={data.address.state} onChange={e => set('state', e.target.value)} error={errors.state} required><option value="">Select a state</option>{states.map(([code, name]) => <option key={code} value={code}>{name}</option>)}</SelectField>
        <FormField id="zip" label="ZIP code" inputMode="numeric" value={data.address.zip} onChange={e => set('zip', e.target.value)} error={errors.zip} required maxLength={10} placeholder="78701" />
      </div>
      <FormActions back="/apply/contact" />
    </form>
  </>
}
