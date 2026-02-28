import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import "./MessageCard.css";

function MessageCard({ isActive }) {
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevIsActive = useRef(isActive);

  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const curtainHintRef = useRef(null);
  const messageContentRef = useRef(null);

  const message = `DODO,
Heyy happy birthday bbg!!
I have a lot things to say to you half of which is written to you in that letter the other half is here . Here it goes 
There is this line said by one of my fav character it explains how love should be and what it’s true meaning is 
Yes I’m still in love with I’ve never stopped loving you to be honest even if it was before . This is what he says 
“Love is caring about someone beyond all rationalities and wanting that person to have everything that they want no matter how much it destroys you .
That is love .When you love someone ,you just dont stop ever , even when people roll their eyes or call you crazy .
Even then ,Especially then . You just don’t give up . If I could I would take the whole worlds advice and move on and find someone else ,that wouldn’t be love .
That would be one of the other disposable things that is not worth fighting for .”
When I heard this for the first time in my life I had no one as such in mind 
The second time when I watched I still had no one in mind but the time when I did only one name and one name only popped up that was you !
“Diya Surana ”
I’ve known you for a long time now but I’ve known known you for what 3-4 years I guess 
Those 3-4 years are very happy days of my life because I knew whenever I was bored or angry or sad I could to to this one person I had in my contacts that was you ! 
There was 3 options that you’d do 
First: You’d make fun of it make me laugh with that contagious smile and laugh of yours 
Second : After you’re done with the jokes and you’ll give me actual solutions to my problems 
Third : You’ll silently work on problems that I have you without making it loud 
Thank you for everything you’ve done till now 
And Thank you for everything that you will do in the future 😂
Thank you for being in my life .
Thank you for being the person whom i could share all my feelings with .
Thank you for keeping up with all my drama and nuisances
Thank you for staying friends after all the fudge ups  I’ve done 
Thank you for everything that you’ve agreed to do with me for the past 7 months I hope you’ve enjoyed everything 
Sorry for being the bad person who couldn’t understand things , understand you when you needed it the most . I’ll try to be better now. 
I can’t ever stop loving you 
After hearing this please don’t try to do something about it 
Don’t try to ignore me or avoid me thinking that it will help please don’t just be yourself .
Be happy be strong 
Fight for yourself and become the CA you’ve always wanted to 
I don’t want to see you at your dukaan !!

I love you ❤️
Yours truly, 
Shubh

Happy Birthday! 🎉

— Shubh`;

  // Handle page transitions
  useEffect(() => {
    // Only trigger on transition to active
    if (isActive && !prevIsActive.current) {
      setTimeout(() => setShowConfetti(true), 10);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      prevIsActive.current = isActive;
      return () => clearTimeout(timer);
    }

    // Reset curtains when leaving page with smooth animation
    if (!isActive && prevIsActive.current) {
      setTimeout(() => {
        setCurtainsOpened(false);

        // Smooth reset animation
        if (curtainLeftRef.current && curtainRightRef.current) {
          const resetTimeline = gsap.timeline();

          resetTimeline.to([curtainLeftRef.current, curtainRightRef.current], {
            opacity: 1,
            duration: 0.3,
          });

          resetTimeline.to(
            [curtainLeftRef.current, curtainRightRef.current],
            {
              x: "0%",
              rotationY: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.3
          );
        }

        if (messageContentRef.current) {
          gsap.to(messageContentRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
          });
        }
      }, 300);
    }

    prevIsActive.current = isActive;
    return undefined;
  }, [isActive]);

  const handleOpenCurtains = () => {
    if (!curtainsOpened) {
      setCurtainsOpened(true);

      // Detect screen size for responsive animations
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;

      // Adjust animation parameters based on screen size
      const duration = isSmallMobile ? 1.2 : isMobile ? 1.4 : 1.5;
      const rotationAngle = isSmallMobile ? 10 : isMobile ? 12 : 15;

      // Animate curtain hint fade out
      gsap.to(curtainHintRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
      });

      // Animate curtains opening with 3D effect
      const timeline = gsap.timeline();

      timeline.to(
        curtainLeftRef.current,
        {
          x: "-100%",
          rotationY: -rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      timeline.to(
        curtainRightRef.current,
        {
          x: "100%",
          rotationY: rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      // Fade out curtains
      timeline.to(
        [curtainLeftRef.current, curtainRightRef.current],
        {
          opacity: 0,
          duration: 0.5,
          delay: isMobile ? 0.8 : 1,
        },
        0
      );

      // Reveal message content with smooth animation
      timeline.to(
        messageContentRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.8 : 1,
          ease: "back.out(1.2)",
          delay: isMobile ? 0.6 : 0.8,
        },
        0
      );
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    if (!curtainsOpened) {
      // Add subtle scale effect on touch
      gsap.to(curtainHintRef.current, {
        scale: 0.95,
        duration: 0.1,
      });
    }
  };

  const handleTouchEnd = () => {
    if (!curtainsOpened) {
      gsap.to(curtainHintRef.current, {
        scale: 1,
        duration: 0.1,
      });
    }
  };

  return (
    <section className="message">
      <h2>💌 A Message From My Heart</h2>

      <div className="curtain-container">
        <div className="curtain-rod"></div>

        <div
          className={`curtain-wrapper ${
            curtainsOpened ? "opened opening" : ""
          }`}
          onClick={handleOpenCurtains}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={curtainsOpened ? -1 : 0}
          aria-label="Click or tap to open the curtains and reveal the birthday message"
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !curtainsOpened) {
              e.preventDefault();
              handleOpenCurtains();
            }
          }}
        >
          <div ref={curtainLeftRef} className="curtain curtain-left"></div>
          <div ref={curtainRightRef} className="curtain curtain-right"></div>
          {!curtainsOpened && (
            <div ref={curtainHintRef} className="curtain-hint">
              ✨ {window.innerWidth <= 768 ? "Tap" : "Click"} to Open ✨
            </div>
          )}
        </div>

        <div
          ref={messageContentRef}
          className="message-content"
          role="article"
          aria-label="Birthday message"
        >
          <p className="typed-text">{message}</p>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
}

export default MessageCard;
