// Self-contained Data URIs for Instant, Bulletproof Vector Logos (No Network / CORS required)

const TCS_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='24' fill='%230f172a'/><path d='M25 40 h70 M60 40 v45' stroke='%2338bdf8' stroke-width='10' stroke-linecap='round'/><text x='60' y='102' font-family='Arial, sans-serif' font-size='24' font-weight='bold' fill='white' text-anchor='middle'>TCS</text></svg>";

const COGNIZANT_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='24' fill='%230284c7'/><circle cx='60' cy='45' r='20' fill='none' stroke='white' stroke-width='8'/><path d='M60 25 L75 45 L60 65' stroke='%2338bdf8' stroke-width='6' fill='none'/><text x='60' y='102' font-family='Arial, sans-serif' font-size='20' font-weight='bold' fill='white' text-anchor='middle'>Cognizant</text></svg>";

const INFOSYS_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='24' fill='%23007acc'/><text x='60' y='72' font-family='Calibri, sans-serif' font-size='30' font-weight='bold' fill='white' text-anchor='middle'>Infosys</text></svg>";

const WIPRO_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='24' fill='%234338ca'/><circle cx='40' cy='42' r='10' fill='%23f59e0b'/><circle cx='60' cy='35' r='10' fill='%23ec4899'/><circle cx='80' cy='42' r='10' fill='%2310b981'/><text x='60' y='92' font-family='Arial, sans-serif' font-size='26' font-weight='bold' fill='white' text-anchor='middle'>wipro</text></svg>";

const IBM_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='24' fill='%231e293b'/><text x='60' y='72' font-family='Impact, sans-serif' font-size='38' letter-spacing='2' fill='%233b82f6' text-anchor='middle'>IBM</text></svg>";

const ACCENTURE_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='24' fill='%23a855f7'/><text x='60' y='55' font-family='Arial, sans-serif' font-size='40' font-weight='bold' fill='white' text-anchor='middle'>&gt;</text><text x='60' y='95' font-family='Arial, sans-serif' font-size='18' font-weight='bold' fill='white' text-anchor='middle'>accenture</text></svg>";

export const getCompanyLogoUrl = (logoUrl, companyName) => {
    const name = (companyName || "").toLowerCase().trim();

    // 1. Return guaranteed Data URI vector logos for top brands
    if (name.includes("tcs") || name.includes("tata")) {
        return TCS_SVG;
    }
    if (name.includes("cognizant") || name.includes("cts") || name.includes("cognizent")) {
        return COGNIZANT_SVG;
    }
    if (name.includes("wipro")) {
        return WIPRO_SVG;
    }
    if (name.includes("infosys")) {
        return INFOSYS_SVG;
    }
    if (name.includes("ibm")) {
        return IBM_SVG;
    }
    if (name.includes("accenture")) {
        return ACCENTURE_SVG;
    }

    // 2. Custom Cloudinary image uploaded by Admin
    if (logoUrl && logoUrl.includes("res.cloudinary.com")) {
        return logoUrl;
    }

    if (logoUrl && logoUrl.startsWith("http") && !logoUrl.includes("localhost:8080/uploads")) {
        return logoUrl;
    }

    return null;
};
