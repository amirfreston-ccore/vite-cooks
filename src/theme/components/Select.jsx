import { BarChart3 } from 'lucide-react'
import React from 'react'

function Select() {
    return <div className='flex justify-between items-center gap-2'>
        <div className='text-gray-600'>This year</div>
        <div className='p-2 rounded-full bg-gray-300/30 text-gray-800 w-fit'><BarChart3 size={16} /></div>
    </div>
}

export default Select