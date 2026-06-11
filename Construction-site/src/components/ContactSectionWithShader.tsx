"use client";

/* eslint-disable @next/next/no-img-element */

import { type ChangeEvent, type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  image: string;
};

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
};

const initialContactFormState: ContactFormState = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The project finally had one control room. Approvals, drawings, and site updates moved through the same clear rhythm.",
    name: "Arun Prakash",
    designation: "Commercial Developer",
    image: "https://assets.aceternity.com/avatars/1.webp",
  },
  {
    quote:
      "Ractysh made decisions easier for the owner side. We always knew what was ready, blocked, or waiting for approval.",
    name: "Meera Nandakumar",
    designation: "Project Investor",
    image: "https://assets.aceternity.com/avatars/2.webp",
  },
  {
    quote:
      "Quality checks and handover risks were visible early. That changed the mood of the entire closeout stage.",
    name: "R. Karthik",
    designation: "Operations Lead",
    image: "https://assets.aceternity.com/avatars/3.webp",
  },
  {
    quote:
      "Every site escalation came with ownership, timing, and a next step. The work stayed calm even when timelines shifted.",
    name: "Fathima Noor",
    designation: "Hospitality Owner",
    image: "https://assets.aceternity.com/avatars/4.webp",
  },
];

const defaultColors = ["#1a0a0a", "#ff6b35", "#f72585", "#ffd60a", "#dc2626"];

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_colors[5];

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
    return blend * opacity + base * (1.0 - opacity);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    float time = u_time * 0.15;

    vec2 nCoord = vec2(uv.x * aspect, uv.y) * 0.4;

    vec3 color = u_colors[0];

    float n1 = snoise(vec3(
      nCoord.x * 1.3 + time * 0.5,
      nCoord.y * 1.6,
      time * 0.3 + 3.0
    ));
    n1 = smoothstep(0.15, 0.7, n1 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[1], pow(n1, 3.5));

    float n2 = snoise(vec3(
      nCoord.x * 1.5 + time * 0.4,
      nCoord.y * 1.8,
      time * 0.35 + 12.0
    ));
    n2 = smoothstep(0.18, 0.75, n2 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[2], pow(n2, 3.5));

    float n3 = snoise(vec3(
      nCoord.x * 1.1 - time * 0.35,
      nCoord.y * 1.4,
      time * 0.25 + 24.0
    ));
    n3 = smoothstep(0.20, 0.80, n3 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[3], pow(n3, 4.0));

    float n4 = snoise(vec3(
      nCoord.x * 0.9 + time * 0.2,
      nCoord.y * 1.2,
      time * 0.15 + 36.0
    ));
    n4 = smoothstep(0.25, 0.85, n4 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[4], pow(n4, 4.0));

    float vignette = smoothstep(1.2, 0.4, length(uv - vec2(0.5)));
    color *= vignette * 0.85 + 0.15;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function colorToRgb(color: string): [number, number, number] {
  if (typeof document === "undefined") {
    return [128, 128, 128];
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  const context = canvas.getContext("2d");
  if (!context) {
    return [128, 128, 128];
  }

  const probe = document.createElement("div");
  probe.style.color = color;
  document.body.appendChild(probe);

  const computedColor = getComputedStyle(probe).color;
  document.body.removeChild(probe);

  context.fillStyle = computedColor;
  context.fillRect(0, 0, 1, 1);

  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
  return [red, green, blue];
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }

  gl.deleteShader(shader);
  return null;
}

