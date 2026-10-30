import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Maximize2,
  Minimize2,
  ExternalLink,
  RotateCcw,
  Gamepad2,
  Search,
  Volume2,
  VolumeX,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Keyboard,
  Crosshair,
  Trophy,
  Compass,
  Menu,
  X
} from 'lucide-react';

export interface GameItem {
  id: string;
  title: string;
  category: string;
  filterGroup: 'racing' | 'fps' | 'sandbox' | 'archery';
  mode: string;
  platform: string;
  url: string;
  thumbnail: string;
  description: string;
  controls: string;
  releaseYear: string;
  developer: string;
}

export const GAMES_CATALOG: GameItem[] = [
  {
    id: 'smash-karts',
    title: 'Smash Karts',
    category: '3D Multiplayer Racing / Battle',
    filterGroup: 'racing',
    mode: 'Online Multiplayer',
    platform: 'Browser (WebGL)',
    url: 'https://smashkarts.io/',
    thumbnail: '/src/assets/images/thumb_smash_karts_1793336446003.jpg',
    description: 'Drive your kart, collect weapons, battle opponents, and become the champion!',
    controls: 'WASD or Arrow Keys to Drive · Spacebar to Fire Weapon',
    releaseYear: '2020',
    developer: 'Tall Team'
  },
  {
    id: 'krunker-io',
    title: 'Krunker.io',
    category: 'Fast-Paced 3D Browser FPS',
    filterGroup: 'fps',
    mode: 'Online Multiplayer',
    platform: 'Browser (WebGL)',
    url: 'https://krunker.io/',
    thumbnail: '/src/assets/images/thumb_krunker_io_1793336446940.jpg',
    description: 'Drop into a pixelated 3D arena and compete in high-speed slide-hopping first-person combat across dozens of custom maps.',
    controls: 'WASD to Move · Left Click to Shoot · R to Reload · Space to Jump',
    releaseYear: '2018',
    developer: 'Yendis Entertainment'
  },
  {
    id: 'shell-shockers',
    title: 'Shell Shockers',
    category: '3D Tactical Egg Shooter',
    filterGroup: 'fps',
    mode: 'Online Multiplayer',
    platform: 'Browser (WebGL)',
    url: 'https://shellshock.io/',
    thumbnail: '/src/assets/images/thumb_shell_shockers_1793336447938.jpg',
    description: 'Step into the tactical courtyard as a heavily armed egg soldier. Choose from EggK-47, Scrambler, or Crackshot classes in team battles.',
    controls: 'WASD to Move · Left Click to Fire · E to Swap Weapon · Q to Throw Grenade',
    releaseYear: '2017',
    developer: 'Blue Wizard Digital'
  },
  {
    id: 'bloxd-io',
    title: 'Bloxd.io',
    category: '3D Voxel Parkour & Sandbox',
    filterGroup: 'sandbox',
    mode: 'Online Multiplayer',
    platform: 'Browser (WebGL)',
    url: 'https://bloxd.io/',
    thumbnail: '/src/assets/images/thumb_bloxd_io_1793336448509.jpg',
    description: 'Master precision sky-island parkour courses, build sprawling voxel worlds, or battle in survival and bedwars game modes.',
    controls: 'WASD to Move · Spacebar to Jump · Shift to Sprint · Mouse to Look',
    releaseYear: '2021',
    developer: 'Arthur'
  },
  {
    id: 'minecraft-classic',
    title: 'Minecraft Classic',
    category: 'Creative 3D Voxel Sandbox',
    filterGroup: 'sandbox',
    mode: 'Singleplayer & Co-op Link',
    platform: 'Browser (WebGL)',
    url: 'https://classic.minecraft.net/',
    thumbnail: '/src/assets/images/thumb_minecraft_classic_1793336448690.jpg',
    description: 'Experience the original 2009 creative sandbox directly in your browser with 32 classic building blocks and shareable multiplayer world links.',
    controls: 'WASD to Move · Left Click to Place/Break · B to Open Block Inventory',
    releaseYear: '2009',
    developer: 'Mojang Studios'
  },
  {
    id: 'narrow-one',
    title: 'Narrow One',
    category: '3D Medieval Archery Arena',
    filterGroup: 'archery',
    mode: 'Online 5v5 Capture the Flag',
    platform: 'Browser (WebGL)',
    url: 'https://narrow.one/',
    thumbnail: '/src/assets/images/thumb_narrow_one_1793336449386.jpg',
    description: 'Storm medieval castle ramparts and fortified courtyards with specialized bows and crossbows in fast-paced capture-the-flag matches.',
    controls: 'WASD to Move · Hold Left Click to Draw Bow · Release to Loose Arrow',
    releaseYear: '2021',
    developer: 'Pelican Party Studios'
  }
];

