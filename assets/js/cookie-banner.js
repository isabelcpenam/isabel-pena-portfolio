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
