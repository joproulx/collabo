'use client';

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";


export default function Pages() {
    
    return (
     <>
      
    <PanelGroup direction="horizontal" id="group">
      <Panel id="left-panel" defaultSize={25}><div  className="flex h-full  bg-red-800">     </div></Panel>
      
      <PanelResizeHandle id="resize-handle" hitAreaMargins={{ coarse: 40, fine: 20 }}  >
        
        <div className="relative group w-0.5 flex flex-col h-screen ">
          <div className="flex h-full  bg-gray-300  group-hover:bg-blue-500"></div> 
          <div className="flex h-full absolute -left-6 w-6"></div>
          <div className="flex h-full absolute -right-6 w-6"></div>
        </div>
      </PanelResizeHandle>
      
      <Panel id="right-panel" defaultSize={25} className="bg-slate-600">sdfkjhkjlsdfjk</Panel>
    </PanelGroup>
    </>
    );
  }

