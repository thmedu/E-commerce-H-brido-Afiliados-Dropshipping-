import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
  featured?: boolean;
}

interface CategorySectionProps {
  title?: string;
  description?: string;
  categories?: Category[];
  onCategoryClick?: (categoryId: string) => void;
}

const CategorySection = ({
  title = "Shop by Category",
  description = "Browse our wide selection of products by category",
  categories = [
    {
      id: "electronics",
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      count: 124,
      featured: true,
    },
    {
      id: "fashion",
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      count: 86,
    },
    {
      id: "home",
      name: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      count: 65,
    },
    {
      id: "sports",
      name: "Sports & Fitness",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      count: 42,
    },
    {
      id: "beauty",
      name: "Beauty & Personal Care",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      count: 53,
    },
    {
      id: "toys",
      name: "Toys & Games",
      image:
        "https://images.unsplash.com/photo-1558060370-d644485927b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1428&q=80",
      count: 37,
    },
  ],
  onCategoryClick = () => {},
}: CategorySectionProps) => {
  // Find featured category if any
  const featuredCategory = categories.find((cat) => cat.featured);
  const regularCategories = categories.filter((cat) => !cat.featured);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured category (larger) */}
          {featuredCategory && (
            <div
              className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer h-[400px] md:h-auto"
              onClick={() => onCategoryClick(featuredCategory.id)}
            >
              <img
                src={featuredCategory.image}
                alt={featuredCategory.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {featuredCategory.name}
                  </h3>
                  <p className="mb-4">{featuredCategory.count} products</p>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black transition-colors"
                  >
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Regular categories */}
          {regularCategories.slice(0, 4).map((category) => (
            <div
              key={category.id}
              className="relative rounded-xl overflow-hidden group cursor-pointer h-[200px]"
              onClick={() => onCategoryClick(category.id)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm">{category.count} products</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categories.length > 5 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="mx-auto">
              View All Categories <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
