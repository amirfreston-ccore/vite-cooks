import React, { useState } from 'react';
import NavDrawer from './nav.jsx';
import Header from './header.jsx';
import { Home, Calculator, BarChart3, Download, Settings, HelpCircle, Users, FileText, Zap } from 'lucide-react';
import BarChart from './ZyComponents/Chart/BarChart.jsx'
import RadialBarChart from './ZyComponents/Chart/RadialBarChart'
import ScatterChart from './ZyComponents/Chart/ScatterChart.jsx'
import Select from './ZyComponents/Select.jsx'

import ZyCard from './ZyComponents/ZyCard.jsx'
import ZyComponents from './ZyComponents'

const GlobalTheme = ({ children }) => {
    const [showBg, setShowBg] = useState(true);

    // return <div>
    //     <ZyCard />
    // </div>
    return (
        <div
            className="w-screen h-screen bg-fixed overflow-hidden "
            style={{
                background: showBg
                    ? 'url(/ref_theme_absy.png) top/cover no-repeat, linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)'
                    : '#0f0f23'
            }}
        >
            {showBg && <div className="absolute inset-0 bg-black/40 z-0"></div>}
            <button
                onClick={() => setShowBg(!showBg)}
                className={`absolute top-5 right-5 z-[9999] rounded-md text-white px-3 py-2 cursor-pointer text-xs ${showBg ? 'bg-black/70' : 'bg-white/10'
                    }`}
            >
                {showBg ? 'Hide BG' : 'Show BG'}
            </button>

            <main className='relative flex z-[9000] p-6 gap-4 bg-[#ebebf5]'>
                <NavDrawer />
                <div className='flex-1 pb-20 min-h-screen h-screen w-full rounded-3xl flex flex-col overflow-scroll'>
                    <Header />
                    {/* <div className='flex-1 p-4 bg-white'>
                        {children}
                    </div> */}

                    {true ? <ZyComponents/> : <div className='flex mt-6 gap-6'>

                        <div className='w-[60%] flex-[0.6] flex flex-col gap-6'>
                            <div className='grid grid-cols-2 gap-6'>
                                {/* Top Left Tile */}
                                {[1, 2, 3, 4].map(_ => {
                                    return <ZyCard className='bg-white text-gray-800 rounded-3xl p-5'>
                                        <div className='flex justify-between items-center'>
                                            <div className='p-3.5 rounded-2xl bg-gray-300/30 w-fit'><BarChart3 size={24} /></div>
                                            <div className='px-2 py-[2px] rounded-full text-sm bg-green-400 mr-2 mb-2'>+12.4%</div>
                                        </div>

                                        <h3 className='text-gray-800 my-2 mt-6'>Total Orders</h3>

                                        <div className='flex  gap-3 '>
                                            <h3 className='text-4xl font-semibold text-gray-800 '>34.760</h3>
                                            <h3 className='text-gray-800/60'>Orders vs last month</h3>
                                        </div>
                                    </ZyCard>
                                })}


                            </div>

                            <div className='bg-white  p-6 flex flex-col rounded-3xl'>
                                <div className='flex justify-between'>
                                    <div>
                                        <h3 className='text-xl font-semibold text-gray-800'>Customer Habbits</h3>
                                        <div className='text-gray-600'>Track your customer habbits</div>
                                    </div>
                                    <Select />
                                </div>

                                <div className='flex items-center gap-4 mt-6'>
                                    <span className='flex items-center' ><div className='size-3 bg-gray-300 rounded-full mr-2' /><p className='text-gray-800'>Seen product</p></span>
                                    <span className='flex items-center'><div className='size-3 bg-blue-600 rounded-full mr-2' /><p className='text-gray-800'>Sales</p></span>
                                </div>



                                <div className='flex-1 flex items-center justify-center'>
                                    {/* CHART */}
                                    <BarChart />
                                    {/* <ScatterChart/> */}
                                </div>
                            </div>

                        </div>





                        <div className='w-[40%] flex-[0.4] flex flex-col gap-6'>
                            <div className='bg-white  p-6 flex flex-col rounded-3xl'>
                                <div className='flex justify-between'>
                                    <div>
                                        <h3 className='text-xl font-semibold text-gray-800'>Product statistics</h3>
                                        <div className='text-gray-600'>Track your product sales</div>
                                    </div>
                                    <Select />
                                </div>

                                <div className='flex items-center gap-4 mt-6'>
                                    <span className='flex items-center' ><div className='size-3 bg-gray-300 rounded-full mr-2' /><p className='text-gray-800'>Seen product</p></span>
                                    <span className='flex items-center'><div className='size-3 bg-blue-600 rounded-full mr-2' /><p className='text-gray-800'>Sales</p></span>
                                </div>



                                <div className='flex-1 flex items-center justify-center'>
                                    {/* CHART */}
                                    <RadialBarChart />
                                    {/* <ScatterChart/> */}
                                </div>
                            </div>


                            <div className='bg-white  p-6 flex flex-col rounded-3xl'>
                                <div className='flex justify-between'>
                                    <div>
                                        <h3 className='text-xl font-semibold text-gray-800'>Customer Growth</h3>
                                        <div className='text-gray-600'>Track customer by locations</div>
                                    </div>
                                    <Select />
                                </div>

                                <div className='flex items-center gap-4 mt-6'>
                                    <span className='flex items-center' ><div className='size-3 bg-gray-300 rounded-full mr-2' /><p className='text-gray-800'>Seen product</p></span>
                                    <span className='flex items-center'><div className='size-3 bg-blue-600 rounded-full mr-2' /><p className='text-gray-800'>Sales</p></span>
                                </div>



                                <div className='flex-1 flex items-center justify-center'>
                                    {/* CHART */}
                                    {/* <RadialBarChart /> */}
                                    <ScatterChart />
                                </div>
                            </div>


                        </div>
                    </div>}


                </div>
            </main>

        </div>
    );
};

export default GlobalTheme;