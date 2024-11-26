'use client';

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import Tiptap from '@/app/components/tiptap'


export default function Pages() {
    return (
     <>
      
    <PanelGroup direction="horizontal" id="group">
      <Panel id="left-panel" defaultSize={25}><div  className="flex h-full  bg-red-800">     </div></Panel>
      
      <PanelResizeHandle id="resize-handle" hitAreaMargins={{ coarse: 15, fine: 5 }}  >
        
        <div className="relative group w-0.5 flex flex-col h-screen ">
          <div className="flex h-full  bg-gray-300  group-hover:bg-blue-500"></div> 
          <div className="flex h-full absolute -left-4 w-4"></div>
          <div className="flex h-full absolute -right-4 w-4"></div>
        </div>
      </PanelResizeHandle>
      
      <Panel id="right-panel" defaultSize={25} ><Tiptap  /></Panel>
    </PanelGroup>
    </>
    );
  }

