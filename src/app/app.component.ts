import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formSuccess = false;

  onFormSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    form.submit();
    form.reset();
    this.formSuccess = true;
    setTimeout(() => { this.formSuccess = false; }, 4000);
  }
  mobileNavOpen = false;
  // stable bound handler so we can remove it later
  private boundOnScroll = this.onScroll.bind(this);

  title = 'spice-factory';

  // Replace the phone below with your business WhatsApp number in international format (no + or leading zeros).
  whatsappNumber = '919594256897'; // updated to your requested number

  products = [
    { name: 'Cumin seeds', description: 'Premium cumin seeds, aromatic and flavorful', img: 'assets/images/cuminseed.png' },
    { name: 'Coriander powder', description: 'Finely ground coriander powder, fresh and citrusy', img: 'assets/images/corrienderpowder.png' },
    { name: 'Coriander seeds', description: 'Whole coriander seeds, light and citrusy', img: 'assets/images/corrienderseeds.png' },
    { name: 'Black pepper', description: 'Bold and pungent black peppercorns', img: 'assets/images/blackpepper.png' },
    { name: 'Cold Pressed edible Mustard oil', description: 'Pure cold pressed mustard oil, edible quality', img: 'assets/images/mustardoil.png' },
    { name: 'Cold Pressed edible coconut oil', description: 'Pure cold pressed coconut oil, edible quality', img: 'assets/images/coconutoil.png' },
    { name: 'Cold Pressed edible sesame oil', description: 'Pure cold pressed sesame oil, edible quality', img: 'assets/images/seasomeoil.png' }
  ];


  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeSection = id;
  }

  onNavClick(id: string) {
    this.scrollTo(id);
    this.closeMobileNav();
  }

  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;
    if (this.mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileNav() {
    this.mobileNavOpen = false;
    document.body.style.overflow = '';
  }

  navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About us' },
    { id: 'products', label: 'Products' },
    { id: 'quality', label: 'Quality' },
    { id: 'contact', label: 'Contact' }
  ];

  activeSection: string = 'home';


  ngOnInit() {
    window.addEventListener('scroll', this.boundOnScroll);
  }


  ngOnDestroy() {
    window.removeEventListener('scroll', this.boundOnScroll);
    document.body.style.overflow = '';
  }

  onScroll() {
    const viewportHeight = window.innerHeight;
    const offsets = this.navLinks.map(link => {
      const el = document.getElementById(link.id);
      if (!el) return { id: link.id, visibility: -1 };
      const rect = el.getBoundingClientRect();
      const visibility = (Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)) / Math.min(el.offsetHeight, viewportHeight);
      return { id: link.id, visibility: visibility };
    });
    
    // Filter for sections that are actually visible
    const visibleSections = offsets.filter(section => section.visibility > 0);
    
    if (visibleSections.length > 0) {
      // Sort by visibility (most visible section wins)
      visibleSections.sort((a, b) => b.visibility - a.visibility);
      this.activeSection = visibleSections[0].id;
    }
  }

  get whatsappHref(): string {
    return 'https://wa.me/' + this.whatsappNumber + '?text=' + encodeURIComponent('Hello Spilo Exim, I am interested in your products');
  }

  get mailtoHref(): string {
    return 'mailto:info@spicefactory.example?subject=Inquiry';
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
  

  onSubmit(): void {
    // simple submit action — opens mail client
    window.location.href = this.mailtoHref;
  }

  getUnderlineLeft(): number {
    const idx = this.navLinks.findIndex((l) => l.id === this.activeSection);
    if (idx < 0) return 0; // guard against missing section IDs
    return idx * (100 / this.navLinks.length);
  }

  getUnderlineWidth(): number {
    return 100 / this.navLinks.length;
  }
}
