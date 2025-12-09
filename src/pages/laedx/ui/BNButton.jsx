import { useState } from 'react';
import BreakingNews from '@/pages/BreakingNews';


export default function BNButton() {
    const [showPage , setShowPage] = useState(false);

    if (showPage)
    {
        return <BreakingNews />
    }
    
    return (

        <section className="relative top-0 left-0 h-full w-full" >
            <div className="absolute top-90 md:top-100 left-1/2 bg-white rounded-full md:py-4 md:px-8 py-2 px-4 animate-ping text-white text-[14px]" >
                Breaking News
            </div>
            <button 
                className="absolute top-90 md:top-100 left-1/2 bg-white rounded-full md:py-4 md:px-8 py-2 px-4 font-[Montserrat] text-black text-[14px] pointer-events-auto cursor-pointer"
                onClick={() => setShowPage(true)}
            >
                Breaking News
            </button>
        </section>
    )
}