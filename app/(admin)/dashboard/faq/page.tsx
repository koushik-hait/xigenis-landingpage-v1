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

export default function FAQAdmin() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [content, setContent] = useState<any>({
    heading: 'Answers To Your Most Important\nQuestions',
    buttonText: 'ASK A QUESTION',
    faqs: [
      {
        question: "How Quickly Can I Start Getting Buyer Leads?",
        answer: "Most of our partners see their first high-intent buyer leads within the first 72 hours of the campaign going live. We optimize in real-time to ensure lead quality remains high from day one.",
      },
      {
        question: "Do you integrate with my existing CRM?",
        answer: "Our automated systems capture and verify contact information immediately, pushing them directly to your CRM.",
      },
      {
        question: "Are the leads exclusive to me?",
        answer: "We use hyper-local targeting to ensure the leads are actually looking in your specific micro-market.",
      },
      {
        question: "How do I know what's working?",
        answer: "Transparency is key. You'll have a live dashboard to track every lead as it comes through our system.",
      },
    ]
  })

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCmsContent('home', 'faq')
        if (data && Object.keys(data).length > 0) {
          setContent(data)
        }
      } catch (error) {
        console.error('Failed to load FAQ data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await upsertCmsContent('home', 'faq', content)
      toast.success('FAQ updated successfully')
    } catch (error) {
      console.error('Failed to save FAQ data:', error)
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContent({ ...content, [name]: value })
  }

  const handleFaqChange = (index: number, field: string, value: string) => {
    const newFaqs = [...content.faqs]
    newFaqs[index] = { ...newFaqs[index], [field]: value } as any
    setContent({ ...content, faqs: newFaqs })
  }

  const addFaq = () => {
    setContent({
      ...content,
      faqs: [...content.faqs, { question: '', answer: '' }]
    })
  }

  const removeFaq = (index: number) => {
    const newFaqs = content.faqs.filter((_: any, i: number) => i !== index)
    setContent({ ...content, faqs: newFaqs })
  }

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-gray-500" /></div>

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">FAQ Section</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Header Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Heading</Label>
                <Textarea name="heading" value={content.heading} onChange={handleTextChange} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input name="buttonText" value={content.buttonText} onChange={handleTextChange} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>FAQ Items</CardTitle>
              <Button onClick={addFaq} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" /> Add</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.faqs.map((faq: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-700" onClick={() => removeFaq(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="space-y-2 mt-4">
                    <Label>Question</Label>
                    <Input value={faq.question} onChange={(e) => handleFaqChange(index, 'question', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Answer</Label>
                    <Textarea value={faq.answer} onChange={(e) => handleFaqChange(index, 'answer', e.target.value)} rows={3} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
