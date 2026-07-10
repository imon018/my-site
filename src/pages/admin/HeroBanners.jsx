import { useEffect, useState } from "react";

import Button from "../../components/ui/Button";

import {
  uploadSingleImage,
} from "../../services/uploadService";

import {
  addBanner,
  getAllBanners,
  deleteBanner,
  canAddBanner,
} from "../../services/firestoreBannerService";

import {
  getProductsFromDB,
} from "../../services/firestoreProductService";

import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";

export default function HeroBanners() {
  const [products, setProducts] =
    useState([]);

  const [banners, setBanners] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [subtitle, setSubtitle] =
    useState("");

  const [productId, setProductId] =
    useState("");

  const [productName, setProductName] =
    useState("");

  const [
    whatsappNumber,
    setWhatsappNumber,
  ] = useState("8801406978619");

  const [offerPrice, setOfferPrice] =
    useState("");

  const [
    regularPrice,
    setRegularPrice,
  ] = useState("");

  const [badgeText, setBadgeText] =
    useState("Premium Collection");

  const [image, setImage] =
    useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        productData,
        bannerData,
      ] = await Promise.all([
        getProductsFromDB(),
        getAllBanners(),
      ]);

      setProducts(productData);
      setBanners(bannerData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductChange = (
    e
  ) => {
    const selectedId =
      e.target.value;

    setProductId(selectedId);

    const product =
      products.find(
        (item) =>
          item.id === selectedId
      );

    if (product) {
      setProductName(
        product.name
      );
    }
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setProductId("");
    setProductName("");
    setOfferPrice("");
    setRegularPrice("");
    setBadgeText(
      "Premium Collection"
    );
    setImage(null);

    const fileInput =
      document.getElementById(
        "hero-banner-image"
      );

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        !title ||
        !subtitle ||
        !productId ||
        !image
      ) {
        errorToast(
          "Please fill all required fields."
        );
        return;
      }

      try {
        setLoading(true);

        const allowed =
          await canAddBanner();

        if (!allowed) {
          errorToast(
            "Maximum 5 banners allowed."
          );
          return;
        }

        const uploaded =
          await uploadSingleImage(
            image
          );

        await addBanner({
          title,
          subtitle,

          image:
            uploaded.imageUrl,

          productId,

          productName,

          whatsappNumber,

          offerPrice:
            Number(
              offerPrice
            ) || 0,

          regularPrice:
            Number(
              regularPrice
            ) || 0,

          badgeText,
        });

        successToast(
          "Banner Added Successfully"
        );

        resetForm();

        loadData();
      } catch (error) {
        console.log(error);

        errorToast(
          "Failed To Add Banner"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this banner?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteBanner(id);

        successToast(
          "Banner Deleted"
        );

        loadData();
      } catch {
        errorToast(
          "Delete Failed"
        );
      }
    };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1
        className="
        text-4xl
        font-black
        mb-8
      "
      >
        Hero Banner Manager
      </h1>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="
        bg-white
        rounded-[30px]
        shadow-xl
        p-8
        border
      "
      >
        <div className="grid md:grid-cols-2 gap-5">

          <input
            className="
            w-full
            border
            rounded-2xl
            p-4
          "
            placeholder="Banner Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <input
            className="
            w-full
            border
            rounded-2xl
            p-4
          "
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) =>
              setSubtitle(
                e.target.value
              )
            }
          />

          <select
            value={productId}
            onChange={
              handleProductChange
            }
            className="
            w-full
            border
            rounded-2xl
            p-4
          "
          >
            <option value="">
              Select Product
            </option>

            {products.map(
              (product) => (
                <option
                  key={product.id}
                  value={
                    product.id
                  }
                >
                  {product.name}
                </option>
              )
            )}
          </select>

          <input
            className="
            w-full
            border
            rounded-2xl
            p-4
          "
            placeholder="WhatsApp Number"
            value={
              whatsappNumber
            }
            onChange={(e) =>
              setWhatsappNumber(
                e.target.value
              )
            }
          />

          <input
            className="
            w-full
            border
            rounded-2xl
            p-4
          "
            placeholder="Offer Price"
            value={offerPrice}
            onChange={(e) =>
              setOfferPrice(
                e.target.value
              )
            }
          />

          <input
            className="
            w-full
            border
            rounded-2xl
            p-4
          "
            placeholder="Regular Price"
            value={
              regularPrice
            }
            onChange={(e) =>
              setRegularPrice(
                e.target.value
              )
            }
          />

          <input
            className="
            w-full
            border
            rounded-2xl
            p-4
          "
            placeholder="Badge Text"
            value={badgeText}
            onChange={(e) =>
              setBadgeText(
                e.target.value
              )
            }
          />

          <input
            id="hero-banner-image"
            type="file"
            accept="image/*"
            className="
            w-full
            border
            rounded-2xl
            p-4
          "
            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }
          />

        </div>

        <Button
          type="submit"
          disabled={loading}
          className="
          w-full
          mt-6
        "
        >
          {loading
            ? "Uploading..."
            : "Save Banner"}
        </Button>

      </form>

      {/* BANNER LIST */}

      <div className="mt-10">

        <h2
          className="
          text-2xl
          font-black
          mb-5
        "
        >
          Current Banners (
          {banners.length}/5)
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          {banners.map(
            (banner) => (
              <div
                key={banner.id}
                className="
                bg-white
                rounded-[30px]
                overflow-hidden
                shadow-xl
                border
              "
              >
                <img
                  src={
                    banner.image
                  }
                  alt=""
                  className="
                  h-56
                  w-full
                  object-cover
                "
                />

                <div className="p-6">

                  <h3
                    className="
                    text-xl
                    font-black
                  "
                  >
                    {banner.title}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {
                      banner.subtitle
                    }
                  </p>

                  <div className="mt-4 space-y-2 text-sm">

                    <p>
                      Product:
                      {" "}
                      {
                        banner.productName
                      }
                    </p>

                    <p>
                      Offer:
                      ৳
                      {
                        banner.offerPrice
                      }
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        banner.id
                      )
                    }
                    className="
                    mt-5
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-5
                    py-3
                    rounded-xl
                  "
                  >
                    Delete Banner
                  </button>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}
