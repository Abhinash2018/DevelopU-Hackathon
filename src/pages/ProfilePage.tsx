import { useState } from 'react'
import { Button } from '../components/common/Button'
import { Icon } from '../components/common/Icon'
import { FormField, SelectField } from '../components/forms/FormField'
import { useMember } from '../context/MemberContext'
import { states } from '../data/states'
import type { MemberProfile } from '../types/member'

export function ProfilePage() {
  const { profile, updateProfile } = useMember()
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [draft, setDraft] = useState<MemberProfile | null>(profile)
  if (!profile || !draft) return null
  const currentProfile = profile

  function set(field: keyof MemberProfile, value: string) {
    setDraft(current => current ? { ...current, [field]: value } : current)
    setSaved(false)
  }

  function save() {
    updateProfile(draft as MemberProfile)
    setEditing(false)
    setSaved(true)
  }

  const initials = `${currentProfile.firstName[0]}${currentProfile.lastName[0]}`.toUpperCase()
  return <div className="feature-page profile-page">
    <div className="feature-heading"><div><p className="member-eyebrow">MEMBER SETTINGS</p><h1>Your profile</h1><p>Review the information connected to your UFCU member experience.</p></div><span className="member-avatar profile-large-avatar">{initials}</span></div>
    {saved && <div className="saved-banner" role="status"><Icon name="checkCircle" size={18} /> Profile changes saved.</div>}
    <section className="profile-card"><div className="profile-card-heading"><div><p className="member-eyebrow">PERSONAL INFORMATION</p><h2>{currentProfile.firstName} {currentProfile.lastName}</h2></div>{!editing && <Button variant="secondary" onClick={() => { setDraft(currentProfile); setEditing(true) }}>Edit profile <Icon name="arrow" size={16} /></Button>}</div>{editing ? <div className="member-form-grid profile-edit-grid"><FormField id="profile-first-name" label="First name" value={draft.firstName} onChange={event => set('firstName', event.target.value)} /><FormField id="profile-last-name" label="Last name" value={draft.lastName} onChange={event => set('lastName', event.target.value)} /><FormField id="profile-dob" label="Date of birth" type="date" value={draft.dateOfBirth} onChange={event => set('dateOfBirth', event.target.value)} /><FormField id="profile-email" label="Email address" type="email" value={draft.email} onChange={event => set('email', event.target.value)} /><FormField id="profile-phone" label="Phone number" type="tel" value={draft.phone} onChange={event => set('phone', event.target.value)} /><FormField id="profile-street" label="Street address" value={draft.street} onChange={event => set('street', event.target.value)} /><FormField id="profile-city" label="City" value={draft.city} onChange={event => set('city', event.target.value)} /><SelectField id="profile-state" label="State" value={draft.state} onChange={event => set('state', event.target.value)}><option value="">Select a state</option>{states.map(([code, name]) => <option key={code} value={code}>{name}</option>)}</SelectField><FormField id="profile-zip" label="ZIP code" value={draft.zip} onChange={event => set('zip', event.target.value)} /><div className="profile-edit-actions"><button type="button" className="member-text-button" onClick={() => { setDraft(currentProfile); setEditing(false) }}>Cancel</button><Button onClick={save}>Save changes <Icon name="check" size={16} /></Button></div></div> : <div className="profile-detail-grid"><ProfileDetail label="Full name" value={`${currentProfile.firstName} ${currentProfile.lastName}`} /><ProfileDetail label="Date of birth" value={formatDate(currentProfile.dateOfBirth)} /><ProfileDetail label="Email address" value={currentProfile.email} /><ProfileDetail label="Phone number" value={currentProfile.phone} /><ProfileDetail label="Address" value={`${currentProfile.street}, ${currentProfile.city}, ${currentProfile.state} ${currentProfile.zip}`} /><ProfileDetail label="Member ID" value="Member ••0124" /></div>}</section>
    <div className="profile-settings-grid"><section className="profile-settings-card"><span className="settings-icon"><Icon name="lock" size={21} /></span><div><h2>Security settings</h2><p>Manage your password, two-step verification, and account alerts.</p><button className="panel-link" type="button">Review security settings <Icon name="arrow" size={15} /></button></div></section><section className="profile-settings-card"><span className="settings-icon"><Icon name="shield" size={21} /></span><div><h2>Privacy choices</h2><p>Review how your information is used to organize your member experience.</p><button className="panel-link" type="button">Review privacy choices <Icon name="arrow" size={15} /></button></div></section></div>
  </div>
}

function ProfileDetail({ label, value }: { label: string; value: string }) {
  return <div className="profile-detail"><span>{label}</span><strong>{value}</strong></div>
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00`)
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date)
}
