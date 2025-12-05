import axiosInstance from "./axios";

// getting all the product to be displayed
export async function getAdminProduct(page = 1, limit = 9) {
    try {
        const { data } = await axiosInstance.get('/admin/products/all', {
            params: {
                page,
                limit
            }
        });

        console.log("Admin product api", data);

        return {
            data: data.data,
            total: data.total,
            count: data.count
        };
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to get admin product");
    }
}

// getting a single product details

export async function getAdminProductAnalysis(productId) {
    try {
        const { data } = await axiosInstance.get(`/admin/products/${productId}/analytics`);

        console.log("Admin product detail api", data);

        return data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to get product by id");
    }
}

export async function deleteProduct(productId) {
    try {
        await axiosInstance.delete(`/admin/products/${productId}`);

        console.log("Admin product detail api");

        return true;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to delete product");
    }
}

export async function getAllCategoriesInput() {
    try {
        const { data } = await axiosInstance.get('/categories');

        console.log("Admin category list api", data);

        return data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to get product by id");
    }
}

export async function getAllVendorsInput() {
    try {
        const { data } = await axiosInstance.get('/vendors');

        console.log("Admin vendor list api", data);

        return data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to get product by id");
    }
}

// export async function createProduct() {
//     try {
//         const { data } = await axiosInstance.post('/admin/products');

//         console.log("Admin product detail api", data);

//         return data.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || "Failed to create product");
//     }
// }

// export async function updateProduct(productId) {
//     try {
//         const { data } = await axiosInstance.put(`/admin/products/${productId}`);

//         console.log("Admin product detail api", data);

//         return data.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || "Failed to update product");
//     }
// }
export async function createProduct(formData) {
    try {
        const { data } = await axiosInstance.post('/admin/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    } catch (error) {
        throw error; // Let the error be handled by the mutation's onError
    }
}

export async function updateProduct(productId, formData) {
    try {
        const { data } = await axiosInstance.put(`/admin/products/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    } catch (error) {
        throw error; // Let the error be handled by the mutation's onError
    }
}