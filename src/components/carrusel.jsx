import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselItem
} from 'reactstrap';


function Carrusel(args) {
    const esperar = (t)=>{
        return new Promise(
            resolve =>{
                setTimeout(resolve,t);
            }
        )
    }

    const items = args.items;
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = async () => {
        await esperar(args.time*1000);
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    useEffect(()=>{
        if(items.length > 1){
            next();
        }
    });

    const slides = items.map((item) => {
        return (
        <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.idMensaje}
        >
            {item.mensaje}
        </CarouselItem>
        );
    });

    return (
        <Carousel
        activeIndex={activeIndex}
        next={next}
        >
        {slides} 
        </Carousel>
    );
}

export default Carrusel;