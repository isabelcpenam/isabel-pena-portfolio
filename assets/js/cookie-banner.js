(function () {
    const consentKey = 'cookieConsent';
    const measurementId = 'G-RGS8HKEWTC';

    function loadAnalytics() {
        if (document.querySelector('script[data-google-analytics]')) return;

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', measurementId);

        const analyticsScript = document.createElement('script');
        analyticsScript.async = true;
        analyticsScript.dataset.googleAnalytics = 'true';
        analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(analyticsScript);
    }

    const changePreferencesButton = document.getElementById('change-cookie-preferences');
    if (changePreferencesButton) {
        changePreferencesButton.addEventListener('click', function () {
            window.localStorage.removeItem(consentKey);
            window.location.reload();
        });
    }

    const savedConsent = window.localStorage.getItem(consentKey);
    if (savedConsent === 'accepted') {
        loadAnalytics();
        return;
    }
    if (savedConsent === 'rejected') return;

    const banner = document.createElement('section');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie preferences');
    banner.innerHTML = `
        <div class="cookie-content">
            <p>This site uses optional Google Analytics cookies to understand how visitors use it. You can accept or reject analytics. Read the <a href="./privacy.html">Privacy Policy</a>.</p>
            <div class="cookie-actions">
                <button id="cookie-reject" type="button">Reject</button>
                <button id="cookie-accept" type="button">Accept</button>
            </div>
        </div>
    `;

    const bannerStyle = document.createElement('style');
    bannerStyle.textContent = `
        #cookie-banner {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            background: #1a1a1a !important;
            border-top: 1px solid #333 !important;
            padding: 16px 24px !important;
            z-index: 99999 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
            box-sizing: border-box !important;
        }
        #cookie-banner .cookie-content {
            max-width: 1200px !important;
            margin: 0 auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 20px !important;
            flex-wrap: wrap !important;
        }
        #cookie-banner .cookie-content p {
            margin: 0 !important;
            font-size: 14px !important;
            color: #ccc !important;
            line-height: 1.5 !important;
            flex: 1 1 300px !important;
        }
        #cookie-banner .cookie-content a {
            color: #ae8035 !important;
            text-decoration: underline !important;
        }
        #cookie-banner button {
            padding: 10px 24px !important;
            border-radius: 6px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            font-size: 14px !important;
            border: 1px solid #444 !important;
            background: #2a2a2a !important;
            color: #fff !important;
            min-width: 100px !important;
        }
        #cookie-banner #cookie-accept {
            background: #ae8035 !important;
            color: #000 !important;
            border: 1px solid #ae8035 !important;
        }
        #cookie-banner #cookie-reject {
            background: transparent !important;
            color: #ccc !important;
        }
        #cookie-banner button:hover {
            opacity: 0.85 !important;
        }
        @media (max-width: 600px) {
            #cookie-banner {
                padding: 16px !important;
            }
            #cookie-banner .cookie-actions {
                width: 100% !important;
                display: flex !important;
                gap: 10px !important;
            }
            #cookie-banner button {
                flex: 1 1 0 !important;
            }
        }
    `;
    document.head.appendChild(bannerStyle);
    document.body.appendChild(banner);

    function saveConsent(value) {
        window.localStorage.setItem(consentKey, value);
        banner.remove();
        if (value === 'accepted') loadAnalytics();
    }

    document.getElementById('cookie-accept').addEventListener('click', function () {
        saveConsent('accepted');
    });
    document.getElementById('cookie-reject').addEventListener('click', function () {
        saveConsent('rejected');
    });
})();
