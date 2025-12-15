import { useState, useEffect } from 'react';

interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}

interface CountryCodeSelectorProps {
  value: string;
  onChange: (dialCode: string) => void;
}

// Function to get flag emoji from country code
function getCountryFlag(countryCode: string): string {
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...(codePoints as any));
  } catch (err) {
    return '🌍'; // Fallback to globe emoji if flag generation fails
  }
}

// Function to get country name from country code
function getCountryName(countryCode: string): string {
  const countryNames: { [key: string]: string } = {
    'US': 'United States',
    'GB': 'United Kingdom',
    'IN': 'India',
    'CA': 'Canada',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'JP': 'Japan',
    'CN': 'China',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'SG': 'Singapore',
    'AE': 'UAE',
    'SA': 'Saudi Arabia',
    'NZ': 'New Zealand',
    'RU': 'Russia',
    'IT': 'Italy',
    'ES': 'Spain',
    'NL': 'Netherlands',
    'BE': 'Belgium',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'PL': 'Poland',
    'ZA': 'South Africa',
    'KR': 'South Korea',
    'TH': 'Thailand',
    'MY': 'Malaysia',
    'ID': 'Indonesia',
    'PH': 'Philippines',
    'VN': 'Vietnam',
    'PK': 'Pakistan',
    'BD': 'Bangladesh',
    'LK': 'Sri Lanka',
    'NG': 'Nigeria',
    'EG': 'Egypt',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'CZ': 'Czech Republic',
    'GR': 'Greece',
    'PT': 'Portugal',
    'IE': 'Ireland',
    'IL': 'Israel',
    'TR': 'Turkey',
    'IQ': 'Iraq',
    'IR': 'Iran',
    'JO': 'Jordan',
    'LB': 'Lebanon',
    'SY': 'Syria',
    'YE': 'Yemen',
    'OM': 'Oman',
    'QA': 'Qatar',
    'KW': 'Kuwait',
    'BH': 'Bahrain',
    'TN': 'Tunisia',
    'DZ': 'Algeria',
    'MA': 'Morocco',
    'LY': 'Libya',
    'SD': 'Sudan',
    'ET': 'Ethiopia',
    'KE': 'Kenya',
    'UG': 'Uganda',
    'TZ': 'Tanzania',
    'MW': 'Malawi',
    'ZM': 'Zambia',
    'ZW': 'Zimbabwe',
    'AR': 'Argentina',
    'CL': 'Chile',
    'CO': 'Colombia',
    'PE': 'Peru',
    'VE': 'Venezuela',
    'EC': 'Ecuador',
    'BO': 'Bolivia',
    'PY': 'Paraguay',
    'UY': 'Uruguay',
    'KH': 'Cambodia',
    'LA': 'Laos',
    'MM': 'Myanmar',
    'NP': 'Nepal',
    'AF': 'Afghanistan',
    'AZ': 'Azerbaijan',
    'KZ': 'Kazakhstan',
    'UZ': 'Uzbekistan',
    'TJ': 'Tajikistan',
    'TM': 'Turkmenistan',
    'KG': 'Kyrgyzstan',
    'MD': 'Moldova',
    'UA': 'Ukraine',
    'BY': 'Belarus',
    'RS': 'Serbia',
    'HR': 'Croatia',
    'SI': 'Slovenia',
    'CY': 'Cyprus',
    'MT': 'Malta',
    'LU': 'Luxembourg',
    'IS': 'Iceland',
    'AL': 'Albania',
    'ME': 'Montenegro',
    'MK': 'North Macedonia',
    'BA': 'Bosnia and Herzegovina',
    'HU': 'Hungary',
    'SK': 'Slovakia',
    'RO': 'Romania',
    'BG': 'Bulgaria',
    'LV': 'Latvia',
    'LT': 'Lithuania',
    'EE': 'Estonia',
    'HK': 'Hong Kong',
    'TW': 'Taiwan',
    'MO': 'Macau',
    'MN': 'Mongolia',
    'BN': 'Brunei',
    'FJ': 'Fiji',
    'PG': 'Papua New Guinea',
  };
  return countryNames[countryCode] || countryCode;
}

