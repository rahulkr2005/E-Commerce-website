// Product Data
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 129.99,
        oldPrice: 159.99,
        rating: 4.5,
        image: "images/wireless -headphone.webp",
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        category: "Electronics",
        price: 199.99,
        oldPrice: null,
        rating: 4,
        image: "images/smart watch.jpg",
        description: "Feature-rich smartwatch with health monitoring"
    },
    {
        id: 3,
        name: "Men's Running Shoes",
        category: "Fashion",
        price: 89.99,
        oldPrice: 119.99,
        rating: 5,
        image: "images/mens sport shoes.jpg",
        description: "Comfortable running shoes for everyday use"
    },
    {
        id: 4,
        name: "Waterproof Travel Backpack",
        category: "Fashion",
        price: 49.99,
        oldPrice: null,
        rating: 4.5,
        image: "images/water proof backpack.jpg",
        description: "Durable backpack perfect for travel and outdoor activities"
    },
    {
        id: 5,
        name: "Wireless Earbuds",
        category: "Electronics",
        price: 79.99,
        oldPrice: 99.99,
        rating: 4,
        image: "images/wireless earbuds.jpg",
        description: "Compact wireless earbuds with long battery life"
    },
    {
        id: 6,
        name: "Fitness Tracker",
        category: "Electronics",
        price: 49.99,
        oldPrice: null,
        rating: 4.5,
        image: "images/fit tracker.webp",
        description: "Track your fitness goals with this advanced tracker"
    },
    {
        id: 7,
        name: "Casual T-Shirt",
        category: "Fashion",
        price: 24.99,
        oldPrice: 29.99,
        rating: 4,
        image: "assets/images/product3.jpg",
        description: "Comfortable cotton t-shirt for everyday wear"
    },
    {
        id: 8,
        name: "Laptop Backpack",
        category: "Fashion",
        price: 39.99,
        oldPrice: null,
        rating: 5,
        image: "images/laptop backpack.jpg",
        description: "Stylish backpack with dedicated laptop compartment"
    }
];

// Cart Data
let cart = [];
let cartCount = 0;

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const cartCountElement = document.querySelector('.cart-count');

// Modal Elements
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const cartBtn = document.getElementById('cart-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const cartModal = document.getElementById('cart-modal');
const closeLogin = document.getElementById('close-login');
const closeRegister = document.getElementById('close-register');
const closeCart = document.getElementById('close-cart');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    
    // Modal event listeners
    setupModalListeners();
    
    // Form submissions
    setupFormSubmissions();
});

// Load products to the page
function loadProducts() {
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
}

// Create product HTML element
function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    
    const ratingStars = createRatingStars(product.rating);
    const oldPrice = product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : '';
    
    productDiv.innerHTML = `
        <div class="product-img">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">
                <div class="price">$${product.price.toFixed(2)} ${oldPrice}</div>
                <div class="product-rating">
                    ${ratingStars}
                </div>
            </div>
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                <button class="wishlist"><i class="far fa-heart"></i></button>
            </div>
        </div>
    `;
    
    // Add event listener to the add to cart button
    const addToCartBtn = productDiv.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => addToCart(product.id));
    
    return productDiv;
}

// Create rating stars based on rating value
function createRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

// Update cart count in the header
function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transition: all 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Setup modal event listeners
function setupModalListeners() {
    // Open modals
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    registerBtn.addEventListener('click', () => {
        registerModal.style.display = 'flex';
    });

    cartBtn.addEventListener('click', () => {
        loadCartItems();
        cartModal.style.display = 'flex';
    });

    // Close modals
    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    closeRegister.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Switch between login and register
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
}

// Setup form submissions
function setupFormSubmissions() {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // In a real application, you would send this data to a server
        console.log('Login attempt:', { email, password });
        
        showNotification('Login successful!');
        loginModal.style.display = 'none';
        loginForm.reset();
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // In a real application, you would send this data to a server
        console.log('Registration attempt:', { name, email, password });
        
        showNotification('Registration successful!');
        registerModal.style.display = 'none';
        registerForm.reset();
    });
}

// Load cart items to the cart modal
function loadCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p>Your cart is currently empty.</p>
            </div>
        `;
        updateCartTotals();
        return;
    }
    
    cart.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    updateCartTotals();
}

// Create cart item HTML element
function createCartItemElement(item) {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';
    cartItemDiv.innerHTML = `
        <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-actions">
            <div class="quantity-controls">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    // Add event listeners to quantity buttons
    const decreaseBtn = cartItemDiv.querySelector('.decrease');
    const increaseBtn = cartItemDiv.querySelector('.increase');
    const removeBtn = cartItemDiv.querySelector('.remove-item');
    
    decreaseBtn.addEventListener('click', () => updateQuantity(item.id, -1));
    increaseBtn.addEventListener('click', () => updateQuantity(item.id, 1));
    removeBtn.addEventListener('click', () => removeFromCart(item.id));
    
    return cartItemDiv;
}

// Update item quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            loadCartItems();
        }
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    loadCartItems();
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 5.99 : 0;
    const total = subtotal + shipping;
    
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    if (searchTerm.length > 2) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        
        displayFilteredProducts(filteredProducts);
    } else if (searchTerm.length === 0) {
        loadProducts();
    }
});

// Display filtered products
function displayFilteredProducts(filteredProducts) {
    productsContainer.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; grid-column: 1 / -1;">
                <h3>No products found</h3>
                <p>Try adjusting your search terms</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
}