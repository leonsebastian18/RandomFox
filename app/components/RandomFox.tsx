import { useRef, useEffect, useState } from "react";
import type { ImgHTMLAttributes } from "react";

type LazyImageProps = { 
    src: string
    onLazyLoad?: (img: HTMLImageElement) => void;
};

type Props =  ImgHTMLAttributes<HTMLImageElement> & LazyImageProps;

export function LazyImage({
     src, 
     onLazyLoad,
    ...imgProps 
}: Props): JSX.Element {

    const node = useRef<HTMLImageElement>(null);
    const [CurrentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");

    // nuevo observador

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                //onIntersection-->console.log
                if (!entry.isIntersecting || !node.current) {
                   return;
                }
                setCurrentSrc(src);
                
                if(typeof onLazyLoad === "function") {
                    onLazyLoad(node.current);
                }
            });
        });
           
    
    
        //observe node
        if (node.current) {
            observer.observe(node.current);
        }
    
        // desconectar
        return () => {
            observer.disconnect()
        }
    }, [src, onLazyLoad]);
    
    return <img ref={node}  src={CurrentSrc}  {...imgProps} />
}