import React, { useState, useMemo, useRef, useEffect } from "react";
import { 
  FaSearch, 
  FaImage, 
  FaPlus, 
  FaFilter, 
  FaSortAmountDown,
  FaSortAmountUpAlt,
  FaUtensils,
  FaArrowUp,
  FaTimes,
  FaShoppingCart
} from "react-icons/fa";

const FoodMenuTable = ({ onAddItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "foodNumber",
    direction: "ascending",
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const gridRef = useRef(null);

  // Sample data - in a real app this would come from props or API
  const foodItems = [
    {
      id: 1,
      name: "Chicken Satay",
      category: "Appetizer (Thai)",
      foodNumber: "01",
      price: 395.0,
      image: "https://images.unsplash.com/photo-1626645735466-5f6ce3c27459?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      name: "Fried/Grilled Chicken Wings",
      category: "Appetizer (Thai)",
      foodNumber: "02",
      price: 320.0,
      image: "https://images.unsplash.com/photo-1626645735466-5f6ce3c27459?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      name: "Fish Finger (Pla Chup Pang Tod)",
      category: "Appetizer (Thai)",
      foodNumber: "03",
      price: 360.0,
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 4,
      name: "Butter Fried Prawn",
      category: "Appetizer (Thai)",
      foodNumber: "04",
      price: 380.0,
      image: "https://images.unsplash.com/photo-1626645735466-5f6ce3c27459?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 5,
      name: "Drums of Heaven",
      category: "Appetizer (Thai)",
      foodNumber: "05",
      price: 360.0,
      image: "https://images.unsplash.com/photo-1626645735466-5f6ce3c27459?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 6,
      name: "Tempura Vegetable",
      category: "Appetizer (Thai)",
      foodNumber: "06",
      price: 280.0,
      image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 7,
      name: "Tempura Mixed",
      category: "Appetizer (Thai)",
      foodNumber: "07",
      price: 380.0,
      image: "https://images.unsplash.com/photo-1626645735466-5f6ce3c27459?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 8,
      name: "Royal Spring Roll",
      category: "Appetizer (Thai)",
      foodNumber: "08",
      price: 320.0,
      image: "https://images.unsplash.com/photo-1613896527035-3c0c5c34e3a1?w=500&auto=format&fit=crop&q=60",
    },
    // Add more items to simulate large data
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 9,
      name: `Special Dish ${i + 1}`,
      category: i % 2 === 0 ? "Main Course" : "Dessert",
      foodNumber: `${i + 9}`.padStart(2, '0'),
      price: 400 + (i * 50),
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
    }))
  ];

  // Get unique categories
  const categories = useMemo(() => [
    "All",
    ...new Set(foodItems.map((item) => item.category)),
  ], [foodItems]);

  // Request sort
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort items
  const sortedItems = useMemo(() => {
    let sortableItems = [...foodItems];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        // Handle numeric sorting for price and foodNumber
        if (sortConfig.key === "price" || sortConfig.key === "foodNumber") {
          const aValue = parseFloat(a[sortConfig.key]);
          const bValue = parseFloat(b[sortConfig.key]);
          return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
        }
        
        // Handle string sorting for name and category
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [foodItems, sortConfig]);

  // Filter items
  const filteredItems = useMemo(() => {
    return sortedItems.filter(
      (item) =>
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.foodNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "All" || item.category === selectedCategory)
    );
  }, [sortedItems, searchTerm, selectedCategory]);

  // Handle scroll to top
  const scrollToTop = () => {
    if (gridRef.current) {
      gridRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        setShowScrollTop(gridRef.current.scrollTop > 300);
      }
    };

    if (gridRef.current) {
      gridRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (gridRef.current) {
        gridRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Enhanced add item function
  const handleAddItem = (food) => {
    onAddItem(food);
    setSelectedItemsCount(prev => prev + 1);
    
    // Show a quick visual feedback
    const addButton = document.getElementById(`add-btn-${food.id}`);
    if (addButton) {
      addButton.classList.add('bg-green-500');
      setTimeout(() => {
        addButton.classList.remove('bg-green-500');
      }, 300);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  // Sort indicator component
  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <FaSortAmountDown className="inline ml-1 text-gray-400" />;
    }
    return sortConfig.direction === "ascending" ? (
      <FaSortAmountDown className="inline ml-1 text-blue-500" />
    ) : (
      <FaSortAmountUpAlt className="inline ml-1 text-blue-500" />
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-2xl font-semibold text-gray-800 mb-2 flex items-center
             mr-2 " >Food Menu
          </h2>
          <p className="text-gray-500 text-sm">
            {filteredItems.length} items found
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        <div className="flex items-center mt-4 md:mt-0">
          <div className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg flex items-center mr-4">
            <FaShoppingCart className="mr-2" />
            <span className="font-semibold">{selectedItemsCount}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search food..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FaTimes className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2.5 appearance-none border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full bg-white transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Sorting Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm text-gray-500 mr-2 flex items-center">Sort by:</span>
        <button
          onClick={() => requestSort("name")}
          className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${sortConfig.key === "name" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
        >
          Name <SortIndicator columnKey="name" />
        </button>
        <button
          onClick={() => requestSort("price")}
          className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${sortConfig.key === "price" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
        >
          Price <SortIndicator columnKey="price" />
        </button>
        <button
          onClick={() => requestSort("category")}
          className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${sortConfig.key === "category" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
        >
          Category <SortIndicator columnKey="category" />
        </button>
        <button
          onClick={() => requestSort("foodNumber")}
          className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${sortConfig.key === "foodNumber" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
        >
          Number <SortIndicator columnKey="foodNumber" />
        </button>
      </div>

      {/* Food Items Grid with Fixed Height and Scroll */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto flex-grow relative"
        style={{ maxHeight: '60vh' }}
      >
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl">
            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          filteredItems.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {/* Food Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  #{food.foodNumber}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-lg">
                  {food.category.split(' ')[0]}
                </div>
              </div>

              {/* Food Details */}
              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{food.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-1">{food.category}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-blue-600">
                    ฿{food.price.toFixed(2)}
                  </span>
                  <button
                    id={`add-btn-${food.id}`}
                    onClick={() => handleAddItem(food)}
                    className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm hover:from-blue-600 hover:to-blue-700 transition-all flex items-center shadow-md hover:shadow-lg"
                  >
                    <FaPlus/>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-10"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        )}
      </div>

      {/* Pagination or Load More for very large datasets would go here */}
      {filteredItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {filteredItems.length} of {foodItems.length} items
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
              Load More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodMenuTable;