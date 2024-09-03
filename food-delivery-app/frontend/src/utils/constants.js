// necessary constants
export const API_BASE_URL = String(import.meta.env.VITE_NODE_ENV) === 'development'
? "http://localhost:4000/api"
: "https://add-production-server-url/api";

export const API_ENDPOINTS = {
    signup: `${API_BASE_URL}/auth/signup`,
    login: `${API_BASE_URL}/auth/login`,    
    fetchFoodItems: `${API_BASE_URL}/food/list`,    
    addToCart: `${API_BASE_URL}/cart/add`,    
    removeFromCart: `${API_BASE_URL}/cart/remove`,    
    getCartItems: `${API_BASE_URL}/cart/get`,    
    placeOrder: `${API_BASE_URL}/order/place`,
    verifyOrder: `${API_BASE_URL}/order/verify`,
    userOrders: `${API_BASE_URL}/order/userOrders`,
}