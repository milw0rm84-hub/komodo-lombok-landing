import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';
import Lenis from '@studio-freight/lenis';

// Swiper Components & Styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'itinerary', label: 'The Journey' },
  { id: 'experience', label: 'Experience' },
  { id: 'journal', label: 'Visual Journal' },
];

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/lombokperfect', icon: 'IG' },
  { name: 'TikTok', url: 'https://tiktok.com/@lombokperfect', icon: 'TK' },
  { name: 'Facebook', url: 'https://facebook.com/lombokperfect', icon: 'FB' }
];

const journalEntries = [
  { title: "Maritime Atelier", desc: "Bespoke nautical experiences in the Komodo archipelago.", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000" },
  { title: "Silent Luxury", desc: "Defining travel through privacy and unparalleled attention to detail.", img: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=80&w=1000" },
  { title: "The Voyager Gold", desc: "Traditional Indonesian craftsmanship merging with modern engineering.", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000" }
];

function App() {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  
  const preloaderRef = useRef();
  const mainRef = useRef();
  const menuRef = useRef();
  const scrollUpRef = useRef();
  
  const waNumber = "+628123456789";
  const emailAddress = "hello@lombokperfect.com";
  const waLink = `https://wa.me/${waNumber.replace('+', '')}?text=` + encodeURIComponent("Hello Lombok Perfect, I am interested in a private expedition.");

  // --- SCROLL UP VISIBILITY ---
  useEffect(() => {
    const handleScroll = () => {
      // Button appears after 800px of scrolling
      setShowScrollUp(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- PRELOADER & HERO ENTRANCE ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          const tl = gsap.timeline({ onComplete: () => setLoading(false) });
          tl.to(".preloader-content", { opacity: 0, y: -20, duration: 0.8, ease: "power2.inOut" })
            .to(preloaderRef.current, { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "-=0.4")
            .fromTo(".hero-reveal", 
              { opacity: 0, y: 50 }, 
              { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power4.out" }, 
              "-=0.6"
            );
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(timer);
  }, []);

  // --- MOBILE MENU ---
  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.8, ease: "expo.out" });
      gsap.fromTo(".menu-link", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power4.out", delay: 0.3 });
    } else {
      gsap.to(menuRef.current, { x: "100%", duration: 0.6, ease: "expo.in" });
    }
  }, [menuOpen]);

  // Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Scroll Reveal
  useLayoutEffect(() => {
    if (!loading) {
      let ctx = gsap.context(() => {
        gsap.utils.toArray(".reveal").forEach((el) => {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 90%" },
            opacity: 0, y: 40, duration: 1.2, ease: "power3.out"
          });
        });
      }, mainRef);
      return () => ctx.revert();
    }
  }, [loading]);

  return (
    <div ref={mainRef} className="bg-[#042D20] text-white selection:bg-[#C19B6E] selection:text-[#042D20] overflow-x-hidden min-h-screen">
      <Helmet>
        <title>Komodo Lombok Trip | Luxury Private Charters | Lombok Perfect</title>
      </Helmet>

      {/* --- PRELOADER --- */}
      <div ref={preloaderRef} className="fixed inset-0 z-[200] bg-[#021811] flex flex-col items-center justify-center overflow-hidden">
        <div className="preloader-content flex flex-col items-center">
          <div className="mb-4 text-center">
             <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-none">Lombok <span className="text-[#C19B6E]">Perfect</span></h2>
             <span className="text-[8px] tracking-[1em] uppercase opacity-40 block mt-2 ml-2">Expeditions</span>
          </div>
          <div className="w-48 h-[1px] bg-white/5 relative mb-4"><div className="absolute top-0 left-0 h-full bg-[#C19B6E]" style={{ width: `${counter}%` }}></div></div>
          <div className="flex items-baseline gap-1"><span className="text-white/20 text-4xl font-serif italic leading-none">{counter}</span><span className="text-[#C19B6E]/20 text-sm font-serif italic">%</span></div>
        </div>
      </div>

      {/* --- BACK TO TOP BUTTON (RIGHT POSITIONED) --- */}
      <button 
        ref={scrollUpRef}
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[160] w-12 h-12 rounded-full border border-[#C19B6E]/30 bg-[#021811]/90 backdrop-blur-md flex items-center justify-center text-[#C19B6E] transition-all duration-700 hover:bg-[#C19B6E] hover:text-[#042D20] group shadow-2xl ${showScrollUp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold group-hover:-translate-y-1 transition-transform duration-300">↑</span>
          <span className="text-[5px] uppercase tracking-widest mt-0.5 opacity-50 group-hover:opacity-100">Top</span>
        </div>
      </button>

      {/* --- MOBILE MENU --- */}
      <div ref={menuRef} className="fixed inset-0 z-[180] bg-[#021811] translate-x-full flex flex-col items-center justify-center px-6 text-center">
        <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 text-[#C19B6E] text-[10px] tracking-[0.5em] uppercase font-bold">Close —</button>
        <div className="flex flex-col gap-6">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)} className="menu-link text-5xl font-serif italic text-white hover:text-[#C19B6E] transition-colors leading-none">{item.label}</a>
          ))}
          <div className="menu-link pt-8 flex flex-col items-center gap-4 text-[9px] tracking-[0.4em] uppercase text-[#C19B6E] font-bold">
            <div className="w-12 h-[1px] bg-[#C19B6E]/30"></div>
            <p>{waNumber}</p>
            <p>{emailAddress}</p>
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <nav className="fixed top-0 w-full z-[150] py-5 md:py-6 px-5 md:px-24 flex justify-between items-center bg-[#042D20]/10 backdrop-blur-md border-b border-white/5">
        <div className="flex flex-col leading-none group cursor-pointer" onClick={() => window.location.href = 'https://lombokperfect.com'}>
          <span className="text-[6px] md:text-[7px] tracking-[0.8em] uppercase opacity-40">Main Website</span>
          <span className="text-[#C19B6E] text-lg md:text-2xl font-serif italic tracking-tighter">Lombok Perfect</span>
        </div>
        <button onClick={() => setMenuOpen(true)} className="md:hidden text-[#C19B6E] text-[8px] tracking-[0.5em] uppercase font-bold px-4 py-2 border border-[#C19B6E]/20 rounded-full">Menu +</button>
        <div className="hidden md:flex gap-12 items-center">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="relative text-[9px] tracking-[0.5em] uppercase font-bold text-white/70 hover:text-[#C19B6E] italic transition-all">{item.label}</a>
          ))}
        </div>
        <a href={waLink} target="_blank" rel="noreferrer" className="hidden sm:block bg-[#C19B6E]/10 hover:bg-[#C19B6E] text-[#C19B6E] hover:text-[#042D20] border border-[#C19B6E]/20 px-8 py-3 text-[9px] tracking-[0.4em] uppercase font-bold transition-all rounded-full">Book Now</a>
      </nav>

      {/* --- HERO --- */}
      <header className="relative h-[100vh] flex items-center px-6 md:px-24 overflow-hidden border-b border-[#C19B6E]/10">
        <div className="absolute inset-0 bg-cover bg-center grayscale-[15%] opacity-40" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2400')` }} />
        <h1 className="relative z-10 font-serif italic leading-[0.9] md:leading-[0.85]">
          <span className="hero-reveal block text-white text-5xl sm:text-7xl md:text-[9rem] opacity-0">Komodo</span>
          <span className="hero-reveal block text-[#C19B6E] text-4xl sm:text-6xl md:text-[11rem] ml-6 md:ml-12 -mt-2 md:-mt-4 opacity-0">Lombok Trip</span>
        </h1>
      </header>

      {/* --- JOURNEY --- */}
      <section id="itinerary" className="py-20 md:py-48 bg-[#042D20] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="md:col-span-5 reveal order-2 md:order-1">
              <span className="text-[#C19B6E] text-[9px] md:text-[10px] tracking-[0.8em] uppercase block mb-6 font-bold">The Journey</span>
              <h2 className="text-4xl md:text-8xl font-serif italic text-white leading-[0.9] mb-8 md:mb-12">Lombok <br className="hidden md:block" /> <span className="text-[#C19B6E] ml-4 md:ml-12">to Komodo</span></h2>
              <p className="text-gray-400 font-light italic text-base md:text-lg leading-relaxed max-w-sm">A four-day passage through the heart of the Indonesian archipelago. From the towering silhouette of Mt. Rinjani to the prehistoric shores of Rinca.</p>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-8 order-1 md:order-2">
              <div className="reveal aspect-[3/4] overflow-hidden rounded-sm border border-white/5 mt-8 md:mt-12"><img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format" className="w-full h-full object-cover grayscale-[20%]" alt="Lombok" /></div>
              <div className="reveal aspect-[3/4] overflow-hidden rounded-sm border border-white/5"><img src="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format" className="w-full h-full object-cover grayscale-[20%]" alt="Komodo" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE --- */}
      <section id="experience" className="py-24 md:py-56 bg-[#032218] border-y border-[#C19B6E]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center mb-24 md:mb-40">
            <div className="md:col-span-7 reveal rounded-sm overflow-hidden border border-white/5 aspect-[4/3] order-2 md:order-1">
              <img src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format" className="w-full h-full object-cover grayscale-[20%] scale-105" alt="Luxury Interior" />
            </div>
            <div className="md:col-span-5 reveal order-1 md:order-2">
              <span className="text-[#C19B6E] text-[9px] md:text-[10px] tracking-[0.6em] uppercase block mb-4">Philosophy</span>
              <h2 className="text-4xl md:text-7xl font-serif italic text-white mb-8 leading-[0.95]">Silent Luxury</h2>
              <p className="text-gray-400 font-light italic text-base md:text-lg leading-relaxed mb-6">Privacy is the ultimate amenity. Far from the reach of the crowds, we offer the pinnacle of island exploration where time slows down.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="reveal">
              <h3 className="text-[#C19B6E] text-2xl font-serif italic mb-6">The Craft</h3>
              <p className="text-gray-400 text-sm font-light italic leading-relaxed">Built by master shipwrights using ancient Phinisi techniques, our vessels combine raw teak elegance with modern engineering.</p>
            </div>
            <div className="reveal transition-all delay-100">
              <h3 className="text-[#C19B6E] text-2xl font-serif italic mb-6">Bespoke Dining</h3>
              <p className="text-gray-400 text-sm font-light italic leading-relaxed">Every meal is an event. Fresh ingredients from local coastal villages served wherever the view is most breathtaking.</p>
            </div>
            <div className="reveal transition-all delay-200">
              <h3 className="text-[#C19B6E] text-2xl font-serif italic mb-6">Wild Immersion</h3>
              <p className="text-gray-400 text-sm font-light italic leading-relaxed">Guided by the tides and the wind, allowing for spontaneous encounters with whale sharks and manta rays.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- JOURNAL --- */}
      <section id="journal" className="py-20 md:py-40">
        <div className="px-6 md:px-24 mb-12 reveal flex justify-between items-end">
          <h2 className="text-3xl md:text-6xl font-serif italic text-white">Visual Journal</h2>
          <span className="text-[#C19B6E] text-[8px] md:text-[9px] tracking-[0.5em] uppercase pb-2">Swipe</span>
        </div>
        <Swiper modules={[Navigation, Pagination, Mousewheel, FreeMode]} spaceBetween={20} slidesPerView={1.2} freeMode={true} pagination={{ clickable: true }} breakpoints={{ 768: { slidesPerView: 2.5 } }} className="premium-swiper !px-6 md:!px-24 !pb-20">
          {journalEntries.map((entry, i) => (
            <SwiperSlide key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-sm border border-[#C19B6E]/10 mb-6"><img src={entry.img} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000" alt={entry.title} /></div>
              <h3 className="text-[#C19B6E] text-xl md:text-2xl font-serif italic">{entry.title}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#021811] pt-24 md:pt-32 pb-12 px-6 md:px-24 border-t border-[#C19B6E]/10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 relative z-10 text-center md:text-left">
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-serif italic text-white mb-2">Lombok <span className="text-[#C19B6E]">Perfect</span></h2>
            <a href="https://lombokperfect.com" className="text-[8px] md:text-[9px] tracking-[0.5em] uppercase text-[#C19B6E]/50 block mb-6 italic underline underline-offset-4">LombokPerfect.com</a>
            <div className="space-y-2 text-[9px] tracking-[0.3em] uppercase text-[#C19B6E] font-bold mb-8">
              <p>Jl. Raya Senggigi No.88</p>
              <p>Mataram, NTB 83355</p>
              <p className="mt-4 pt-2 border-t border-white/5">{waNumber}</p>
              <p>{emailAddress}</p>
            </div>
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-[9px] font-bold text-[#C19B6E] hover:bg-[#C19B6E] hover:text-[#042D20] transition-all">{social.icon}</a>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 h-[250px] md:h-[350px] rounded-sm overflow-hidden grayscale border border-white/5">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.56475752252!2d116.0354145!3d-8.5028495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdbf9333333333%3A0x1234567890abcdef!2sSenggigi!5e0!3m2!1sen!2sid!4v17000000000000" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white/5 p-6 md:p-8 border border-white/10 rounded-sm">
              <h4 className="text-[#C19B6E] text-[9px] tracking-[0.5em] uppercase font-bold mb-4 italic">Concierge</h4>
              <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                <span className="text-lg md:text-xl font-serif italic text-white">Start Chat</span>
                <span className="w-8 h-8 md:w-10 md:h-10 bg-[#C19B6E] rounded-full flex items-center justify-center text-[#042D20] group-hover:scale-110 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 md:mt-24 pt-12 border-t border-white/5 text-center text-[8px] tracking-[0.5em] uppercase text-white/20">© 2026 Lombok Perfect Expeditions</div>
      </footer>
    </div>
  );
}

export default App;