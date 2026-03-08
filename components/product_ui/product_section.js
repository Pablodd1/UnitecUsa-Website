import AddToContainer from "My_UI/cart/addToContainer";
import GetFinalPrice from "My_UI/getFinalPrice";
import Image from "next/image";
import NotFoundPage from "../../app/not-found";

export default async function ProductSection({ product }) {

    return (
        product ?
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column - Image (Amazon style) */}
                <div className="lg:col-span-5 flex justify-center items-center h-[500px] lg:h-[600px] bg-white border border-gray-200 rounded-xl p-4 relative w-full sticky top-24">
                    <Image
                        src={product.image?.url || product.image || '/raster/product.jpg'}
                        alt={product.name || 'Product Image'}
                        className="object-contain p-4 mix-blend-multiply"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>

                {/* Middle Column - Product Info */}
                <div className="lg:col-span-4 flex flex-col pt-2 lg:pt-6">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                        {product.name}
                    </h1>
                    
                    <div className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-wider">
                        {product.collection || 'Collection'} • {product.category || 'Category'}
                    </div>

                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center text-yellow-500">
                                ★★★★☆
                            </span>
                            <span className="text-blue-600 hover:underline cursor-pointer">142 ratings</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="text-sm font-semibold text-gray-900 mb-2">About this item</div>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                            <li>{product.description}</li>
                            <li>Engineered for durability and high performance.</li>
                            <li>Perfectly suited for {product.subcategory?.toLowerCase() || 'various applications'}.</li>
                            {product.itemsPerBox && <li>Items per box: {product.itemsPerBox}</li>}
                        </ul>
                    </div>
                </div>

                {/* Right Column - Buy Box */}
                <div className="lg:col-span-3 pt-2 lg:pt-6">
                    <div className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm sticky top-24">
                        <div className="text-3xl font-medium text-gray-900 mb-4">
                            <GetFinalPrice basePrice={product.basePrice} discountPercent={product.discountPercent} />
                        </div>

                        <div className="mb-4">
                            <div className="text-green-700 font-semibold text-base mb-1">In Stock</div>
                            <div className="text-sm text-gray-600">Usually ships within 2-3 work days.</div>
                        </div>

                        <div className="mb-6 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Ships from</span>
                                <span className="font-semibold">Unitec USA Design</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Sold by</span>
                                <span className="font-semibold">Unitec USA Design</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Returns</span>
                                <span className="font-semibold text-blue-600">Eligible for Return</span>
                            </div>
                        </div>

                        <AddToContainer
                            item={{
                                id: product.id,
                                dimensions: product.dimensions,
                                price: product.basePrice,
                                name: product.name,
                                image: product.image?.url || product.image || '/raster/product.jpg'
                            }}
                            isProductPage
                        />
                        
                        <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-xs text-center border-t border-gray-100 pt-4">
                            <span>🔒 Secure transaction</span>
                        </div>
                    </div>
                </div>
            </section>
            : <NotFoundPage />
    );
}
