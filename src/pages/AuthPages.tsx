import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { Button } from '../components/common/Button'
import { Icon } from '../components/common/Icon'
import { FormField, SelectField } from '../components/forms/FormField'
import { MemberSetupShell } from '../components/layout/MemberSetupShell'
import { useMember } from '../context/MemberContext'
import { IdentityImageUpload } from '../components/forms/IdentityImageUpload'
import { states } from '../data/states'
import type { OnboardingStage, SignUpProfile } from '../types/member'

function getResumePath(stage: OnboardingStage) {
  switch (stage) {
    case 'PROFILE':
    case 'MATCH':
      return '/preferences'
    case 'RECOMMENDATION':
      return '/recommendation'
    case 'REVIEW':
    case 'TRUST':
      return '/identity-review'
    case 'PROCESSING':
      return '/membership-processing'
    case 'MEMBERSHIP_READY':
    case 'ACTIVATE':
      return '/membership-ready'
    case 'NEEDS_REVIEW':
      return '/membership-needs-review'
    default:
      return '/dashboard'
  }
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, onboardingStage } = useMember()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!signIn(email, password)) {
      setError('Enter your email and a password with at least four characters.')
      return
    }
    const from = (location.state as { from?: string } | null)?.from
    navigate(onboardingStage === 'COMPLETE' && from ? from : getResumePath(onboardingStage), { replace: true })
  }

  return <MemberSetupShell>
    <section className="auth-card" aria-labelledby="login-title">
      <div className="auth-heading">
        <span className="auth-icon"><Icon name="lock" size={25} /></span>
        <p className="member-eyebrow">SECURE MEMBER ACCESS</p>
        <h1 id="login-title">Welcome back.</h1>
        <p>Sign in to continue your UFCU financial journey.</p>
      </div>
      <form className="member-form" onSubmit={submit} noValidate autoComplete="off">
        <FormField id="login-email" label="Email or username" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" required />
        <div className="password-field">
          <FormField id="login-password" label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} required />
          <button type="button" className="password-toggle" onClick={() => setShowPassword(current => !current)} aria-label={showPassword ? 'Hide password' : 'Show password'}><Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} /></button>
        </div>
        {error && <p className="member-form-error" role="alert">{error}</p>}
        <div className="auth-form-row"><button type="button" className="member-text-button">Forgot password?</button><span>Protected by UFCU security</span></div>
        <Button type="submit" className="member-full-button">Sign in <Icon name="arrow" size={18} /></Button>
      </form>
      <div className="auth-divider"><span>New to UFCU?</span></div>
      <Link to="/signup" className="button button-secondary member-full-button">Create an account <Icon name="arrow" size={18} /></Link>
      <p className="security-callout"><Icon name="shield" size={18} /> UFCU will never ask for your password through chat or an unsolicited message.</p>
    </section>
  </MemberSetupShell>
}

const initialForm: SignUpProfile = {
  firstName: '', lastName: '', dateOfBirth: '', email: '', phone: '', street: '', city: '', state: '', zip: '',
  identificationType: '', identificationLast4: '', ssnLast4: '', password: '',
}

