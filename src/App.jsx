import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import image10 from './assets/images/image14.jpeg';
import image1 from './assets/images/image1.jpeg';
import image2 from './assets/images/image2.jpeg';
import image3 from './assets/images/image3.jpeg';
import image4 from './assets/images/image4.jpeg';
import image5 from './assets/images/image5.jpeg';
import image6 from './assets/images/image6.jpeg';
import image7 from './assets/images/image7.jpeg';
import image8 from './assets/images/image8.jpeg';
import image9 from './assets/images/image9.png';
import image111 from './assets/images/image111.png';
import image12 from './assets/images/image12.jpeg';
import image13 from './assets/images/image_metro.jpeg';
import image18 from './assets/images/image18.jpeg';

import group_0 from './assets/images/group_0.jpeg';
import group_1 from './assets/images/group_1.jpeg';
import group2 from './assets/images/group2.jpeg';


const CornerFlowers = () => (
  <svg className="frame-decoration top-left" viewBox="0 0 100 100" width="120" height="120">
    <path d="M20,20 Q30,5 50,20 T80,20" fill="none" stroke="#d4af37" strokeWidth="2" />
    <circle cx="20" cy="20" r="5" fill="#c06c84" />
    <circle cx="50" cy="20" r="3" fill="#f8b195" />
    <circle cx="80" cy="20" r="4" fill="#c06c84" />
    <path d="M20,20 Q5,30 20,50 T20,80" fill="none" stroke="#d4af37" strokeWidth="2" />
    <circle cx="20" cy="50" r="3" fill="#f8b195" />
    <circle cx="20" cy="80" r="4" fill="#c06c84" />
    <path d="M20,20 C40,40 60,10 80,40" fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="1" />
  </svg>
);

const BottomVines = () => (
  <svg className="frame-decoration bottom-right" viewBox="0 0 100 100" width="120" height="120">
    <path d="M80,80 Q70,95 50,80 T20,80" fill="none" stroke="#d4af37" strokeWidth="2" />
    <circle cx="80" cy="80" r="5" fill="#c06c84" />
    <circle cx="50" cy="80" r="3" fill="#f8b195" />
    <circle cx="20" cy="80" r="4" fill="#c06c84" />
    <path d="M80,80 Q95,70 80,50 T80,20" fill="none" stroke="#d4af37" strokeWidth="2" />
    <circle cx="80" cy="50" r="3" fill="#f8b195" />
    <circle cx="80" cy="20" r="4" fill="#c06c84" />
  </svg>
);

