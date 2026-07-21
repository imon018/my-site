import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiAward,
  FiChevronRight,
  FiShare2,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import RelatedProducts from "./RelatedProducts";
import ProductReviews from "./product/ProductReviews";
import ProductRating from "./product/ProductRating";

import { useSettings } from "../context/SettingsContext";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import {
  getProductById,
} from "../services/firestoreProductService";


export default function ProductDetailsView() {

  const { id } = useParams();

  const { addToCart } = useCart();

  const { settings } = useSettings();

  const {
    isWishlisted,
    toggleWishlist,
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {

    const loadProduct = async () => {

      try {

        const data = await getProductById(id);

        setProduct(data);

        if (data?.images?.length) {
          setSelectedImage(data.images[0]);
        } else {
          setSelectedImage(data.image);
        }

        setActiveIndex(0);
        setQuantity(1);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    loadProduct();

  }, [id]);


  if (loading) {

    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          <p className="text-xs tracking-[0.3em] uppercase text-primary/50 font-medium">
            Loading
          </p>
        </div>
      </div>
    );

  }


  if (!product) {

    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">
            Product Not Found
          </h2>
          <p className="text-sm text-muted mt-2">
            This item may have been removed or is no longer available.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-6 text-sm font-semibold text-accent border-b border-accent/40 hover:border-accent"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );

  }


  const galleryImages =
    product.images?.length ? product.images : [product.image];

  const wishlisted = isWishlisted(product.id);

  const inStock = product.stock > 0;

  const maxQty = Math.min(product.stock || 1, 10);


  const handleQty = (dir) => {
    setQuantity((prev) => {
      const next = prev + dir;
      if (next < 1) return 1;
      if (next > maxQty) return maxQty;
      return next;
    });
  };


  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };


  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on Dream Mode`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(err);
      }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  };


  const skuCode = `DM-${(product.id || "").slice(-6).toUpperCase()}`;


  return (

    <div className="min-h-screen bg-cream pb-24 lg:pb-12">

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 lg:pt-10">

        {/* BREADCRUMB */}

        <nav className="flex items-center gap-1.5 text-xs text-muted mb-6 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <FiChevronRight size={12} className="shrink-0" />
          <Link to="/shop" className="hover:text-accent transition-colors">
            Shop
          </Link>
          {product.category && (
            <>
              <FiChevronRight size={12} className="shrink-0" />
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="hover:text-accent transition-colors capitalize"
              >
                {product.category}
              </Link>
            </>
          )}
          <FiChevronRight size={12} className="shrink-0" />
          <span className="text-primary font-medium truncate max-w-[160px]">
            {product.name}
          </span>
        </nav>


        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">


          {/* ============ GALLERY ============ */}

          <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-5 lg:sticky lg:top-6 lg:self-start">

            {/* THUMBNAILS */}

            {galleryImages.length > 1 && (
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible lg:w-[76px] shrink-0 pb-1 lg:pb-0">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(img);
                      setActiveIndex(index);
                    }}
                    className={`
                      relative shrink-0 w-16 h-16 lg:w-full lg:h-[76px]
                      rounded-xl overflow-hidden
                      border transition-all duration-300
                      ${
                        activeIndex === index
                          ? "border-gold ring-2 ring-gold/30"
                          : "border-black/10 hover:border-gold/50"
                      }
                    `}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* MAIN IMAGE */}

            <div className="relative flex-1">

              <div className="relative bg-white rounded-3xl border border-black/[0.06] shadow-luxury p-6 md:p-10 overflow-hidden group">

                {/* corner frame accents */}
                <span className="pointer-events-none absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/70 rounded-tl-md" />
                <span className="pointer-events-none absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/70 rounded-tr-md" />
                <span className="pointer-events-none absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold/70 rounded-bl-md" />
                <span className="pointer-events-none absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/70 rounded-br-md" />

                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-[340px] md:h-[520px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {galleryImages.length > 1 && (
                  <span className="absolute bottom-5 right-5 px-3 py-1 rounded-full bg-primary/90 text-cream text-[11px] font-semibold tracking-wide backdrop-blur">
                    {activeIndex + 1} / {galleryImages.length}
                  </span>
                )}

              </div>

              {/* WISHLIST + SHARE */}

              <div className="absolute top-4 right-4 flex flex-col gap-2">

                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Toggle wishlist"
                  className={`
                    w-11 h-11 rounded-full flex items-center justify-center
                    border shadow-sm backdrop-blur transition-all duration-300
                    ${
                      wishlisted
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-white/90 border-black/10 text-primary hover:text-red-500 hover:border-red-200"
                    }
                  `}
                >
                  <FiHeart
                    size={18}
                    style={wishlisted ? { fill: "currentColor" } : undefined}
                  />
                </button>

                <button
                  onClick={handleShare}
                  aria-label="Share product"
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-black/10 bg-white/90 text-primary hover:text-accent hover:border-gold/40 shadow-sm backdrop-blur transition-all duration-300"
                >
                  <FiShare2 size={16} />
                </button>

              </div>

            </div>

          </div>


          {/* ============ PRODUCT INFO ============ */}

          <div>

            {product.category && (
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-accent">
                  {product.category}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
              </div>
            )}

            <h1 className="text-3xl md:text-[2.75rem] font-bold leading-[1.1] text-primary">
              {product.name}
            </h1>

            <ProductRating productId={product.id} />

            {/* PRICE + STOCK */}

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4 py-5 border-y border-black/[0.08]">

              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted mb-1">
                  Price
                </p>
                <p className="text-4xl font-bold bg-gold-gradient bg-clip-text text-transparent">
                  ৳{Number(product.price).toLocaleString()}
                </p>
                <p className="text-xs text-muted mt-1">
                  Inclusive of all taxes
                </p>
              </div>

              {inStock ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  In Stock — {product.stock} left
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Out of Stock
                </span>
              )}

            </div>

            {/* DESCRIPTION */}

            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary/70 mb-2">
                Description
              </h3>
              <p className="text-[15px] leading-7 text-slate-600">
                {product.description}
              </p>
            </div>

            {/* QUANTITY */}

            {inStock && (
              <div className="mt-7 flex items-center gap-4">
                <span className="text-sm font-semibold text-primary">
                  Quantity
                </span>
                <div className="flex items-center border border-black/10 rounded-full overflow-hidden">
                  <button
                    onClick={() => handleQty(-1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-cream transition-colors text-primary disabled:opacity-30"
                    disabled={quantity <= 1}
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="w-10 text-center font-bold text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQty(1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-cream transition-colors text-primary disabled:opacity-30"
                    disabled={quantity >= maxQty}
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ACTIONS */}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">

              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="
                  flex-1 h-14 rounded-full bg-primary text-white font-semibold
                  flex items-center justify-center gap-2
                  shadow-luxury transition-all duration-300
                  hover:bg-gold hover:text-primary
                  disabled:opacity-40 disabled:hover:bg-primary disabled:hover:text-white disabled:cursor-not-allowed
                "
              >
                <FiShoppingBag size={18} />
                Add To Cart
              </button>

              <a
                href={`https://wa.me/${settings.whatsapp?.replace(/\D/g, "")}?text=${encodeURIComponent(`I'm interested in ${product.name}`)}`}
                target="_blank"
                rel="noreferrer"
                className="
                  flex-1 h-14 rounded-full bg-[#25D366] text-white font-semibold
                  flex items-center justify-center gap-2
                  shadow-luxury transition-all duration-300
                  hover:bg-[#1ebe5a]
                "
              >
                <FaWhatsapp size={19} />
                Order on WhatsApp
              </a>

            </div>

            {/* TRUST STRIP */}

            <div className="mt-8 grid grid-cols-3 divide-x divide-black/[0.08] rounded-2xl border border-black/[0.08] bg-white/60">

              {[
                { icon: FiTruck, label: "Fast Delivery" },
                { icon: FiShield, label: "Secure Payment" },
                { icon: FiAward, label: "Premium Quality" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1.5 py-4 px-2"
                >
                  <Icon size={18} className="text-gold" />
                  <span className="text-[11px] font-semibold text-primary/80 leading-tight">
                    {label}
                  </span>
                </div>
              ))}

            </div>

            {/* SKU */}

            <p className="mt-5 text-[11px] tracking-widest uppercase text-muted">
              Product code — <span className="font-mono text-primary/60">{skuCode}</span>
            </p>

          </div>

        </div>

        {/* REVIEWS */}

        <div id="reviews" className="mt-16 scroll-mt-20">
          <ProductReviews productId={product.id} />
        </div>

        {/* RELATED PRODUCTS */}

        <div className="mt-16">

          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary shrink-0">
              You May Also Like
            </h2>
            <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
          </div>

          <RelatedProducts currentId={product.id} />

        </div>

      </div>

      {/* MOBILE STICKY BUY BAR */}

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-black/10 px-4 py-3 flex items-center gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">

        <div className="shrink-0">
          <p className="text-[10px] uppercase tracking-widest text-muted leading-none mb-1">
            Price
          </p>
          <p className="text-lg font-bold text-primary leading-none">
            ৳{Number(product.price).toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="
            flex-1 h-12 rounded-full bg-primary text-white font-semibold text-sm
            flex items-center justify-center gap-2
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          <FiShoppingBag size={16} />
          {inStock ? "Add To Cart" : "Out of Stock"}
        </button>

      </div>

    </div>

  );

}
