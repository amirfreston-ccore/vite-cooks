import React from 'react';
import Tree from 'react-d3-tree';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BinaryTree = () => {
    // Sample binary tree data with user information
    const treeData = {
        name: 'John Doe',
        role: 'CEO',
        number: '#001',
        department: 'Executive',
        email: 'john@company.com',
        children: [
            {
                name: 'Sarah Wilson',
                role: 'CTO',
                number: '#002',
                department: 'Technology',
                email: 'sarah@company.com',
                children: [
                    {
                        name: 'Mike Chen',
                        role: 'Dev Lead',
                        number: '#003',
                        department: 'Engineering',
                        email: 'mike@company.com'
                    },
                    {
                        name: 'Lisa Park',
                        role: 'QA Manager',
                        number: '#004',
                        department: 'Quality',
                        email: 'lisa@company.com'
                    }
                ]
            },
            {
                name: 'David Brown',
                role: 'CFO',
                number: '#005',
                department: 'Finance',
                email: 'david@company.com',
                children: [
                    {
                        name: 'Emma Davis',
                        role: 'Accountant',
                        number: '#006',
                        department: 'Accounting',
                        email: 'emma@company.com'
                    },
                    {
                        name: 'Alex Johnson',
                        role: 'Analyst',
                        number: '#007',
                        department: 'Finance',
                        email: 'alex@company.com'
                    }
                ]
            }
        ]
    };

    // Custom path function for edged lines with smooth corners
    const customPathFunc = (linkDatum, orientation) => {
        const { source, target } = linkDatum;
        const midY = (source.y + target.y) / 2;
        const radius = 30;

        return `M${source.x},${source.y}
            L${source.x},${midY - radius}
            Q${source.x},${midY} ${source.x + (target.x > source.x ? radius : -radius)},${midY}
            L${target.x - (target.x > source.x ? radius : -radius)},${midY}
            Q${target.x},${midY} ${target.x},${midY + radius}
            L${target.x},${target.y}`;
    };


    // Custom node component as user card
    const renderCustomNodeElement = ({ nodeDatum }) => {
        const isLeafNode = !nodeDatum.children || nodeDatum.children.length === 0;

        return (
            <g>
                <defs>
                    <filter id="coloredShadow" x="-100%" y="-100%" width="300%" height="300%">
                        <feDropShadow dx="0" dy="20" stdDeviation="20" floodColor="#3b82f6" floodOpacity="0.2" />
                    </filter>
                </defs>
                <foreignObject x="-120" y="-140" width="240" height="280" filter="url(#coloredShadow)">
                    <div className="backdrop-blur-md bg-[#e1e8f4ea] border border-white rounded-3xl text-xs flex flex-col" style={{ height: 'calc(100% - 16px)' }}>
                        <div className="bg-primary text-white font-bold text-center p-3 w-fit rounded-tl-3xl rounded-br-3xl text-base">
                            {nodeDatum.number}
                        </div>
                        <div className="flex-1 flex flex-col items-center space-y-1">
                            <img className='size-16 bg-[#eef4ff] rounded-2xl shadow-2xl' />
                            <div className="text-center font-bold text-gray-800 mb-3 text-xl">
                                {nodeDatum.name}
                            </div>
                            <div className="text-center text-gray-600 mb-3 text-base">
                                {nodeDatum.department}
                            </div>
                            <div className="text-center text-gray-500 text-base">
                                {nodeDatum.email}
                            </div>
                        </div>

                        {isLeafNode && (<div className='flex justify-between'>
                            <span className="bg-primary/5 hover:bg-white hover:text-primary text-center p-2 px-6 w-fit rounded-tr-3xl rounded-bl-3xl text-xl">
                                +
                            </span>
                            <span className="bg-primary/5 hover:bg-white hover:text-primary text-center p-2 px-6 w-fit rounded-tl-3xl rounded-br-3xl text-xl">
                                +
                            </span>
                        </div>)}

                    </div>
                </foreignObject>
            </g>
        );
    };

    return (
        <div className="">
            <style>{`
        .red-path {
          stroke: #aaa !important;
          stroke-width: 1px;
          fill: none;
        }
      `}</style>
            <div className="relative" style={{ width: '100%', height: screen.height, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                <Tree
                    data={treeData}
                    orientation="vertical"
                    scaleExtent={{ min: 0.1, max: 2 }}
                    zoom={0.6}
                    centeringTransitionDuration={800}
                    renderCustomNodeElement={renderCustomNodeElement}
                    separation={{ siblings: 2, nonSiblings: 2 }}
                    pathFunc={customPathFunc}
                    pathClassFunc={() => 'red-path'}
                    nodeSize={{ x: 250, y: 400 }}
                />
            </div>
        </div>
    );
};

export default BinaryTree;