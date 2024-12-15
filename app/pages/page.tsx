'use client';

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Tiptap from '@/app/components/tiptap'
import PageTreeView from "@/app/components/PageTreeView";
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


export default function Pages() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>

      <PanelGroup direction="horizontal" id="group">
      <Panel id="left-panel" defaultSize={25}>
        <PageTreeView/> 
      </Panel>

        <PanelResizeHandle id="resize-handle" hitAreaMargins={{ coarse: 15, fine: 5 }}  >

          <div className="relative group w-0.5 flex flex-col h-screen ">
            <div className="flex h-full  bg-gray-300  group-hover:bg-blue-500"></div>

            {/*
            // The following lines extends the region where the hover will trigger.
            // But this impacts the scrollbar when it is shown as we cannnot drag it anymore
            <div className="flex h-full absolute -left-4 w-4"></div>
            <div className="flex h-full absolute -right-4 w-4"></div>  */}
          </div>
        </PanelResizeHandle>

        <Panel id="right-panel" defaultSize={75} ><Tiptap  /></Panel>
      </PanelGroup>
    </QueryClientProvider>
  );
  }

