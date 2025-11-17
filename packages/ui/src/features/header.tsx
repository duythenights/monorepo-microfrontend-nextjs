"use client";
import { useState, useEffect } from "react";
import { Button } from "@repo/ui";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
type Props = {
  onClickLink?: () => void;
};

export default function Header({ onClickLink }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const theme = document.documentElement.classList.contains("dark");
    setIsDark(theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "/products",
      dropdown: [
        { name: "All Products", href: "/products" },
        { name: "New Arrivals", href: "/products/new" },
        { name: "Best Sellers", href: "/products/best-sellers" },
        { name: "Sale", href: "/products/sale" },
      ],
    },
    { name: "About", href: "/about" },
    { name: "Docs", href: "/docs" },
    { name: "Animation", href: "/animation" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Floating Buttons Container */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-14 h-14 bg-accent cursor-pointer rounded-full shadow-lg flex items-center justify-center text-accent-foreground hover:shadow-xl hover:scale-110 transition-all duration-300 animate-float-delayed relative overflow-hidden"
        >
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isDark ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"}`}
          >
            <Sun className="h-6 w-6" />
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-0"}`}
          >
            <Moon className="h-6 w-6" />
          </div>
        </button>

        {/* Hamburger Menu Button */}
        <Button
          onClick={() => {
            onClickLink?.();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-primary-foreground hover:shadow-xl hover:scale-110 transition-all duration-300 animate-float cursor-pointer"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Fullscreen Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background animate-in fade-in slide-in-from-right duration-300">
          <div className="flex flex-col items-center justify-center h-full px-8 space-y-8">
            {/* Logo */}
            <div className="mb-8">
              <a href="/" className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-3xl">
                    L
                  </span>
                </div>
                <span className="text-2xl font-bold text-foreground">Logo</span>
              </a>
            </div>

            {/* Navigation */}
            <nav className="w-full max-w-md space-y-4">
              {navigation.map((item, index) => (
                <div
                  key={item.name}
                  className="animate-in slide-in-from-right fade-in duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setProductsOpen(!productsOpen)}
                        className="w-full flex items-center justify-between text-foreground hover:text-primary px-6 py-4 rounded-xl text-xl font-semibold transition-all hover:bg-secondary"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            productsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {productsOpen && (
                        <div className="pl-6 mt-2 space-y-2 animate-in slide-in-from-top fade-in duration-300">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-muted-foreground hover:text-primary px-6 py-3 rounded-lg text-lg transition-all hover:bg-secondary"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="block text-foreground hover:text-primary px-6 py-4 rounded-xl text-xl font-semibold transition-all hover:bg-secondary"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="w-full max-w-md space-y-3 pt-8 animate-in slide-in-from-bottom fade-in duration-500 delay-300">
              <a
                href="/signin"
                className="block text-center text-foreground hover:text-primary px-6 py-4 rounded-xl text-lg font-semibold border-2 border-border hover:border-primary transition-all"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="block text-center bg-primary text-primary-foreground px-6 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </>
  );
}
