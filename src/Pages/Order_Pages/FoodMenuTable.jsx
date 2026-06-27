import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaSortAmountDown,
  FaSortAmountUpAlt,
  FaArrowUp,
  FaTimes,
  FaShoppingCart,
} from "react-icons/fa";
import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossedIcon } from "lucide-react";
import { foodService } from "../../services/foodService";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1626645735466-5f6ce3c27459?w=500&auto=format&fit=crop&q=60";

const FoodMenuTable = ({ onAddItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "foodNumber",
    direction: "ascending",
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  useEffect(() => {
    foodService
      .getAllSimple()
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

  const categories = useMemo(
    () => ["All", ...new Set(foodItems.map((item) => item.category))],
    [foodItems]
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = useMemo(() => {
    const sortableItems = [...foodItems];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === "price" || sortConfig.key === "foodNumber") {
          const aValue = parseFloat(a[sortConfig.key]);
          const bValue = parseFloat(b[sortConfig.key]);
          return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
        }
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

  const filteredItems = useMemo(
    () =>
      sortedItems.filter(
        (item) =>
          (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.foodNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedCategory === "All" || item.category === selectedCategory)
      ),
    [sortedItems, searchTerm, selectedCategory]
  );

  const scrollToTop = () => {
    gridRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return undefined;

    const handleScroll = () => setShowScrollTop(node.scrollTop > 200);
    node.addEventListener("scroll", handleScroll);
    return () => node.removeEventListener("scroll", handleScroll);
  }, [loading, filteredItems.length]);

  const handleAddItem = (food) => {
    onAddItem(food);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <FaSortAmountDown className="inline ml-1 text-muted-foreground size-3" />;
    }
    return sortConfig.direction === "ascending" ? (
      <FaSortAmountDown className="inline ml-1 text-primary size-3" />
    ) : (
      <FaSortAmountUpAlt className="inline ml-1 text-primary size-3" />
    );
  };

  const sortButtons = [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "category", label: "Category" },
    { key: "foodNumber", label: "No." },
  ];

  return (
    <Card className="w-full h-full border-border shadow-sm flex flex-col min-h-[480px]">
      <CardHeader className="pb-3 shrink-0 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <UtensilsCrossedIcon className="size-5 text-primary" />
              Food Menu
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredItems.length} items
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto lg:min-w-[420px]">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-3.5" />
              <Input
                type="text"
                placeholder="Search food..."
                className="pl-9 pr-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <FaTimes className="size-3.5" />
                </button>
              )}
            </div>
            <SelectField
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full sm:w-44"
              options={categories.map((category) => ({
                value: String(category),
                label: String(category),
              }))}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center mr-1">Sort:</span>
          {sortButtons.map(({ key, label }) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={sortConfig.key === key ? "secondary" : "outline"}
              onClick={() => requestSort(key)}
              className="h-8 text-xs"
            >
              {label}
              <SortIndicator columnKey={key} />
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 min-h-0 pt-0 relative">
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 overflow-y-auto flex-1 min-h-[320px] max-h-[min(70vh,720px)] pr-1"
        >
          {loading ? (
            <div className="col-span-full py-16 text-center text-muted-foreground">Loading menu...</div>
          ) : filteredItems.length === 0 ? (
            <div className="col-span-full py-12 text-center rounded-xl border border-dashed border-border bg-muted/20">
              <p className="text-foreground font-medium mb-1">No items found</p>
              <p className="text-sm text-muted-foreground mb-4">Try a different search or category</p>
              <Button type="button" variant="outline" size="sm" onClick={clearSearch}>
                Clear filters
              </Button>
            </div>
          ) : (
            filteredItems.map((food) => (
              <article
                key={food.id}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                    #{food.foodNumber}
                  </span>
                  <span className="absolute top-2 right-2 bg-background/90 text-foreground text-[10px] px-2 py-0.5 rounded-md max-w-[45%] truncate">
                    {food.category}
                  </span>
                </div>

                <div className="p-3 flex flex-col flex-1 gap-2">
                  <h3 className="font-semibold text-sm md:text-base line-clamp-2 leading-snug">{food.name}</h3>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <span className="text-base md:text-lg font-bold text-primary">
                      ฿{food.price.toFixed(2)}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleAddItem(food)}
                      className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                    >
                      <FaPlus className="size-3" />
                      Add
                    </Button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {showScrollTop && (
          <Button
            type="button"
            size="icon"
            onClick={scrollToTop}
            className="absolute bottom-4 right-4 rounded-full shadow-lg z-10"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </Button>
        )}

        {filteredItems.length > 0 && (
          <p className="text-xs text-muted-foreground mt-3 shrink-0">
            Showing {filteredItems.length} of {foodItems.length} menu items
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodMenuTable;
