'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, Eye, Settings, Edit3 } from 'lucide-react'
import { toast } from 'sonner'

interface FooterContent {
  description: string
  companyInfo: {
    name: string
    address: string
    phone: string
    email: string
  }
  socialLinks: {
    facebook: string
    twitter: string
    linkedin: string
    instagram: string
  }
  quickLinks: {
    title: string
    links: Array<{ label: string; url: string }>
  }
  legalLinks: {
    title: string
    links: Array<{ label: string; url: string }>
  }
  newsletter: {
    title: string
    description: string
    placeholder: string
  }
}

export default function FooterManagement() {
  const [content, setContent] = useState<FooterContent>({
    description: '',
    companyInfo: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    quickLinks: {
      title: 'Quick Links',
      links: []
    },
    legalLinks: {
      title: 'Legal',
      links: []
    },
    newsletter: {
      title: 'Stay Updated',
      description: '',
      placeholder: 'Enter your email'
    }
  })

  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    fetchFooterContent()
  }, [])

  const fetchFooterContent = async () => {
    try {
      const response = await fetch('/api/footer')
      if (response.ok) {
        const data = await response.json() as FooterContent
        setContent(data)
      }
    } catch (error) {
      console.error('Failed to fetch footer content:', error)
    }
  }

  const saveFooterContent = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/footer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      })

      if (response.ok) {
        toast.success('Footer content saved successfully!')
      } else {
        toast.error('Failed to save footer content')
      }
    } catch (error) {
      console.error('Failed to save footer content:', error)
      toast.error('Failed to save footer content')
    } finally {
      setLoading(false)
    }
  }

  const updateContent = (section: string, field: string, value: any) => {
    setContent(prev => {
      const sectionValue = prev[section as keyof FooterContent]
      // Only spread if the section value is an object, not a primitive
      if (typeof sectionValue === 'object' && sectionValue !== null) {
        return {
          ...prev,
          [section]: {
            ...sectionValue,
            [field]: value
          }
        }
      } else {
        // For primitive types (like 'description'), just set the value directly
        return {
          ...prev,
          [section]: value
        }
      }
    })
  }

  const addLink = (section: 'quickLinks' | 'legalLinks') => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        links: [...prev[section].links, { label: '', url: '' }]
      }
    }))
  }

  const updateLink = (section: 'quickLinks' | 'legalLinks', index: number, field: 'label' | 'url', value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        links: prev[section].links.map((link, i) =>
          i === index ? { ...link, [field]: value } : link
        )
      }
    }))
  }

  const removeLink = (section: 'quickLinks' | 'legalLinks', index: number) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        links: prev[section].links.filter((_, i) => i !== index)
      }
    }))
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Footer Management</h2>
          <p className="text-muted-foreground">
            Manage footer content, links, and company information
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={saveFooterContent} disabled={loading} size="sm">
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Footer Content</CardTitle>
              <CardDescription>
                Manage the main footer description and newsletter section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Footer Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter footer description..."
                  value={content.description}
                  onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Newsletter Section</h4>
                <div className="space-y-2">
                  <Label htmlFor="newsletter-title">Newsletter Title</Label>
                  <Input
                    id="newsletter-title"
                    value={content.newsletter.title}
                    onChange={(e) => updateContent('newsletter', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newsletter-description">Newsletter Description</Label>
                  <Textarea
                    id="newsletter-description"
                    placeholder="Newsletter description..."
                    value={content.newsletter.description}
                    onChange={(e) => updateContent('newsletter', 'description', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newsletter-placeholder">Email Placeholder</Label>
                  <Input
                    id="newsletter-placeholder"
                    value={content.newsletter.placeholder}
                    onChange={(e) => updateContent('newsletter', 'placeholder', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Manage company details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={content.companyInfo.name}
                    onChange={(e) => updateContent('companyInfo', 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={content.companyInfo.email}
                    onChange={(e) => updateContent('companyInfo', 'email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone</Label>
                  <Input
                    id="company-phone"
                    value={content.companyInfo.phone}
                    onChange={(e) => updateContent('companyInfo', 'phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Address</Label>
                  <Input
                    id="company-address"
                    value={content.companyInfo.address}
                    onChange={(e) => updateContent('companyInfo', 'address', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>
                  Manage quick navigation links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quick-links-title">Section Title</Label>
                  <Input
                    id="quick-links-title"
                    value={content.quickLinks.title}
                    onChange={(e) => updateContent('quickLinks', 'title', e.target.value)}
                  />
                </div>
                {content.quickLinks.links.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Label"
                      value={link.label}
                      onChange={(e) => updateLink('quickLinks', index, 'label', e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => updateLink('quickLinks', index, 'url', e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeLink('quickLinks', index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addLink('quickLinks')}
                  className="w-full"
                >
                  Add Link
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Legal Links</CardTitle>
                <CardDescription>
                  Manage legal and policy links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="legal-links-title">Section Title</Label>
                  <Input
                    id="legal-links-title"
                    value={content.legalLinks.title}
                    onChange={(e) => updateContent('legalLinks', 'title', e.target.value)}
                  />
                </div>
                {content.legalLinks.links.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Label"
                      value={link.label}
                      onChange={(e) => updateLink('legalLinks', index, 'label', e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => updateLink('legalLinks', index, 'url', e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeLink('legalLinks', index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addLink('legalLinks')}
                  className="w-full"
                >
                  Add Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Manage social media profile links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    placeholder="https://facebook.com/..."
                    value={content.socialLinks.facebook}
                    onChange={(e) => updateContent('socialLinks', 'facebook', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/..."
                    value={content.socialLinks.twitter}
                    onChange={(e) => updateContent('socialLinks', 'twitter', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/..."
                    value={content.socialLinks.linkedin}
                    onChange={(e) => updateContent('socialLinks', 'linkedin', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="https://instagram.com/..."
                    value={content.socialLinks.instagram}
                    onChange={(e) => updateContent('socialLinks', 'instagram', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
