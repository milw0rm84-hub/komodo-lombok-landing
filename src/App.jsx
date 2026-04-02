
import navVideo from '../src/assets/video/nav-desktop.mp4';
import navVideoMobile from '../src/assets/video/nav-mobile.mp4';




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
  { name: 'Facebook', url: 'https://facebook.com/lombok.perfect.2025/', icon: 'FB' }
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
  
  const waNumber = "+6281999228777";
  const waLink = `https://wa.me/${waNumber.replace('+', '')}?text=` + encodeURIComponent("Hello Lombok Perfect, I am interested in a private expedition.");

  useEffect(() => {
    const handleScroll = () => { setShowScrollUp(window.scrollY > 800); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          const tl = gsap.timeline({ onComplete: () => setLoading(false) });
          tl.to(".preloader-content", { opacity: 0, y: -20, duration: 0.8, ease: "power2.inOut" })
            .to(preloaderRef.current, { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "-=0.4")
            .fromTo(".hero-reveal", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power4.out" }, "-=0.6");
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.8, ease: "expo.out" });
    } else {
      gsap.to(menuRef.current, { x: "100%", duration: 0.6, ease: "expo.in" });
    }
  }, [menuOpen]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

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
<title>Komodo Lombok Trip | Luxury Sailing & Cultural Tours</title>

  
  {/* Open Graph untuk Sosial Media */}

  
  {/* Canonical Link (Penting agar tidak dianggap duplikat dari situs utama) */}
  <link rel="canonical" href="https://komodolomboktrip.com" />
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
	  {/* --- MOBILE MENU OVERLAY --- */}
<div 
  ref={menuRef} 
  className="fixed inset-0 z-[180] bg-[#021811] translate-x-full md:hidden flex flex-col p-10"
>
  <div className="flex justify-between items-center mb-20">
    <span className="text-[#C19B6E] font-serif italic text-2xl">Lombok Perfect</span>
    <button 
      onClick={() => setMenuOpen(false)} 
      className="text-[#C19B6E] text-[10px] tracking-widest uppercase border border-[#C19B6E]/20 px-4 py-2 rounded-full"
    >
      Close —
    </button>
  </div>

  <div className="flex flex-col gap-8">
    {navItems.map((item) => (
      <a 
        key={item.id} 
        href={`#${item.id}`} 
        onClick={() => setMenuOpen(false)}
        className="text-4xl font-serif italic text-white hover:text-[#C19B6E] transition-colors"
      >
        {item.label}
      </a>
    ))}
  </div>

  <div className="mt-auto pt-10 border-t border-white/5">
    <a 
      href={waLink} 
      className="block text-center bg-[#C19B6E] text-[#042D20] py-4 text-[10px] tracking-[0.4em] uppercase font-bold rounded-full"
    >
      Book Now
    </a>
  </div>
</div>

      {/* --- BACK TO TOP --- */}
      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 z-[160] w-12 h-12 rounded-full border border-[#C19B6E]/30 bg-[#021811]/90 backdrop-blur-md flex items-center justify-center text-[#C19B6E] transition-all duration-700 hover:bg-[#C19B6E] hover:text-[#042D20] group shadow-2xl ${showScrollUp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <span className="text-[10px] font-bold">↑</span>
      </button>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[150] py-5 md:py-6 px-5 md:px-24 flex justify-between items-center bg-[#042D20]/10 backdrop-blur-md border-b border-white/5">
        <div className="flex flex-col leading-none group cursor-pointer" onClick={() => window.location.href = 'https://lombokperfect.com'}>
          <span className="text-[6px] md:text-[7px] tracking-[0.8em] uppercase opacity-40">Main Website</span>
          <span className="text-[#C19B6E] text-lg md:text-2xl font-serif italic tracking-tighter">Lombok Perfect</span>
        </div>
        <button onClick={() => setMenuOpen(true)} className="md:hidden text-[#C19B6E] text-[8px] tracking-[0.5em] uppercase font-bold px-4 py-2 border border-[#C19B6E]/20 rounded-full">Menu +</button>
        <div className="hidden md:flex gap-12 items-center">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-[9px] tracking-[0.5em] uppercase font-bold text-white/70 hover:text-[#C19B6E] transition-all">{item.label}</a>
          ))}
          <a href={waLink} target="_blank" rel="noreferrer" className="bg-[#C19B6E]/10 hover:bg-[#C19B6E] text-[#C19B6E] hover:text-[#042D20] border border-[#C19B6E]/20 px-8 py-3 text-[9px] tracking-[0.4em] uppercase font-bold transition-all rounded-full">Book Now</a>
        </div>
      </nav>

      {/* --- HERO WITH VIDEO --- */}
<header className="relative h-[100vh] flex items-center px-6 md:px-24 overflow-hidden border-b border-[#C19B6E]/10">
  <div className="absolute inset-0 z-0">
    
    {/* Video Desktop - Hidden on mobile (below 768px) */}
    <video 
      autoPlay 
      muted 
      loop 
      playsInline 
      className="hidden md:block w-full h-full object-cover opacity-100"
    >
      <source src={navVideo} type="video/mp4" />
    </video>

    {/* Video Mobile - Visible only on mobile, hidden on md screens and up */}
    <video 
      autoPlay 
      muted 
      loop 
      playsInline 
      className="block md:hidden w-full h-full object-cover opacity-100"
    >
      {/* Use the mobile-specific variable here */}
      <source src={navVideoMobile} type="video/mp4" />
    </video>
    
  </div>
</header>
 

      {/* --- FEATURED EXPEDITIONS --- */}
      <section className="py-24 bg-[#042D20] text-white overflow-hidden border-b border-[#C19B6E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="mb-16 reveal">
            <span className="text-[#C19B6E] text-[9px] md:text-[10px] tracking-[0.8em] uppercase block mb-4 font-bold">Curated Trips</span>
            <h2 className="font-serif italic text-white text-4xl md:text-7xl leading-[0.9]">Featured <br /> <span className="text-[#C19B6E] ml-12">Expeditions</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Package 1 */}
            <div className="reveal group bg-[#021811] border border-white/5 rounded-sm overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-1000" alt="Komodo" />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-serif italic text-2xl text-[#C19B6E] uppercase mb-3">Ultimate Komodo Experience</h3>
                <p className="text-gray-400 text-sm mb-8 italic leading-relaxed">Discover the hidden lagoons and ancient dragons in absolute privacy.</p>
                <a href="https://lombokperfect.com/tours.php" className="inline-block border border-[#C19B6E]/30 text-[#C19B6E] px-8 py-3 text-[9px] uppercase tracking-widest font-bold hover:bg-[#C19B6E] hover:text-[#042D20] rounded-full transition-all duration-500">View on Lombok Perfect</a>
              </div>
            </div>

            {/* Package 2 */}
            <div className="reveal group bg-[#021811] border border-white/5 rounded-sm overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-1000" alt="Whale Shark" />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-serif italic text-2xl text-[#C19B6E] uppercase mb-3">Whale Shark Expedition</h3>
                <p className="text-gray-400 text-sm mb-8 italic leading-relaxed">A rare encounter with the giants of Sumbawa. Bespoke itineraries for elite travelers.</p>
                <a href="https://whalesharktour.com" className="inline-block border border-[#C19B6E]/30 text-[#C19B6E] px-8 py-3 text-[9px] uppercase tracking-widest font-bold hover:bg-[#C19B6E] hover:text-[#042D20] rounded-full transition-all duration-500">View on Whale Shark Tour</a>
              </div>
            </div>

            {/* Package 3 */}
            <div className="reveal group bg-[#021811] border border-white/5 rounded-sm overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=800" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-1000" alt="Yacht Charter" />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-serif italic text-2xl text-[#C19B6E] uppercase mb-3">Bespoke Maritime Atelier</h3>
                <p className="text-gray-400 text-sm mb-8 italic leading-relaxed">The ultimate freedom of a private yacht charter, curated exclusively for your inner circle.</p>
                <a href="https://lombokperfect.com/tours.php" className="inline-block border border-[#C19B6E]/30 text-[#C19B6E] px-8 py-3 text-[9px] uppercase tracking-widest font-bold hover:bg-[#C19B6E] hover:text-[#042D20] rounded-full transition-all duration-500">Explore Options</a>
              </div>
            </div>

            {/* Package 4 */}
            <div className="reveal group bg-[#021811] border border-white/5 rounded-sm overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-1000" alt="Oceanic Romance" />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-serif italic text-2xl text-[#C19B6E] uppercase mb-3">Oceanic Romance</h3>
                <p className="text-gray-400 text-sm mb-8 italic leading-relaxed">Celebrate love on the silent seas. Secluded sandbar dinners and absolute privacy.</p>
                <a href="https://lombokperfect.com/tours.php" className="inline-block border border-[#C19B6E]/30 text-[#C19B6E] px-8 py-3 text-[9px] uppercase tracking-widest font-bold hover:bg-[#C19B6E] hover:text-[#042D20] rounded-full transition-all duration-500">View Romance Details</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE JOURNEY (ITINERARY) --- */}
      <section id="itinerary" className="py-20 md:py-48 bg-[#042D20]">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="md:col-span-5 reveal">
              <span className="text-[#C19B6E] text-[9px] tracking-[0.8em] uppercase block mb-6 font-bold">The Journey</span>
              <h2 className="text-4xl md:text-8xl font-serif italic text-white leading-[0.9] mb-8">Lombok <br /> <span className="text-[#C19B6E] ml-4 md:ml-12">to Komodo</span></h2>
              <p className="text-gray-400 font-light italic text-base md:text-lg leading-relaxed max-w-sm mb-10">
                A four-day passage through the heart of the Indonesian archipelago. From the towering silhouette of Mt. Rinjani to the prehistoric shores of Rinca.
              </p>
              
              <div className="reveal">
                <a href="https://lombokperfect.com/tour-detail.php?id=18" className="inline-flex items-center gap-4 group">
                  <span className="text-[#C19B6E] text-[10px] tracking-[0.5em] uppercase font-bold border-b border-[#C19B6E]/30 pb-1 group-hover:border-[#C19B6E] transition-all duration-500">Full Itinerary Details</span>
                  <span className="text-[#C19B6E] text-lg transition-transform group-hover:translate-x-2 duration-500">→</span>
                </a>
              </div>
            </div>
            
            <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-8 mt-12 md:mt-0">
              <div className="reveal aspect-[3/4] overflow-hidden rounded-sm border border-white/5 md:mt-24">
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format" className="w-full h-full object-cover" alt="Lombok" />
              </div>
              <div className="reveal aspect-[3/4] overflow-hidden rounded-sm border border-white/5">
                <img src="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format" className="w-full h-full object-cover" alt="Komodo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 md:py-56 bg-[#032218] border-y border-[#C19B6E]/10">
  <div className="max-w-7xl mx-auto px-6 md:px-24">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-24">
      <div className="md:col-span-7 reveal aspect-[4/3] rounded-sm overflow-hidden border border-white/5">
        <img src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format" 
             className="w-full h-full object-cover grayscale-[20%]" 
             alt="Luxury cabin interior of Lombok Perfect private boat charter" />
      </div>
      <div className="md:col-span-5 reveal">
        <span className="text-[#C19B6E] text-[9px] tracking-[0.6em] uppercase block mb-4 font-bold">Philosophy</span>
        <h2 className="text-4xl md:text-7xl font-serif italic text-white mb-8 leading-[0.95]">Silent Luxury</h2>
        <p className="text-gray-400 italic text-base leading-relaxed mb-10">
          Privacy is the ultimate amenity. Far from the reach of the crowds, we define high-end travel through silence and unparalleled attention to detail.
        </p>
        <div className="reveal">
          <a href="https://lombokperfect.com/about.php" 
             className="inline-block border border-[#C19B6E]/30 text-[#C19B6E] px-8 py-3 text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-[#C19B6E] hover:text-[#042D20] transition-all duration-500 rounded-full">
             Learn About Our Standards
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* --- JOURNAL --- */}
      <section id="journal" className="py-20 md:py-40">
        <div className="px-6 md:px-24 mb-12 flex justify-between items-end">
          <h2 className="text-3xl md:text-6xl font-serif italic text-white">Visual Journal</h2>
          <span className="text-[#C19B6E] text-[8px] tracking-[0.5em] uppercase pb-2">Swipe to Explore</span>
        </div>
        <Swiper modules={[Navigation, Pagination, Mousewheel, FreeMode]} spaceBetween={20} slidesPerView={1.2} freeMode={true} breakpoints={{ 768: { slidesPerView: 2.5 } }} className="premium-swiper !px-6 md:!px-24">
          {journalEntries.map((entry, i) => (
            <SwiperSlide key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-sm border border-[#C19B6E]/10 mb-6">
                <img src={entry.img} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={entry.title} />
              </div>
              <h3 className="text-[#C19B6E] text-xl md:text-2xl font-serif italic">{entry.title}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#021811] pt-24 pb-12 px-6 md:px-24 border-t border-[#C19B6E]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-center md:text-left">
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-serif italic text-white mb-2">Lombok <span className="text-[#C19B6E]">Perfect</span></h2>
            <a href="https://lombokperfect.com" className="text-[8px] tracking-[0.5em] uppercase text-[#C19B6E]/50 mb-6 italic underline">LombokPerfect.com</a>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[9px] font-bold text-[#C19B6E] hover:bg-[#C19B6E] hover:text-[#042D20] transition-all duration-500">{social.icon}</a>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 h-[250px] rounded-sm overflow-hidden border border-white/5">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126246.54580257322!2d116.0351276!3d-8.5583563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdbf5c59639739%3A0x633d317f22758151!2sLombok!5e0!3m2!1sen!2sid!4v1678900000000!5m2!1sen!2sid" width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Location Map"></iframe>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white/5 p-8 border border-white/10 rounded-sm">
              <h4 className="text-[#C19B6E] text-[9px] uppercase font-bold mb-4 italic">Concierge</h4>
              <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                <span className="text-xl font-serif italic text-white">Start Chat</span>
                <span className="w-8 h-8 bg-[#C19B6E] rounded-full flex items-center justify-center text-[#042D20] group-hover:scale-110 transition-transform duration-500">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-24 pt-12 border-t border-white/5 text-center text-[8px] tracking-[0.5em] uppercase text-white/20">
          © 2026 Lombok Perfect Expeditions
        </div>
      </footer>
    </div>
  );
}

export default App;