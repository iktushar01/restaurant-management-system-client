import React, { useState, useEffect, useCallback } from "react";
import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaUtensils } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { foodService } from "../../../services/foodService";

const FoodPageIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [foods, setFoods] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFoods = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await foodService.getAll({
        search: searchTerm,
        page: currentPage,
        limit: entriesToShow,
      });
      setFoods(response.data || []);
      setTotalEntries(response.meta?.total || 0);
      setTotalPages(response.meta?.totalPages || 0);
    } catch (err) {
      setError(err.message || "Failed to load food items");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage, entriesToShow]);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const startIndex = totalEntries > 0 ? (currentPage - 1) * entriesToShow : 0;

  const handleDeleteFood = async (id) => {
    const ok = await confirm({ description: "Are you sure you want to delete this food item?" });
    if (!ok) return;
    try {
        await foodService.delete(id);
        fetchFoods();
      } catch (err) {
        toast.error(err.message || "Failed to delete food item");
      }
  };

  const columns = [
    {
      header: "SL No",
      accessor: "serialNo",
    },
    {
      header: "Category Name",
      accessor: "category",
    },
    {
      header: "Food No",
      accessor: "foodNo",
    },
    {
      header: "Food Name",
      accessor: "foodName",
    },
    {
      header: "Serial No",
      accessor: "serialNo",
    },
    {
      header: "Availability",
      accessor: "availability",
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.availability === "Available" 
            ? "bg-success/10 text-success" 
            : "bg-destructive/10 text-destructive"
        }`}>
          {row.availability}
        </span>
      ),
    },
    {
      header: "Quantity",
      accessor: "quantity",
      render: (row) => row.quantity.toFixed(2),
    },
    {
      header: "Price",
      accessor: "price",
      render: (row) => row.price.toFixed(2),
    },
  ];

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-primary hover:text-primary/80",
      render: (row) => (
        <Link 
          to={`edit/${row.id}`}
          className="flex items-center space-x-1 text-primary hover:text-primary/80 px-2 py-1 rounded hover:bg-primary/5"
        >
          <FaEdit className="text-sm" />
          <span className="text-sm">Edit</span>
        </Link>
      ),
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-destructive hover:text-destructive/80",
      onClick: (row) => handleDeleteFood(row.id),
      render: (row) => (
        <button
          onClick={() => handleDeleteFood(row.id)}
          className="flex items-center space-x-1 text-destructive hover:text-destructive/80 px-2 py-1 rounded hover:bg-destructive/10"
        >
          <FaTrash className="text-sm" />
          <span className="text-sm">Delete</span>
        </button>
      ),
    },
    {
      label: "Add Recipe",
      icon: FaUtensils,
      className: "text-primary hover:text-primary/80",
      render: (row) => (
        <Link 
          to={`recipe/${row.id}`}
          className="flex items-center space-x-1 text-primary hover:text-primary/80 px-2 py-1 rounded hover:bg-primary/5"
        >
          <FaUtensils className="text-sm" />
          <span className="text-sm">Add Recipe</span>
        </Link>
      ),
    },
  ];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6    mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-muted/40 sm:bg-muted/40 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Food Items
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage your restaurant food menu
          </p>
        </div>
        <Link to="create" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaPlus className="mr-2" />
            Add New Food
          </button>
        </Link>
      </div>

      {/* Search and entries filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-foreground">Show</span>
          <SelectField
            value={entriesToShow}
            onValueChange={(v) => { setEntriesToShow(Number(v));
              setCurrentPage(1);; }}
            className="w-20"
            options={[{ value: "10", label: "10" }, { value: "25", label: "25" }, { value: "50", label: "50" }, { value: "100", label: "100" }]}
          />
          <span className="ml-2 text-foreground">entries</span>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-4 py-2 border border-border rounded-md focus:ring-2 focus-visible:ring-ring focus-visible:border-ring w-full md:w-64"
          />
        </div>
      </div>

      {/* ✅ Reusable Table */}
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>
      )}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading food items...</div>
      ) : (
        <ReusableTable 
          columns={columns} 
          data={foods} 
          actions={actions} 
        />
      )}

      {/* Table info and pagination */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-foreground">
        <div>
          Showing {totalEntries > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesToShow, totalEntries)} of {totalEntries} entries
        </div>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button 
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-border rounded-md ${currentPage === 1 ? 'bg-muted text-muted-foreground' : 'bg-muted/40 hover:bg-muted/50'}`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border border-border rounded-md ${currentPage === page ? 'bg-primary/10 text-primary font-medium' : 'bg-muted/40 hover:bg-muted/50'}`}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border border-border rounded-md ${currentPage === totalPages || totalPages === 0 ? 'bg-muted text-muted-foreground' : 'bg-muted/40 hover:bg-muted/50'}`}
          >
            Next
          </button>
        </div>
      </div>

      {!loading && foods.length === 0 && !error && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-foreground mb-2">
            No food items found
          </h3>
          <p className="text-muted-foreground mb-6">
            Get started by adding a new food item
          </p>
          <Link to="create">
            <button className="px-5 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Add New Food
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FoodPageIndex;