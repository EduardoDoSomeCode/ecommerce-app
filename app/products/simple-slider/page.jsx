"use client"

import React from 'react'




const SimpleSlider= ({ widthCarrousel, heightCarrousel, items }) => {
    return (
        <main className='w-full p-4 relative overflow-auto snap-x snap-mandatory scroll-smooth scroll-p-px'>
            <div className='overflow-auto p-2 pb-8' style={{ height: `${heightCarrousel}px`, width: `${widthCarrousel}px` }}>
                {Array.isArray(items) && items.map((item, index) => (
                    <SimpleCard key={index} item={item} index={index} widthCard={widthCarrousel} heightCard={heightCarrousel} />
                ))}
            </div>
        </main>
    );
}




const SimpleCard = ({ item, index, widthCard, heightCard }) => {
    return (
        <div key={index} className='bg-slate-200 rounded-md p-2 absolute overflow-x-auto  ' style={{ left: ` ${index * (widthCard + 10)}px`, width: `${widthCard}px`, height: `${heightCard}px` }}>
            <p className='text-black capitalize text-xl'>{item.name}</p>

            <img src={item.image} alt={`Image of product ${item.name}`} className='pb-6 w-[200px]  h-[200px] object-contain pt-2' />

            <p className='text-gray-600 h-[100px]'>
                {item.description}
            </p>
            <button className='  text-black bg-slate-600 p-2 rounded-md hover:bg-slate-900 hover:text-white'>Ver mas</button>


        </div>
    )
}

export default SimpleSlider;
