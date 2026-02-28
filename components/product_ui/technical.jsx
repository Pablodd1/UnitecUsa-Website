import { Home, Building, Ruler, Zap } from "lucide-react";
import Stylish_H2 from "My_UI/stylish_h2";
import { useLanguage } from "lib/LanguageContext";

export default function ProductUseCases({ description }) {
    const { t } = useLanguage();
    return (
        <section className="mt-20 max-w-6xl mx-auto px-4 md:px-0">
            <Stylish_H2 h2={t('technical.title')} />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Overview */}
                <div className="space-y-4">
                    <h3 className="text-sm uppercase tracking-wide text-gray-500">
                        {t('technical.overview.title')}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {description || t('technical.overview.text')}
                    </p>

                    <div className="mt-6 space-y-3 text-gray-600 text-sm">
                        <div className="flex items-start gap-3">
                            <Zap className="text-blue-600 mt-1" size={18} />
                            <span>{t('technical.overview.features.installation')}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Ruler className="text-blue-600 mt-1" size={18} />
                            <span>{t('technical.overview.features.precision')}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Building className="text-blue-600 mt-1" size={18} />
                            <span>{t('technical.overview.features.quality')}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Home className="text-blue-600 mt-1" size={18} />
                            <span>{t('technical.overview.features.residential')}</span>
                        </div>
                    </div>
                </div>

                {/* Ideal Applications */}
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold">
                        {t('technical.applications.title')}
                    </h3>

                    <div className="mt-4 space-y-4">
                        <Difference
                            icon={Home}
                            title={t('technical.applications.resi.title')}
                            text={t('technical.applications.resi.text')}
                        />
                        <Difference
                            icon={Building}
                            title={t('technical.applications.comm.title')}
                            text={t('technical.applications.comm.text')}
                        />
                        <Difference
                            icon={Ruler}
                            title={t('technical.applications.arch.title')}
                            text={t('technical.applications.arch.text')}
                        />
                        <Difference
                            icon={Zap}
                            title={t('technical.applications.reno.title')}
                            text={t('technical.applications.reno.text')}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Difference({ icon: Icon, title, text }) {
    return (
        <div className="flex gap-3">
            <Icon size={18} />
            <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm text-gray-600">{text}</p>
            </div>
        </div>
    )
}
