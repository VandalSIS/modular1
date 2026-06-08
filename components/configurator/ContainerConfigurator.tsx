"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Grid,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

interface ConfigState {
  length: number;
  width: number;
  height: number;
  color: "white" | "graphite" | "black";
  windows: number;
  door: "glass" | "metal" | "double";
}

const COLOR_HEX: Record<ConfigState["color"], string> = {
  white: "#e8e6df",
  graphite: "#3a3a3c",
  black: "#161618",
};

const ACCENT = "#b08442";

interface ContainerConfiguratorProps {
  locale: Locale;
  dict: Dictionary;
  onUseConfiguration?: (summary: string, area: number) => void;
}

export function ContainerConfigurator({
  locale,
  dict,
  onUseConfiguration,
}: ContainerConfiguratorProps) {
  const [config, setConfig] = useState<ConfigState>({
    length: 6,
    width: 3,
    height: 2.8,
    color: "graphite",
    windows: 2,
    door: "glass",
  });

  // Detect mobile / coarse pointer once on mount. We disable expensive 3D
  // interactions there (auto-rotate, pinch zoom, infinite grid) because they
  // hijack page scroll and cause the canvas to feel like it's "growing" as
  // the user tries to scroll past it.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const summary = useMemo(() => {
    const parts: string[] = [];
    parts.push(
      `${locale === "ru" ? "Размеры" : "Dimensiuni"}: ${config.length} × ${config.width} × ${config.height} m`,
    );
    parts.push(
      `${locale === "ru" ? "Цвет" : "Culoare"}: ${
        config.color === "white"
          ? dict.oferta.colorWhite
          : config.color === "graphite"
            ? dict.oferta.colorGraphite
            : dict.oferta.colorBlack
      }`,
    );
    parts.push(`${locale === "ru" ? "Окна" : "Geamuri"}: ${config.windows}`);
    parts.push(
      `${locale === "ru" ? "Дверь" : "Ușă"}: ${
        config.door === "glass"
          ? dict.oferta.doorGlass
          : config.door === "metal"
            ? dict.oferta.doorMetal
            : dict.oferta.doorDouble
      }`,
    );
    parts.push(
      `${locale === "ru" ? "Площадь" : "Suprafață"}: ${(config.length * config.width).toFixed(1)} m²`,
    );
    return parts.join(" · ");
  }, [config, locale, dict.oferta]);

  const handleUse = () => {
    const area = config.length * config.width;
    if (onUseConfiguration) onUseConfiguration(summary, area);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "modus-config",
        JSON.stringify({ area, message: summary }),
      );
      const formEl = document.getElementById("quote-form");
      if (formEl) {
        const top = formEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const reset = () =>
    setConfig({
      length: 6,
      width: 3,
      height: 2.8,
      color: "graphite",
      windows: 2,
      door: "glass",
    });

  return (
    <section className="border border-line bg-canvas">
      <div className="grid gap-0 lg:grid-cols-[1.4fr,1fr]">
        <div
          className="relative h-[360px] bg-[#e9e6dd] sm:h-[420px] lg:h-auto lg:min-h-[520px]"
          style={{ touchAction: "pan-y" }}
        >
          <Canvas
            dpr={[1, isMobile ? 1.5 : 2]}
            gl={{ antialias: true, alpha: false }}
            shadows={!isMobile}
            onCreated={({ gl, scene }) => {
              gl.setClearColor("#e9e6dd");
              scene.background = new THREE.Color("#e9e6dd");
            }}
          >
            <PerspectiveCamera makeDefault position={[9, 5.5, 10]} fov={38} />
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[8, 12, 6]}
              intensity={2.4}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-camera-left={-12}
              shadow-camera-right={12}
              shadow-camera-top={12}
              shadow-camera-bottom={-12}
            />
            <directionalLight position={[-6, 6, -4]} intensity={0.8} />
            <hemisphereLight args={[0xffffff, 0x6a6a5a, 0.45]} />

            <Scene config={config} animate={!isMobile} />

            <Grid
              position={[0, 0.001, 0]}
              args={[40, 40]}
              cellSize={1}
              cellThickness={0.5}
              cellColor="#c9c4b7"
              sectionSize={5}
              sectionThickness={1}
              sectionColor={ACCENT}
              fadeDistance={isMobile ? 18 : 28}
              fadeStrength={1.4}
              infiniteGrid={!isMobile}
              followCamera={false}
            />
            <ContactShadows
              position={[0, 0.002, 0]}
              opacity={0.55}
              scale={24}
              blur={2.4}
              far={6}
              resolution={isMobile ? 256 : 512}
            />
            <OrbitControls
              enableZoom={!isMobile}
              enablePan={false}
              enableRotate
              minDistance={6}
              maxDistance={22}
              maxPolarAngle={Math.PI / 2.05}
              minPolarAngle={Math.PI / 5.5}
              autoRotate={!isMobile}
              autoRotateSpeed={0.6}
              target={[0, 1.4, 0]}
            />
          </Canvas>
          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 bg-canvas/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-mist">
            <span className="block h-2 w-2 rounded-full bg-ochre" />
            {locale === "ru" ? "Live 3D · вращайте сцену" : "Live 3D · rotește scena"}
          </div>
        </div>

        <div className="flex flex-col gap-6 p-6 md:p-10">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">{dict.oferta.configuratorTitle}</span>
            <h3 className="heading-display text-2xl">
              {(config.length * config.width).toFixed(1)} m² · {config.length} × {config.width} m
            </h3>
            <p className="text-sm text-ink/70">{dict.oferta.configuratorLead}</p>
          </div>

          <Slider
            label={dict.oferta.configuratorLength}
            value={config.length}
            min={3}
            max={12}
            step={0.5}
            unit="m"
            onChange={(v) => setConfig((c) => ({ ...c, length: v }))}
          />
          <Slider
            label={dict.oferta.configuratorWidth}
            value={config.width}
            min={2.4}
            max={6}
            step={0.1}
            unit="m"
            onChange={(v) => setConfig((c) => ({ ...c, width: v }))}
          />
          <Slider
            label={dict.oferta.configuratorHeight}
            value={config.height}
            min={2.4}
            max={3.6}
            step={0.1}
            unit="m"
            onChange={(v) => setConfig((c) => ({ ...c, height: v }))}
          />

          <div className="flex flex-col gap-2">
            <span className="label-floating">{dict.oferta.configuratorColor}</span>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["white", dict.oferta.colorWhite],
                  ["graphite", dict.oferta.colorGraphite],
                  ["black", dict.oferta.colorBlack],
                ] as [ConfigState["color"], string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setConfig((c) => ({ ...c, color: key }))}
                  className={`flex items-center gap-2 border p-3 text-xs uppercase tracking-[0.16em] transition-all ${
                    config.color === key ? "border-ink" : "border-line hover:border-ink"
                  }`}
                >
                  <span
                    className="block h-4 w-4 border border-line"
                    style={{ background: COLOR_HEX[key] }}
                  />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="label-floating">{dict.oferta.configuratorWindows}</span>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setConfig((c) => ({ ...c, windows: n }))}
                  className={`h-10 w-10 border text-sm transition-colors ${
                    config.windows === n
                      ? "border-ink bg-ink text-canvas"
                      : "border-line hover:border-ink"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="label-floating">{dict.oferta.configuratorDoor}</span>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["glass", dict.oferta.doorGlass],
                  ["metal", dict.oferta.doorMetal],
                  ["double", dict.oferta.doorDouble],
                ] as [ConfigState["door"], string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setConfig((c) => ({ ...c, door: key }))}
                  className={`border p-2 text-xs uppercase tracking-[0.16em] transition-colors ${
                    config.door === key ? "border-ink bg-ink text-canvas" : "border-line hover:border-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
            <button type="button" onClick={reset} className="btn-ghost">
              ↺ {dict.oferta.configuratorReset}
            </button>
            <button type="button" onClick={handleUse} className="btn-primary">
              {dict.oferta.configuratorSendToQuote}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="label-floating">{label}</span>
        <span className="text-sm font-medium text-ink">
          {value.toFixed(step < 1 ? 1 : 0)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-ochre"
      />
    </div>
  );
}

function Scene({ config, animate }: { config: ConfigState; animate: boolean }) {
  const group = useRef<THREE.Group>(null);

  // Subtle breathing motion as a sign of life. Disabled on mobile to keep
  // the canvas perfectly still while the user is scrolling the page — a
  // moving 3D scene next to a touch scroll is what makes the configurator
  // feel like it's "growing" on phones.
  useFrame(({ clock }) => {
    if (!group.current) return;
    if (!animate) {
      group.current.position.y = 0;
      return;
    }
    const t = clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.8) * 0.025;
  });

  return (
    <group ref={group}>
      <ContainerModel config={config} />
    </group>
  );
}

