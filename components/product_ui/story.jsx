import { Home, Building2, Ruler, Layers, Box, Grid3X3, Package } from "lucide-react";
import Stylish_H2 from "My_UI/stylish_h2";

export default function ProductStory({ product, description }) {
    if (!product) return null;
    const { category, subcategory, collection, itemsPerBox } = product;
    return (
        <section className="mt-20 ">
            <Stylish_H2 h2="Material & Application" />

            <p className="text-sm leading-relaxed text-gray-600 max-w-4/5">
                {description}
            </p>

            {/* Applications */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <ApplicationItem
                    icon={<Home className="h-full w-auto stroke-1" />}
                    title="Residential Interiors"
                    text="Ideal for modern homes, apartments, and interior detailing."
                />

                <ApplicationItem
                    icon={<Building2 className="h-full w-auto stroke-1" />}
                    title="Commercial Spaces"
                    text="Designed for offices, retail spaces, and high-traffic areas."
                />

                <ApplicationItem
                    icon={<Ruler className="h-full w-auto stroke-1"/>}
                    title="Architectural Detailing"
                    text="Precision-built for clean lines, trims, and finishing elements."
                />
            </div>

            <section className="mt-10 border-t border-gray-400  pt-10 ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <HighlightItem
                        icon={<Layers  />}
                        label="Category"
                        value={category}
                    />

                    <HighlightItem
                        icon={<Grid3X3  />}
                        label="Type"
                        value={subcategory}
                    />

                    <HighlightItem
                        icon={<Box  />}
                        label="Collection"
                        value={collection}
                    />

                    <HighlightItem
                        icon={<Package  />}
                        label="Packaging"
                        value={itemsPerBox ? `${itemsPerBox} item / box` : 'N/A'}
                    />
                </div>
            </section>
        </section>
    );
}

function ApplicationItem({ icon, title, text }) {
    return (
        <div className="grid relative items-start gap-4 shadow-md border-secondary border min-h-fit bg-primary px-3 py-3 rounded-2xl">

            <div className=" border-l-4 border-accent1/75 py-2 pl-2 ml-1">
                <p className="text-sm font-medium text-secondary tracking-wide">
                    {title}
                </p>
                <p className="mt-1 text-xs text-secondary/75 leading-relaxed">
                    {text}
                </p>
            </div>
            <div className="absolute top-2 right-2 mr-1 h-4/5 text-accent1/25">
                {icon}
            </div>
        </div>
    );
}

function HighlightItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4">
            <div className="mt-1 w-auto h-14 text-gray-700">
                {icon}
            </div>

            <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                    {label}
                </p>
                <p className="mt-1 text-sm font-medium">
                    {value}
                </p>
            </div>
        </div>
    );
}