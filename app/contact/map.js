"use client";
import { useBrand } from "lib/BrandContext";

const MAP_URLS = {
    binw: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.610895586514!2d-75.59048539999999!3d6.182801200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e468350f650a9dd%3A0xb228a6687f4d86a1!2sIdeo%20Centro%20Comercial!5e0!3m2!1sen!2sus!4v1775932365388!5m2!1sen!2sus",
    unitec: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.7221458267713!2d-80.32240568497836!3d25.83166598355336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b9c2ffffffff%3A0x0!2s6120%20NW%2074th%20Ave%2C%20Doral%2C%20FL%2033166!5e0!3m2!1sen!2sus!4v1700000000000"
};

export default function Map() {
    const { activeBrand } = useBrand();
    const src = MAP_URLS[activeBrand] || MAP_URLS.binw;

    return (
        <div className="map-container overflow-hidden">
            <iframe
                width="100%"
                height="512"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={src}
                title="Office Location"
            />
        </div>
    );
}