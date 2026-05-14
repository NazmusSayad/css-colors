'use client'

import { useMemo, useState } from 'react'

const HUE_STOPS = 24
const RANGE_STOPS = 20

function gradientCSS(
  stops: number,
  colorFn: (i: number, total: number) => string
) {
  const colors = Array.from({ length: stops + 1 }, (_, i) => colorFn(i, stops))
  return `linear-gradient(to right, ${colors.join(', ')})`
}

function PropertyGradient({
  gradient,
  position,
  label,
}: {
  gradient: string
  position: number
  label: string
}) {
  return (
    <div className="space-y-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="relative h-3 overflow-hidden rounded-full">
        <div className="absolute inset-0" style={{ background: gradient }} />
        <div
          className="absolute top-0 h-full w-0.5 bg-white shadow-[0_0_3px_rgba(0,0,0,0.8)]"
          style={{ left: `${position * 100}%` }}
        />
      </div>
    </div>
  )
}

function ColorSystemColumn({
  name,
  basis,
  description,
  color,
  cssText,
  hueGradient,
  lightnessGradient,
  saturationGradient,
  hue,
  lightness,
  saturation,
}: {
  name: string
  basis: string
  description: string
  color: string
  cssText: string
  hueGradient: string
  lightnessGradient: string
  saturationGradient: string
  hue: number
  lightness: number
  saturation: number
}) {
  return (
    <div className="space-y-4 rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-muted-foreground text-xs">{basis}</p>
      </div>

      <div
        className="h-40 rounded-lg border border-neutral-200 dark:border-neutral-700"
        style={{ backgroundColor: color }}
      />

      <code className="bg-muted block rounded-md px-3 py-2 text-xs break-all">
        {cssText}
      </code>

      <p className="text-muted-foreground text-xs leading-relaxed">
        {description}
      </p>

      <div className="space-y-3 pt-2">
        <PropertyGradient
          label="Hue range"
          gradient={hueGradient}
          position={hue / 360}
        />
        <PropertyGradient
          label="Lightness range"
          gradient={lightnessGradient}
          position={lightness / 100}
        />
        <PropertyGradient
          label="Saturation / Chroma range"
          gradient={saturationGradient}
          position={saturation / 100}
        />
      </div>
    </div>
  )
}

function ControlSlider({
  label,
  value,
  min,
  max,
  unit,
  gradient,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  unit: string
  gradient: string
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-muted-foreground text-sm tabular-nums">
          {value}
          {unit}
        </span>
      </div>
      <div className="relative h-6">
        <div
          className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full"
          style={{ background: gradient }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_0_4px_rgba(0,0,0,0.5)] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_4px_rgba(0,0,0,0.5)]"
        />
      </div>
    </div>
  )
}