const HERO_BG_PATH = '/src/assets/images/hero_smash_karts_arena_1793336443556.jpg';

const ARENA_LOADOUTS = [
  {
    name: 'Homing Missile Pod',
    role: 'Long-Range Pursuit',
    cooldown: '4.5s Lock-On',
    summary: 'Tracks the nearest rival kart down straightaways and corners. Use arena pillars to break incoming missile locks.'
  },
  {
    name: 'Triple Machine Cannon',
    role: 'Sustained Suppression',
    cooldown: '60 Rounds / Crate',
    summary: 'Rapid-fire dual-barrel blaster mounted to your front chassis for close-quarters drifting duels.'
  },
  {
    name: 'Proximity Landmine',
    role: 'Chokepoint Control',
    cooldown: 'Instant Arming',
    summary: 'Drop behind your exhaust on tight hairpins or item-box clusters to catch tailgating challengers.'
  },
  {
    name: 'Invincibility Star & Boost',
    role: 'Overdrive Ramming',
    cooldown: '6.0s Duration',
    summary: 'Grants full blast immunity and maximum top-speed overdrive, knocking out any kart on contact.'
  }
];

function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = '3D Game Preview'
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0B132B] via-[#111C38] to-[#1E1B4B] text-slate-300 p-6 text-center ${className}`}
      >
        <Gamepad2 className="w-10 h-10 text-sky-400 mb-2 opacity-80" />
        <span className="text-sm font-semibold tracking-tight text-white">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

export default function App() {
  const [initialBootLoading, setInitialBootLoading] = useState(true);
  const [bootProgress, setBootProgress] = useState(24);
  const [activeGame, setActiveGame] = useState<GameItem>(GAMES_CATALOG[0]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'racing' | 'fps' | 'sandbox' | 'archery'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('Game Feedback & Arena Suggestion');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const arenaContainerRef = useRef<HTMLDivElement>(null);

  // Subtle Web Audio UI synthesizer for crisp tactile feedback
  const playUiTone = (freq = 520, duration = 0.06) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio errors if blocked by autoplay policy
    }
  };

  // Animated loading screen on initial visit (fast, skippable, zero-latency content availability)
  useEffect(() => {
    const step1 = setTimeout(() => setBootProgress(68), 180);
    const step2 = setTimeout(() => setBootProgress(100), 380);
    const finish = setTimeout(() => setInitialBootLoading(false), 550);
    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(finish);
    };
  }, []);

  // Listen to fullscreen change events
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleLaunchInArena = (game: GameItem) => {
    playUiTone(640, 0.08);
    setActiveGame(game);
    setIsGameActive(true);
    setIsIframeLoading(true);
    setIframeKey((prev) => prev + 1);
    const arenaEl = document.getElementById('arena');
    if (arenaEl) {
      arenaEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReloadGame = () => {
    playUiTone(480, 0.07);
    setIsGameActive(true);
    setIsIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleToggleFullscreen = async () => {
    playUiTone(580, 0.07);
    if (!arenaContainerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await arenaContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fallback if fullscreen API is restricted by parent frame
      setIsFullscreen((prev) => !prev);
    }
  };

  const filteredGames = GAMES_CATALOG.filter((game) => {
    const matchesCategory = selectedFilter === 'all' || game.filterGroup === selectedFilter;
    const matchesQuery =
      game.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCategory && matchesQuery;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');

    if (contactName.trim().length < 2) {
      setContactError('Please enter your player name or handle (at least 2 characters).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail.trim())) {
      setContactError('Please enter a valid email address so we can reply.');
      return;
    }
    if (contactMessage.trim().length < 10) {
      setContactError('Please enter a message of at least 10 characters.');
      return;
    }

    playUiTone(720, 0.1);
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col selection:bg-sky-400 selection:text-slate-950">
      {/* Animated Initial Loading Screen */}
      {initialBootLoading && (
        <div
          className="fixed inset-0 z-50 bg-[#060913]/95 backdrop-blur-xl flex flex-col items-center justify-center px-6 transition-opacity duration-200"
          role="status"
          aria-live="polite"
        >
          <div className="w-full max-w-md bg-[#0B1224] border border-sky-500/30 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(14,165,233,0.18)]">
            <p className="text-xs font-semibold tracking-widest text-emerald-400 mb-2">
              INITIALIZING 3D WEBGL PORTAL
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white font-display mb-4">
              SMASH KARTS
            </h2>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-emerald-400 to-purple-500 transition-transform duration-200 origin-left"
                style={{ transform: `scaleX(${bootProgress / 100})` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono-num">
              <span>Loading Arena Shaders & Assets</span>
              <span>{bootProgress}%</span>
            </div>
            <button
              type="button"
              onClick={() => setInitialBootLoading(false)}
              className="mt-5 text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Enter Immediately
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 h-16 bg-[#060913]/85 backdrop-blur-xl border-b border-slate-800/80 px-6 lg:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="text-xl font-extrabold tracking-tight text-white hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 font-display"
        >
          SMASH KARTS
        </a>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#home"
            className="hover:text-white hover:underline underline-offset-8 decoration-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </a>
          <a
            href="#arena"
            className="hover:text-white hover:underline underline-offset-8 decoration-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Arena
          </a>
          <a
            href="#games"
            className="hover:text-white hover:underline underline-offset-8 decoration-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Games
          </a>
          <a
            href="#about"
            className="hover:text-white hover:underline underline-offset-8 decoration-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-white hover:underline underline-offset-8 decoration-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLaunchInArena(GAMES_CATALOG[0])}
            className="px-4 py-2 text-xs font-bold tracking-wide text-slate-950 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Play Now
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1224] border-b border-slate-800 px-6 py-4 flex flex-col gap-3 text-sm font-medium text-slate-200">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-sky-400">
            Home
          </a>
          <a href="#arena" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-sky-400">
            Arena
          </a>
          <a href="#games" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-sky-400">
            Games
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-sky-400">
            About
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-sky-400">
            Contact
          </a>
        </div>
      )}

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section
          id="home"
          className="relative min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden border-b border-slate-800/80"
        >
          {/* High-Quality 3D Racing Game Background */}
          <div className="absolute inset-0 z-0">
            <ResilientImage
              src={HERO_BG_PATH}
              alt="Smash Karts 3D Racing Arena Stadium"
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-700"
              fallbackTitle="Smash Karts 3D Arena"
            />
            {/* Measured Scrim Overlay for WCAG AA Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#060913]/95 via-[#060913]/80 to-[#060913]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-[#060913]/60" />
          </div>

          {/* Ambient Neon Grid Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl"
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* LIVE GAMING Kicker (Clean unboxed typographic metadata) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest text-emerald-400">
                <span>LIVE GAMING</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-sky-400">3D WEBGL MULTIPLAYER ARENA</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-purple-300">INSTANT BROWSER PLAY</span>
              </div>

              {/* Huge Hero Title */}
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.04]"
                style={{ textWrap: 'balance' }}
              >
                SMASH KARTS
              </h1>

              {/* Required Subtitle */}
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-300 to-purple-400">
                ENTER THE ARENA. FIGHT. RACE. WIN!
              </p>

              <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
                Jump directly into 3-minute chaotic 3D kart combat rounds against players worldwide. Drift through neon stadiums, collect mystery weapon crates, launch homing rockets, and unlock custom karts and characters right in your browser.
              </p>

              {/* Primary CTA & Official Direct Launch */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleLaunchInArena(GAMES_CATALOG[0])}
                  className="px-7 py-3.5 text-sm font-extrabold tracking-wide text-slate-950 bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-300 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:shadow-[0_0_40px_rgba(56,189,248,0.65)] hover:-translate-y-0.5 transition-all flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>PLAY NOW</span>
                </button>

                <a
                  href="https://smashkarts.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiTone(600, 0.06)}
                  className="px-5 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700 hover:border-sky-400/60 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Open Official Site</span>
                  <ExternalLink className="w-4 h-4 text-sky-400" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSoundEnabled((prev) => !prev);
                    playUiTone(440, 0.05);
                  }}
                  className="px-4 py-3.5 text-xs font-medium text-slate-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  title="Toggle UI Sound Effects"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span>UI Audio On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-4 h-4 text-slate-500" />
                      <span>UI Audio Muted</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Animated Right Showcase Preview Card */}
            <div className="lg:col-span-5">
              <div className="animate-float-slow bg-[#0B1224]/85 backdrop-blur-md border border-sky-500/30 rounded-2xl p-5 shadow-[0_0_45px_rgba(14,165,233,0.16)]">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-slate-800">
                  <ResilientImage
                    src={GAMES_CATALOG[0].thumbnail}
                    alt="Smash Karts 3D Gameplay Preview"
                    className="w-full h-full object-cover"
                    fallbackTitle="Smash Karts 3D"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/90 via-transparent to-transparent flex items-end p-4">
                    <div className="w-full flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium text-sky-300">Featured Arena Title</p>
                        <p className="text-lg font-bold text-white font-display">Smash Karts 3D</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleLaunchInArena(GAMES_CATALOG[0])}
                        className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Launch Arena
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center pt-1">
                  <div className="p-2.5 rounded-lg bg-[#060913]/70">
                    <p className="text-xs text-slate-400">Match Length</p>
                    <p className="text-sm font-bold text-white font-mono-num mt-0.5">3:00 Min</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#060913]/70">
                    <p className="text-xs text-slate-400">Arena Capacity</p>
                    <p className="text-sm font-bold text-emerald-400 font-mono-num mt-0.5">Up to 8 Karts</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#060913]/70">
                    <p className="text-xs text-slate-400">Engine</p>
                    <p className="text-sm font-bold text-sky-400 font-mono-num mt-0.5">3D WebGL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. REAL PLAYABLE GAME SECTION */}
        <section id="arena" className="py-16 lg:py-20 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-2">
                <span>LIVE ARENA VIEWPORT</span>
                <span aria-hidden="true">·</span>
                <span>{activeGame.platform}</span>
                <span aria-hidden="true">·</span>
                <span>{activeGame.mode}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
                {activeGame.title} — Interactive Game Window
              </h2>
            </div>

            {/* Game Selector Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              {GAMES_CATALOG.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    playUiTone(540, 0.05);
                    setActiveGame(item);
                    if (isGameActive) {
                      setIsIframeLoading(true);
                      setIframeKey((prev) => prev + 1);
                    }
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    activeGame.id === item.id
                      ? 'bg-sky-500 text-slate-950 shadow-[0_0_16px_rgba(14,165,233,0.4)]'
                      : 'bg-[#0B1224] text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Gaming Viewport Container */}
          <div
            ref={arenaContainerRef}
            className={`relative rounded-2xl overflow-hidden bg-[#090F20] border border-sky-500/35 shadow-[0_0_50px_rgba(14,165,233,0.12)] flex flex-col ${
              isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : ''
            }`}
          >
            {/* Viewport Top Control Bar */}
            <div className="bg-[#0B1224] border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-bold text-white whitespace-nowrap">
                  {activeGame.title}
                </span>
                <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Official Server: {activeGame.url}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    playUiTone(620, 0.07);
                    setIsGameActive(true);
                    setIsIframeLoading(true);
                    setIframeKey((prev) => prev + 1);
                  }}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>PLAY GAME</span>
                </button>

                {isGameActive && (
                  <button
                    type="button"
                    onClick={handleReloadGame}
                    className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    title="Reload Game Stream"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reload</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-sky-300" />
                      <span>EXIT FULLSCREEN</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-sky-300" />
                      <span>FULLSCREEN</span>
                    </>
                  )}
                </button>

                <a
                  href={activeGame.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiTone(660, 0.06)}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <span>OPEN GAME</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 16:9 Playable Stage */}
            <div className={`relative w-full ${isFullscreen ? 'flex-1' : 'aspect-video min-h-[420px] lg:min-h-[580px]'} bg-[#050811]`}>
              {!isGameActive ? (
                /* Pre-Launch Interactive Stage — Honest Launch & Direct Play Options */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <ResilientImage
                    src={activeGame.thumbnail}
                    alt={activeGame.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-35"
                    fallbackTitle={activeGame.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/80 to-[#050811]/60" />

                  <div className="relative z-10 max-w-xl space-y-5">
                    <div className="text-xs font-bold tracking-widest text-emerald-400">
                      READY TO LAUNCH · {activeGame.category.toUpperCase()}
                    </div>
                    <h3 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
                      {activeGame.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {activeGame.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          playUiTone(680, 0.08);
                          setIsGameActive(true);
                          setIsIframeLoading(true);
                        }}
                        className="px-7 py-3.5 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:brightness-110 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-slate-950" />
                        <span>PLAY GAME IN WINDOW</span>
                      </button>

                      <a
                        href={activeGame.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playUiTone(600, 0.06)}
                        className="px-6 py-3.5 text-sm font-bold text-white bg-purple-600/90 hover:bg-purple-500 border border-purple-400/40 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
                      >
                        <span>OPEN GAME IN NEW TAB</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <p className="text-xs text-slate-400 pt-2">
                      Controls: {activeGame.controls}
                    </p>
                  </div>
                </div>
              ) : (
                /* Live Official Game Embed + Unobtrusive External Fallback Bar */
                <div className="w-full h-full flex flex-col">
                  {isIframeLoading && (
                    <div className="
                      absolute inset-0 z-20 bg-[#060913]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center pointer-events-none
                    ">
                      <div className="w-10 h-10 rounded-full border-2 border-sky-400 border-t-transparent animate-spin mb-3" />
                      <p className="text-sm font-bold text-white">
                        Connecting to {activeGame.title} Live Server...
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Streaming from {activeGame.url}
                      </p>
                    </div>
                  )}

                  <iframe
                    key={`${activeGame.id}-${iframeKey}`}
                    src={activeGame.url}
                    title={`${activeGame.title} Live Playable Game`}
                    className="w-full flex-1 border-0 bg-black"
                    allow="autoplay; fullscreen; gamepad; pointer-lock; accelerometer; gyroscope"
                    allowFullScreen
                    onLoad={() => setIsIframeLoading(false)}
                  />
                </div>
              )}
            </div>

            {/* Viewport Footer Bar — Direct Launch Fallback & Keyboard Help */}
            <div className="bg-[#0B1224] border-t border-slate-800 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  <strong className="text-white">Active Controls:</strong> {activeGame.controls}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400">
                  If your browser or network blocks embedded frames:
                </span>
                <a
                  href={activeGame.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-4 flex items-center gap-1 whitespace-nowrap shrink-0"
                >
                  <span>OPEN GAME ({activeGame.title})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. GAME INFORMATION SECTION */}
        <section className="py-16 lg:py-20 border-t border-b border-slate-800/80 bg-[#080D1C]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-10">
              <p className="text-xs font-bold tracking-widest text-sky-400 mb-2">
                OFFICIAL SPECIFICATION & TACTICAL BRIEFING
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
                Game Information — Smash Karts
              </h2>
            </div>

            {/* Asymmetric Bento Specification Grid (Single-Elevation Depth) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column: Required Core Game Metadata Card */}
              <div className="lg:col-span-5 bg-[#0C1428] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-800">
                    <div>
                      <p className="text-xs text-slate-400">Official Title</p>
                      <h3 className="text-2xl font-extrabold text-white font-display mt-0.5">
                        Smash Karts
                      </h3>
                    </div>
                    <Trophy className="w-7 h-7 text-emerald-400 shrink-0" />
                  </div>

                  <dl className="space-y-4 text-sm">
                    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 font-medium">Game name</dt>
                      <dd className="text-white font-bold text-right">Smash Karts</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 font-medium">Category</dt>
                      <dd className="text-sky-400 font-semibold text-right">
                        3D Multiplayer Racing / Battle
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 font-medium">Game mode</dt>
                      <dd className="text-emerald-400 font-semibold text-right">
                        Online Multiplayer
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 font-medium">Platform</dt>
                      <dd className="text-purple-300 font-semibold text-right">Browser</dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">
                      Description
                    </p>
                    <p className="text-base text-slate-200 leading-relaxed font-medium">
                      Drive your kart, collect weapons, battle opponents, and become the champion!
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleLaunchInArena(GAMES_CATALOG[0])}
                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Play Smash Karts in Arena
                  </button>
                  <a
                    href="https://smashkarts.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <span>smashkarts.io</span>
                    <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                  </a>
                </div>
              </div>

              {/* Right Column: Arena Arsenal & Combat Mechanics */}
              <div className="lg:col-span-7 bg-[#0C1428] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-800">
                    <div>
                      <p className="text-xs text-sky-400 font-semibold">COMBAT MECHANICS & LOADOUTS</p>
                      <h3 className="text-2xl font-extrabold text-white font-display mt-0.5">
                        Arena Power-Ups & Strategy Guide
                      </h3>
                    </div>
                    <Crosshair className="w-7 h-7 text-sky-400 shrink-0" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {ARENA_LOADOUTS.map((weapon, index) => (
                      <div key={weapon.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-slate-400 font-mono-num">
                          <span className="text-emerald-400 font-semibold">
                            0{index + 1}. {weapon.role}
                          </span>
                          <span>{weapon.cooldown}</span>
                        </div>
                        <h4 className="text-base font-bold text-white font-display">
                          {weapon.name}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {weapon.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-300">
                  <div>
                    <span className="font-bold text-white">Progression System:</span> Earn XP after every 3-minute round to unlock Prize Machine tokens, seasonal hats, wheels, and character skins.
                  </div>
                  <span className="font-mono-num text-sky-400 whitespace-nowrap shrink-0">
                    60 FPS WebGL Physics
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. MORE GAMES SECTION */}
        <section id="games" className="py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold tracking-widest text-emerald-400 mb-2">
                CURATED MULTIPLAYER DIRECTORY
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
                More Games — Instant Browser Collection
              </h2>
            </div>

            {/* Interactive Filter Tabs + Search Input */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-1 p-1 bg-[#0B1224] border border-slate-800 rounded-xl overflow-x-auto">
                {(
                  [
                    { id: 'all', label: 'All Games' },
                    { id: 'racing', label: 'Racing & Battle' },
                    { id: 'fps', label: '3D Shooters' },
                    { id: 'sandbox', label: 'Voxel Sandbox' },
                    { id: 'archery', label: 'Archery' }
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      playUiTone(500, 0.05);
                      setSelectedFilter(tab.id);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedFilter === tab.id
                        ? 'bg-sky-500 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games..."
                  aria-label="Search games"
                  className="w-full sm:w-52 pl-9 pr-3 py-2 text-xs text-white bg-[#0B1224] border border-slate-800 focus:border-sky-400 rounded-xl outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 6 Game Cards Grid */}
          {filteredGames.length === 0 ? (
            <div className="bg-[#0B1224] border border-slate-800 rounded-2xl p-12 text-center">
              <p className="text-base font-bold text-white mb-2">No games matched your filter</p>
              <p className="text-xs text-slate-400 mb-4">
                Try clearing your search query or switching back to All Games.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-sky-400 rounded-lg cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredGames.map((game) => (
                <article
                  key={game.id}
                  className="group bg-[#0B1224] border border-slate-800/90 hover:border-sky-400/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                >
                  <div>
                    {/* 4:3 Game Thumbnail */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-950 border-b border-slate-800/80">
                      <ResilientImage
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        fallbackTitle={game.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1224] via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Card Content — Clean unboxed metadata with typographic separators */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-sky-400 font-medium mb-1.5">
                        <span>{game.category}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-400 font-mono-num">{game.releaseYear}</span>
                      </div>

                      <h3 className="text-xl font-extrabold text-white font-display tracking-tight mb-2">
                        {game.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                        {game.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions: PLAY in Arena + Working Official Game Link */}
                  <div className="px-6 pb-6 pt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleLaunchInArena(game)}
                      className="flex-1 py-2.5 px-4 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>PLAY</span>
                    </button>

                    <a
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playUiTone(600, 0.05)}
                      className="py-2.5 px-4 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-purple-400/50 rounded-xl transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                      title={`Open official ${game.title} website in a new tab`}
                    >
                      <span>Official Link</span>
                      <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 6. ABOUT SECTION */}
        <section id="about" className="py-16 lg:py-24 bg-[#080D1C] border-t border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-12">
              <p className="text-xs font-bold tracking-widest text-purple-400 mb-2">
                PLATFORM ARCHITECTURE & STANDARDS
              </p>
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display mb-4"
                style={{ textWrap: 'balance' }}
              >
                Built for Instant 3D Browser Performance
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                Inspired by modern digital gaming hubs like Steam, CrazyGames, and Poki, our platform connects players directly to hardware-accelerated WebGL multiplayer arenas without downloads, installers, or fake placeholder screens.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#0C1428] border border-slate-800 rounded-2xl p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 font-mono-num">
                    01. Hardware WebGL
                  </span>
                  <Compass className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  01. Zero-Install 3D Rendering
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Every featured game utilizes HTML5 Canvas and WebGL shaders to deliver smooth 60 FPS 3D graphics, directional audio, and responsive physics straight inside modern desktop and mobile browsers.
                </p>
              </div>

              <div className="bg-[#0C1428] border border-slate-800 rounded-2xl p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-mono-num">
                    02. Verified Links
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  02. Authentic Official Servers
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We connect directly to official game domains including smashkarts.io, krunker.io, shellshock.io, bloxd.io, classic.minecraft.net, and narrow.one—providing both embedded play and instant new-tab launch.
                </p>
              </div>

              <div className="bg-[#0C1428] border border-slate-800 rounded-2xl p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 font-mono-num">
                    03. Responsive Controls
                  </span>
                  <Keyboard className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  03. Fullscreen & Control Clarity
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Switch effortlessly into native fullscreen mode, check verified keyboard and mouse bindings below the arena viewport, and jump between 6 multiplayer genres with a single click.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CONTACT SECTION */}
        <section id="contact" className="py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-bold tracking-widest text-sky-400">
                PLAYER SUPPORT & GAME SUBMISSIONS
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
                Contact the Arena Team
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Have a suggestion for a new WebGL multiplayer title, need help configuring browser hardware acceleration, or want to organize a classroom Smash Karts tournament? Send us a message below.
              </p>

              <div className="pt-4 space-y-4 text-sm text-slate-300 border-t border-slate-800">
                <div>
                  <p className="text-xs text-slate-400">Official Featured Game</p>
                  <a
                    href="https://smashkarts.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline font-semibold"
                  >
                    https://smashkarts.io/
                  </a>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Supported Browsers</p>
                  <p className="text-white font-medium">
                    Chrome, Edge, Firefox, Safari (WebGL 2.0 Enabled)
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0B1224] border border-slate-800 rounded-2xl p-6 sm:p-8">
              {contactSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-2xl font-extrabold text-white font-display">
                    Message Received, {contactName}!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out regarding <strong className="text-white">{contactTopic}</strong>. We have logged your message for <span className="text-sky-400">{contactEmail}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactEmail('');
                      setContactMessage('');
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5" noValidate>
                  {contactError && (
                    <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{contactError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="player-name" className="block text-xs font-semibold text-slate-300 mb-2">
                        Player Name or Handle
                      </label>
                      <input
                        id="player-name"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. DriftKing99"
                        className="w-full px-4 py-2.5 text-sm text-white bg-[#060913] border border-slate-800 focus:border-sky-400 rounded-xl outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="player-email" className="block text-xs font-semibold text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        id="player-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="player@example.com"
                        className="w-full px-4 py-2.5 text-sm text-white bg-[#060913] border border-slate-800 focus:border-sky-400 rounded-xl outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-xs font-semibold text-slate-300 mb-2">
                      Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={contactTopic}
                      onChange={(e) => setContactTopic(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm text-white bg-[#060913] border border-slate-800 focus:border-sky-400 rounded-xl outline-none transition-colors"
                    >
                      <option value="Game Feedback & Arena Suggestion">Game Feedback & Arena Suggestion</option>
                      <option value="Request a New Browser 3D Game">Request a New Browser 3D Game</option>
                      <option value="School / Classroom Tournament Inquiry">School / Classroom Tournament Inquiry</option>
                      <option value="Technical & Fullscreen Support">Technical & Fullscreen Support</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell us about your favorite kart loadout, map, or game request..."
                      className="w-full px-4 py-2.5 text-sm text-white bg-[#060913] border border-slate-800 focus:border-sky-400 rounded-xl outline-none transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 text-xs font-extrabold tracking-wide text-slate-950 bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer with Official Links & Copyright */}
      <footer className="bg-[#050811] border-t border-slate-800/80 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <a
              href="#home"
              className="text-lg font-extrabold tracking-tight text-white font-display"
            >
              SMASH KARTS — 3D GAMING PORTAL
            </a>
            <p className="text-xs text-slate-400 max-w-md">
              Instant 3D browser multiplayer gaming experience. All featured games are property of their respective creators and hosted on their official domains.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#home" className="hover:text-sky-400 transition-colors">
              Home
            </a>
            <a href="#arena" className="hover:text-sky-400 transition-colors">
              Arena
            </a>
            <a href="#games" className="hover:text-sky-400 transition-colors">
              More Games
            </a>
            <a href="#about" className="hover:text-sky-400 transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-sky-400 transition-colors">
              Contact
            </a>
            <a
              href="https://smashkarts.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Official Smash Karts</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Smash Karts 3D Gaming Portal. All rights reserved.</p>
          <p>Designed for desktop and mobile WebGL browsers.</p>
        </div>
      </footer>
    </div>
  );
}
