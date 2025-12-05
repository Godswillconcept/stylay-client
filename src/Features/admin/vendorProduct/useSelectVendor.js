// useVendors.js
import { useQuery } from '@tanstack/react-query';
import { getAllVendorsInput } from '../../../services/apiAdminProduct';


export const useSelectVendor = (searchTerm = '') => {
    return useQuery({
        queryKey: ['vendors', searchTerm],
        queryFn: async () => {
            const data = await getAllVendorsInput();

            // Filter by business name if search term provided
            if (searchTerm) {
                return data.filter(vendor =>
                    vendor.store?.business_name
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            }

            return data;
        },
        select: (data) => {
            // Transform to react-select format
            return data.map(vendor => ({
                value: vendor.id,
                label: vendor.store?.business_name || 'Unknown Vendor',
                vendor: vendor // Keep full vendor object if needed
            }));
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};