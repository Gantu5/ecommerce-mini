import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Eye, ShoppingCart, Package } from 'lucide-react';
import LikeButton from './LikeButton';

export type ProductCardProps = {
    product: {
        id: number;
        name: string;
        category: {
            id: number;
            name: string;
        } | null;
        description: string;
        price: number;
        stock: number;
        imageUrl: string;
        createdAt: string | Date;
        updatedAt: string | Date;
    };
    isLiked?: boolean;
    onLikeToggle?: () => void;
    viewMode?: 'grid' | 'list';
    onQuickView?: (productId: number) => void;
};

const ProductCard = ({
    product,
    isLiked = false,
    onLikeToggle,
    viewMode = 'grid',
    onQuickView,
}: ProductCardProps) => {
    const [imageLoading, setImageLoading] = useState(true);

    if (!product) return null;

    const isOutOfStock = product.stock <= 0;
    const isLowStock = product.stock > 0 && product.stock <= 5;

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onQuickView) {
            onQuickView(product.id);
        }
    };

    if (viewMode === 'list') {
        return (
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
                <div className="flex gap-6">
                    {/* Image */}
                    <Link
                        href={`/shop/product/${product.id}`}
                        className="relative w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0"
                    >
                        {imageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            </div>
                        )}
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className={`object-cover transition-opacity duration-200 ${
                                imageLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                            onLoad={() => setImageLoading(false)}
                        />
                        {isOutOfStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                    Out of Stock
                                </span>
                            </div>
                        )}
                    </Link>

                    {/* Info */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                            <Link href={`/shop/product/${product.id}`}>
                                <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>
                            </Link>
                            <button onClick={onLikeToggle} className="p-1">
                                <LikeButton isLiked={isLiked} />
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mb-2">
                            {product.category?.name ?? 'Ангилалгүй'}
                        </p>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {product.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-xl text-gray-900">
                                    {product.price.toLocaleString()}₮
                                </span>

                                {/* Stock Status */}
                                <div className="flex items-center gap-1">
                                    <Package className="h-4 w-4 text-gray-400" />
                                    <span
                                        className={`text-sm font-medium ${
                                            isOutOfStock
                                                ? 'text-red-600'
                                                : isLowStock
                                                  ? 'text-orange-600'
                                                  : 'text-green-600'
                                        }`}
                                    >
                                        {isOutOfStock
                                            ? 'Out of Stock'
                                            : isLowStock
                                              ? `Only ${product.stock} left`
                                              : `${product.stock} in stock`}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleQuickView}
                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Quick View"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button
                                    disabled={isOutOfStock}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isOutOfStock
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : 'bg-rose-500 text-white hover:bg-rose-600'
                                    }`}
                                >
                                    <ShoppingCart className="h-4 w-4 inline mr-2" />
                                    {isOutOfStock
                                        ? 'Unavailable'
                                        : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Grid view (default)
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group">
            <div className="relative">
                {/* Image */}
                <Link
                    href={`/shop/product/${product.id}`}
                    className="relative block h-48 bg-gray-200"
                >
                    {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        </div>
                    )}
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className={`object-cover transition-opacity duration-200 ${
                            imageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        onLoad={() => setImageLoading(false)}
                    />
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </Link>

                {/* Quick View Button */}
                <button
                    onClick={handleQuickView}
                    className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    title="Quick View"
                >
                    <Eye className="h-4 w-4 text-gray-700" />
                </button>

                {/* Like Button */}
                <button
                    onClick={onLikeToggle}
                    className="absolute top-2 left-2 p-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                    <LikeButton isLiked={isLiked} />
                </button>
            </div>

            {/* Info */}
            <div className="p-4">
                <Link href={`/shop/product/${product.id}`}>
                    <h3 className="font-medium text-base text-gray-800 hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-sm text-gray-500 mb-3">
                    {product.category?.name ?? 'Ангилалгүй'}
                </p>

                {/* Stock Status */}
                <div className="flex items-center gap-1 mb-3">
                    <Package className="h-3 w-3 text-gray-400" />
                    <span
                        className={`text-xs font-medium ${
                            isOutOfStock
                                ? 'text-red-600'
                                : isLowStock
                                  ? 'text-orange-600'
                                  : 'text-green-600'
                        }`}
                    >
                        {isOutOfStock
                            ? 'Out of Stock'
                            : isLowStock
                              ? `Only ${product.stock} left`
                              : `${product.stock} in stock`}
                    </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg text-gray-900">
                        {product.price.toLocaleString()}₮
                    </span>
                </div>

                <button
                    disabled={isOutOfStock}
                    className={`w-full py-2 text-sm rounded-lg font-medium transition-colors ${
                        isOutOfStock
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-rose-500 text-white hover:bg-rose-600'
                    }`}
                >
                    {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
