'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { getCmsContent, upsertCmsContent } from '@/app/actions/cms'

import { useAdminTracking } from '@/hooks/use-admin-tracking'

const defaultContent = {
  heading: 'Answers To Your Most Important\nQuestions',
  headingSize: '48',
  buttonText: 'ASK A QUESTION',
  buttonLink: '#',
  faqs: [
    { question: "How Quickly Can I Start Getting Buyer Leads?", answer: "Most of our partners see their first high-intent buyer leads within the first 72 hours of the campaign going live." },
    { question: "Do you integrate with my existing CRM?", answer: "Our automated systems capture and verify contact information immediately, pushing them directly to your CRM." },
    { question: "Are the leads exclusive to me?", answer: "We use hyper-local targeting to ensure the leads are actually looking in your specific micro-market." },
    { question: "How do I know what's working?", answer: "Transparency is key. You'll have a live dashboard to track every lead as it comes through our system." },
  ]
}

export default function FAQAdmin() {
  const [content, setContent] = useState<typeof defaultContent>({ ...defaultContent })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { trackSave, trackCreate, trackDelete } = useAdminTracking()

  useEffect(() => { async function loadData() { try { const data = await getCmsContent('home', 'faq'); if (data && Object.keys(data).length > 0) { const flatData = data.desktop || data; setContent({ ...defaultContent, ...flatData }) } } catch (error) { console.error('Failed to load FAQ data:', error) } finally { setLoading(false) } } loadData() }, [])

  const handleChange = (key: string, value: any) => { setContent(prev => ({ ...prev, [key]: value })) }

  const handleSave = async () => { setSaving(true); try { await upsertCmsContent('home', 'faq', content); trackSave('faq', `Saved FAQ section content`, { device: 'all', faqCount: content.faqs.length }); toast.success('FAQ updated successfully') } catch (error) { console.error('Failed to save:', error); toast.error('Failed to save changes') } finally { setSaving(false) } }

  const handleFaqChange = (index: number, field: string, value: string) => {
    const newFaqs = [...content.faqs]; newFaqs[index] = { ...newFaqs[index], [field]: value } as any; handleChange( 'faqs', newFaqs)
  }
  const addFaq = () => { handleChange( 'faqs', [...content.faqs, { question: '', answer: '' }]); trackCreate('faq', `Added new FAQ item`, {  faqCount: content.faqs.length + 1 }) }
  const removeFaq = (index: number) => { handleChange( 'faqs', content.faqs.filter((_: any, i: number) => i !== index)); trackDelete('faq', `Removed FAQ item ${index + 1}`, {  faqIndex: index }) }

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-gray-500" /></div>

  const renderForm = () => {
    const d = content
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <Card>
            <CardHeader><CardTitle>Header Text</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Heading</Label><Textarea value={d.heading} onChange={e => handleChange( 'heading', e.target.value)} rows={3} /></div>
              <div className="space-y-2"><Label>Heading Font Size (px)</Label><Input type="number" value={d.headingSize} onChange={e => handleChange( 'headingSize', e.target.value)} /></div>
              <div className="space-y-2"><Label>Button Text</Label><Input value={d.buttonText} onChange={e => handleChange( 'buttonText', e.target.value)} /></div>
              <div className="space-y-2"><Label>Button Link (URL)</Label><Input value={d.buttonLink || ""} onChange={e => handleChange( 'buttonLink', e.target.value)} /></div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between"><CardTitle>FAQ Items</CardTitle><Button onClick={() => addFaq()} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" /> Add</Button></CardHeader>
            <CardContent className="space-y-6">
              {d.faqs.map((faq: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-700" onClick={() => removeFaq( index)}><Trash2 className="h-4 w-4" /></Button>
                  <div className="space-y-2 mt-4"><Label>Question</Label><Input value={faq.question} onChange={(e) => handleFaqChange( index, 'question', e.target.value)} /></div>
                  <div className="space-y-2"><Label>Answer</Label><Textarea value={faq.answer} onChange={(e) => handleFaqChange( index, 'answer', e.target.value)} rows={3} /></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">FAQ Section</h1>
        <Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}<Save className="mr-2 h-4 w-4" />Save Changes</Button>
      </div>
      {renderForm()}
    </div>
  )
}