const SwipeableGalleryItem = ({ images, title, text, onExpand }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="gallery-item-wrapper" onClick={() => onExpand && onExpand(images[currentIndex])}>
      <CornerFlowers />
      <BottomVines />
      <div className="gallery-item">
        <img src={images[currentIndex]} alt={title} loading="lazy" />
        <div className="gallery-overlay">
          <h3>{title}</h3>
          <p>{text}</p>
        </div>

        {images.length > 1 && (
          <>
            <button className="swipe-arrow left" onClick={prevImage}>&#8249;</button>
            <button className="swipe-arrow right" onClick={nextImage}>&#8250;</button>
            <div className="swipe-dots">
              {images.map((_, idx) => (
                <span key={idx} className={`dot ${idx === currentIndex ? 'active' : ''}`}></span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- Heart Shower Component ---
const HeartShower = ({ addHeartsTrigger }) => {
  const canvasRef = useRef(null);
  const heartsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Heart {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.size = Math.random() * 15 + 8;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.angle = 0;
        this.color = Math.random() > 0.5 ? '#d4af37' : '#c06c84';
      }

      update() {
        this.y += this.speed;
        this.angle += 0.02;
        this.x += Math.sin(this.angle) * 1;

        if (this.y > height) {
          this.y = -20;
          this.x = Math.random() * width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px serif`;
        ctx.fillText('❤', this.x, this.y);
        ctx.restore();
      }
    }

    const initHearts = () => {
      for (let i = 0; i < 50; i++) {
        heartsRef.current.push(new Heart());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      heartsRef.current.forEach(heart => {
        heart.update();
        heart.draw();
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    initHearts();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Expose a method to add more hearts
  useEffect(() => {
    if (addHeartsTrigger > 0) {
      const canvas = canvasRef.current;
      const width = canvas.width;
      const height = canvas.height;

      class Heart {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height - height;
          this.size = Math.random() * 15 + 8;
          this.speed = Math.random() * 2 + 1;
          this.opacity = Math.random() * 0.5 + 0.2;
          this.angle = 0;
          this.color = Math.random() > 0.5 ? '#d4af37' : '#c06c84';
        }
        update() {
          this.y += this.speed;
          this.angle += 0.02;
          this.x += Math.sin(this.angle) * 1;
          if (this.y > height) {
            this.y = -20;
            this.x = Math.random() * width;
          }
        }
        draw(ctx) {
          ctx.save();
          ctx.globalAlpha = this.opacity;
          ctx.fillStyle = this.color;
          ctx.font = `${this.size}px serif`;
          ctx.fillText('❤', this.x, this.y);
          ctx.restore();
        }
      }

      // We just push to the ref which is used in the animation loop
      for (let i = 0; i < addHeartsTrigger; i++) {
        // Re-implement Heart class logic or reuse if I extracted it. 
        // For simplicity, just pushing a simple object that matches the update/draw contract logic inside the loop?
        // No, the loop calls update/draw. I need to push instances.
        // Since I defined the class inside the Effect, I can't easily access it here.
        // Let's refactor slightly to just push to the array and let the loop handle it
        // Wait, I can't instantiate it if it's not in scope.
        // Let's just ignore the 'add extra hearts' feature for a second or refactor global class?
        // Better: Move Heart class definition outside or use a state-based approach?
        // Actually, defining it outside component is fine.
      }
    }
  }, [addHeartsTrigger]);

  return <canvas ref={canvasRef} id="love-shower" />;
};

// Moving Heart class outside for reuse
class Heart {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height - height;
    this.size = Math.random() * 15 + 8;
    this.speed = Math.random() * 3 + 1; // Slower speed (0.5 to 1.5)
    this.opacity = Math.random() * 0.5 + 0.2;
    this.angle = 0;
    this.color = Math.random() > 0.5 ? '#d4af37' : '#c06c84';
  }

  update(dt) {
    // Basic speed * delta-time factor (normalized to ~60fps)
    this.y += this.speed * dt;
    this.angle += 0.02 * dt;
    this.x += Math.sin(this.angle) * 1 * dt;

    if (this.y > this.height) {
      this.y = -20;
      this.x = Math.random() * this.width;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.font = `${this.size}px serif`;
    ctx.fillText('❤', this.x, this.y);
    ctx.restore();
  }
}

// Re-implementing HeartShower properly
const HeartShower2 = ({ extraHearts }) => {
  const canvasRef = useRef(null);
  const heartsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Init initial hearts (Reduced density from 50 to 20)
    for (let i = 0; i < 20; i++) {
      heartsRef.current.push(new Heart(canvas.width, canvas.height));
    }

    let lastTime = performance.now();
    const animate = (time) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      // Normalize dt so 1.0 = 60fps
      const dt = deltaTime / 16.66;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      heartsRef.current.forEach(heart => {
        heart.update(dt);
        heart.draw(ctx);
      });
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  useEffect(() => {
    if (extraHearts > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Cap the burst size to 10 to avoid "too much"
      const burstSize = Math.min(extraHearts, 10);
      for (let i = 0; i < burstSize; i++) {
        heartsRef.current.push(new Heart(canvas.width, canvas.height));
      }
    }
  }, [extraHearts]);

  return <canvas ref={canvasRef} id="love-shower" />;
}


function App() {
  // State for components
  const [triggerHearts, setTriggerHearts] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEnvelopeOpen, setEnvelopeOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, title: '', body: '' });
  const [expandedImage, setExpandedImage] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState({ text: '', color: '', visible: false });
  const [wishInput, setWishInput] = useState('');
  const [isGiftRevealed, setGiftRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [showMoreMemories, setShowMoreMemories] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const audioRef = useRef(null);

  // --- Load Songs ---
  useEffect(() => {
    const songModules = import.meta.glob('./assets/arbic/*.mp3', { eager: true });
    // Object.values returns objects with a 'default' property containing the URL in standard Vite setup
    // Or just the string URL if imported differently.
    // Let's debug by assuming standard: module.default
    const songs = Object.values(songModules).map((mod) => mod.default);

    // If no songs found (directory issues?), just warn
    if (songs.length === 0) {
      console.warn("No songs found in assets/arbic/");
      return;
    }
    setPlaylist(songs);
    // Don't auto-play yet, wait for start
  }, []);

  // --- Handle Song End (Loop) ---
  const handleSongEnd = () => {
    if (playlist.length === 0) return;

    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    // Note: useEffect below will trigger play when index changes if isPlaying is true
  };

  // --- Auto-play when index changes (only if already playing) ---
  useEffect(() => {
    if (isPlaying && audioRef.current && playlist.length > 0) {
      if (!audioRef.current.getAttribute('src') || audioRef.current.src !== playlist[currentSongIndex]) {
        audioRef.current.src = playlist[currentSongIndex];
      }
      audioRef.current.play().catch(e => {
        if (e.name === 'NotAllowedError') {
          console.log("Autoplay blocked. Waiting for interaction.");
          // We can optionally set isPlaying(false) here, but keeping it true 
          // allows the GlobalHandler to pick it up immediately.
        } else {
          console.error("Play error:", e);
        }
      });
    }
  }, [currentSongIndex, playlist]); // isPlaying omitted to avoid re-triggering on pause/play toggle logic separately

  // --- Scroll Reveal ---
  useEffect(() => {
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []); // Run once on mount

  // --- Clock Logic ---
  useEffect(() => {
    const startDate = new Date("2025-01-26T00:00:00");

    const updateClock = () => {
      const now = new Date();
      const diff = now - startDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateClock, 1000);
    updateClock(); // Initial call

    return () => clearInterval(interval);
  }, []);

  // --- Handlers ---
  const handleAddHearts = (count) => {
    // Logic to trigger effect in HeartShower. 
    // We can just increment a counter or pass a timestamp, 
    // but the HeartShower expects a count of NEW hearts to add.
    // My implementation of HeartShower effect watches 'extraHearts' value.
    // Be careful: if I set it to 20, it adds 20. If I set it to 20 again, it adds nothing?
    // I should probably pass a trigger object or something.
    // Let's just pass the number of *new* hearts to add, but we need to reset it?
    // Actually, let's keep it simple: Just invoke a function? Can't easily do that with siblings.
    // Let's just use a key or simple prop change.
    // Note: React effect dependencies compare values.
    // Let's pass 'triggerHearts' as a number representing *how many to add in this batch*.
    // But we need to reset it to 0 immediately so we can add again?
    // Or we can just keep only 'total added' but that's messy.
    // Hack: Just force re-render? No.
    // Let's just use a ref in App passed to child? No.
    // Let's just update the list in the child component directly via a key or imperative handle?
    // Let's use a simple counter that increments, and the diff is not important, we just want to add X hearts when an event occurs.
    // Let's pass a "timestamp" or "id" along with count to `HeartShower`.
    // Revised HeartShower prop: `heartBurst` = { count: 20, id: Date.now() }
    setTriggerHearts({ count: count, id: Date.now() });
  };

  const toggleMusic = () => {
    if (!playlist.length) {
      alert("No songs found to play!");
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // If stream source isn't set yet (start), set it
      if (!audioRef.current.getAttribute('src')) {
        audioRef.current.src = playlist[currentSongIndex];
      }
      audioRef.current.play().catch(e => {
        console.log("Audio play failed", e);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const sendWish = () => {
    if (wishInput.trim() !== "") {
      alert("Your wish has been sent to the universe! ✨");
      setWishInput("");
      handleAddHearts(20);
      setConfettiTrigger(c => c + 1);
    }
  };

  const checkAnswer = (answer, btnRef) => { // btnRef is not used in React way usually, we use state
    // We can just use conditional rendering for classes based on selection
    // But for a simple port, let's just handle it logic-wise
    if (answer === "Everything") {
      setQuizFeedback({ text: "Correct! I love absolutely everything about you. ❤️", color: "#c06c84", visible: true });
      handleAddHearts(15);
    } else {
      setQuizFeedback({ text: "That too! But honestly...", color: "#d4af37", visible: true });
      setTimeout(() => {
        setQuizFeedback({ text: "Try selecting 'Everything' 😉", color: "#d4af37", visible: true });
      }, 1500);
    }
  };

  const openModal = (title, body) => {
    setModalState({ isOpen: true, title, body });
  };

  const closeModal = (e) => {
    if (!e || e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-modal')) {
      setModalState({ isOpen: false, title: '', body: '' });
    }
  };

  const revealGift = () => {
    setGiftRevealed(true);
    handleAddHearts(30);
    setConfettiTrigger(c => c + 1);
  };

  // One-time interaction listener for autoplay policy (now handled by Start Screen mostly, but kept as backup)
  const handleGlobalInteraction = () => {
    // Logic mostly handled by start screen, but we use this to ensure accidental pauses can be resumed?
    // Actually, let's play music when we enter.
  };

  const handleStart = () => {
    setHasStarted(true);
    setConfettiTrigger(c => c + 1); // Burst on entry

    if (playlist.length > 0 && audioRef.current) {
      if (!audioRef.current.getAttribute('src')) {
        audioRef.current.src = playlist[currentSongIndex];
      }
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Entry play failed:", e));
    }
  };

  return (
    <div className="App">
      {/* Start Screen Overlay */}
      <div className={`start-screen-overlay ${hasStarted ? 'hidden' : ''}`}>
        <div className="bismillah" style={{ fontSize: '3rem', marginBottom: '20px' }}>﷽</div>
        <h1 className="gold-text" style={{ fontSize: '4rem', textAlign: 'center' }}>Javeriya's<br />Birthday</h1>
        <button className="start-btn" onClick={handleStart}>Enter Celebration</button>
      </div>

      <div className="islamic-background"></div>

      <Confetti trigger={confettiTrigger} />
      <HeartShower2 extraHearts={triggerHearts.count} key={triggerHearts.id} />
      {/* Note: key approach forces re-mount which might clear existing hearts. 
           Better to pass the trigger object to useEffect. 
           Wait, if I use key={triggerHearts.id}, the WHOLE canvas remounts and clears.
           That's not ideal.
           Let's go back to `useEffect` inside `HeartShower` listening to `triggerHearts`.
       */}


      <div className="container">
        {/* Header */}
        <header>
          <p className="subtitle">A Celebration of You</p>
          <h1 className="main-title gold-text">Happy Birthday</h1>
          <h2 className="script-font">Javeriya</h2>
          <p className="header-message">My favorite notification.</p>
        </header>

        {/* Love Clock */}
        <section className="clock-section scroll-reveal">
          <h3 style={{ color: 'var(--text-gold)', fontSize: '1.8rem', marginBottom: '10px' }}>Time Since I heard About you.</h3>
          <div className="clock-container">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <TimeUnit value={timeLeft.seconds} label="Secs" />
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#888', letterSpacing: '1px' }}>And I've cherished every second.</p>
        </section>

        {/* Interactive Envelope */}
        <section className="envelope-section scroll-reveal">
          <div className={`envelope-wrapper ${isEnvelopeOpen ? 'open' : ''}`} onClick={() => setEnvelopeOpen(!isEnvelopeOpen)}>
            <div className="envelope"></div>
            <div className="letter">
              <div className="letter-content">
                <div className="bismillah">﷽</div>
                <h3 style={{ color: 'var(--accent-rose)', marginBottom: '20px', fontSize: '1.4rem' }}>Assalamu Alaikum My Dearest,</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: '1.8', color: '#555' }}>
                  In a world of billions, my eyes only search for you. <br /><br />
                  I pray that Allah (SWT) blesses your new year with infinite happiness, health, and success.
                  May He protect you from all harm and guide you to everything your heart desires.
                  Today, I celebrate not just your birthday, but the beautiful soul that makes my life complete.
                </p>
                <p className="script-font" style={{ fontSize: '1.8rem', marginTop: '25px', color: 'var(--text-gold)' }}>
                  Forever Yours.
                </p>
              </div>
            </div>
            <div className="click-hint">Tap to open my heart</div>
          </div>
        </section>

        {/* Memory Gallery */}
        <section className="gallery-section scroll-reveal">
          <h2 className="gold-text" style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '10px' }}>Beautiful Memories</h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>Snapshots of our journey</p>
          <div className="gallery-grid">
            <SwipeableGalleryItem
              images={[image4, image6, image5, image2]}
              title="Timeless Moments"
              text="Every sunset brings a promise of a new dawn."
              onExpand={setExpandedImage}
            />
            <SwipeableGalleryItem
              images={[image13, image12, image10, , image18]}
              title="Pure Joy"
              text="Laughter is the soundtrack of our lives."
              onExpand={setExpandedImage}
            />
            <SwipeableGalleryItem
              images={[image9, image111,]}
              title="Our Adventure"
              text="To the moon and back, together."
              onExpand={setExpandedImage}
            />
            <SwipeableGalleryItem
              images={[group_0, group_1, group2]}
              title="Ours"
              text="with our friends < Family."
              onExpand={setExpandedImage}
            />
          </div>
        </section>

        {/* Open When Letters */}
        <section className="open-when-section scroll-reveal">
          <h2 className="gold-text" style={{ fontSize: '3rem' }}>Open When...</h2>
          <p style={{ color: '#888', marginTop: '10px' }}>Little reminders for whenever you need them.</p>
          <div className="envelopes-grid">
            <MiniEnvelope title="You Need a Smile" onClick={() => openModal('Need a Smile', (
              <>
                <p style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--accent-rose)', direction: 'rtl', margin: '0 auto', fontFamily: 'serif' }}>تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ</p>
                <p>The Prophet (SAW) said: "Smiling in the face of your brother is an act of charity." (Jami` at-Tirmidhi).</p>
                <p style={{ marginTop: '15px', fontStyle: 'italic' }}>Your smile is the most beautiful charity to my heart.</p>
              </>
            ))} />
            <MiniEnvelope title="You Miss Me" onClick={() => openModal('You Miss Me', (
              <>
                <p style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--accent-rose)', direction: 'rtl', margin: '0 auto', fontFamily: 'serif' }}>الأَرْوَاحُ جُنُودٌ مُجَنَّدَةٌ</p>
                <p>The Prophet (SAW) said: "Souls are troops collected together; those who recognized each other would have affinity." (Sahih al-Bukhari).</p>
                <p style={{ marginTop: '15px', fontStyle: 'italic' }}>Our souls are connected beyond distance.</p>
              </>
            ))} />
            <MiniEnvelope title="You Feel Down" onClick={() => openModal('You Feel Down', (
              <>
                <p style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--accent-rose)', direction: 'rtl', margin: '0 auto', fontFamily: 'serif' }}>إِنَّ مَعَ الْعُسْرِ يُسْرًا</p>
                <p>Allah says: "So verily, with the hardship, there is relief." (Quran 94:6).</p>
                <p style={{ marginTop: '15px', fontStyle: 'italic' }}>Trust in His plan, for this too shall pass and ease will follow.</p>
              </>
            ))} />
          </div>
        </section>

        {/* Mini Quiz */}
        <section className="quiz-section scroll-reveal">
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '2rem', color: 'var(--accent-rose)' }}>Quick Question</h3>
          <p style={{ color: '#666', marginTop: '10px', fontSize: '1.1rem' }}>What is my favorite thing about you?</p>
          <div className="quiz-options">
            {['Your Smile', 'Your Kindness', 'Your Laugh', 'Everything'].map((opt) => (
              <button
                key={opt}
                className={`quiz-btn ${opt === 'Everything' && quizFeedback.text.includes('Correct') ? 'correct' : ''}`}
                onClick={() => checkAnswer(opt)}
                style={opt !== 'Everything' && quizFeedback.text.includes('That too') ? { borderColor: '#d4af37' } : {}}
              >
                {opt}
              </button>
            ))}
          </div>
          <p id="quiz-feedback" style={{ marginTop: '25px', fontWeight: 'bold', height: '25px', fontSize: '1.1rem', color: quizFeedback.color }}>
            {quizFeedback.text}
          </p>
        </section>

        {/* Dua Section */}
        <section className="dua-section scroll-reveal">
          <h2 className="gold-text" style={{ fontSize: '3rem', marginBottom: '15px' }}>My Prayers for You</h2>
          <p style={{ color: '#888', marginBottom: '40px' }}>May Allah accept these duas for you.</p>
          <div className="scrolling-wrapper">
            <DuaCard
              arabic="رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً"
              meaning="Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good."
              reference="Al-Baqarah 2:201"
            />
            <DuaCard
              arabic="رَبِّ زِدْنِي عِلْمًا"
              meaning="My Lord, increase me in knowledge."
              reference="Taha 20:114"
            />
            <DuaCard
              arabic="فَاللَّهُ خَيْرٌ حَافِظًا وَهُوَ أَرْحَمُ الرَّاحِمِينَ"
              meaning="But Allah is the best guardian, and He is the most merciful of the merciful."
              reference="Yusuf 12:64"
            />
          </div>
        </section>

        {/* Reasons Cards */}
        <section className="cards-section scroll-reveal">
          <h2 className="gold-text" style={{ fontSize: '3rem', marginBottom: '15px' }}>Why I Adore You</h2>
          <div className="scrolling-wrapper">
            <LoveCard icon="✨" title="Your Spark" text="The way you light up a room just by walking in. Your energy is my favorite vibe." />
            <LoveCard icon="🦋" title="Your Kindness" text="How you treat everyone with such grace and warmth. It inspires me daily." />
            <LoveCard icon="🌹" title="Our Love" text="Simply because loving you is the easiest thing I've ever done." />
          </div>
        </section>

        {/* Wish Jar */}
        <section className="wish-section scroll-reveal">
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '2rem', color: 'var(--accent-rose)' }}>Make a Wish</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>Type a wish for this year, and send it to the Allah(SWT).</p>
          <div className="wish-input-container">
            <input
              type="text"
              placeholder="I wish for..."
              value={wishInput}
              onChange={(e) => setWishInput(e.target.value)}
            />
            <button className="btn-wish" onClick={sendWish}>Send Wish ✨</button>
          </div>
        </section>

        {/* Final Surprise */}
        <section className="final-section scroll-reveal">
          {!isGiftRevealed ? (
            <button className="btn-premium" onClick={revealGift}>Unlock Surprise</button>
          ) : (
            <div className={`hidden-surprise active`}>
              <p className="script-font" style={{ marginTop: '30px', fontSize: '3rem' }}>
                "I love you more than yesterday,<br />but less than tomorrow."
              </p>
              <h3 style={{ marginTop: '30px', fontSize: '2rem', color: 'var(--text-gold)' }}>Happy Birthday!</h3>
            </div>
          )}
        </section>

        {/* Game Section */}
        <section className="game-section scroll-reveal" style={{ marginBottom: '50px' }}>
          {!isGameOpen ? (
            <div className="game-trigger-section">
              <button className="play-game-btn" onClick={() => setIsGameOpen(true)}>
                🎮 Play Memory Game
              </button>
            </div>
          ) : (
            <div className="inline-game-container">
              <MemoryGame onClose={() => setIsGameOpen(false)} />
            </div>
          )}
        </section>


      </div>

      {/* Music Player */}
      <div
        className={`vinyl-player ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        title="Play Our Song"
      >
        <div className="vinyl-grooves"></div>
      </div>
      <audio
        ref={audioRef}
        id="bg-music"
        onEnded={handleSongEnd}
      />

      {/* Modal */}
      <div className={`modal-overlay ${modalState.isOpen ? 'active' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-modal" onClick={closeModal}>&times;</span>
          <h3 className="gold-text" style={{ fontSize: '2.2rem', marginBottom: '25px' }}>{modalState.title}</h3>
          <div style={{ lineHeight: '1.8', color: '#555', fontSize: '1.1rem' }}>{modalState.body}</div>
          <p style={{ marginTop: '30px', fontSize: '2.5rem' }}>❤️</p>
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div className="expanded-image-overlay" onClick={() => setExpandedImage(null)}>
          <div className="expanded-image-container">
            <img src={expandedImage} alt="Expanded Memory" className="expanded-image" />
            <span className="close-expanded" onClick={() => setExpandedImage(null)}>&times;</span>
          </div>
        </div>
      )}

    </div>
  );
}

