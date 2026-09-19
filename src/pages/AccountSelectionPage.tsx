import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PageHeading } from '../components/layout/PageHeading'
import { FormActions } from '../components/forms/FormActions'
import { Button } from '../components/common/Button'
import { Modal } from '../components/common/Modal'
import { AccountCard } from '../components/accounts/AccountCard'
import { useOnboarding } from '../context/OnboardingContext'
import { useStepForm } from '../hooks/useStepForm'
import { accounts } from '../data/accounts'
import type { Account } from '../types/onboarding'

export function AccountSelectionPage() {
  const { data, update } = useOnboarding()
  const navigate = useNavigate()
  const { errors, onSubmit } = useStepForm(4, () => navigate('/apply/funding'))
  const [modal, setModal] = useState<'help' | Account | null>(null)
  function toggle(id: string) {
    update('selectedAccounts', data.selectedAccounts.includes(id) ? data.selectedAccounts.filter(value => value !== id) : [...data.selectedAccounts, id])
  }
  return <>
    <PageHeading eyebrow="MADE FOR YOUR EVERYDAY" title="Find your fit." description="Choose one or more accounts for your next chapter. You can change your selections before submitting." />
    <div className="help-panel"><div><h2>Not sure which account is right for you?</h2><p>Guided help is coming in a future iteration.</p></div><Button variant="secondary" onClick={() => setModal('help')}>Help me choose</Button></div>
    <form noValidate onSubmit={onSubmit}>
      <fieldset><legend className="sr-only">Choose at least one checking account</legend>
        <div className="account-grid">{accounts.map(account => <AccountCard key={account.id} account={account} selected={data.selectedAccounts.includes(account.id)} onToggle={() => toggle(account.id)} onLearnMore={() => setModal(account)} error={errors.selectedAccounts} />)}</div>
        {errors.selectedAccounts && <p id="accounts-error" className="field-error">{errors.selectedAccounts}</p>}
      </fieldset>
      <p className="fine-print">Illustrative product information for this prototype. Features, eligibility, and terms are not verified offers.</p>
      <FormActions back="/apply/address" />
    </form>
    {modal && <Modal title={modal === 'help' ? 'A little guidance is on the way.' : modal.name} onClose={() => setModal(null)}>
      {modal === 'help' ? <><p>In a future iteration, you’ll be able to answer a few quick questions to help compare your options.</p><p>For now, explore the sample benefits and select an account yourself.</p></> : <><p>{modal.description}</p><p>This is a product-detail placeholder. Full rates, qualifications, and disclosures would appear here in a future iteration.</p></>}
    </Modal>}
  </>
}
