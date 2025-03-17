"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Order, fetchOrder } from "./order";

export default function InvoicePage() {
    const params = useParams();
    const orderId = params?.id as string | undefined;
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) {
            setLoading(false);
            return;
        }

        fetchOrder(orderId, setOrder, setLoading);
    }, [orderId]);

    useEffect(() => {
        if (order) console.log("Pedido cargado:", order);
    }, [order]);

    if (loading) return <div>cargando orden...</div>;

    if (!order) return <div>no se encontró la orden</div>;
    const [date, time] = order.registrationDate.split("T");
    const formattedTime = time.split(".")[0];
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-2/6">
                <h3 className="text-5xl font-semibold text-center">{order.store}</h3>
                <h1 className="text-xl bg-[#22596c] text-white text-center w-full py-2 m-2 rounded-md">
                    ORDEN #{order.orderNumber}
                </h1>
                <h1 className="text-base bg-[#22928d] text-white text-center w-full py-1 m-2 rounded-md">
                    DATOS DEL CLIENTE
                </h1>
                <div className="flex flex-col px-4">
                    <span>Nombre: {order.customer}</span>
                    <span>Teléfono: {order.phone}</span>
                    <span>Dirección: {order.address}</span>
                    <span>Departamento: {order.department}</span>
                    <span>Provincia: {order.province}</span>
                    <span>Distrito: {order.district}</span>
                    <span>Tipo de cliente: {order.customerType}</span>
                    <span>Referencia: {order.reference}</span>
                    <span>Instagram: {order.instagram}</span>
                </div>
                <h1 className="text-base bg-[#22928d] text-white text-center w-full py-1 m-2 rounded-md">
                    DETALLES DE LA ORDEN
                </h1>
                <div className="flex flex-col px-4">
                    <span>Orden #: {order.orderNumber}</span>
                    <span>Dirección de Entrega: {order.address}</span>
                    <span>No. de Contacto: {order.phone}</span>
                    <span>Fecha: {date} {formattedTime}</span>
                </div>
                <h1 className="text-base bg-[#22928d] text-white text-center w-full py-1 m-2 rounded-md">
                    DETALLES DEL PEDIDO
                </h1>
                {order.orderItemDTOS.length > 0 ? (
                    order.orderItemDTOS.map((item, index) => (
                        <div key={index} className="flex flex-col px-4 border-[1px] w-full mx-2 rounded-md border-slate-300 py-3">
                            <span className="text-lg text-[#22928d] font-semibold">{item.model} {item.color}</span>
                            <span>Marca: {order.store}</span>
                            <div className="text-sm my-2 text-neutral-500 flex flex-col">
                                <span>Color: {item.color}</span>
                                <span>Talla: {item.size}</span>
                            </div>
                            <span>Cantidad Unds: {item.quantity}</span>
                            <span>Precio unitario: S/{item.unitPrice}</span>
                            <span>Sub Total: S/{item.totalPrice}</span>
                        </div>
                    ))
                ) : (
                    <p>No hay productos en esta orden.</p>
                )}

                <div className="m-4 flex flex-col font-semibold text-xl">
                <h1>Valor a Pagar {order.saleAmount}</h1>
                </div>
            </div>
        </div>
    );
}
