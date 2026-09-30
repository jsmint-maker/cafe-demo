import { supabase } from '@/lib/supabase'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/Hero'
import { MenuSection } from '@/components/Menu'
import { StorySection } from '@/components/Story'
import { VisitSection } from '@/components/Visit'
import CheckoutWrapper from '@/components/CheckoutWraper'
import { FloatingCartBar } from '@/components/FloatingCartBar'
import { ScrollToTopButton } from '@/components/ScrollToTopButton'

export default async function Page() {
  // Fetch live menu items from Supabase
  const { data: menuItems, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('category', { ascending: true })

  if (error) {
    console.error('Error fetching menu items:', error)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-clip">
      <ScrollToTopButton />

      <Header />
      <HeroSection />
      <MenuSection initialItems={menuItems || []} />
      <StorySection />
      <VisitSection />
      <Footer />

      <CheckoutWrapper />
      <FloatingCartBar />

    </main>
  )
}
