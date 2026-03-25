"use client";
import { useBrand } from "lib/BrandContext";

const MAP_URLS = {
    binw: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.7221458267713!2d-80.32240568497836!3d25.83166598355336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b9c2ffffffff%3A0x0!2s6120%20NW%2074th%20Ave%2C%20Doral%2C%20FL%2033166!5e0!3m2!1sen!2sus!4v1700000000000",
    unitec: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1234567890!2d-75.5812345!3d6.2312345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAutopista+Sur%2C+Medell%C3%ADn%2C+Colombia!5e0!3m2!1ses!2sco!4v1700000000001"
};

export default function Map() {
    const { activeBrand } = useBrand();
    const src = MAP_URLS[activeBrand] || MAP_URLS.binw;

    return (
        <iframe
            width="100%"
            height="512"
            style={{ border: 0 }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={src}
            title="Office Location"
        />
    );
}