export function CountryCodeSelector({ value, onChange }: CountryCodeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch countries from API
  useEffect(() => {
    const fetchWithTimeout = (url: string, opts: any = {}, timeout = 7000) => {
      return Promise.race([
        fetch(url, opts),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), timeout)
        ),
      ]);
    };

    const transformData = (data: Record<string, any>): Country[] => {
      const list: Country[] = Object.entries(data)
        .map(([code, dialCode]: [string, any]) => {
          let formattedDialCode = String(dialCode || '').trim();

          // Normalize complex entries
          if (formattedDialCode.includes(' and ')) {
            formattedDialCode = formattedDialCode.split(' and ')[0].trim();
          }
          if (formattedDialCode.includes('-')) {
            formattedDialCode = formattedDialCode.split('-')[0].trim();
          }

          if (formattedDialCode && !formattedDialCode.startsWith('+')) {
            formattedDialCode = '+' + formattedDialCode;
          }

          return {
            code: code.toUpperCase(),
            name: getCountryName(code.toUpperCase()),
            dialCode: formattedDialCode,
            flag: getCountryFlag(code.toUpperCase()),
          };
        })
        .filter((c) => c.dialCode && c.dialCode !== '+' && c.dialCode.length > 1);

      // Sort and put India on top
      list.sort((a, b) => a.name.localeCompare(b.name));
      const i = list.findIndex((c) => c.code === 'IN');
      if (i > 0) {
        const india = list.splice(i, 1)[0];
        list.unshift(india);
      }
      return list;
    };

    const FALLBACK: Country[] = [
      { code: 'IN', name: 'India', dialCode: '+91', flag: getCountryFlag('IN') },
      { code: 'US', name: 'United States', dialCode: '+1', flag: getCountryFlag('US') },
      { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: getCountryFlag('GB') },
      { code: 'CA', name: 'Canada', dialCode: '+1', flag: getCountryFlag('CA') },
      { code: 'AU', name: 'Australia', dialCode: '+61', flag: getCountryFlag('AU') },
    ];

    const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try cached value first
        const cached = sessionStorage.getItem('country_codes_v1');
        if (cached) {
          try {
            const parsed = JSON.parse(cached) as Country[];
            setCountries(parsed);
            setLoading(false);
            return;
          } catch (_) {
            sessionStorage.removeItem('country_codes_v1');
          }
        }

        // Primary: try local bundled copy (no CORS issues)
        try {
          const res = await fetchWithTimeout('/phone.json', { headers: { Accept: 'application/json' } }, 5000) as Response;
          if (res.ok) {
            const data = await res.json();
            const list = transformData(data);
            setCountries(list);
            sessionStorage.setItem('country_codes_v1', JSON.stringify(list));
            console.log('✅ Loaded countries from local bundle');
            return;
          }
        } catch (err) {
          console.warn('Local bundle fetch failed:', err);
        }

        // Secondary: try direct fetch from country.io (may be blocked by CORS)
        try {
          const res = await fetchWithTimeout('https://country.io/phone.json', { headers: { Accept: 'application/json' } }, 7000) as Response;
          if (res.ok) {
            const data = await res.json();
            const list = transformData(data);
            setCountries(list);
            sessionStorage.setItem('country_codes_v1', JSON.stringify(list));
            console.log('✅ Loaded countries from country.io');
            return;
          }
        } catch (err) {
          console.warn('Direct fetch from country.io failed:', err);
        }

        // Tertiary: try AllOrigins proxy (less reliable)
        try {
          const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://country.io/phone.json');
          const res2 = await fetchWithTimeout(proxyUrl, { headers: { Accept: 'application/json' } }, 8000) as Response;
          if (res2.ok) {
            const data2 = await res2.json();
            const list2 = transformData(data2);
            setCountries(list2);
            sessionStorage.setItem('country_codes_v1', JSON.stringify(list2));
            console.log('✅ Loaded countries from proxy');
            return;
          }
        } catch (err) {
          console.warn('Proxy fetch failed:', err);
        }

        // Fallback: use embedded list
        console.warn('⚠️ Using fallback country list');
        setCountries(FALLBACK);
        setError('Could not load full country list; using limited fallback.');
      } catch (err) {
        console.error('Error fetching countries (fatal):', err);
        setError('Failed to load countries');
        setCountries(FALLBACK);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const selectedCountry = countries.find((c) => c.dialCode === value) || countries[0];

  const handleSelect = (dialCode: string) => {
    onChange(dialCode);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="country-selector">
        <button
          className="country-selector__button country-selector__button--loading"
          type="button"
          disabled
        >
          <span className="country-selector__code">Loading...</span>
        </button>
      </div>
    );
  }

  if (error || countries.length === 0) {
    return (
      <div className="country-selector">
        <button
          className="country-selector__button country-selector__button--error"
          type="button"
          disabled
          title={error || 'No countries available'}
        >
          <span className="country-selector__code">Error</span>
        </button>
      </div>
    );
  }

  return (
    <div className="country-selector">
      <button
        className="country-selector__button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="country-selector__flag">{selectedCountry?.flag}</span>
        <span className="country-selector__code">{selectedCountry?.dialCode}</span>
        <span className="country-selector__arrow">▼</span>
      </button>

      {isOpen && (
        <div className="country-selector__dropdown">
          {countries.map((country) => (
            <button
              key={country.code}
              className={`country-selector__option ${
                country.dialCode === value ? 'country-selector__option--active' : ''
              }`}
              onClick={() => handleSelect(country.dialCode)}
              type="button"
            >
              <span className="country-selector__option-flag">{country.flag}</span>
              <span className="country-selector__option-name">{country.name}</span>
              <span className="country-selector__option-code">{country.dialCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
