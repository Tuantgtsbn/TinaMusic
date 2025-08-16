// Chuyển hex sang RGB
function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Chuyển RGB sang HSL
function rgbToHsl(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

// Chuyển HSL sang RGB
function hslToRgb(h: number, s: number, l: number) {
    h /= 360; s /= 100; l /= 100;
    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// Chuyển RGB sang hex
function rgbToHex(r: number, g: number, b: number) {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}

// Hàm chính tạo gradient
function createMusicGradient(inputColor: string | undefined) {
    if (!inputColor || typeof inputColor !== "string") return null;
    // Chuyển đổi màu đầu vào
    const rgb = hexToRgb(inputColor);
    if (!rgb) return null;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Tạo các biến thể màu
    const lightVariant = {
        h: hsl.h,
        s: Math.min(100, hsl.s + 10), // Tăng độ bão hòa
        l: Math.min(10, hsl.l - 15)   // Tăng độ sáng
    };

    const darkVariant = {
        h: hsl.h,
        s: Math.min(100, hsl.s + 5),  // Tăng nhẹ độ bão hòa  
        l: Math.max(10, hsl.l - 25)   // Giảm độ sáng
    };

    // Chuyển về hex
    const lightRgb = hslToRgb(lightVariant.h, lightVariant.s, lightVariant.l);
    const darkRgb = hslToRgb(darkVariant.h, darkVariant.s, darkVariant.l);

    const lightHex = rgbToHex(lightRgb.r, lightRgb.g, lightRgb.b);
    const darkHex = rgbToHex(darkRgb.r, darkRgb.g, darkRgb.b);

    // Tạo CSS gradient
    return `linear-gradient(270deg, ${lightHex} 0%, ${inputColor} 70%, ${darkHex} 100%)`;
}

export default createMusicGradient;