function ContainerModel({ config }: { config: ConfigState }) {
  const { length, width, height, color, windows, door } = config;
  const wallColor = COLOR_HEX[color];
  const frameColor = "#0f0f10";
  const halfL = length / 2;
  const halfW = width / 2;
  const baseY = 0.16;

  const windowPositions = useMemo(() => {
    if (windows === 0) return [] as number[];
    const margin = 0.6;
    const usable = length - margin * 2;
    if (windows === 1) return [0];
    return Array.from({ length: windows }, (_, i) => {
      return -halfL + margin + (usable / (windows - 1)) * i;
    });
  }, [windows, length, halfL]);

  return (
    <group>
      {/* Steel floor base */}
      <mesh position={[0, baseY / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, baseY, width]} />
        <meshStandardMaterial color="#1d1d1f" roughness={0.7} metalness={0.55} />
      </mesh>

      {/* Walls (slight inset for frame to peek out) */}
      <mesh position={[0, baseY + height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[length - 0.06, height, width - 0.06]} />
        <meshStandardMaterial color={wallColor} roughness={0.55} metalness={0.18} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, baseY + height + 0.05, 0]} castShadow>
        <boxGeometry args={[length + 0.14, 0.1, width + 0.14]} />
        <meshStandardMaterial color="#0f0f10" roughness={0.65} metalness={0.35} />
      </mesh>

      {/* 4 corner columns */}
      {(
        [
          [-halfL, -halfW],
          [halfL, -halfW],
          [-halfL, halfW],
          [halfL, halfW],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <mesh key={`col-${i}`} position={[x, baseY + height / 2, z]} castShadow>
          <boxGeometry args={[0.1, height + 0.04, 0.1]} />
          <meshStandardMaterial color={frameColor} roughness={0.55} metalness={0.6} />
        </mesh>
      ))}

      {/* Top & bottom horizontal frame rails */}
      {[baseY, baseY + height].flatMap((y) => [
        <mesh key={`hf-${y}-f`} position={[0, y, halfW]}>
          <boxGeometry args={[length + 0.08, 0.07, 0.07]} />
          <meshStandardMaterial color={frameColor} roughness={0.55} metalness={0.6} />
        </mesh>,
        <mesh key={`hf-${y}-b`} position={[0, y, -halfW]}>
          <boxGeometry args={[length + 0.08, 0.07, 0.07]} />
          <meshStandardMaterial color={frameColor} roughness={0.55} metalness={0.6} />
        </mesh>,
        <mesh key={`hf-${y}-l`} position={[-halfL, y, 0]}>
          <boxGeometry args={[0.07, 0.07, width + 0.08]} />
          <meshStandardMaterial color={frameColor} roughness={0.55} metalness={0.6} />
        </mesh>,
        <mesh key={`hf-${y}-r`} position={[halfL, y, 0]}>
          <boxGeometry args={[0.07, 0.07, width + 0.08]} />
          <meshStandardMaterial color={frameColor} roughness={0.55} metalness={0.6} />
        </mesh>,
      ])}

      {/* Windows on front (positive Z) face */}
      {windowPositions.map((x, idx) => (
        <group key={`win-${idx}`} position={[x, baseY + height / 2 + 0.25, halfW + 0.012]}>
          {/* Frame */}
          <mesh>
            <planeGeometry args={[1.0, 1.1]} />
            <meshStandardMaterial color={frameColor} roughness={0.5} metalness={0.6} />
          </mesh>
          {/* Glass */}
          <mesh position={[0, 0, 0.005]}>
            <planeGeometry args={[0.88, 0.98]} />
            <meshStandardMaterial
              color="#9ec0d0"
              roughness={0.05}
              metalness={0.85}
              emissive="#9ec0d0"
              emissiveIntensity={0.12}
            />
          </mesh>
          {/* Cross divider */}
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.88, 0.02, 0.01]} />
            <meshStandardMaterial color={frameColor} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.02, 0.98, 0.01]} />
            <meshStandardMaterial color={frameColor} />
          </mesh>
        </group>
      ))}

      {/* Door on front-right */}
      <group position={[halfL - 1.0, baseY + 1.05, halfW + 0.014]}>
        {door === "double" ? (
          <>
            <DoorPanel kind="metal" width={0.55} height={2} offsetX={-0.3} />
            <DoorPanel kind="metal" width={0.55} height={2} offsetX={0.3} />
          </>
        ) : (
          <DoorPanel kind={door} width={1.0} height={2} offsetX={0} />
        )}
        {/* Outer frame */}
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[1.2, 2.2]} />
          <meshStandardMaterial color={frameColor} roughness={0.55} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function DoorPanel({
  kind,
  width,
  height,
  offsetX,
}: {
  kind: "glass" | "metal" | "double";
  width: number;
  height: number;
  offsetX: number;
}) {
  const isGlass = kind === "glass";
  return (
    <group position={[offsetX, 0, 0.01]}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color={isGlass ? "#9ec0d0" : ACCENT}
          roughness={isGlass ? 0.08 : 0.45}
          metalness={isGlass ? 0.85 : 0.35}
          emissive={isGlass ? "#9ec0d0" : "#000000"}
          emissiveIntensity={isGlass ? 0.18 : 0}
        />
      </mesh>
      {isGlass && (
        <mesh position={[0, 0, 0.001]}>
          <boxGeometry args={[width, 0.03, 0.01]} />
          <meshStandardMaterial color="#0f0f10" />
        </mesh>
      )}
      {/* Handle */}
      <mesh position={[width / 2 - 0.08, -0.1, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.16, 12]} />
        <meshStandardMaterial color="#0f0f10" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}
