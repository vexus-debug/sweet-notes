import { useState, useEffect, useRef, useCallback } from "react";
import { Phone, Mail, MapPin, Clock, Eye, Heart, Shield, Users, Star, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/yorlad_logo.png";
import clinic1 from "@/assets/clinic-1.jpg";
import clinic2 from "@/assets/clinic-2.jpg";
import clinic3 from "@/assets/clinic-3.jpg";
import clinic4 from "@/assets/clinic-4.jpg";
import glasses1 from "@/assets/glasses-1.jpg";
import glasses2 from "@/assets/glasses-2.jpg";
import kidGlasses from "@/assets/kid-glasses.jpg";
import clinicExterior from "@/assets/clinic-exterior.webp";
import clinicExam from "@/assets/clinic-exam.webp";

const navLinks = ["Home", "About", "Services", "Why Us", "Gallery", "Testimonials", "Contact"];

const services = [
  {
    icon: Eye,
    title: "Comprehensive Eye Exams",
    description: "Thorough eye examinations using advanced diagnostic equipment to assess your vision and overall eye health.",
    tags: ["Visual Acuity Test", "Refraction", "Eye Pressure Check"],
    image: clinicExam,
  },
  {
    icon: Shield,
    title: "Disease Management",
    description: "Expert diagnosis and management of eye conditions including glaucoma, diabetic eye disease, and dry eye syndrome.",
    tags: ["Glaucoma", "Diabetic Eye", "Dry Eye"],
    image: clinic3,
  },
  {
    icon: Heart,
    title: "Vision Therapy & Pediatric Care",
    description: "Specialized vision therapy programs and gentle pediatric eye care to ensure healthy vision development in children.",
    tags: ["Children's Eye Care", "Vision Training", "Amblyopia"],
    image: kidGlasses,
  },
  {
    icon: Star,
    title: "Optical Services",
    description: "Premium optical services including contact lens fitting, anti-glare lenses, and a wide selection of designer frames.",
    tags: ["Contact Lenses", "Anti-Glare Lenses", "Designer Frames"],
    image: glasses2,
  },
];

const whyChooseUs = [
  { icon: Eye, title: "Advanced Equipment", description: "State-of-the-art ophthalmic diagnostic and treatment equipment for precise care." },
  { icon: Heart, title: "Patient Comfort", description: "A warm, welcoming environment designed around your comfort and convenience." },
  { icon: Users, title: "Expert Specialists", description: "Highly trained ophthalmologists and optometrists with years of experience." },
  { icon: Shield, title: "HMO Accepted", description: "Partners with Leadway Health, Reliance Health, Clearline HMO, and Novo Health." },
];

const testimonials = [
  {
    text: "The doctors at Yorlad Eye Care are incredibly knowledgeable. They detected an issue I didn't even know I had and treated it promptly. I'm so grateful for their thorough approach.",
    name: "Adebayo T.",
    location: "Agege, Lagos",
    service: "Eye Examination",
  },
  {
    text: "I got my new glasses from Yorlad and the turnaround was impressively fast. The staff are polite and professional, and the frames selection is top-notch. Highly recommend!",
    name: "Funke O.",
    location: "Ikeja, Lagos",
    service: "Optical Services",
  },
  {
    text: "My child was diagnosed with amblyopia and the team handled everything with such patience and care. The vision therapy sessions have made a real difference. Thank you Yorlad!",
    name: "Chinedu M.",
    location: "Ogba, Lagos",
    service: "Pediatric Care",
  },
];

const galleryImages = [
  { src: clinicExam, alt: "Patient undergoing eye examination with advanced equipment" },
  { src: clinic1, alt: "Eye consultation with autorefractor machine" },
  { src: clinic2, alt: "Comprehensive eye testing at Yorlad" },
  { src: clinic3, alt: "Patient during refraction assessment" },
  { src: clinic4, alt: "Digital eye examination process" },
  { src: kidGlasses, alt: "Young patient with new prescription glasses" },
  { src: glasses1, alt: "Designer prescription eyeglasses" },
  { src: glasses2, alt: "Premium frames and glasses case" },
  { src: clinicExterior, alt: "Yorlad Specialist Eye Clinic signage" },
];

// Scroll reveal hook
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const children = el.querySelectorAll(".reveal");
    children.forEach((child) => observer.observe(child));
    // Also observe the container itself if it has reveal
    if (el.classList.contains("reveal")) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const revealRef = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background" ref={revealRef}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-500 ${scrolled ? "bg-primary/95 border-primary/60 shadow-lg shadow-primary/10" : "bg-background/80 border-border/50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <img src={logo} alt="Yorlad Eye Care" className={`h-12 sm:h-14 w-auto transition-all duration-500 ${scrolled ? "brightness-0 invert" : ""}`} />
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase().replace(" ", "-"))}
                  className={`text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full ${scrolled ? "text-primary-foreground/80 hover:text-primary-foreground after:bg-primary-foreground" : "text-muted-foreground hover:text-primary after:bg-primary"}`}
                >
                  {link}
                </button>
              ))}
              <Button onClick={() => scrollTo("contact")} className={`transition-all duration-300 shadow-md hover:shadow-lg ${scrolled ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-primary-foreground/20" : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20"}`}>
                Book Appointment <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <button className={`md:hidden transition-colors duration-300 ${scrolled ? "text-primary-foreground" : "text-foreground"}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* Mobile menu with slide animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className={`px-4 py-4 space-y-1 border-t ${scrolled ? "bg-primary border-primary-foreground/10" : "bg-background border-border"}`}>
            {navLinks.map((link, i) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(" ", "-"))}
                className={`block w-full text-left text-sm font-medium py-3 px-3 rounded-xl transition-all duration-200 ${scrolled ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10" : "text-muted-foreground hover:text-primary hover:bg-muted"}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link}
              </button>
            ))}
            <Button onClick={() => scrollTo("contact")} className={`w-full mt-2 ${scrolled ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`}>
              Book Appointment
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-primary/[0.04] via-background to-accent/[0.06]">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-[-10%] w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-10 left-[-5%] w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="reveal inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-2 mb-8 shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent drop-shadow-sm" />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">5-Star Rated on Google</span>
            </div>

            <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Your Vision{" "}
              <br className="hidden sm:block" />
              Deserves{" "}
              <span className="relative">
                <span className="gradient-text">
                  Expert Care
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C30 3 70 2 100 5C130 8 170 4 198 2" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-primary">.</span>
            </h1>

            <p className="reveal reveal-delay-2 text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Modern, specialist-driven eye care in Agege, Lagos. Experience comprehensive vision care with advanced technology, designed around your comfort.
            </p>

            <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollTo("contact")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Book Appointment <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted text-base px-8 py-6 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                asChild
              >
                <a href="tel:+2348059855065">
                  <Phone className="mr-2 h-5 w-5" /> Call Now
                </a>
              </Button>
            </div>

            <div className="reveal reveal-delay-4 mt-12 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
              {[
                { value: "5", icon: Star, label: "Google Rating", accent: true },
                { value: "4+", icon: Heart, label: "HMO Partners", accent: false },
                { value: "10+", icon: Users, label: "Specialists", accent: false },
              ].map((stat, i) => (
                <div key={stat.label} className={`relative group rounded-2xl p-4 sm:p-5 text-center transition-all duration-500 hover:-translate-y-1 ${stat.accent ? "bg-gradient-to-br from-primary to-primary/85 text-primary-foreground shadow-lg shadow-primary/25" : "glass-card hover:shadow-lg hover:shadow-primary/10"}`}>
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl mx-auto mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${stat.accent ? "bg-primary-foreground/20" : "bg-gradient-to-br from-primary/15 to-accent/10"}`}>
                    <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.accent ? "text-primary-foreground fill-primary-foreground" : "text-primary"}`} />
                  </div>
                  <div className={`text-2xl sm:text-3xl font-bold mb-0.5 ${stat.accent ? "" : "text-primary"}`}>{stat.value}</div>
                  <div className={`text-[11px] sm:text-xs font-medium tracking-wide uppercase ${stat.accent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image grid with enhanced depth */}
          <div className="hidden lg:grid grid-cols-2 gap-3 reveal">
            <div className="col-span-2 img-shine rounded-2xl overflow-hidden shadow-elevated">
              <img src={clinicExam} alt="Eye examination at Yorlad" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="img-shine rounded-2xl overflow-hidden shadow-glass hover-lift">
              <img src={kidGlasses} alt="Young patient with glasses" className="w-full h-48 object-cover" />
            </div>
            <div className="img-shine rounded-2xl overflow-hidden shadow-glass hover-lift">
              <img src={glasses2} alt="Premium eyewear" className="w-full h-48 object-cover" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden sm:flex justify-center mt-12 animate-bounce">
          <button onClick={() => scrollTo("about")} className="text-muted-foreground/40 hover:text-primary transition-colors">
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 section-glow relative bg-gradient-to-b from-background via-primary/[0.03] to-accent/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal grid grid-cols-5 grid-rows-2 gap-2.5 sm:gap-3.5 mb-12 max-w-2xl mx-auto aspect-[5/4]">
            <div className="col-span-3 row-span-2 img-shine rounded-2xl overflow-hidden shadow-elevated relative group">
              <img src={clinic1} alt="Patient consultation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="col-span-2 row-span-1 img-shine rounded-2xl overflow-hidden shadow-glass relative group">
              <img src={clinic2} alt="Eye testing equipment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="col-span-2 row-span-1 bg-gradient-to-br from-primary via-primary/90 to-accent/80 rounded-2xl flex flex-col items-center justify-center text-primary-foreground p-3 sm:p-4 text-center shadow-lg shadow-primary/25 hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--accent)/0.3),transparent_70%)]" />
              <div className="relative">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1.5 opacity-80" />
                <div className="text-xl sm:text-2xl font-bold leading-tight">Agege</div>
                <div className="text-[11px] sm:text-xs font-medium opacity-70 tracking-wide uppercase mt-0.5">Lagos, Nigeria</div>
              </div>
            </div>
          </div>

          <p className="reveal text-sm font-semibold tracking-widest text-accent uppercase mb-3">About Us</p>
          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Specialist Eye Care,{" "}
            <span className="gradient-text">Trusted Vision</span>
          </h2>
          <p className="reveal reveal-delay-2 text-muted-foreground text-lg max-w-3xl leading-relaxed mb-8">
            Yorlad Eye Care (Yorlad Specialist Eye Clinic) is a leading eye care provider in Agege, Lagos, offering modern, technology-driven ophthalmic services. Our team of experienced ophthalmologists and optometrists deliver comprehensive eye care — from routine examinations to advanced disease management and optical services. Our affiliated division, Yorlad Ophthalmic, also supplies medical and ophthalmic equipment to providers across Nigeria.
          </p>

          <div className="reveal reveal-delay-3 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {[
              { icon: Eye, label: "Advanced Equipment", color: "from-primary/20 to-primary/5" },
              { icon: Heart, label: "Patient Comfort", color: "from-accent/20 to-accent/5" },
              { icon: Users, label: "Expert Team", color: "from-primary/20 to-accent/10" },
              { icon: Shield, label: "HMO Accepted", color: "from-accent/15 to-primary/5" },
            ].map((item, i) => (
              <div key={item.label} className="flex flex-col items-center gap-2.5 glass-card rounded-2xl p-4 sm:p-5 hover-lift group text-center border border-border/30 hover:border-primary/20 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground leading-tight">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="reveal reveal-delay-4">
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-muted rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => scrollTo("services")}
            >
              Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-primary-foreground/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <p className="reveal text-sm font-semibold tracking-widest text-accent uppercase mb-3 text-center">Our Services</p>
          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl font-bold text-center mb-4">
            Comprehensive <span className="text-accent">Eye Care</span>
          </h2>
          <p className="reveal reveal-delay-2 text-center text-primary-foreground/70 max-w-2xl mx-auto mb-12 text-lg">
            From routine check-ups to advanced treatment, we provide a full range of ophthalmic services for the whole family.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div key={service.title} className={`reveal reveal-delay-${Math.min(i + 1, 4)} group bg-primary-foreground/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-foreground/5 hover:-translate-y-1`}>
                <div className="overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/30 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-primary-foreground/70 mb-5 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium bg-primary-foreground/10 rounded-full px-3 py-1.5 border border-primary-foreground/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 section-glow relative bg-gradient-to-br from-accent/[0.06] via-primary/[0.04] to-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-10 right-0 w-56 h-56 rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute bottom-0 left-10 w-40 h-40 rounded-full bg-primary/6 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative">
          <p className="reveal text-sm font-semibold tracking-widest text-accent uppercase mb-3">Why Yorlad Eye Care</p>
          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Patients <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="reveal reveal-delay-2 text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            We've built every part of the experience around one goal: protecting and perfecting your vision.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {whyChooseUs.map((item, i) => (
              <div key={item.title} className={`reveal reveal-delay-${Math.min(i + 1, 4)} text-left glass-card rounded-2xl p-6 sm:p-8 hover-lift group`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-5 group-hover:from-primary/25 group-hover:to-accent/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/8 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary-foreground/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-foreground/[0.04]" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6 reveal">
            <div className="h-px w-10 bg-accent/60" />
            <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">Technology</p>
          </div>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Advanced Eye<br />
            <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">Technology</span>
          </h2>
          <p className="reveal reveal-delay-2 text-primary-foreground/50 text-base sm:text-lg max-w-xl mb-14 leading-relaxed font-light">
            Cutting-edge ophthalmic equipment for precise diagnosis, comfortable treatment, and better outcomes.
          </p>

          <div className="reveal reveal-delay-3 grid sm:grid-cols-3 gap-px bg-primary-foreground/[0.06] rounded-2xl overflow-hidden mb-10">
            {[
              { title: "Digital Retinal Imaging", desc: "High-resolution imaging for precise diagnosis", num: "01" },
              { title: "Automated Refraction", desc: "Fast, accurate vision prescriptions", num: "02" },
              { title: "Advanced Tonometry", desc: "Comfortable glaucoma screening", num: "03" },
            ].map((tech) => (
              <div key={tech.title} className="bg-primary p-6 sm:p-8 hover:bg-primary-foreground/[0.03] transition-all duration-500 group cursor-default">
                <span className="text-[10px] font-mono text-accent/60 tracking-widest mb-4 block">{tech.num}</span>
                <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center mb-5 group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-500">
                  <Eye className="h-4 w-4 text-accent/70 group-hover:text-accent transition-colors duration-500" />
                </div>
                <h4 className="font-semibold text-lg mb-2 tracking-tight">{tech.title}</h4>
                <p className="text-sm text-primary-foreground/40 leading-relaxed font-light">{tech.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal reveal-delay-4 rounded-2xl overflow-hidden ring-1 ring-primary-foreground/[0.08]">
            <img src={clinicExterior} alt="Yorlad Specialist Eye Clinic" className="w-full object-cover max-h-[28rem] hover:scale-105 transition-transform duration-1000 ease-out" />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/[0.06] via-muted to-accent/[0.04]">
        <div className="max-w-7xl mx-auto">
          <p className="reveal text-sm font-semibold tracking-widest text-accent uppercase mb-3">Inside Our Clinic</p>
          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl font-bold text-foreground mb-4">
            See Where the <span className="gradient-text">Magic Happens</span>
          </h2>
          <p className="reveal reveal-delay-2 text-muted-foreground text-lg max-w-2xl mb-10">
            Take a look inside our modern eye care facility and see the technology and care we bring to every patient.
          </p>

          {/* Masonry-style gallery */}
          <div className="reveal reveal-delay-3 columns-2 sm:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="break-inside-avoid group">
                <div className="img-shine rounded-2xl overflow-hidden shadow-glass">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 section-glow relative bg-gradient-to-br from-background via-accent/[0.04] to-primary/[0.06] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-48 h-48 rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute top-1/2 right-10 w-32 h-32 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative">
          <p className="reveal text-sm font-semibold tracking-widest text-accent uppercase mb-3">Patient Stories</p>
          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="reveal reveal-delay-2 text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            Don't just take our word for it — hear from patients who trust us with their vision.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`reveal reveal-delay-${Math.min(i + 1, 4)} text-left glass-card rounded-2xl p-6 sm:p-8 hover-lift`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent drop-shadow-sm" />
                    ))}
                  </div>
                  <span className="text-5xl text-primary/10 font-serif leading-none">"</span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="border-t border-border/50 pt-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.location}</div>
                  </div>
                  <span className="text-xs bg-primary/5 border border-primary/10 rounded-full px-3 py-1.5 font-medium text-primary">
                    {t.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HMO Partners */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/[0.08] via-accent/[0.06] to-primary/[0.08]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="reveal text-sm font-semibold tracking-widest text-accent uppercase mb-6">HMO Partners</p>
          <div className="reveal reveal-delay-1 flex flex-wrap justify-center gap-6 sm:gap-10">
            {["Leadway Health", "Reliance Health", "Clearline HMO", "Novo Health"].map((p) => (
              <span key={p} className="text-lg font-medium text-muted-foreground/80 hover:text-primary transition-colors duration-300 px-4 py-2 rounded-xl hover:bg-background/50">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 section-glow relative bg-gradient-to-br from-primary/[0.05] via-background to-accent/[0.06] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-20 left-0 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="reveal text-sm font-semibold tracking-widest text-accent uppercase mb-3">Get In Touch</p>
              <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Book Your <span className="gradient-text">Appointment</span>
              </h2>
              <p className="reveal reveal-delay-2 text-muted-foreground text-lg mb-8 leading-relaxed">
                Ready to take the first step towards clearer vision? Contact us to schedule your comprehensive eye examination today.
              </p>

              <div className="reveal reveal-delay-3 space-y-5">
                {[
                  { icon: MapPin, title: "Our Location", content: "Axiom Plaza, 279 Old Abeokuta Road, Tabon-Tabon, New Oko-Oba, Agege, Lagos (beside Conoil filling station)" },
                  { icon: Phone, title: "Phone", content: "phone" },
                  { icon: Clock, title: "Working Hours", content: "hours" },
                  { icon: Mail, title: "Website", content: "website" },
                ].map((item, i) => (
                  <div key={item.title} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center shrink-0 mt-0.5 group-hover:from-primary/25 group-hover:to-primary/10 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                      {item.content === "phone" ? (
                        <p className="text-muted-foreground">
                          <a href="tel:+2348059855065" className="hover:text-primary transition-colors">+234 805 985 5065</a>
                          {" · "}
                          <a href="tel:08022209583" className="hover:text-primary transition-colors">0802 220 9583</a>
                        </p>
                      ) : item.content === "hours" ? (
                        <>
                          <p className="text-muted-foreground">Mon–Fri: 8 AM – 6 PM</p>
                          <p className="text-muted-foreground">Sat: 9 AM – 5 PM</p>
                          <p className="text-muted-foreground">Sun: Closed</p>
                        </>
                      ) : item.content === "website" ? (
                        <a href="https://yorladeyecare.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          yorladeyecare.com
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-delay-2 glass-card rounded-2xl p-6 sm:p-8 shadow-elevated">
              <h3 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300" />
                  <input type="text" placeholder="Last Name" className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300" />
                <input type="tel" placeholder="Phone Number" className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300" />
                <select className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300">
                  <option value="">Select Service</option>
                  <option>Comprehensive Eye Exam</option>
                  <option>Glaucoma Screening</option>
                  <option>Vision Therapy</option>
                  <option>Contact Lens Fitting</option>
                  <option>Optical Services</option>
                  <option>Other</option>
                </select>
                <textarea placeholder="Your Message" rows={4} className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300 resize-none" />
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                  Book Appointment <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute top-0 right-1/3 w-48 h-48 rounded-full bg-primary-foreground/3 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid sm:grid-cols-3 gap-8 mb-12">
            <div>
              <img src={logo} alt="Yorlad Eye Care" className="h-12 w-auto mb-4 brightness-0 invert" />
              <p className="text-primary-foreground/60 text-sm leading-relaxed">
                Specialist eye care in Agege, Lagos. Your vision is our mission.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollTo(link.toLowerCase().replace(" ", "-"))}
                    className="block text-sm text-primary-foreground/60 hover:text-primary-foreground hover:translate-x-1 transition-all duration-300"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Contact Info</h4>
              <div className="space-y-2 text-sm text-primary-foreground/60">
                <p>Axiom Plaza, 279 Old Abeokuta Road</p>
                <p>Agege, Lagos, Nigeria</p>
                <p>+234 805 985 5065</p>
                <p>0802 220 9583</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} Yorlad Eye Care. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/2348059855065"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] rounded-full flex items-center justify-center shadow-lg shadow-[hsl(142,70%,40%)]/30 hover:shadow-xl hover:shadow-[hsl(142,70%,40%)]/40 transition-all duration-300 hover:scale-110 animate-pulse-glow"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
};

export default Index;
