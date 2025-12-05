import { formatCurrency } from "../utils/formatCurrency";
import Button from "./Button";
import SwatchGroup from "./SwatchGroup";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { addToCart } from "../features/cart/slice";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";

const ProductInfo = ({ product, onToggleReviews, isReviewsVisible = false }) => {
  const dispatch = useDispatch();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [additionalCost, setAdditionalCost] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const {
    id,
    name,
    price,
    discounted_price,
    thumbnail,
    variants: variantsData = [],
    description
  } = product;

  // Transform variants into the required format
  const transformVariants = (variants) => {
    const variantMap = {};

    variants.forEach(variant => {
      const variantName = variant.name.toLowerCase();
      if (!variantMap[variantName]) {
        variantMap[variantName] = [];
      }

      // Add the variant value if it's not already in the array
      if (!variantMap[variantName].includes(variant.value)) {
        variantMap[variantName].push(variant.value);
      }

      // Add other variant info
      if (!variantMap[`${variantName}_details`]) {
        variantMap[`${variantName}_details`] = [];
      }
      variantMap[`${variantName}_details`].push({
        id: variant.id,
        value: variant.value,
        additional_price: variant.additional_price,
        stock: variant.stock,
        created_at: variant.created_at
      });
    });

    return variantMap;
  };

  const variants = useMemo(() => transformVariants(variantsData), [variantsData]);

  // For backward compatibility - memoized to prevent unnecessary re-renders
  const productColor = useMemo(() => {
    return variants.color_details?.map(variant => ({
      value: variant.value,
      label: variant.value,
      additional_price: variant.additional_price,
      stock: variant.stock
    })) || [];
  }, [variants.color_details]);

  const productSize = useMemo(() => {
    return variants.size_details?.map(variant => ({
      value: variant.value,
      label: variant.value,
      additional_price: variant.additional_price,
      stock: variant.stock
    })) || [];
  }, [variants.size_details]);

  useEffect(() => {
    if (productColor.length > 0 && !selectedColor) {
      setSelectedColor(productColor[0]?.value || '');
    }
    if (productSize.length > 0 && !selectedSize) {
      setSelectedSize(productSize[0]?.value || '');
    }
  }, [productColor.length, productSize.length, selectedColor, selectedSize, productColor, productSize]);

  // Calculate additional cost based on selected variants
  useEffect(() => {
    let totalAdditional = 0;

    // Add color additional price if selected
    if (selectedColor) {
      const colorVariant = variants.color_details?.find(v => v.value === selectedColor);
      if (colorVariant?.additional_price) {
        totalAdditional += parseFloat(colorVariant.additional_price) || 0;
      }
    }

    // Add size additional price if selected
    if (selectedSize) {
      const sizeVariant = variants.size_details?.find(v => v.value === selectedSize);
      if (sizeVariant?.additional_price) {
        totalAdditional += parseFloat(sizeVariant.additional_price) || 0;
      }
    }

    setAdditionalCost(totalAdditional);
  }, [selectedColor, selectedSize, variants]);

  // Calculate final price including any additional costs from variants
  const finalPrice = (parseFloat(discounted_price || price) + additionalCost).toFixed(2);

  const handleAddToCart = async () => {
    if (!isMounted) return;

    try {
      if (productColor.length > 0 && !selectedColor) {
        toast.error('Please select a color');
        return;
      }

      if (productSize.length > 0 && !selectedSize) {
        toast.error('Please select a size');
        return;
      }

      setIsAddingToCart(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newItem = {
        id: `${id}-${selectedColor || ''}-${selectedSize || ''}`,
        productId: id,
        name,
        newPrice: parseFloat(finalPrice), // Final price including additional costs
        price: parseFloat(discounted_price || price), // Original price without additional costs
        additionalCost, // Additional cost from variants
        thumbnail,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
        selected_variants: [
          ...(selectedColor ? [{
            name: 'color',
            id: variants.color_details?.find(v => v.value === selectedColor)?.id || selectedColor,
            value: selectedColor,
            additional_price: parseFloat(variants.color_details?.find(v => v.value === selectedColor)?.additional_price || 0),
          }] : []),
          ...(selectedSize ? [{
            name: 'size',
            id: variants.size_details?.find(v => v.value === selectedSize)?.id || selectedSize,
            value: selectedSize,
            additional_price: parseFloat(variants.size_details?.find(v => v.value === selectedSize)?.additional_price || 0),
          }] : []),
          // Add any other variant types here following the same pattern
        ].filter(Boolean), // Remove any undefined entries
      };
      console.log({ newItem });
      dispatch(addToCart(newItem));

      toast.success(`${name} has been added to your cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      if (isMounted) {
        setIsAddingToCart(false);
      }
    }
  };

  return (
    // Main container with vertical spacing between child elements
    <div className="flex flex-col space-y-6">
      {/* Product Title */}
      <h1 className="text-text-primary text-3xl font-bold lg:text-4xl">
        {name}
      </h1>
      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-4">
          <span className="text-text-primary text-2xl font-medium lg:text-3xl">
            {formatCurrency(discounted_price || price)}
          </span>
          {discounted_price && (
            <span className="text-text-secondary/70 text-lg line-through opacity-70">
              {formatCurrency(price)}
            </span>
          )}
        </div>
        {additionalCost > 0 && (
          <p className="text-sm text-gray-500">
            +{formatCurrency(additionalCost)} additional for selected variants
          </p>
        )}
      </div>
      {/* Product Description */}
      <p className="text-text-secondary leading-relaxed">{description}</p>
      {/* Swatch Groups */}
      <div className="space-y-6">
        {productColor.length > 0 && (
          <SwatchGroup
            label="Color"
            type="color"
            options={productColor}
            selectedValue={selectedColor}
            onChange={setSelectedColor}
          />
        )}
        {productSize.length > 0 && (
          <SwatchGroup
            label="Size"
            type="size"
            options={productSize}
            selectedValue={selectedSize}
            onChange={setSelectedSize}
          />
        )}
      </div>
      {/* Delivery Info */}
      <div className="py-4 text-sm">
        <p className="font-semibold">
          Buy now and receive between February 12th - 14th!
        </p>
      </div>
      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Button variant="secondary" className="w-full bg-gray-950 text-gray-50 cursor-pointer">
          Proceed to Payment ({formatCurrency(finalPrice)})
        </Button>
        <Button
          variant="primary"
          onClick={handleAddToCart}
          className={`flex w-full lg:w-[10rem] cursor-pointer items-center justify-center gap-2 ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <FiLoader className="animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <span>Add to Cart</span>
              <FiShoppingCart />
            </>
          )}
        </Button>
      </div>
      {/* See Reviews Link */}
      <div className="">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (onToggleReviews) onToggleReviews();
          }}
          className="text-text-secondary hover:text-accent cursor-pointer text-sm font-medium transition-colors"
        >
          {isReviewsVisible ? "Hide Reviews" : "See Reviews"}
        </button>
      </div>
    </div >
  );
};
export default ProductInfo;
