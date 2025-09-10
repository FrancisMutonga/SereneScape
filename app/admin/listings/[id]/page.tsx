"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { db } from "@/app/firebase/client";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  Trash2,
  Plus,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  features: string[];
  location: string;
  price: string;
  type: string;
  categoryId: string;
  subcategory?: string;
  available: boolean;
  images: string[];
  videos: string[];
}

interface Category {
  id: string;
  name: string;
  Subcategory?: string;
}

export default function EditProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data() as Omit<Product, "id">;
          setProduct({ id: productSnap.id, ...productData });
        } else {
          router.push("/404");
          return;
        }

        const categoriesRef = collection(db, "category");
        const categoriesSnap = await getDocs(categoriesRef);
        const categoriesData: Category[] = [];

        categoriesSnap.forEach((doc) => {
          categoriesData.push({ id: doc.id, name: doc.data().name });
        });

        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleChange = <K extends keyof Product>(
    field: K,
    value: Product[K]
  ) => {
    if (!product) return;
    setProduct({ ...product, [field]: value });
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!product) return;
    const newFeatures = [...product.features];
    newFeatures[index] = value;
    handleChange("features", newFeatures);
  };

  const addFeature = () => {
    if (!product) return;
    handleChange("features", [...product.features, ""]);
  };

  const removeFeature = (index: number) => {
    if (!product) return;
    const newFeatures = product.features.filter((_, i) => i !== index);
    handleChange("features", newFeatures);
  };

  const handleVideoChange = (index: number, value: string) => {
    if (!product) return;
    const newVideos = [...product.videos];
    newVideos[index] = value;
    handleChange("videos", newVideos);
  };

  const addVideo = () => {
    if (!product) return;
    handleChange("videos", [...product.videos, ""]);
  };

  const removeVideo = (index: number) => {
    if (!product) return;
    const newVideos = product.videos.filter((_, i) => i !== index);
    handleChange("videos", newVideos);
  };

  const handleImageChange = (index: number, value: string) => {
    if (!product) return;
    const newImages = [...product.images];
    newImages[index] = value;
    handleChange("images", newImages);
  };

  const addImage = () => {
    if (!product) return;
    handleChange("images", [...product.images, ""]);
  };

  const removeImage = (index: number) => {
    if (!product) return;
    const newImages = product.images.filter((_, i) => i !== index);
    handleChange("images", newImages);
  };

  const handleSave = async () => {
    if (!product) return;

    setSaving(true);
    try {
      const productRef = doc(db, "products", product.id);

      const filteredFeatures = product.features.filter(
        (feature) => feature.trim() !== ""
      );
      const filteredImages = product.images.filter(
        (image) => image.trim() !== ""
      );
      const filteredVideos = product.videos.filter(
        (video) => video.trim() !== ""
      );

      await updateDoc(productRef, {
        name: product.name,
        location: product.location,
        price: product.price,
        type: product.type,
        categoryId: product.categoryId,
        subcategory: product.categoryId,
        available: product.available,
        features: filteredFeatures,
        images: filteredImages,
        videos: filteredVideos,
      });
      alert("Updated Successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => router.push("/admin/products")}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-xl mt-10 bg-white">
      <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-teal-700 text-center mb-8">
        Edit Product
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter product name"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={product.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter location"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="text"
              value={product.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter price (e.g., $100/month)"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Type</label>
            <input
              type="text"
              value={product.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter product type"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={product.categoryId}
              onChange={(e) => handleChange("categoryId", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Loading categories...
              </p>
            )}
          </div>

          {/* Available */}
          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-700">Available</label>
            <input
              type="checkbox"
              checked={product.available}
              onChange={(e) => handleChange("available", e.target.checked)}
              className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="text-sm text-gray-600">
              {product.available ? "Currently available" : "Not available"}
            </span>
          </div>
        </div>

        {/* Right Column - Image Preview */}
       <div className="flex flex-col p-4">
         <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Image Preview</h3>
          <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {product.images
              .filter((img) => img.trim() !== "")
              .map((image, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={image}
                    alt={`Product image ${index + 1}`}
                    height={60}
                    width={60}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNjRMMTI0IDQwSDE3NlY4OEgxMDBWNjRaIiBmaWxsPSIjOUNBM0FGIi8+CjxjaXJjbGUgY3g9IjEzMiIgY3k9IjU2IiByPSI4IiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPg==";
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs text-center px-2">
                      Image {index + 1}
                    </span>
                  </div>
                </div>
              ))}

            {product.images.filter((img) => img.trim() !== "").length === 0 && (
              <div className="col-span-2 flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center text-gray-500">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                  <p>No images added yet</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Preview */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Video Preview</h3>
          <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {product.videos
              .filter((vid) => vid.trim() !== "")
              .map((video, index) => (
                <div key={index} className="relative group">
                  <video
                    src={video}
                    controls
                    className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs text-center px-2">
                      Video {index + 1}
                    </span>
                  </div>
                </div>
              ))}

            {product.videos.filter((vid) => vid.trim() !== "").length === 0 && (
              <div className="col-span-2 flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center text-gray-500">
                  <VideoIcon className="w-8 h-8 mx-auto mb-2" />
                  <p>No videos added yet</p>
                </div>
              </div>
            )}
          </div>
        </div>
       </div>

       <div className="flex flex-col">
         {/* Features Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Features</h3>
            <button
              onClick={addFeature}
              className="flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>

          {product.features.length > 0 ? (
            <ol className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder={`Feature ${index + 1}`}
                  />
                  <button
                    onClick={() => removeFeature(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500 italic">
              No features added yet. Click &quot;Add Feature &quot; to get
              started.
            </p>
          )}
        </div>

        {/* Images Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Images</h3>
            <button
              onClick={addImage}
              className="flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Image URL
            </button>
          </div>

          {product.images.length > 0 ? (
            <div className="space-y-3">
              {product.images.map((image, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {index + 1}
                  </span>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter image URL"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No images added yet. Click &quot; Add Image URL &quot; to get
              started.
            </p>
          )}
        </div>
        {/* Videos Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Videos</h3>
            <button
              onClick={addVideo}
              className="flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Video URL
            </button>
          </div>

          {product.videos.length > 0 ? (
            <div className="space-y-3">
              {product.videos.map((video, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {index + 1}
                  </span>
                  <input
                    type="url"
                    value={video}
                    onChange={(e) => handleVideoChange(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter image URL"
                  />
                  <button
                    onClick={() => removeVideo(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No video added yet. Click &quot; Add Video URL &quot; to get
              started.
            </p>
          )}
        </div>
       </div>
      </div>
      {/* Save Button */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push("/admin/products")}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
    </div>
  );
}