function ShaderBackground({ colors = defaultColors }: { colors?: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef(0);

  const getShaderColors = useCallback(() => {
    const resolvedColors = [...colors];

    while (resolvedColors.length < 5) {
      resolvedColors.push(resolvedColors[resolvedColors.length - 1] ?? "#7c3aed");
    }

    return resolvedColors
      .slice(0, 5)
      .map((color) => {
        const [red, green, blue] = colorToRgb(color);

        return [red / 255, green / 255, blue / 255];
      })
      .flat();
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", { antialias: false });

    if (!gl) {
      return;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    if (!vertexShader || !fragmentShader) {
      return;
    }

    const program = gl.createProgram();

    if (!program) {
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    gl.useProgram(program);

    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const colorsLocation = gl.getUniformLocation(program, "u_colors");
    const shaderColors = new Float32Array(getShaderColors());

    gl.uniform3fv(colorsLocation, shaderColors);

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const startTime = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      gl.uniform1f(timeLocation, elapsed);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [getShaderColors]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ display: "block" }}
      />
      <svg className="pointer-events-none absolute inset-0 z-[5] h-full w-full opacity-[0.25]">
        <filter id="contactShaderNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#contactShaderNoise)" />
      </svg>
    </>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md md:p-8">
      <svg
        className="mb-4 h-8 w-8 text-white/60"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-lg leading-relaxed font-medium text-white md:text-xl">
        {testimonial.quote}
      </p>
      <div className="mt-6 flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-white/30"
        />
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-white/70">{testimonial.designation}</p>
        </div>
      </div>
    </div>
  );
}

function RotatingTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative flex h-full w-full max-w-md items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <TestimonialCard testimonial={testimonials[activeIndex]} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.name}
            type="button"
            aria-label={`Show testimonial from ${testimonial.name}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-6 bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ContactSectionWithShader({
  colors,
}: {
  colors?: string[];
}) {
  const [formState, setFormState] = useState<ContactFormState>(initialContactFormState);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const updateFormField =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((current) => ({ ...current, [field]: event.target.value }));
      if (submitState !== "idle") {
        setSubmitState("idle");
        setSubmitMessage("");
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("loading");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/construction-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message || "Unable to send your project brief. Please try again.");
      }

      setFormState(initialContactFormState);
      setSubmitState("success");
      setSubmitMessage(result?.message || "Thank you. Your project brief has reached the Ractysh team.");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "Unable to send your project brief. Please try again.");
    }
  };

  return (
    <section id="contact" className="w-full bg-gray-50 dark:bg-neutral-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:px-8 lg:grid-cols-2 lg:py-20">
        <div className="relative order-first h-[500px] overflow-hidden rounded-3xl lg:h-auto">
          <ShaderBackground colors={colors} />
          <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
            <RotatingTestimonials />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg rounded-3xl px-4 py-8 md:px-10">
            <div>
              <h1 className="mt-4 text-2xl leading-9 font-bold text-black dark:text-white">
                Start your project conversation
              </h1>
              <p className="mt-4 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
                Tell us the site, scope, timeline, and decision stage. We will
                map the next practical step with you.
              </p>
            </div>
            <div className="py-10">
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  aria-hidden="true"
                  autoComplete="off"
                  className="hidden"
                  name="website"
                  tabIndex={-1}
                  type="text"
                  value={formState.website}
                  onChange={updateFormField("website")}
                />
                <label
                  htmlFor="name"
                  className="block text-sm leading-6 font-medium text-neutral-700 dark:text-neutral-400"
                >
                  Your name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    required
                    type="text"
                    value={formState.name}
                    placeholder="Name for project follow-up"
                    onChange={updateFormField("name")}
                    className="block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black shadow-sm ring-1 shadow-black/10 ring-black/10 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white dark:shadow-white/5 dark:ring-white/5"
                  />
                </div>
                <label
                  htmlFor="email"
                  className="block text-sm leading-6 font-medium text-neutral-700 dark:text-neutral-400"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    value={formState.email}
                    placeholder="you@example.com"
                    onChange={updateFormField("email")}
                    className="block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black shadow-sm ring-1 shadow-black/10 ring-black/10 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white dark:shadow-white/5 dark:ring-white/5"
                  />
                </div>
                <label
                  htmlFor="company"
                  className="block text-sm leading-6 font-medium text-neutral-700 dark:text-neutral-400"
                >
                  Company / project
                </label>
                <div className="mt-2">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formState.company}
                    placeholder="Company, site, or project name"
                    onChange={updateFormField("company")}
                    className="block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black shadow-sm ring-1 shadow-black/10 ring-black/10 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white dark:shadow-white/5 dark:ring-white/5"
                  />
                </div>
                <label
                  htmlFor="message"
                  className="block text-sm leading-6 font-medium text-neutral-700 dark:text-neutral-400"
                >
                  Project brief
                </label>
                <div className="mt-2">
                  <textarea
                    required
                    rows={5}
                    id="message"
                    name="message"
                    value={formState.message}
                    placeholder="Tell us about your site, approvals, vendors, timeline, or handover goal"
                    onChange={updateFormField("message")}
                    className="block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black shadow-sm ring-1 shadow-black/10 ring-black/10 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white dark:shadow-white/5 dark:ring-white/5"
                  />
                </div>
                {submitMessage ? (
                  <p
                    className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                      submitState === "success"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-200 dark:ring-emerald-700/30"
                        : "bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-950/30 dark:text-red-200 dark:ring-red-700/30"
                    }`}
                  >
                    {submitMessage}
                  </p>
                ) : null}
                <div className="mt-8">
                  <button
                    className="relative z-10 flex w-full items-center justify-center rounded-full bg-black px-4 py-4 text-sm font-medium text-white transition duration-200 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60 md:text-sm dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:shadow-xl"
                    disabled={submitState === "loading"}
                    type="submit"
                  >
                    {submitState === "loading" ? "Sending..." : "Send Project Brief"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
