/**
 * Extract dominant colors from a reference image using Canvas pixel sampling.
 *
 * Returns an object with poster-relevant color slots:
 *   { accent, accentDark, accentLight, title, body, cardBg, badgeBg, footerBg }
 *
 * Falls back to sensible defaults if the image can't be read.
 */

/**
 * Quantize a color channel to a bucket (reduces noise).
 */
function bucket(val, size = 32) {
  return Math.round(val / size) * size;
}

/**
 * Count dominant hues from pixel data, return sorted by frequency.
 */
function dominantColors(imageData, sampleStep = 5) {
  const { data, width, height } = imageData;
  const colorMap = new Map();

  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      if (a < 128) continue; // skip transparent

      // Skip near-white and near-black
      const brightness = (r + g + b) / 3;
      if (brightness > 240 || brightness < 15) continue;

      // Quantize
      const br = bucket(r, 24);
      const bg = bucket(g, 24);
      const bb = bucket(b, 24);
      const key = `${br},${bg},${bb}`;
      colorMap.set(key, (colorMap.get(key) || 0) + 1);
    }
  }

  // Sort by frequency
  const sorted = [...colorMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([key]) => {
      const [r, g, b] = key.split(",").map(Number);
      return { r, g, b };
    });

  return sorted;
}

/**
 * Convert RGB to hex.
 */
function toHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0"))
      .join("")
  );
}

/**
 * Compute luminance (0-1).
 */
function luminance(r, g, b) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/**
 * Adjust lightness of a color.
 */
function adjustLightness(r, g, b, factor) {
  return {
    r: Math.round(r + (255 - r) * factor),
    g: Math.round(g + (255 - g) * factor),
    b: Math.round(b + (255 - b) * factor),
  };
}

/**
 * Darken a color.
 */
function darken(r, g, b, factor) {
  return {
    r: Math.round(r * (1 - factor)),
    g: Math.round(g * (1 - factor)),
    b: Math.round(b * (1 - factor)),
  };
}

/**
 * Build a full poster color scheme from extracted dominant colors.
 */
function buildColorScheme(colors) {
  if (!colors || colors.length === 0) {
    return null;
  }

  // Pick the most saturated/prominent non-neutral color as accent
  const accent = colors[0];
  const accentHex = toHex(accent.r, accent.g, accent.b);

  // Create lighter and darker variants
  const light = adjustLightness(accent.r, accent.g, accent.b, 0.6);
  const dark = darken(accent.r, accent.g, accent.b, 0.4);
  const soft = adjustLightness(accent.r, accent.g, accent.b, 0.85);

  // Pick a secondary color if available (different enough hue)
  const secondary = colors.length > 2 ? colors[2] : accent;
  const secondaryHex = toHex(secondary.r, secondary.g, secondary.b);

  // Determine if the accent is dark or light
  const isDark = luminance(accent.r, accent.g, accent.b) < 0.45;

  return {
    accent: accentHex,
    accentDark: toHex(dark.r, dark.g, dark.b),
    accentLight: toHex(light.r, light.g, light.b),
    accentSoft: toHex(soft.r, soft.g, soft.b),
    accentBorder: toHex(
      soft.r + Math.round((accent.r - soft.r) * 0.4),
      soft.g + Math.round((accent.g - soft.g) * 0.4),
      soft.b + Math.round((accent.b - soft.b) * 0.4)
    ),
    title: isDark ? accentHex : toHex(dark.r, dark.g, dark.b),
    body: "#334155",
    label: "#64748b",
    value: isDark ? accentHex : toHex(dark.r, dark.g, dark.b),
    badgeBg: accentHex,
    badgeText: "#ffffff",
    chipBg: toHex(soft.r, soft.g, soft.b),
    chipBorder: toHex(
      soft.r + Math.round((accent.r - soft.r) * 0.4),
      soft.g + Math.round((accent.g - soft.g) * 0.4),
      soft.b + Math.round((accent.b - soft.b) * 0.4)
    ),
    chipText: isDark ? "#ffffff" : toHex(dark.r, dark.g, dark.b),
    cardBg: "#ffffff",
    cardBorder: toHex(soft.r, soft.g, soft.b),
    pleaseNoteBg: toHex(soft.r, soft.g, soft.b),
    pleaseNoteText: isDark ? "#ffffff" : accentHex,
    ctaGradient: `linear-gradient(135deg, ${toHex(dark.r, dark.g, dark.b)}, ${accentHex})`,
    footerAccent: accentHex,
    secondaryAccent: secondaryHex,
    onAccent: isDark ? "#ffffff" : "#ffffff",
    markerA: accentHex,
    markerB: secondaryHex,
    tileA: `linear-gradient(135deg, ${toHex(dark.r, dark.g, dark.b)}, ${accentHex})`,
    tileAIcon: "#ffffff",
    tileB: toHex(soft.r, soft.g, soft.b),
    tileBBorder: toHex(
      soft.r + Math.round((accent.r - soft.r) * 0.4),
      soft.g + Math.round((accent.g - soft.g) * 0.4),
      soft.b + Math.round((accent.b - soft.b) * 0.4)
    ),
    tileBIcon: isDark ? accentHex : toHex(dark.r, dark.g, dark.b),
  };
}

/**
 * Main export: extract colors from an image element or data URL.
 * Returns a poster color scheme or null on failure.
 */
export function extractColorsFromImage(imageSource) {
  return new Promise((resolve) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }

      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        try {
          // Scale down for performance (sample from a small version)
          const maxDim = 200;
          const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const colors = dominantColors(imageData, 3);
          const scheme = buildColorScheme(colors);
          resolve(scheme);
        } catch {
          resolve(null);
        }
      };

      img.onerror = () => resolve(null);
      img.src = imageSource;
    } catch {
      resolve(null);
    }
  });
}
