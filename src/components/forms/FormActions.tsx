import { useNavigate } from 'react-router'
import { Button } from '../common/Button'
import { Icon } from '../common/Icon'

export function FormActions({ back, label = 'Continue' }: { back: string; label?: string }) {
  const navigate = useNavigate()
  return <div className="form-actions">
    <Button variant="text" onClick={() => navigate(back)}><Icon name="back" size={18} /> Back</Button>
    <Button type="submit">{label}<Icon name="arrow" size={18} /></Button>
  </div>
}
