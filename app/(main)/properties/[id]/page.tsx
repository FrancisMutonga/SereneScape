"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { db } from "../../../firebase/client";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Product {
  id: string;
  name: string;
  features: string[];
  location: string;
  price: string;
  type: string;
  categoryId: string;
  available: boolean;
  images: string[];
  videos?: string[];
}

interface Category {
  id: string;
  name: string;
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data() as Omit<Product, "id">;
          setProduct({ id: productSnap.id, ...productData });

          if (productData.categoryId) {
            const categoryRef = doc(db, "category", productData.categoryId);
            const categorySnap = await getDoc(categoryRef);
            if (categorySnap.exists()) {
              setCategory((categorySnap.data() as Category).name);
            }
          }

          if (productData.features && Array.isArray(productData.features)) {
            setFeatures(productData.features);
          }
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bgreen"></div>
      </div>
    );
  }

  if (!id)
    return (
      <p className="text-center mt-10 text-red-500">Invalid product ID.</p>
    );
  if (!product)
    return (
      <p className="text-center mt-10 text-gray-500">Invalid product...</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg mt-20">
      <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-bgreen text-center">
        {product.name}
      </h2>

      {/* Image carousel */}
      <EmblaCarousel images={product.images} onZoom={setZoomSrc} />

      <div className="mt-2 space-y-3">
        <p className="text-lg font-semibold text-bgreen">Features:</p>
        <ul className="list-disc ml-6">
          {features.map((feature, index) => (
            <li key={index} className="text-md text-gray-700">
              {feature}
            </li>
          ))}
        </ul>
        <p className="text-md">
          <strong>Category:</strong> {category}
        </p>
        <p className="text-md">
          <strong>Price:</strong> {product.price}
        </p>
        <p className="text-md">
          <strong>Location:</strong> {product.location}
        </p>
        <p className="text-md">
          <strong>Type:</strong> {product.type}
        </p>

        <p
          className={`text-md font-semibold ${
            product.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.available ? "Available" : "Out of Stock"}
        </p>
      </div>

      {/* Videos Section */}
      {product.videos && product.videos.length > 0 && (
        <div className="mt-6 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-bgreen text-center mb-3">
            Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            {product.videos.map((video, index) => (
              <video
                key={index}
                controls
                className="rounded-lg w-full h-[250px] object-cover shadow-md cursor-pointer"
                onClick={() => setZoomSrc(video)}
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
        </div>
      )}

      {/* Back button */}
      <Link
        href="/properties"
        className="mt-6 block text-center w-1/2 mx-auto text-bgreen px-4 py-2 rounded-full shadow-md hover:bg-bgreen hover:text-white transition"
      >
        Back to Products
      </Link>

      {zoomSrc && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 overflow-auto">
          <div className="relative w-full h-full p-4 flex justify-center items-center">
            <button
              onClick={() => setZoomSrc(null)}
              className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
            >
              ✕
            </button>

            {zoomSrc.endsWith(".mp4") ? (
              <video
                src={zoomSrc}
                controls
                autoPlay
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
              />
            ) : (
              <img
                src={zoomSrc}
                alt="Zoomed content"
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Carousel Component
const EmblaCarousel = ({
  images,
  onZoom,
}: {
  images: string[];
  onZoom: (src: string) => void;
}) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  return (
    <div className="overflow-hidden rounded-lg p-4 shadow-md" ref={emblaRef}>
      <div className="flex">
        {images.map((image, index) => (
          <div key={index} className="flex-none w-full">
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              width={600}
              height={400}
              className="object-contain w-full h-[400px] cursor-zoom-in"
              priority
              onClick={() => onZoom(image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