export function Home() {
  const [hue, setHue] = useState(150)
  const [lightness, setLightness] = useState(50)
  const [saturation, setSaturation] = useState(70)

  const hslColor = `hsl(${hue} ${saturation}% ${lightness}%)`
  const lchChroma = saturation * 1.5
  const lchColor = `lch(${lightness}% ${lchChroma.toFixed(1)} ${hue})`
  const oklchChroma = saturation * 0.004
  const oklchColor = `oklch(${lightness}% ${oklchChroma.toFixed(4)} ${hue})`

  const hslGradients = useMemo(
    () => ({
      hue: gradientCSS(
        HUE_STOPS,
        (i, n) => `hsl(${(i / n) * 360} ${saturation}% ${lightness}%)`
      ),
      lightness: gradientCSS(
        RANGE_STOPS,
        (i, n) => `hsl(${hue} ${saturation}% ${(i / n) * 100}%)`
      ),
      saturation: gradientCSS(
        RANGE_STOPS,
        (i, n) => `hsl(${hue} ${(i / n) * 100}% ${lightness}%)`
      ),
    }),
    [hue, lightness, saturation]
  )

  const lchGradients = useMemo(
    () => ({
      hue: gradientCSS(
        HUE_STOPS,
        (i, n) => `lch(${lightness}% ${lchChroma} ${(i / n) * 360})`
      ),
      lightness: gradientCSS(
        RANGE_STOPS,
        (i, n) => `lch(${(i / n) * 100}% ${lchChroma} ${hue})`
      ),
      saturation: gradientCSS(
        RANGE_STOPS,
        (i, n) => `lch(${lightness}% ${(i / n) * 150} ${hue})`
      ),
    }),
    [hue, lightness, lchChroma]
  )

  const oklchGradients = useMemo(
    () => ({
      hue: gradientCSS(
        HUE_STOPS,
        (i, n) => `oklch(${lightness}% ${oklchChroma} ${(i / n) * 360})`
      ),
      lightness: gradientCSS(
        RANGE_STOPS,
        (i, n) => `oklch(${(i / n) * 100}% ${oklchChroma} ${hue})`
      ),
      saturation: gradientCSS(
        RANGE_STOPS,
        (i, n) => `oklch(${lightness}% ${(i / n) * 0.4} ${hue})`
      ),
    }),
    [hue, lightness, oklchChroma]
  )

  const controlHueGradient = gradientCSS(
    HUE_STOPS,
    (i, n) => `hsl(${(i / n) * 360} 80% 60%)`
  )

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-12">
          <h1 className="text-center text-4xl font-bold tracking-tight">
            Color Systems Playground
          </h1>

          <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-center text-sm">
            Manipulate hue, lightness, and saturation/chroma. Each color system
            changes only the property you touch — everything else stays fixed.
            Watch how the same adjustment produces different results.
          </p>
        </header>

        <section className="mx-auto mb-10 max-w-xl space-y-5">
          <ControlSlider
            label="Hue"
            value={hue}
            min={0}
            max={360}
            unit="°"
            gradient={controlHueGradient}
            onChange={setHue}
          />
          <ControlSlider
            label="Lightness"
            value={lightness}
            min={0}
            max={100}
            unit="%"
            gradient="linear-gradient(to right, #000, #888, #fff)"
            onChange={setLightness}
          />
          <ControlSlider
            label="Saturation / Chroma"
            value={saturation}
            min={0}
            max={100}
            unit="%"
            gradient={`linear-gradient(to right, hsl(${hue} 0% ${lightness}%), hsl(${hue} 100% ${lightness}%))`}
            onChange={setSaturation}
          />
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <ColorSystemColumn
            name="HSL"
            basis="Built on RGB"
            description="Lightness is a mathematical transformation of RGB — not perceptually uniform. L=50% at different hues produces visibly different brightness. Saturation can clip unpredictably."
            color={hslColor}
            cssText={hslColor}
            hueGradient={hslGradients.hue}
            lightnessGradient={hslGradients.lightness}
            saturationGradient={hslGradients.saturation}
            hue={hue}
            lightness={lightness}
            saturation={saturation}
          />
          <ColorSystemColumn
            name="LCH"
            basis="Built on LAB"
            description="Perceptually uniform lightness based on CIE LAB. Same L value = similar perceived brightness across hues. Chroma measures colorfulness independently from lightness."
            color={lchColor}
            cssText={lchColor}
            hueGradient={lchGradients.hue}
            lightnessGradient={lchGradients.lightness}
            saturationGradient={lchGradients.saturation}
            hue={hue}
            lightness={lightness}
            saturation={saturation}
          />
          <ColorSystemColumn
            name="OKLCH"
            basis="Built on OKLAB"
            description="Improved perceptual uniformity over LCH. Fixes hue shifts in blue/purple regions. Most consistent perceived lightness and chroma across the full hue range."
            color={oklchColor}
            cssText={oklchColor}
            hueGradient={oklchGradients.hue}
            lightnessGradient={oklchGradients.lightness}
            saturationGradient={oklchGradients.saturation}
            hue={hue}
            lightness={lightness}
            saturation={saturation}
          />
        </section>

        <section className="mt-14 border-t pt-8 dark:border-neutral-800">
          <h2 className="mb-4 text-lg font-semibold">
            How These Systems Relate
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">RGB → HSL</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                HSL is a human-friendly representation of RGB. It gives you
                intuitive controls (hue, saturation, lightness) but inherits
                RGB&apos;s perceptual non-uniformity. &quot;50% lightness&quot;
                means different things for different hues.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">LAB → LCH</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                LAB is a perceptual color space designed so equal numerical
                distances correspond to equal perceived differences. LCH
                re-expresses LAB in cylindrical coordinates — Lightness, Chroma
                (colorfulness), and Hue — making it practical to manipulate
                directly.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">OKLAB → OKLCH</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                OKLAB improves on LAB with better perceptual uniformity,
                especially in blue and purple regions where LAB struggles. OKLCH
                is its cylindrical form. It provides the most consistent
                behavior when adjusting lightness and chroma across different
                hues.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 border-t pt-8 dark:border-neutral-800">
          <h2 className="mb-4 text-lg font-semibold">What to Try</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="mb-1 text-sm font-medium">
                Lightness inconsistency in HSL
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Set lightness to 50% and saturation high. Sweep hue from yellow
                (60°) to blue (240°). In HSL, perceived brightness changes
                dramatically. In OKLCH, it stays visually consistent.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h3 className="mb-1 text-sm font-medium">
                Hue shift in gradients
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Look at the hue range strips. HSL&apos;s hue gradient has uneven
                brightness — some hues look lighter, some darker. The OKLCH hue
                gradient maintains more uniform brightness throughout.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h3 className="mb-1 text-sm font-medium">
                Saturation vs. chroma
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                With a blue hue (~240°), increase saturation. HSL reaches full
                saturation quickly and clips. LCH and OKLCH chroma provides
                finer control over colorfulness without abrupt clipping.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h3 className="mb-1 text-sm font-medium">
                Lightness gradient quality
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Compare lightness range strips. HSL passes through unexpected
                colors mid-range. LCH and OKLCH transition smoothly from dark to
                light with consistent hue and chroma.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
