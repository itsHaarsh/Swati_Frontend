import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, FlaskConical, Heart, Award } from 'lucide-react';

import img1 from '@/assets/about/WhatsApp Image 2026-01-18 at 7.27.28 PM (2).jpeg';
import img2 from '@/assets/about/WhatsApp Image 2026-01-18 at 7.27.29 PM (2).jpeg';
import img3 from '@/assets/about/WhatsApp Image 2026-01-18 at 7.27.37 PM (1).jpeg';
import heroImg from '@/assets/about/WhatsApp Image 2026-01-18 at 7.27.34 PM (1).jpeg';
import img4 from '@/assets/about/WhatsApp Image 2026-01-18 at 7.27.37 PM.jpeg';

const values = [
  { icon: Leaf, title: 'Pure Ingredients', desc: 'Every formula starts with nature — no harmful chemicals, no shortcuts.' },
  { icon: FlaskConical, title: 'Science-Backed', desc: 'Crafted by a B.Pharm. expert with a degree in Natural Cosmetics.' },
  { icon: Heart, title: 'Made with Love', desc: 'Born from passion, every product carries the care of its creator.' },
  { icon: Award, title: 'Proven Results', desc: 'Years of outstanding customer feedback drive our continuous growth.' },
];

const gallery = [
  { img: img1, label: 'Herbal Formulations' },
  { img: img2, label: 'Natural Ingredients' },
  { img: img3, label: 'Crafted with Care' },
  { img: img4, label: 'Pure & Effective' },
];

export const About = () => {
  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <section className="relative h-[55vh] sm:h-[70vh] flex items-end overflow-hidden bg-stone-900">
        <img
          src={heroImg}
          alt="Herbal cosmetics hero"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 sm:pb-24">
          <p className="text-xs tracking-[0.3em] text-stone-300 mb-3 uppercase">Our Story</p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl text-white tracking-tight max-w-2xl leading-tight">
            Where Nature Meets<br />Science
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-14 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] text-stone-400 mb-4 uppercase">The Beginning</p>
            <h2 className="text-3xl sm:text-4xl tracking-tight mb-8">
              The Beginning of<br />'Swati Herbal Cosmetics'
            </h2>
            <div className="space-y-5 text-stone-600 leading-relaxed">
              <p>
                'Swati Herbal Cosmetics' was born not just out of a business idea, but from a deep-rooted passion and extensive knowledge of natural medicinal plants. Our founder, <span className="text-stone-900 font-medium">Swati Durugkar</span>, holds a Bachelor of Pharmacy (B.Pharm.) degree and a special degree in Natural Cosmetics. With eight years of experience in the IT industry, she leveraged her diverse background to focus on creating pure and effective products.
              </p>
              <p>
                This journey officially began in <span className="text-stone-900 font-medium">2019</span>. At that time, Swati handled every aspect of the business on her own — from product formulation to sales. The outstanding feedback from customers gave her immense encouragement, and since then, we have been consistently growing.
              </p>
              <p>
                Today, what started as a one-person venture has evolved into a strong brand with a large and dedicated team working alongside Swati. We remain committed to our core values and are dedicated to bringing the goodness of nature to the world.
              </p>
            </div>
            <div className="mt-10">
              <Link to="/shop">
                <Button className="bg-stone-900 hover:bg-stone-800 text-white px-10 py-6 text-xs tracking-widest transition-colors duration-300">
                  EXPLORE PRODUCTS
                </Button>
              </Link>
            </div>
          </div>

          {/* Stacked image collage */}
          <div className="relative h-[320px] sm:h-[420px] lg:h-[520px] mt-4 lg:mt-0">
            <div className="absolute top-0 left-0 w-[58%] h-[65%] overflow-hidden shadow-xl">
              <img src={img1} alt="Swati products" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-[55%] h-[60%] overflow-hidden shadow-xl">
              <img src={img2} alt="Swati founder" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-6 left-3 sm:bottom-8 sm:left-4 bg-white px-4 py-3 sm:px-5 sm:py-4 shadow-lg border border-stone-100">
              <p className="text-xl sm:text-2xl font-light tracking-tight">2019</p>
              <p className="text-xs tracking-widest text-stone-500 mt-1">FOUNDED</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-20 md:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-stone-400 mb-3 uppercase">What We Stand For</p>
            <h2 className="text-3xl sm:text-4xl tracking-tight">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-8 border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 flex items-center justify-center bg-stone-100 group-hover:bg-stone-900 transition-colors duration-300 mb-6">
                  <Icon className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-base tracking-wider mb-3">{title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-14 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-xs tracking-[0.3em] text-stone-400 mb-3 uppercase">Behind the Brand</p>
            <h2 className="text-3xl sm:text-4xl tracking-tight">A Glimpse Into Our World</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {gallery.map(({ img, label }, i) => (
              <div
                key={label}
                className={`relative overflow-hidden group cursor-pointer ${i === 0 ? 'col-span-2 lg:col-span-2' : ''}`}
                style={{ aspectRatio: '1/1' }}
              >
                <img
                  src={img}
                  alt={label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-xs tracking-widest uppercase">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="py-14 sm:py-20 md:py-28 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight leading-relaxed mb-8">
            "We remain committed to our core values and are dedicated to bringing the goodness of nature to the world."
          </p>
          <div className="w-12 h-px bg-stone-500 mx-auto mb-6" />
          <p className="text-xs tracking-[0.3em] text-stone-400 uppercase">Swati Durugkar — Founder</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 md:py-20 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '2019', label: 'Year Founded' },
              { num: '8+', label: 'Years of Expertise' },
              { num: '100%', label: 'Natural Ingredients' },
              { num: '∞', label: 'Happy Customers' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-4xl sm:text-5xl font-light tracking-tight mb-2">{num}</p>
                <p className="text-xs tracking-widest text-stone-500 uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 md:py-28 bg-stone-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-6">Experience the Difference</h2>
          <p className="text-stone-600 mb-10 tracking-wide">
            Discover products crafted with purpose — pure, effective, and made with love.
          </p>
          <Link to="/shop">
            <Button className="bg-stone-900 hover:bg-stone-800 text-white px-12 py-6 text-xs tracking-widest transition-colors duration-300">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};
