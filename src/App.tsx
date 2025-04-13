import { useState, useEffect } from 'react';

const GPG_PUBLIC_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: User-ID:	Cubik65536 <cubik65536@cubik65536.top>
Comment: a.k.a.:	Qian Qian "Cubik" <me@cubik65536.top>
Comment: a.k.a.:	Qian Qian "Cubik" <cubik65536@proton.me>
Comment: a.k.a.:	Cubik65536 <cubik65536@outlook.com>
Comment: a.k.a.:	Qian Qian "Cubik" <cubik65536@outlook.it>
Comment: Fingerprint:	C7B9299CE8FE070E2B47325306629B814A16551B

mDMEZvnwXxYJKwYBBAHaRw8BAQdAEO/FC8QvtBBEFBCUjXr066slAlOvt9Zk/ZcF
hej8Qde0JkN1YmlrNjU1MzYgPGN1YmlrNjU1MzZAY3ViaWs2NTUzNi50b3A+iJYE
ExYKAD4CGwMFCwkIBwICIgIGFQoJCAsCBBYCAwECHgcCF4AWIQTHuSmc6P4HDitH
MlMGYpuBShZVGwUCZvnxqgIZAQAKCRAGYpuBShZVG4cPAQCytJ94L0ha0fF1vkb9
1cbXEaXaURZoEma7C947Dq/i8gEAoULv1ILEoXhQ8FueFI5rRtlBx/lrQHFyOrSE
pf5Yqw20JVFpYW4gUWlhbiAiQ3ViaWsiIDxtZUBjdWJpazY1NTM2LnRvcD6IkwQT
FgoAOxYhBMe5KZzo/gcOK0cyUwZim4FKFlUbBQJm+fFgAhsDBQsJCAcCAiICBhUK
CQgLAgQWAgMBAh4HAheAAAoJEAZim4FKFlUbi8MBANcs6jZskmy3mA6pKUxFqIOM
ImBi60dllccNQ1xWh32CAP9GOsK078pw1dS4pPM/jemI576osN1fW+k+tdUFm3+Z
AbQoUWlhbiBRaWFuICJDdWJpayIgPGN1YmlrNjU1MzZAcHJvdG9uLm1lPoiTBBMW
CgA7FiEEx7kpnOj+Bw4rRzJTBmKbgUoWVRsFAmb58W8CGwMFCwkIBwICIgIGFQoJ
CAsCBBYCAwECHgcCF4AACgkQBmKbgUoWVRv9tAD/df6LxUbh4jOrXyUoWy1YNkzn
8VMmL1hA2LYcbs34NL0A/1HGQqWO5YOF1hM3rJlk/EaBUMng1VFfm4yTbgCQiNMM
tCNDdWJpazY1NTM2IDxjdWJpazY1NTM2QG91dGxvb2suY29tPoiTBBMWCgA7FiEE
x7kpnOj+Bw4rRzJTBmKbgUoWVRsFAmb58YUCGwMFCwkIBwICIgIGFQoJCAsCBBYC
AwECHgcCF4AACgkQBmKbgUoWVRucUQD/SM2YChgOrxz+9emrDOTBm9YBwg0XI4L6
XJFMmSvYt3MA/27XoV5GKUCyY7x4KiWYpbMPT9JaooIWFCu7LkLLGosItClRaWFu
IFFpYW4gIkN1YmlrIiA8Y3ViaWs2NTUzNkBvdXRsb29rLml0PoiTBBMWCgA7FiEE
x7kpnOj+Bw4rRzJTBmKbgUoWVRsFAmb58ZMCGwMFCwkIBwICIgIGFQoJCAsCBBYC
AwECHgcCF4AACgkQBmKbgUoWVRsWiQD/TQFlhx9H4AS2YE/uKuxGdHpgnSEKm3m5
erwGIIhqN5EA/jrjd8bhD8Dl5TL+EQcSlkswgXfNs8B0yiSPYvz8QuMGuDgEZvnx
5hIKKwYBBAGXVQEFAQEHQLVcLEikRPKVbdFEc6+6FnelkSRgBAV7TJ+phICmjBxo
AwEIB4h4BBgWCgAgFiEEx7kpnOj+Bw4rRzJTBmKbgUoWVRsFAmb58eYCGwwACgkQ
BmKbgUoWVRvuDQD/ef+3DKKQZk2DkG0vvVRkX1aTXTHxNqtnZbIRNGkiDB0BAMTO
XxPvUBzoNaNMaI0S3zVZm5tw3NiSq/GPIbllHMsG
=Myoo
-----END PGP PUBLIC KEY BLOCK-----
`;

type ThemeMode = 'dark' | 'light' | 'auto';
type BannerType = 'info' | 'warning' | 'error' | 'success' | null;

// Get the stored theme mode or default to 'auto'
const getStoredThemeMode = (): ThemeMode => {
  const stored = localStorage.getItem('themeMode');
  return (stored === 'dark' || stored === 'light' || stored === 'auto') ? stored : 'auto';
};

const App = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getStoredThemeMode());
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [fingerprintCopySuccess, setFingerprintCopySuccess] = useState(false);
  const [banner, setBanner] = useState<{ type: BannerType; message: string; isHtml?: boolean }>({ type: null, message: '' });

  useEffect(() => {
    setBanner({ 
      type: 'warning', 
      message: 'My old PGP key with fingerprint <code>0xDDDF3D48</code> is NO LONGER VALID and <strong>CANNOT BE TRUSTED</strong> since 2024/09/28 (incl.). <code>0x06629B814A16551B</code> is the new trusted key since 2024/09/29 (incl.).<br/>我的指纹为 <code>0xDDDF3D48</code> 的旧 PGP 密钥已于 2024/09/28（包含当日）失效并<strong>不再可信</strong>。自 2024/09/29 开始可信的密钥是 <code>0x06629B814A16551B</code>。',
      isHtml: true
    });
  }, []);

  // Handle system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeMode === 'auto') {
        setIsDarkMode(e.matches);
      }
    };

    // Set initial value
    if (themeMode === 'auto') {
      setIsDarkMode(mediaQuery.matches);
    }

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  // Update isDarkMode when themeMode changes
  useEffect(() => {
    if (themeMode === 'dark') {
      setIsDarkMode(true);
    } else if (themeMode === 'light') {
      setIsDarkMode(false);
    } else {
      // Auto mode - use system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, [themeMode]);

  // Save theme mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'dark':
        return '🌙';
      case 'light':
        return '☀️';
      case 'auto':
        return '⚙️';
      default:
        return '⚙️';
    }
  };

  const cycleThemeMode = () => {
    setThemeMode(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'auto';
      return 'dark';
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(GPG_PUBLIC_KEY);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleFingerprintCopy = async () => {
    try {
      await navigator.clipboard.writeText('C7B9299CE8FE070E2B47325306629B814A16551B');
      setFingerprintCopySuccess(true);
      setTimeout(() => setFingerprintCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy fingerprint: ', err);
    }
  };

  // Function to show a banner (can be called from anywhere)
  const showBanner = (type: BannerType, message: string, isHtml: boolean = false) => {
    setBanner({ type, message, isHtml });
    setTimeout(() => setBanner({ type: null, message: '' }), 5000);
  };

  // Get banner styles based on type
  const getBannerStyles = () => {
    if (!banner.type) return '';
    
    const baseStyles = 'py-2 px-4 text-center text-sm font-medium transition-all duration-300 ease-in-out';
    
    switch (banner.type) {
      case 'info':
        return `${baseStyles} ${isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`;
      case 'warning':
        return `${baseStyles} ${isDarkMode ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-800'}`;
      case 'error':
        return `${baseStyles} ${isDarkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'}`;
      case 'success':
        return `${baseStyles} ${isDarkMode ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'}`;
      default:
        return baseStyles;
    }
  };

  // Get banner icon based on type
  const getBannerIcon = () => {
    switch (banner.type) {
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'success':
        return '✅';
      default:
        return '';
    }
  };

  // Render banner message with or without HTML
  const renderBannerMessage = () => {
    if (banner.isHtml) {
      return <span dangerouslySetInnerHTML={{ __html: banner.message }} />;
    }
    return <span>{banner.message}</span>;
  };

  return (
    <div className={`text-center selection:bg-green-900 ${isDarkMode ? 'dark' : ''}`}>
      {/* Banner - Fixed on desktop, scrollable on mobile */}
      {banner.type && (
        <div className={`md:fixed relative top-0 left-0 right-0 z-50 ${getBannerStyles()}`}>
          <div className="container mx-auto flex items-center justify-center">
            <span className="mr-2">{getBannerIcon()}</span>
            {renderBannerMessage()}
          </div>
        </div>
      )}
      
      <header className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-[#282c34]' : 'bg-gray-100'} text-${isDarkMode ? 'white' : 'gray-800'} transition-colors duration-200 py-16 ${banner.type ? 'md:pt-20' : ''}`}>
        <p className="bg-gradient-to-r from-[#57728B] to-orange-500 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent mb-12">
          Cubik65536's GPG Public Key
        </p>
        <div className="w-full max-w-3xl px-4">
          {/* PGP Fingerprint Section */}
          <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-[#1e2127]' : 'bg-white'} shadow-md`}>
            <div className="flex flex-col items-center">
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                PGP Fingerprint
              </h3>
              <div className={`font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} break-all`}>
                C7B9 299C E8FE 070E 2B47 3253 0662 9B81 4A16 551B
              </div>
              <button 
                onClick={handleFingerprintCopy}
                className={`mt-2 px-3 py-1 text-xs rounded-md transition-all duration-200 ${
                  fingerprintCopySuccess
                    ? 'bg-green-500 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                title="Copy fingerprint"
                aria-label="Copy fingerprint"
              >
                {fingerprintCopySuccess ? (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </span>
                ) : (
                  'Copy Fingerprint'
                )}
              </button>
            </div>
          </div>
          
          <div className={`${isDarkMode ? 'bg-[#1e2127]' : 'bg-white'} rounded-lg overflow-hidden shadow-xl`}>
            {/* Window Title Bar */}
            <div className={`${isDarkMode ? 'bg-[#2c2c2c]' : 'bg-gradient-to-b from-gray-100 to-gray-200'} px-4 py-2.5 flex items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-sm`}>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
              </div>
              <div className={`flex-1 text-center text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>pgp-public.asc</div>
            </div>
            {/* Copy Button */}
            <div className="relative">
              <button
                onClick={handleCopy}
                className={`absolute top-2 right-2 p-1.5 rounded-md transition-all duration-200 ${
                  copySuccess
                    ? 'bg-green-500 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                title="Copy to clipboard"
                aria-label="Copy to clipboard"
              >
                {copySuccess ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                )}
              </button>
            </div>
            {/* Code Content */}
            <pre className={`p-8 overflow-x-auto text-left font-mono text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <code>{GPG_PUBLIC_KEY}</code>
            </pre>
          </div>
        </div>
      </header>
      
      {/* Theme Switcher - Positioned above footer */}
      <div className={`fixed bottom-16 left-4 z-10`}>
        <button
          onClick={cycleThemeMode}
          className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200 shadow-md`}
          aria-label="Toggle theme"
          title={`Current mode: ${themeMode}`}
        >
          {getThemeIcon()}
        </button>
      </div>
      
      {/* Footer */}
      <footer className={`fixed bottom-0 left-0 right-0 py-3 text-center text-sm ${isDarkMode ? 'bg-[#282c34] text-gray-400' : 'bg-gray-100 text-gray-600'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors duration-200`}>
        <div className="container mx-auto px-4">
          <p>Copyright © {new Date().getFullYear()} <a href="https://cubik65536.top" className="underline">Cubik65536</a>. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
