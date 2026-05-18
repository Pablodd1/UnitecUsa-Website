"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Container, Info, Lightbulb } from "lucide-react"
import Stylish_H3 from "My_UI/stylish_h3"
import AddNewContainer from "./addNewContainer"
import { addProduct } from "lib/cart/cart.actions"
import { containerFillPercent } from "lib/cart/cart.utils"
import { useAllContainers } from "lib/cart/useCartTotals"
import { subscribeCart } from "lib/cart/cart.events"
import { getCart } from "lib/cart/cart.core"
import { useLanguage } from "lib/LanguageContext"

const Modal = dynamic(() => import("My_UI/MyModal/main"))

export default function ContainerModal({ showModal, toggleModal, item }) {
    const [containers, setContainers] = useState({ data: getCart(), relaod: 0 })
    const [reload, setReload] = useState(0)
    const { language } = useLanguage()
    const isSpanish = language === 'es'

    useEffect(() => {
        const unsub = subscribeCart(() => {
            const temp =
                setContainers({ data: getCart(), reload })
        })
        return unsub
    }, [reload])

    const t = {
        myContainers: isSpanish ? "Mis Contenedores" : "My Containers",
        select: isSpanish ? "Seleccionar" : "Select",
        noContainer: isSpanish ? "Sin Contenedor" : "No Container",
        checkout: isSpanish ? "Pagar" : "Checkout",
        clickHint: isSpanish ? "Haz clic en el contenedor para añadir el producto. Para cantidades personalizadas, usa el ícono del carrito arriba a la derecha." : "Click on the container to add the product. For custom quantities, use the cart icon in the top-right corner.",
        current: isSpanish ? "Actual:" : "Current:",
        others: isSpanish ? "Otros:" : "Others:",
        free: isSpanish ? "Libre" : "Free",
        addProduct: isSpanish ? "Añadir producto" : "Add product"
    }

    return (
        <Modal
            light
            open={showModal}
            onClose={toggleModal}
            noGap
            wrapperClasses="w-full lg:min-w-xl max-w-11/12 lg:max-w-lg bg-white shadow-lg shadow-black-3/50"
            header={
                <div className="bg-black px-5 py-4 mb-2 shadow-md shadow-gray-400/50 text-primary">
                    <h2 className="font-semibold mx-auto w-fit tracking-widest capitalize text-md gap-2">
                        {t.myContainers}
                    </h2>
                </div>
            }
            footer={
                <footer className="w-full flex items-center justify-end bg-white/75 px-6 py-2">
                    <Link
                        href={"/checkout"} 
                        aria-label="checkout"
                        className="bg-primary text-black border-2 border-accent1 hover:bg-secondary font-semibold tracking-wider w-full md:max-w-44 rounded-full text-center py-2 my-2 cursor-pointer"
                    >
                        {t.checkout}
                    </Link>
                </footer>
            }
        >
            <main className="relative flex flex-col px-3 h-96 max-h-2/5 mx-auto w-full py-4 text-sm md:text-md">

                <Stylish_H3 h3={t.select} />
                {containers?.data?.length === 0 ? (
                    <div className="h-96 w-full text-gray-300 font-bold flex flex-col items-center justify-center gap-4">
                        <Container className="h-16 w-16 stroke-1" />
                        {t.noContainer}
                    </div>
                ) : (
                    <div className="flex flex-col ">
                        <div className="text-sm text-gray-700 leading-tight gap-0.5 flex items-center w-4/5 mb-5">
                            <Lightbulb className="h-full w-auto bg-orange-800 px-1 text-white rounded-sm" />
                            <p className="border-l-4 pl-2 border-orange-800 ">{t.clickHint}</p>
                        </div>
                        {containers?.data?.map((container, i) => {
                            const { id, meta, items, label } = container
                            const volume =
                                meta?.internal?.length *
                                meta?.internal?.width *
                                meta?.internal?.height || 0

                            const { 
                                filledTotal, filledCurrent, filledOthers, availablePercent,
                                weightFilledTotal, weightFilledCurrent, weightFilledOthers, weightAvailablePercent
                            } = containerFillPercent(container, item.ID)

                            // We use the most restrictive metric to determine how much is "free"
                            const lowestAvailablePercent = Math.min(availablePercent || 0, weightAvailablePercent || 0);

                            return (
                                <button
                                    key={i}
                                    aria-label={t.addProduct}
                                    onClick={() => addProduct(id, item)}
                                    className="w-11/12 mx-auto my-2.5  border-accent1 border shadow-md overflow-hidden shadow-gray-400  rounded-lg flex flex-col gap-2 bg-primary hover:border-secondary ease-in duration-300 transition-all relative"
                                >
                                    <div className=" grid grid-cols-[5rem_auto] rounded-2xl gap-2">
                                        <figure className="relative flex flex-col justify-center items-center px-2 py-1 bg-accent1 h-full w-full" >
                                            <Container className="stroke-[0.5px] h-auto w-full  rotate-y-180  rotate-x-32" />
                                            <figcaption className="text-xs font-semibold tracking-wider " >{volume.toFixed(2)} m³</figcaption>
                                        </figure>
                                        <div className="flex-1 px-1 space-y-0.5  text-left">
                                            <h4 className="my-1 w-full flex items-center text-lg text-secondary font-semibold" >
                                                {label}
                                                <span className="text-sm ml-auto mr-2 text-green-700 font-bold" >{`(${(lowestAvailablePercent).toFixed(2)}% ${t.free})`}</span>
                                            </h4>
                                            <ul className=" grid grid-cols-[auto_auto_auto] max-w-max gap-y-1 gap-x-5 my-2 tracking-wider text-xs font-semibold text-gray-700">
                                                <li className="col-span-3 text-secondary italic mb-1 border-b pb-1">Volume Capacity:</li>
                                                <li className="">{t.current}</li>
                                                <li className="col-span-2">
                                                    {items.find(x => x.ID == item.ID)?.qty || 0} unit @<strong>{(filledCurrent).toFixed(2)}%</strong>
                                                </li>
                                                <li className="">{t.others}</li>
                                                <li className="col-span-2">~{(filledOthers).toFixed(2)}%</li>

                                                <li className="col-span-3 text-secondary italic mt-2 mb-1 border-b pb-1">Weight Capacity (PESO):</li>
                                                <li className="">{t.current}</li>
                                                <li className="col-span-2">
                                                    {items.find(x => x.ID == item.ID)?.qty || 0} unit @<strong>{(weightFilledCurrent).toFixed(2)}%</strong>
                                                </li>
                                                <li className="">{t.others}</li>
                                                <li className="col-span-2">~{(weightFilledOthers).toFixed(2)}%</li>
                                            </ul>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}
                <AddNewContainer callback={(c) => setReload(prev => prev + 1)} />
            </main>
        </Modal>
    )
}
