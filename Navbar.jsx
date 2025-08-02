import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { TiLocationArrow } from "react-icons/ti";
import { RxArrowRight } from "react-icons/rx";
import Button from "./Button";

// Added "link" property to each menu item
const menuItems = [
  { label: "ABOUT US", hoverText: "group-hover:text-black", link: "#about" },
  { label: "WORKS", hoverText: "group-hover:text-black", link: "#features" },
  { label: "SERVICES", hoverText: "group-hover:text-black", link: "#story" },
  { label: "CONTACT US", hoverText: "group-hover:text-black", link: "#contact" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const audioElementRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  // Audio toggle
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Scroll visibility logic
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Animate navbar on scroll
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Animate overlay on open
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <>
      {/* Top Navbar */}
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Logo + Product Button */}
            <div className="flex items-center gap-7">
              <img src="/img/logo.png" alt="logo" className="w-10" />
              <Button
                id="product-button"
                title="Products"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              />
            </div>

            {/* Menu Button + Audio Toggle */}
            <div className="flex items-center gap-6">
              {/* Audio Toggle */}
              <button
                onClick={toggleAudioIndicator}
                className="flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>

              {/* Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="border px-4 py-2 rounded-full bg-white flex items-center gap-2 text-sm transition-colors shadow-sm group hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              >
                {isOpen ? (
                  <>
                    CLOSE{" "}
                    <RxArrowRight className="text-lg rotate-180 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                ) : (
                  <>
                    MENU{" "}
                    <RxArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Fullscreen Glass Overlay Menu */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 m-10 overflow-hidden shadow-2xl flex flex-col justify-start border border-white/30 rounded-[20px] backdrop-blur-3xl bg-white/15"
          style={{
            boxShadow:
              "inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.15)",
          }}
        >
          {/* Top Banner Section */}
          <div
            className="relative px-10 pt-20 pb-[86px] border-b border-white/30 h-[calc(100%/5+70px)] flex items-center rounded-[16px] overflow-hidden"
            style={{
              backgroundImage: "url('/img/overlay-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/40 to-transparent z-10" />
            <p className="relative z-20 text-3xl font-semibold text-left max-w-4xl leading-snug text-black">
              We make digital products for complex challenges: from mobile apps
              to enterprise systems.
            </p>
          </div>

          {/* Menu Items with links */}
          <div
            className="grid grid-cols-1 divide-y divide-white/20 px-10 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between py-6 transition-all duration-500 cursor-pointer rounded-[16px] backdrop-blur-2xl bg-white/15 hover:bg-white/25 border border-white/30"
                style={{
                  boxShadow:
                    "inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.15)",
                }}
              >
                <div className="transition-all duration-500 group-hover:px-4 group-hover:py-6 rounded-[16px] w-full">
                  <h2
                    className={`text-4xl font-extrabold text-black transition-all duration-300 group-hover:tracking-wide ${item.hoverText}`}
                  >
                    {item.label}
                  </h2>
                  <p className="text-sm mt-1 opacity-0 text-black/70 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
                    Discover more about {item.label.toLowerCase()}.
                  </p>
                </div>
                <span className="custom-shape-arrow inline-flex items-center justify-center w-12 h-10 border border-white/40 transition-all duration-300 bg-white/30 opacity-0 group-hover:opacity-100 group-hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)] backdrop-blur-md">
                  <RxArrowRight className="text-xl text-black transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
