import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/splash.css";

export default function SplashScreen({ onComplete }) {
  const overlayRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);

  const animationIdRef = useRef(null);
  const startTimeRef = useRef(null);

  const duration = 2500;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const title = titleRef.current;
    const overlay = overlayRef.current;

    canvas.width = 300;
    canvas.height = 300;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let time = 0;
    let lastTime = 0;

    /* ============================
       BACKGROUND GRADIENT MOTION
    ============================ */
let gradient = { angle: 0 };

gsap.to(gradient, {
  angle: Math.PI * 2,
  duration: 30,
  repeat: -1,
  ease: "none",
  onUpdate: () => {
    const x = 50 + Math.cos(gradient.angle) * 50;
    const y = 50 + Math.sin(gradient.angle) * 50;

    overlay.style.background = `
      radial-gradient(
        circle at ${x}% ${y}%,
        #5f8ae0f9,
        #091f4d,
        #020204,
        #000000ff
      )
    `;
  }
});



    /* ============================
       TITLE ANIMATION
    ============================ */
    gsap.fromTo(
      title,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: "power4.out",
        delay: 0.5
      }
    );

    /* ============================
       SNOWFLAKE SHAPE
    ============================ */
    const drawSnowflake = (x, y, size, rotation, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.strokeStyle = `rgba(225,230,255,${opacity})`;
      ctx.lineWidth = 0.8;

      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);

        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -size * 0.6);
        ctx.lineTo(size * 0.3, -size * 0.35);
        ctx.moveTo(0, -size * 0.6);
        ctx.lineTo(-size * 0.3, -size * 0.35);
        ctx.stroke();
      }

      ctx.restore();
    };

    /* ============================
       CANVAS ANIMATION 
    ============================ */
    const dotRings = [
      { radius: 20, count: 8 },
      { radius: 35, count: 12 },
      { radius: 50, count: 16 },
      { radius: 65, count: 20 },
      { radius: 80, count: 24 }
    ];

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      if (!lastTime) lastTime = timestamp;

      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      time += deltaTime * 0.001;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // center dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(43, 49, 79, 0.32)";
      ctx.fill();

      dotRings.forEach((ring, ringIndex) => {
        for (let i = 0; i < ring.count; i++) {
          const angle = (i / ring.count) * Math.PI * 2;
          const radiusPulse =
            Math.sin(time * 2 - ringIndex * 0.4) * 3;

          const x =
            centerX + Math.cos(angle) * (ring.radius + radiusPulse);
          const y =
            centerY + Math.sin(angle) * (ring.radius + radiusPulse);

          const wave =
            Math.sin(time * 2 - ringIndex * 0.4 + i * 0.2);

          const opacityWave = 0.4 + wave * 0.6;
          const isActive = wave > 0.6;

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.lineWidth = 0.8;
          ctx.strokeStyle = `rgba(200,210,255,${
            opacityWave * (isActive ? 0.7 : 0.4)
          })`;
          ctx.stroke();

          drawSnowflake(
            x,
            y,
            isActive ? 5 : 3.5,
            time * 0.5 + i * 0.2,
            opacityWave
          );
        }
      });

      if (timestamp - startTimeRef.current >= duration) {
        finish();
        return;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const finish = () => {
      cancelAnimationFrame(animationIdRef.current);

      gsap.to([title, canvas], {
        opacity: 0,
        duration: 0.3,
        ease: "power1.in"
      });

      gsap.to(overlay, {
        opacity: 3,
        duration: 0.8,
        delay: 0.2,
        ease: "power1.out",
        onComplete: () => onComplete?.()
      });
    };

    animationIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationIdRef.current);
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="splash-overlay">
      <h1 ref={titleRef} className="splash-title">
        Winter Is Coming...
      </h1>
      <canvas ref={canvasRef} />
    </div>
  );
}
