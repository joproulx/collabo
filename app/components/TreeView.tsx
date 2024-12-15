
"use client";

import React, { FC, useEffect, useState } from "react";
import Sortable from "sortablejs";
import clsx from 'clsx';

interface TreeItemData {
  id: string;
  name: string;
  children?: TreeItemData[]
}

interface TreeItemState {
  isExpanded: boolean;
}


interface TreeState {
  [id: string] : TreeItemState;
}


export default function TreeView () {


  useEffect(() =>
    {
      // Nested demo
      var nestedSortables = [].slice.call(document.querySelectorAll('.nested-sortable'));
  
      // Loop through each nested sortable element
      for (var i = 0; i < nestedSortables.length; i++) {
        new Sortable(nestedSortables[i], {
          group: 'nested',
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65
        });
      }
    });
  
    
  const [itemDatas, setItemDatas] = useState<TreeItemData[]>([
    { id: "1", name: "shrek", children: [
      { id: "1_1", name: "chrek_baby" },
      { id: "1_2", name: "chrek_baby2" }
    ] },
    { id: "2", name: "fiona" },
    { id: "3", name: "fiona" },
    { id: "4", name: "fiona" },
    { id: "5", name: "fiona" },
    { id: "6", name: "fiona" },
    { id: "7", name: "fiona" },
    { id: "8", name: "fiona" },
    { id: "9", name: "fiona" },
    { id: "10", name: "fiona" },
    { id: "11", name: "fiona" },
    { id: "12", name: "fiona" },
    { id: "13", name: "fiona" },
    { id: "14", name: "fiona" },
    { id: "15", name: "fiona" },
  ]);




  const [itemState, setItemState] = useState<TreeState>({


  });
  


  let node = (key:string, nodeText: string, children?: TreeItemData[]) => {
    
    return (
    <div className="list-group-item" key={key}>
      <div className="flex flex-row items-center  hover:bg-blue-100 group">
        <label>
          <input 
            id="link-checkbox" 
            type="checkbox" 
            value="" 
            className="hidden peer" 
            checked={!!itemState[key]?.isExpanded}
            onChange={(e) => {
              setItemState(
              {
                ...itemState,
                [key]:{
                  ...itemState[key],
                  isExpanded: !itemState[key]?.isExpanded 
                }
              });
            }
            }/>
          
          <svg className={clsx('w-3 h-3  shrink-0 ',
          {
            'rotate-180': itemState[key]?.isExpanded,
            'rotate-90': !itemState[key]?.isExpanded,
          })}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            { children !== undefined && (
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>)
            }
            { children === undefined && (
              <circle cx="2" cy="2" r="2" fill="currentColor" />)
            }
          </svg>
        </label>
        <div className="px-1"/>
        <span className="grow truncate text-ellipsis">{nodeText}</span>
        <button className="flex justify-center items-center hover:border-slate-300 hover:border-2 active:bg-slate-200 text-slate-400 rounded w-6 h-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500 ease-in-out">
          <svg  className="w-4 h-4 p-0.5 fill-slate-600" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.055 32.055" >
            <g>
              <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
                C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
                s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
                c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/>
            </g>
          </svg>
        </button>
        <button className=" hover:border-slate-300 hover:border-2 active:bg-slate-200 text-slate-400 rounded w-6 h-6 flex justify-center items-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500 ease-in-out">
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
      

      {children !== undefined && !!itemState[key]?.isExpanded && (
        <div className="list-group nested-sortable pl-2">{children.map(c => node(c.id, c.name, c.children))}</div>
      )}
    
    </div>)
  };

  return (
        <div id="nestedDemo" className="list-group col nested-sortable [&>*]:cursor-default">
          {itemDatas.map(c => node(c.id, c.name, c.children))}
      </div> 
  );
};