/**
 * Simple Google Analytics event tracking utility
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// log the pageview with their URL
export const pageview = (url) => {
    if (typeof window !== "undefined" && window.gtag && GA_TRACKING_ID) {
        window.gtag("config", GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// log specific events
export const event = ({ action, params }) => {
    if (typeof window !== "undefined" && window.gtag && GA_TRACKING_ID) {
        window.gtag("event", action, params);
    }
};

/**
 * Common App Events
 */
export const trackContactClick = (location = 'navbar') => {
    event({
        action: 'contact_click',
        params: {
            event_category: 'engagement',
            event_label: location
        }
    });
};

export const trackInvoiceDownload = (orderId = 'unknown') => {
    event({
        action: 'invoice_download',
        params: {
            event_category: 'conversion',
            event_label: orderId
        }
    });
};

export const trackSearch = (query) => {
    event({
        action: 'search',
        params: {
            search_term: query
        }
    });
};
