
export const API_BASE_URL = String(import.meta.env.VITE_NODE_ENV) === "development"
? "http://localhost:4000/api"
: "https://add-production-server-url/api";

export const API_ENDPOINTS = {
    addFoodItem: `${API_BASE_URL}/food/add`,
    getFoodItems: `${API_BASE_URL}/food/list`,
    removeFoodItem: `${API_BASE_URL}/food/delete`,
    listOrders: `${API_BASE_URL}/order/listOrders`,
    updateOrderStatus: `${API_BASE_URL}/order/updateOrderStatus`,
}