"use client";

import React from "react";
import TreeView from './TreeView'

interface Props 
{ 
  disableScreen: (disable: boolean) => void; 
}

export default function PageTreeView (props: Props) {
    

    return (
      <div className="overflow-auto h-full">
        <div className="m-1">
        <div className="flex flex-row  p-2 bg-slate-200 rounded-md">
          <span className="grow truncate">Content</span>
          
          <button className=" hover:border-slate-300 hover:border-2 active:bg-slate-200 text-slate-400 rounded w-6 h-6 flex justify-center items-center">
            <svg className="w-4 h-4 p-0.5 fill-slate-600" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.402 45.402">
            <g>
              <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
                c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
                c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
                c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
            </g>
            </svg>
          </button>
        </div>
        <TreeView disableScreen={props.disableScreen}/>
        </div>
      </div>
    );

};