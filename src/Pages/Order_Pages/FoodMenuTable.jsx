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

import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { foodService } from "../../services/foodService";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1626645735466-5f6ce3c27459?w=500&auto=format&fit=crop&q=60";

const FoodMenuTable = ({ onAddItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "foodNumber",
    direction: "ascending",
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  useEffect(() => {
    foodService.getAllSimple()
      .then((res) => {
        const mapped = (res.data || []).map((f) => ({
          id: f.id,
          name: f.name || f.foodName,
          category: f.category,
          foodNumber: f.foodNo,
          price: Number(f.price),
          image: f.image || DEFAULT_IMAGE,
        }));
        setFoodItems(mapped);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
      addButton.classList.add('bg-success');
      setTimeout(() => {
        addButton.classList.remove('bg-success');
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
      return <FaSortAmountDown className="inline ml-1 text-muted-foreground" />;
    }
    return sortConfig.direction === "ascending" ? (
      <FaSortAmountDown className="inline ml-1 text-primary" />
    ) : (
      <FaSortAmountUpAlt className="inline ml-1 text-primary" />
    );
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-2xl font-semibold text-foreground mb-2 flex items-center
             mr-2 " >Food Menu
          </h2>
          <p className="text-muted-foreground text-sm">
            {filteredItems.length} items found
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        <div className="flex items-center mt-4 md:mt-0">
          <div className="bg-primary/10 text-foreground px-3 py-1.5 rounded-lg flex items-center mr-4">
            <FaShoppingCart className="mr-2" />
            <span className="font-semibold">{selectedItemsCount}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search food..."
                className="pl-10 pr-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-border w-full transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FaTimes className="text-muted-foreground hover:text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative w-full">
              <SelectField
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="w-full pl-10"
                options={categories.map((category) => ({
                  value: String(category),
                  label: String(category),
                }))}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sorting Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm text-muted-foreground mr-2 flex items-center">Sort by:</span>
        <button
          onClick={() => requestSort("name")}
          className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${sortConfig.key === "name" ? "bg-primary/10 text-primary" : "bg-muted text-foreground"}`}
        >
          Name <SortIndicator columnKey="name" />
        </button>
        <button
          onClick={() => requestSort("price")}
          className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${sortConfig.key === "price" ? "bg-primary/10 text-primary" : "bg-muted text-foreground"}`}
        >
          Price <SortIndicator columnKey="price" />
        </button>
        <button
          onClick={() => requestSort("category")}
          className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${sortConfig.key === "category" ? "bg-primary/10 text-primary" : "bg-muted text-foreground"}`}
        >
          Category <SortIndicator columnKey="category" />
        </button>
        <button
          onClick={() => requestSort("foodNumber")}
          className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${sortConfig.key === "foodNumber" ? "bg-primary/10 text-primary" : "bg-muted text-foreground"}`}
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
        {loading ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">Loading menu...</div>
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-muted/40 rounded-2xl">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <FaSearch className="text-4xl text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No items found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearSearch}
              className="px-4 py-2 bg-primary/50 text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          filteredItems.map((food) => (
            <div
              key={food.id}
              className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border flex flex-col"
            >
              {/* Food Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-primary/50 text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                  #{food.foodNumber}
                </div>
                <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-1 rounded-lg">
                  {food.category.split(' ')[0]}
                </div>
              </div>

              {/* Food Details */}
              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{food.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{food.category}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-primary">
                    ฿{food.price.toFixed(2)}
                  </span>
                  <button
                    id={`add-btn-${food.id}`}
                    onClick={() => handleAddItem(food)}
                    className="px-3 py-2 bg-gradient-to-r bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-all flex items-center shadow-md hover:shadow-lg"
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
            className="fixed bottom-6 right-6 bg-primary/50 text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-10"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        )}
      </div>

      {/* Pagination or Load More for very large datasets would go here */}
      {filteredItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {foodItems.length} items
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-muted text-foreground rounded-lg text-sm">
              Load More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodMenuTable;