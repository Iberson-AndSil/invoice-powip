const baseUrl = "http://localhost:4000/masterdata";
const userInvoice = "JROMERO";

export interface Order {
    id: string;
    orderNumber: number;
    seller: string;
    customer: string;
    phone: string;
    address: string;
    paymentMethod: string;
    orderStatus: string;
    saleAmount: number;
    deliveryAmount: number;
    department: string;
    province:string;
    district:string;
    advancedPayment: number;
    customerType:string;
    reference:string;
    duePayment: number;
    instagram:string;
    registrationDate:string;
    discount:string;
    store: string;
    orderItemDTOS: {
        id: string;
        productId: string;
        sku: string;
        model: string;
        color: string;
        size: string;
        category: string;
        subCategory: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
    }[];
}

const fetchOrder = async (
    id: string,
    setOrder: React.Dispatch<React.SetStateAction<Order | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {

    console.log("userInvoice",userInvoice);
    
    try {
        setLoading(true);

        if (!userInvoice) {
            throw new Error("Autenticación requerida");
        }

        const response = await fetch(`${baseUrl}/order/detail?user=${userInvoice}&orderId=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${tokenOrder}`,
            },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log("API Response:", data);

        if (!data || !data.id) {
            throw new Error("Formato de datos inválido");
        }

        setOrder({
            id: data.id,
            orderNumber: data.orderNumber ?? 0,
            seller: data.sellerName ?? "Desconocido",
            customer: data.customerName ?? "Sin nombre",
            phone: data.customerPhone ?? "No disponible",
            address: data.customerAddress ?? "No disponible",
            paymentMethod: data.paymentMethod ?? "No especificado",
            orderStatus: data.orderStatus ?? "Desconocido",
            saleAmount: data.saleAmount ?? 0,
            deliveryAmount: data.deliveryAmount ?? 0,
            department:data.department,
            province:data.province,
            district:data.district,
            customerType:data.customerType,
            advancedPayment: data.advancedPayment ?? 0,
            duePayment: data.duePayment ?? 0,
            reference:data.reference,
            instagram:data.instagram,
            registrationDate:data.registrationDate,
            discount:data.discount,
            store: data.store ?? "No especificado",
            orderItemDTOS: Array.isArray(data.orderItemDTOS)
                ? data.orderItemDTOS.map((item: any) => ({
                      id: item.id,
                      productId: item.productId,
                      sku: item.sku,
                      model: item.model,
                      color: item.color,
                      size: item.size,
                      category: item.category,
                      subCategory: item.subCategory,
                      quantity: item.quantity,
                      unitPrice: item.unitPrice,
                      totalPrice: item.totalPrice,
                  }))
                : [],
        });

    } catch (error) {
        console.error("Fetch error:", error);
        setOrder(null);
    } finally {
        setLoading(false);
    }
};

export { baseUrl, fetchOrder };