export function CreateAccountPage() {
  const navigate = useNavigate()
  const { createAccount } = useMember()
  const [form, setForm] = useState(initialForm)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function set(field: keyof SignUpProfile, value: string) {
    setForm(current => ({ ...current, [field]: value }))
    setErrors(current => ({ ...current, [field]: '' }))
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!form.firstName.trim()) nextErrors.firstName = 'Enter your first name.'
    if (!form.lastName.trim()) nextErrors.lastName = 'Enter your last name.'
    if (!form.dateOfBirth) nextErrors.dateOfBirth = 'Enter your date of birth.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.phone.trim()) nextErrors.phone = 'Enter your phone number.'
    if (!form.street.trim()) nextErrors.street = 'Enter your street address.'
    if (!form.city.trim()) nextErrors.city = 'Enter your city.'
    if (!form.state) nextErrors.state = 'Choose your state.'
    if (!/^\d{5}(-\d{4})?$/.test(form.zip.trim())) nextErrors.zip = 'Enter a valid ZIP code.'
    if (!form.identificationType) nextErrors.identificationType = 'Choose an identification type.'
    if (!/^\d{4}$/.test(form.identificationLast4.trim())) nextErrors.identificationLast4 = 'Enter four digits only.'
    if (!/^\d{4}$/.test(form.ssnLast4.trim())) nextErrors.ssnLast4 = 'Enter four digits only.'
    if (form.password.length < 8) nextErrors.password = 'Use at least eight characters.'
    if (form.password !== confirmPassword) nextErrors.confirmPassword = 'Passwords must match.'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    createAccount(form)
    navigate('/preferences')
  }

  return <MemberSetupShell>
    <section className="setup-card" aria-labelledby="create-title">
      <div className="setup-heading">
        <p className="member-eyebrow">CREATE YOUR MEMBER PROFILE</p>
        <h1 id="create-title">Let’s get to know you.</h1>
        <p>Enter your information to personalize your UFCU experience.</p>
      </div>
      <form className="member-form" onSubmit={submit} noValidate autoComplete="off">
        <div className="member-form-grid">
          <FormField id="firstName" label="First name" value={form.firstName} onChange={event => set('firstName', event.target.value)} error={errors.firstName} required />
          <FormField id="lastName" label="Last name" value={form.lastName} onChange={event => set('lastName', event.target.value)} error={errors.lastName} required />
          <FormField id="dateOfBirth" label="Date of birth" type="date" value={form.dateOfBirth} onChange={event => set('dateOfBirth', event.target.value)} error={errors.dateOfBirth} hint="Use your real information only in an official UFCU application." required />
          <FormField id="signup-email" label="Email address" type="email" value={form.email} onChange={event => set('email', event.target.value)} error={errors.email} required />
          <FormField id="signup-phone" label="Phone number" type="tel" value={form.phone} onChange={event => set('phone', event.target.value)} error={errors.phone} required />
          <FormField id="signup-street" label="Street address" value={form.street} onChange={event => set('street', event.target.value)} error={errors.street} required />
          <FormField id="signup-city" label="City" value={form.city} onChange={event => set('city', event.target.value)} error={errors.city} required />
          <SelectField id="signup-state" label="State" value={form.state} onChange={event => set('state', event.target.value)} error={errors.state} required><option value="">Select a state</option>{states.map(([code, name]) => <option key={code} value={code}>{name}</option>)}</SelectField>
          <FormField id="signup-zip" label="ZIP code" inputMode="numeric" value={form.zip} onChange={event => set('zip', event.target.value)} error={errors.zip} required />
          <IdentityImageUpload />
          <SelectField id="identificationType" label="Identification type" value={form.identificationType} onChange={event => set('identificationType', event.target.value)} error={errors.identificationType} required>
            <option value="">Select an ID type</option>
            <option value="drivers-license">Driver&apos;s license</option>
            <option value="state-id">State-issued ID</option>
            <option value="passport">Passport</option>
            <option value="military-id">Military ID</option>
            <option value="student-id">Student ID</option>
          </SelectField>
          <FormField id="identificationLast4" label="Identification last four digits" inputMode="numeric" maxLength={4} value={form.identificationLast4} onChange={event => set('identificationLast4', event.target.value.replace(/\D/g, '').slice(0, 4))} error={errors.identificationLast4} hint="Use the last four digits only." autoComplete="off" required />
          <FormField id="ssnLast4" label="SSN last four digits" inputMode="numeric" maxLength={4} value={form.ssnLast4} onChange={event => set('ssnLast4', event.target.value.replace(/\D/g, '').slice(0, 4))} error={errors.ssnLast4} hint="Use the last four digits only." autoComplete="off" required />
          <FormField id="signup-password" label="Create password" type="password" value={form.password} onChange={event => set('password', event.target.value)} error={errors.password} hint="Use at least eight characters." required />
          <FormField id="confirmPassword" label="Confirm password" type="password" value={confirmPassword} onChange={event => { setConfirmPassword(event.target.value); setErrors(current => ({ ...current, confirmPassword: '' })) }} error={errors.confirmPassword} required />
        </div>
        <div className="privacy-note"><Icon name="lock" size={17} /><p><strong>Identity protection</strong><br />Your image is previewed locally and is not uploaded to a server. Use a sample image for this walkthrough and enter only the last four digits of your identification numbers.</p></div>
        <div className="setup-actions"><Link to="/" className="button button-text"><Icon name="back" size={18} /> Back</Link><Button type="submit">Continue <Icon name="arrow" size={18} /></Button></div>
      </form>
      <p className="auth-switch">Already a member? <Link to="/">Sign in</Link></p>
    </section>
  </MemberSetupShell>
}
