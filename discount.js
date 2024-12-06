import React, { useState, useEffect } from 'react';
import { Percent, Tag } from 'lucide-react';

const DiscountSystem = () => {
  const [products, setProducts] = useState([
    {
      name: 'Delta Munchies',
      originalPrices: [5.00, 10.00, 15.00, 20.00, 25.00, 30.00],
      amounts: [15, 30, 45, 60, 75, 90],
      type: 'Edibles',
      discountApplied: true
    },
    {
      name: 'Push Pop',
      originalPrices: [10.00, 15.00, 25.00, 35.00, 40.00, 45.00],
      amounts: [1, 2, 3, 4, 5, 6],
      type: 'Flower',
      discountApplied: false
    }
  ]);

  const [discountPercentage, setDiscountPercentage] = useState(20);
  const [isDiscountActive, setIsDiscountActive] = useState(false);

  const applyDiscount = () => {
    const updatedProducts = products.map(product => {
      const discountedPrices = product.originalPrices.map(price => 
        Number((price * (1 - discountPercentage / 100)).toFixed(2))
      );

      return {
        ...product,
        currentPrices: discountedPrices,
        discountApplied: true
      };
    });

    setProducts(updatedProducts);
    setIsDiscountActive(true);
  };

  const removeDiscount = () => {
    const resetProducts = products.map(product => ({
      ...product,
      currentPrices: undefined,
      discountApplied: false
    }));

    setProducts(resetProducts);
    setIsDiscountActive(false);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center mb-4">
        <input 
          type="number" 
          value={discountPercentage} 
          onChange={(e) => setDiscountPercentage(Number(e.target.value))}
          className="w-20 mr-2 p-1 border rounded"
          min="1"
          max="99"
        />
        <span>% Discount</span>
        <button 
          onClick={isDiscountActive ? removeDiscount : applyDiscount}
          className={`ml-4 px-4 py-2 rounded flex items-center ${
            isDiscountActive 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
          }`}
        >
          {isDiscountActive ? 'Remove Discount' : 'Apply Discount'}
          <Percent className="ml-2" size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product, index) => (
          <div 
            key={product.name} 
            className={`border p-4 rounded-lg transition-all ${
              product.discountApplied 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white'
            }`}
          >
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <div className="grid grid-cols-3 gap-2">
              {product.amounts.map((amount, priceIndex) => (
                <div 
                  key={amount} 
                  className="flex flex-col items-center p-2 border rounded"
                >
                  <span>{amount}{product.type === 'Edibles' ? 'mg' : 'g'}</span>
                  {product.discountApplied ? (
                    <div className="flex items-center">
                      <span className="line-through mr-2 text-gray-400">
                        ${product.originalPrices[priceIndex].toFixed(2)}
                      </span>
                      <span className="font-bold text-green-600">
                        ${product.currentPrices[priceIndex].toFixed(2)}
                      </span>
                      <Tag className="ml-1 text-green-500" size={16} />
                    </div>
                  ) : (
                    <span>${product.originalPrices[priceIndex].toFixed(2)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountSystem;