'use client';

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import PageTreeView from '@/app/ui/PageTreeView';
import dynamic from 'next/dynamic';
const CustomEditor = dynamic( () => import( '@/app/components/custom-editor' ), { ssr: false } );
//import { useMeasure } from "react-use";
import { useMeasure } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";


export default function Pages() {
    const [getHeight, setHeight] =  useState("100px");
   // const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();
    const [ref, { width, height }] = useMeasure();


    return (
     <>
     
    <PanelGroup direction="horizontal" id="group">
      <Panel id="left-panel" defaultSize={25}>
        
      <PageTreeView/>
        
      
      
      
      </Panel>
      
      <PanelResizeHandle id="resize-handle" hitAreaMargins={{ coarse: 40, fine: 20 }}  >
        
        <div className="relative group w-0.5 flex flex-col h-full ">
          <div className="flex h-full  bg-gray-300  group-hover:bg-blue-500"></div> 
          <div className="flex h-full absolute -left-6 w-6"></div>
          <div className="flex h-full absolute -right-6 w-6"></div>
        </div>
      </PanelResizeHandle>
      
      <Panel id="right-panel"   className=""  >
      <div ref={ref as any} className=" flex flex-col h-full bg-slate-700"> <CustomEditor height={((height ?? 0) -30)+ "px"}/>  </div>
      {/* <CustomEditor height={height+ "px"}/> */}
        
        </Panel>
    </PanelGroup>
    </>
    );
  }