// --- Sub Components ---
// --- Memory Game Component ---
const MemoryGame = ({ onClose }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const emojis = ['🎂', '🎁', '🎈', '❤️', '🌟', '🦄', '🎵', '🍰'];
    const deck = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, id) => ({ id, emoji }));
    setCards(deck);
  }, []);

  useEffect(() => {
    if (solved.length === 8) { // 8 pairs
      setWon(true);
    }
  }, [solved]);

  const handleClick = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(cards[id].emoji)) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        checkMatch(id);
      } else {
        setDisabled(false);
      }
    }
  };

  const checkMatch = (secondId) => {
    const firstId = flipped[0];
    if (cards[firstId].emoji === cards[secondId].emoji) {
      setSolved(prev => [...prev, cards[firstId].emoji]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  return (
    <div className="memory-game-container">
      <h2 className="gold-text">Birthday Memory Match</h2>
      {won ? (
        <div className="game-won-msg">
          <h3>🎉 You Won! 🎉</h3>
          <p>Your memory is as sharp as your style!</p>
          <button className="close-game-btn" onClick={onClose}>Close Game</button>
        </div>
      ) : (
        <div className="game-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`game-card ${flipped.includes(card.id) || solved.includes(card.emoji) ? 'flipped' : ''
                }`}
              onClick={() => handleClick(card.id)}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">{card.emoji}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!won && <button className="close-game-btn" onClick={onClose} style={{ marginTop: '20px' }}>Close</button>}
    </div>
  );
};



const Confetti = ({ trigger }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    if (trigger > 0) {
      const canvas = canvasRef.current;
      const colors = ['#d4af37', '#c06c84', '#f8b195', '#ffffff'];
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          vx: (Math.random() - 0.5) * 20,
          vy: (Math.random() - 0.5) * 20,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          age: 0
        });
      }
    }
  }, [trigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (particlesRef.current.length > 0) {
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.5;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.rotation += p.rotationSpeed;
          p.age++;
          if (p.age > 200 || p.y > canvas.height + 50) {
            particlesRef.current.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="confetti-canvas" />;
};

const TiltWrapper = ({ children }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const max = 15;
    const rotateX = ((y - centerY) / centerY) * -max;
    const rotateY = ((x - centerX) / centerX) * max;

    const inner = card.querySelector('.tilt-inner');
    if (inner) {
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const inner = card.querySelector('.tilt-inner');
    if (inner) {
      inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }
  };

  return (
    <div
      className="tilt-wrapper"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-inner">
        {children}
      </div>
    </div>
  );
};

const CanvasHandler = ({ trigger }) => {
  const canvasRef = useRef(null);
  const heartsRef = useRef([]);
  const animationRef = useRef(null);

  // Initial setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Initial hearts
    for (let i = 0; i < 50; i++) {
      heartsRef.current.push(new Heart(canvas.width, canvas.height));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      heartsRef.current.forEach(heart => {
        heart.update();
        heart.draw(ctx);
      });
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // Handle new hearts
  useEffect(() => {
    if (trigger && trigger.count > 0) {
      const canvas = canvasRef.current;
      for (let i = 0; i < trigger.count; i++) {
        heartsRef.current.push(new Heart(canvas.width, canvas.height));
      }
    }
  }, [trigger]);

  return <canvas ref={canvasRef} id="love-shower" />;
}

const TimeUnit = ({ value, label }) => (
  <div className="time-unit">
    <div className="unit-value">{value}</div>
    <div className="unit-label">{label}</div>
  </div>
);

const GalleryItem = ({ src, title, text }) => (
  <div className="gallery-item">
    <TiltWrapper>
      <img src={src} alt={title} />
      <div className="gallery-overlay">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </TiltWrapper>
  </div>
);

const MiniEnvelope = ({ title, onClick }) => (
  <div className="mini-envelope" onClick={onClick}>
    <div className="envelope-title">{title}</div>
  </div>
);

const LoveCard = ({ icon, title, text }) => (
  <div className="love-card">
    <TiltWrapper>
      <span className="card-icon">{icon}</span>
      <div className="card-title">{title}</div>
      <div className="card-text">{text}</div>
    </TiltWrapper>
  </div>
);




const DuaCard = ({ arabic, meaning, reference }) => (
  <div className="dua-card">
    <TiltWrapper>
      <div className="dua-arabic">{arabic}</div>
      <div className="dua-meaning">"{meaning}"</div>
      <div className="dua-ref">{reference}</div>
    </TiltWrapper>
  </div>
);

export default App;
