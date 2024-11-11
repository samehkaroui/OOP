 // JavaScript for Cart functionality

    // Product Class
    class Product {
      constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
      }
    }

    // ShoppingCartItem Class
    class ShoppingCartItem {
      constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
      }
      
      calculateTotalPrice() {
        return this.product.price * this.quantity;
      }
    }

    // ShoppingCart Class
    class ShoppingCart {
      constructor() {
        this.items = [];
      }

      addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          const cartItem = new ShoppingCartItem(product, quantity);
          this.items.push(cartItem);
        }
        this.displayCartItems();
      }

      removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCartItems();
      }

      getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
      }

      getTotalPrice() {
        return this.items.reduce((total, item) => total + item.calculateTotalPrice(), 0);
      }

      displayCartItems() {
        const cartItemsDiv = document.getElementById("cartItems");
        cartItemsDiv.innerHTML = "";
        this.items.forEach(item => {
          const cartItemDiv = document.createElement("div");
          cartItemDiv.classList.add("cart-item");
          cartItemDiv.innerHTML = `
            ${item.product.name} - Quantity: ${item.quantity} - 
            Total: $${item.calculateTotalPrice().toFixed(2)}
            <button onclick="removeFromCart(${item.product.id})">Remove</button>
          `;
          cartItemsDiv.appendChild(cartItemDiv);
        });

        document.getElementById("totalItems").innerText = this.getTotalItems();
        document.getElementById("totalPrice").innerText = this.getTotalPrice().toFixed(2);
      }
    }

    // Initialize shopping cart
    const cart = new ShoppingCart();

    // Products
    const products = [
      new Product(1, "Apple", 0.5),
      new Product(2, "Banana", 0.3),
      new Product(3, "Orange", 0.7)
    ];

    // Function to add product to cart
    function addToCart() {
      const productId = parseInt(document.getElementById("productSelect").value);
      const quantity = parseInt(document.getElementById("quantityInput").value);

      const product = products.find(p => p.id === productId);
      if (product && quantity > 0) {
        cart.addItem(product, quantity);
      }
    }

    // Function to remove product from cart
    function removeFromCart(productId) {
      cart.removeItem(productId);
    }